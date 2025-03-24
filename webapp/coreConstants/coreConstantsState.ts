import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import BaseState from "./baseState";
import CoreConstantsModel from "./coreConstantsModel";
import CoreConstantsService from "./coreConstantsService";
import {
  ConstantID,
  ConstantsID,
  ConstantValue,
  ConstantValues,
} from "./coreConstantsTypes";

export type ConstantData = {
  constants: CoreConstantsModel;
};

export default class CoreConstantsState extends BaseState<
  CoreConstantsService,
  ConstantData
> {
  constructor(ODataModel: ODataModel) {
    super(new CoreConstantsService(ODataModel));
    this.data = {
      constants: new CoreConstantsModel(),
    };
  }
  /**
   * Lectura de constantes
   * @param constantsID
   */
  async readConstants(constantsID?: ConstantsID) {
    let values = await this.service.readConstants(constantsID);
    this.getData().constants = new CoreConstantsModel(values);
    this.updateModel();
  }

  /**
   * Devuelve los valores de una constante
   * @returns
   */
  public getConstantValues(constant: ConstantID): ConstantValues {
    return this.getData().constants.getConstantValues(constant);
  }
  /**
   * Devuelve un solo valor de la constante. Útil para constante que solo
   * tienen un valor
   * @param constant
   * @returns
   */
  public getConstantValue(constant: ConstantID): ConstantValue {
    let values = this.getConstantValues(constant);
    return values.length === 0 ? "" : values[0];
  }
  /**
   * Devuelve los valores a partir de un patron de constantes
   * @returns
   */
  public getConstantPatternValues(constant: ConstantID): ConstantValues {
    return this.getData().constants.getConstantPatternValues(constant);
  }
}
