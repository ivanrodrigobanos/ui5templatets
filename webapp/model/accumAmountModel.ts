import { ChartComponentDatas } from "ui5templatets/types/chartTypes";
import BaseModel from "./baseModel";

export default class AccumAmountModel extends BaseModel<ChartComponentDatas> {
  private accumAmount: ChartComponentDatas;
  public constructor(accumAmount?: ChartComponentDatas) {
    super();
    this.accumAmount = accumAmount ?? [];
  }
  public getData(): ChartComponentDatas {
    return this.accumAmount;
  }
  public clearData(): void {
    this.accumAmount = [];
  }
}
