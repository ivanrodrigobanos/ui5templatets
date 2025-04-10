/* eslint-disable linebreak-style */
import Controller from "sap/ui/core/mvc/Controller";
import History from "sap/ui/core/routing/History";
import Router from "sap/ui/core/routing/Router";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import AppComponent from "../Component";

/**
 * @namespace cfwreport
 */
export default abstract class BaseController extends Controller {
  /**
   * Convenience method for accessing the component of the controller's view.
   * @public
   * @returns {be.wl.TypeScriptServiceDemoApp.Component} the component of the controller's view
   */
  public getOwnerComponent(): AppComponent {
    return super.getOwnerComponent() as AppComponent;
  }

  /**
   * Convenience method for accessing the router in every controller of the application.
   * @public
   * @returns {sap.ui.core.routing.Router} the router for this component
   */
  public getRouter(): Router {
    return this.getOwnerComponent().getRouter();
  }

  /**
   * Convenience method for getting the view model by name in every controller of the application.
   * @public
   * @param {string} name the model name
   * @returns {sap.ui.model.Model} the model instance
   */
  public getModel(name?: string): Model {
    return this.getView()?.getModel(name) as Model;
  }

  /**
   * Convenience method for setting the view model in every controller of the application.
   * @public
   * @param {sap.ui.model.Model} model the model instance
   * @param {string} name the model name
   */
  public setModel(model: Model, name?: string): void {
    this.getView()?.setModel(model, name);
  }

  /**
   * Convenience method for getting the resource bundle.
   * @public
   * @returns {sap.ui.model.resource.ResourceModel|Promise<sap.ui.model.resource.ResourceModel>} the resource bundle or a Promise resolving with it
   */
  public geti18nResourceBundle(): ResourceBundle {
    return (
      this.getOwnerComponent().getModel("i18n") as ResourceModel
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
  /**
   * Event handler for navigating back.
   * It there is a history entry we go one step back in the browser history
   * If not, it will replace the current entry of the browser history with the master route.
   * @public
   */
  public onNavBack(): void {
    const sPreviousHash = History.getInstance().getPreviousHash();

    if (sPreviousHash !== undefined) {
      // eslint-disable-next-line
      history.go(-1);
    } else {
      this.getRouter().navTo("master", {}, {}, true);
    }
  }
}
