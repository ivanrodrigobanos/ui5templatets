import { EdmType } from "sap/ui/export/library";

/**
 * Configuración de columna para exportación Excel
 */
export type ExcelColumn = {
  label: string;
  property: string;
  type: EdmType;
  width?: number;
  scale?: number;
  delimiter?: boolean;
  trueValue?: string;
  falseValue?: string;
  template?: string;
};
export type ExcelColumns = ExcelColumn[];

/**
 * Configuración del workbook
 */
export type WorkbookSettings = {
  columns: ExcelColumns;
  hierarchyLevel?: string;
  context?: {
    sheetName?: string;
    application?: string;
    version?: string;
    modifiedBy?: string;
    metaSheetName?: string;
  };
  addPropertyToLabel?: boolean;
};

/**
 * Configuración completa del Spreadsheet
 */
export type SpreadsheetSettings = {
  workbook: WorkbookSettings;
  dataSource: any;
  fileName: string;
  worker?: boolean;
  showProgress?: boolean;
  count?: number;
};

/**
 * Configuración de exportación personalizada
 */
export type ExportConfig = {
  tableName: string;
  fileName?: string;
  columns?: ExcelColumns;
  includeFilters?: boolean;
  customTransform?: (data: any[]) => any[];
};

/**
 * Resultado de exportación
 */
export type ExportResult = {
  success: boolean;
  fileName: string;
  rowCount: number;
  error?: string;
};

/**
 * Datos de Excel genéricos
 */
export type ExcelData = Record<string, any>;
export type ExcelDataArray = ExcelData[];

export type ResultPreReadExcel = {
  success: boolean;
  message?: string;
};

export type ResultReadExcel = {
  data: ExcelDataArray;
  totalRows: number;
  success: boolean;
  message?: string;
};
export type ValidateExcelFile = {
  error: boolean;
  message: string;
};

export type ReadExcelOpts = {
  propertyFieldInLabel?: boolean;
};
