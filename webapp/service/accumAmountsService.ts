import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import BaseService from "./baseService";
import { ChartComponentDatas } from "ui5templatets/types/chartTypes";
import Filter from "sap/ui/model/Filter";

type ResultAccumAmmountSet = {
  results: ChartComponentDatas;
};

export default class AccumAmountsService extends BaseService {
  constructor(oDataModel: ODataModel) {
    super(oDataModel);
  }

  public async readAccumAmounts(
    filters: Filter[]
  ): Promise<ChartComponentDatas> {
    let resultado = await this.odata("/XXXXXX").get<ResultAccumAmmountSet>({
      filters: filters,
      urlParameters: {
        $top: "40000",
      },
    });
    return resultado.data.results;
  }
}
