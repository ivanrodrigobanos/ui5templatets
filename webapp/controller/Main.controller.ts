import BaseController from "./Base.Controller";
import formatter from "ui5templatets/model/formatter";
/**
 * @namespace ui5templatets.controller
 */
export default class Main extends BaseController {
  public formatter = formatter;
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    // Acceso al state
  }

  public onSearch() {
    // Llamada al state para obtener importer
    this.getOwnerComponent()
      .accumAmountState.readAccumAmount([])
      .then(() => {})
      .catch(() => {});
  }
}
