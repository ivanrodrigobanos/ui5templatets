import Spreadsheet from "sap/ui/export/Spreadsheet";
import AppComponent from "../Component";
import BaseStateModel from "./baseStateModel";
import ExcelColumnModel from "./excelColumnModel";
import {
  ExcelColumns,
  ExcelData,
  ExcelDataArray,
  ReadExcelOpts,
  ResultPreReadExcel,
  ResultReadExcel,
  SpreadsheetSettings,
  ValidateExcelFile,
} from "./excelTypes";
import {
  EXCEL_MAX_SIZE,
  EXCEL_EXTENSION,
  EXCEL_MIMETYPES,
} from "./excelConstants";

type ExcelValues = {
  columns: ExcelColumnModel;
};

export default class ExcelState extends BaseStateModel<ExcelValues> {
  constructor(oComponent: AppComponent) {
    super(oComponent);

    this.data = {
      columns: new ExcelColumnModel(),
    };
  }
  /**
   * Añade una columna de tipo string
   * @param label
   * @param property
   * @param width
   */
  public addString(label: string, property: string, width?: number) {
    this.getData().columns.addString(label, property, width);
    this.updateModel(true);
  }
  /**
   * Añade una columna de tipo fecha
   * @param label
   * @param property
   * @param width
   */
  public addDate(label: string, property: string, width?: number) {
    this.getData().columns.addDate(label, property, width);
    this.updateModel(true);
  }
  /**
   * Añade una columna de tipo fecha y hora
   * @param label
   * @param property
   * @param width
   */
  public addDateTime(label: string, property: string, width?: number) {
    this.getData().columns.addDateTime(label, property, width);
    this.updateModel(true);
  }
  /**
   * Añade una columna de tipo numer
   * @param label
   * @param property
   * @param width
   * @param scale
   */
  public addNumber(
    label: string,
    property: string,
    width?: number,
    scale?: number
  ) {
    this.getData().columns.addNumber(label, property, width, scale);
    this.updateModel(true);
  }
  /**
   * Añade una columna de tipo boolean
   * @param label
   * @param property
   * @param trueValue
   * @param falseValue
   */
  public addBoolean(
    label: string,
    property: string,
    trueValue = "Sí",
    falseValue = "No"
  ) {
    this.getData().columns.addBoolean(label, property, trueValue, falseValue);
    this.updateModel(true);
  }
  /** Devuelve las columnas del Excel */
  public getColumns(): ExcelColumns {
    return this.getData().columns.build();
  }
  /**
   * Resetea las columnas del Excel
   */
  public resetColumns() {
    this.getData().columns.reset();
    this.updateModel(true);
  }
  /**
   * Genera un archivo con la configuración pasada.
   * Este método utiliza la clase Spreadsheet de SAPUI5 para crear un archivo Excel.
   * @param settings
   * @param successCallback
   * @param errorCallback
   */
  public generateExcel(
    settings: SpreadsheetSettings,
    successCallback?: () => void,
    errorCallback?: (error: Error) => void
  ) {
    if (settings.workbook.addPropertyToLabel)
      settings.workbook.columns = this.addPropertyToLabel(
        settings.workbook.columns
      );

    const oSheet = new Spreadsheet(settings);

    oSheet
      .build()
      .then(() => {
        if (successCallback) {
          successCallback();
        }
      })
      .catch((error: Error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      })
      .finally(() => {
        oSheet.destroy();
      });
  }
  /**
   * Lectura de un archivo Excel.
   * Este método está diseñado para leer un archivo Excel y devolver un objeto con los datos leídos.
   * @param file
   * @returns
   */
  public readExcelFile(
    file: File,
    readCallback: (result: ResultReadExcel) => void,
    options?: ReadExcelOpts
  ): ResultPreReadExcel {
    let resultPreRead: ResultPreReadExcel = {
      success: true,
    };
    const validations = this.validateExcelFile(file);
    if (validations.error) {
      resultPreRead.success = false;
      resultPreRead.message = validations.message;
      return resultPreRead;
    }

    const oReader = new FileReader();

    oReader.onload = (e: ProgressEvent<FileReader>): void => {
      let resultRead: ResultReadExcel = {
        success: true,
        data: [],
        totalRows: 0,
        message: "",
      };
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const oWorkbook = (window as any).XLSX.read(arrayBuffer, {
          type: "array",
        });
        const sSheetName: string = oWorkbook.SheetNames[0];
        const oWorksheet = oWorkbook.Sheets[sSheetName];
        resultRead.data = (window as any).XLSX.utils.sheet_to_json(oWorksheet);
        if (options?.propertyFieldInLabel)
          resultRead.data = this.convertFieldKey2FieldProperty(resultRead.data);

        resultRead.totalRows = resultRead.data.length;
      } catch (error: any) {
        resultRead.success = false;
        resultRead.message = this.ownerComponent.getTextI18n("excel.errorRead");
      }
      readCallback(resultRead);
    };

    oReader.readAsArrayBuffer(file);

    return resultPreRead;
  }
  private validateExcelFile(file: File): ValidateExcelFile {
    let validation: ValidateExcelFile = {
      error: false,
      message: "",
    };
    const sFileName: string = file.name;
    const sFileExtension: string =
      sFileName.split(".").pop()?.toLowerCase() || "";

    // Verificación de extensión y mimetype
    if (
      !EXCEL_EXTENSION.includes(sFileExtension) ||
      !EXCEL_MIMETYPES.includes(file.type)
    ) {
      validation.error = true;
      validation.message = this.ownerComponent.getTextI18n(
        "excel.invalidExtension"
      );
      return validation;
    }
    // Tamaño maximo del excel
    if (file.size > EXCEL_MAX_SIZE) {
      validation.error = true;
      validation.message = this.ownerComponent.getTextI18n("excel.maxSize", [
        "5MB",
      ]);
      return validation;
    }

    return validation;
  }
  /**
   * Añade la propieda a la etiqueta de la columna
   * @param columns
   * @returns
   */
  private addPropertyToLabel(columns: ExcelColumns): ExcelColumns {
    const newColumns = columns.map((column) => {
      return {
        ...column,
        label:
          column.label !== column.property
            ? `${column.label}[${column.property}]`
            : column.label,
      };
    });

    return newColumns;
  }
  /**
   * Convierte los campos que vienen de la lectura de un excel en campo cuya propiedad, o nombre técnico, viene en el propio
   * nombre del campo. Esto ocurre porque cuando se descarga se puede indicar que el nombre técnico se incluya en la propia etiqueta
   * de la columna
   * @param values
   */
  private convertFieldKey2FieldProperty(
    values: ExcelDataArray
  ): ExcelDataArray {
    const newValues: ExcelDataArray = [];
    const regex = /\[([^\]]+)\]/;
    values.forEach((rowValue) => {
      const newRow: ExcelData = {};

      Object.keys(rowValue).forEach((originalKey) => {
        const match = originalKey.match(regex);
        if (match && match[1]) {
          newRow[match[1]] = rowValue[originalKey];
        }
      });
      newValues.push(newRow);
    });

    return newValues;
  }
}
