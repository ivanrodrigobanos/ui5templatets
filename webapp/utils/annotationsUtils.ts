import Component from "../Component";
import Model from "sap/ui/model/Model";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

export enum AnnotationTypes {
  presentationVariant = "PresentationVariant",
  lineItem = "LineItem",
  identification = "Identification",
}
export const PRESENTATION_VARIANT_SECTIONS = {
  GROUPBY: "GroupBy",
  SORTODER: "SortOrder",
  TOTALBY: "TotalBy",
  REQUESTATLEAST: "RequestAtLeast",
};
export default class AnnotationsUtils {
  private ownerComponent: Component;
  constructor(component: Component) {
    this.ownerComponent = component;
  }
  /**
   * Devuelve las anotaciones de una entitype
   * @param entityType
   * @returns
   */
  public async getEntityAnnotations_O2(entityType: string) {
    let model = this.ownerComponent.getModel() as Model;
    let metaModel = model.getMetaModel() as any; //MetaModel;
    let dataModel = metaModel.oDataModel as ODataModel;
    let annotationsLoaded = (await dataModel.annotationsLoaded()) as any[];
    let annotationService = annotationsLoaded
      .filter((row) => row.type === "url")
      .find(
        (row) => row.data.indexOf("/sap/opu/odata/IWFND/CATALOGSERVICE") !== -1
      );
    if (annotationService && annotationService.annotations)
      return annotationService.annotations[entityType] as any;
    return undefined;
  }
  /**
   * Obtiene los datos de un vocabulary(presentarVariant, liteItem,etc..) de las anotaciones
   * @param vocabulary
   * @returns
   */
  public async getVocabulariesAnnotation(
    vocabulary: AnnotationTypes,
    qualifier: string,
    entityType: string
  ) {
    let cdsAnnotations = await this.getEntityAnnotations_O2(entityType);
    let term = `com.sap.vocabularies.UI.v1.${vocabulary}`;
    let vocabularyKey = Object.keys(cdsAnnotations)
      .filter((key) => key.includes(term))
      .find((key) => key.includes(qualifier));

    return vocabularyKey ? cdsAnnotations[vocabularyKey] : undefined;
  }
}
