import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
import AccumAmountState from "./state/accumAmountState";

/**
 * @namespace ui5templatets
 */
export default class Component extends BaseComponent {
  public static metadata = {
    manifest: "json",
    interfaces: ["sap.ui.core.IAsyncContentCreation"],
  };
  public accumAmountState: AccumAmountState;

  public init(): void {
    // call the base component's init function
    super.init();

    // set the device model
    this.setModel(createDeviceModel(), "device");

    // enable routing
    this.getRouter().initialize();

    // Clase encargada de gestionar los importes acumulados
    this.accumAmountState = new AccumAmountState(this);
  }
}
