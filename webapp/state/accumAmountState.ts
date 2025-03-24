import AppComponent from "../Component";
import AccumAmountsService from "ui5templatets/service/accumAmountsService";
import BaseState from "./baseState";
import AccumAmountModel from "ui5templatets/model/accumAmountModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Filter from "sap/ui/model/Filter";
import { ChartComponentDatas } from "ui5templatets/types/chartTypes";

export type AccumAmountData = {
  accumAmount: AccumAmountModel;
};

export default class AccumAmountState extends BaseState<
  AccumAmountsService,
  AccumAmountData
> {
  constructor(oComponent: AppComponent) {
    super(
      oComponent,
      new AccumAmountsService(oComponent.getModel() as ODataModel)
    );

    this.data = { accumAmount: new AccumAmountModel() };
  }

  /**
   * Lectura de los importes acumulados
   * @param filters
   */
  public async readAccumAmount(filters: Filter[]) {
    const values = await this.service.readAccumAmounts(filters);
    this.getData().accumAmount = new AccumAmountModel(values);
    this.updateModel();
  }
  /**
   * Devuelve los datos de los importes acumulados
   * @returns
   */
  public getAccumAmount(): ChartComponentDatas {
    return this.getData().accumAmount.getData();
  }
}
