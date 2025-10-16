import { EdmType } from "sap/ui/export/library";
import { ExcelColumns } from "./excelTypes";

export default class ExcelColumnModel {
  private columns: ExcelColumns = [];

  public addString(
    label: string,
    property: string,
    width?: number
  ): ExcelColumnModel {
    this.columns.push({
      label,
      property,
      type: EdmType.String,
      width,
    });
    return this;
  }

  public addNumber(
    label: string,
    property: string,
    width?: number,
    scale?: number
  ): ExcelColumnModel {
    this.columns.push({
      label,
      property,
      type: EdmType.Number,
      width,
      scale,
    });
    return this;
  }

  public addDate(
    label: string,
    property: string,
    width?: number
  ): ExcelColumnModel {
    this.columns.push({
      label,
      property,
      type: EdmType.Date,
      width,
    });
    return this;
  }

  public addDateTime(
    label: string,
    property: string,
    width?: number
  ): ExcelColumnModel {
    this.columns.push({
      label,
      property,
      type: EdmType.DateTime,
      width,
    });
    return this;
  }

  public addBoolean(
    label: string,
    property: string,
    trueValue = "Sí",
    falseValue = "No"
  ): ExcelColumnModel {
    this.columns.push({
      label,
      property,
      type: EdmType.Boolean,
      trueValue,
      falseValue,
    });
    return this;
  }

  public build(): ExcelColumns {
    return this.columns;
  }

  public reset(): ExcelColumnModel {
    this.columns = [];
    return this;
  }
}
