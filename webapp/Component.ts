import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
import AccumAmountState from "./state/accumAmountState";
import { APP_CORE_CONSTANTS } from "./coreConstants/generalConstants";
import CoreConstantsState from "./coreConstants/coreConstantsState";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

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
  /**
   * Convenience method for getting the resource bundle.
   * @public
   * @returns {sap.ui.model.resource.ResourceModel|Promise<sap.ui.model.resource.ResourceModel>} the resource bundle or a Promise resolving with it
   */
  public geti18nResourceBundle(): ResourceBundle {
    return (
      this.getModel("i18n") as ResourceModel
    ).getResourceBundle() as ResourceBundle;
  }
  /**
   * Simplifica la llamada para devolver un texto del i18n
   * @param text
   * @returns
   */
  public getTextI18n(text: string, aArgs?: any[]): string {
    return this.geti18nResourceBundle().getText(text, aArgs) ?? "";
  }
}
