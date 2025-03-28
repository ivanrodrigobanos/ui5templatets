import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
import AccumAmountState from "./state/accumAmountState";
import { APP_CORE_CONSTANTS } from "./coreConstants/generalConstants";
import CoreConstantsState from "./coreConstants/coreConstantsState";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

/**
 * @namespace ui5templatets
 */
export default class Component extends BaseComponent {
  public static metadata = {
    manifest: "json",
    interfaces: ["sap.ui.core.IAsyncContentCreation"],
  };
  public accumAmountState: AccumAmountState;
  public coreConstantsState: CoreConstantsState;

  public init(): void {
    // call the base component's init function
    super.init();

    // set the device model
    this.setModel(createDeviceModel(), "device");

    // enable routing
    this.getRouter().initialize();

    // Clase encargada de gestionar las constantes
    this.coreConstantsState = new CoreConstantsState(
      this.getModel() as ODataModel
    );

    // Clase encargada de gestionar los importes acumulados
    this.accumAmountState = new AccumAmountState(this);

    this.readConstants();
  }
  /**
   * Lectura de las constantes necesarias para la aplicación
   */
  private readConstants() {
    // Constantes
    this.coreConstantsState
      .readConstants(APP_CORE_CONSTANTS)
      .then(() => {})
      .catch(() => {});
  }
}
