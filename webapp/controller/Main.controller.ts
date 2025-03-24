import BaseController from "./Base.Controller";

/**
 * @namespace ui5templatets.controller
 */
export default class Main extends BaseController {
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
