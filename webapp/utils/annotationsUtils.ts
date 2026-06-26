import Component from "../Component";
import Model from "sap/ui/model/Model";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

export interface FieldProperty {
  name: string;
  label: string;
  quickinfo: string;
  fieldText: string;
  maxLength: number;
}
export type FieldProperties = FieldProperty[];
export interface FieldMetadata extends FieldProperty {
  visible: boolean;
  position: number;
  type: string;
  fieldCritically: string;
}
export type FieldsMetadata = FieldMetadata[];

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
        (row) => row.data.indexOf("/sap/opu/odata/IWFND/CATALOGSERVICE") !== -1,
      );
    if (annotationService && annotationService.annotations)
      return annotationService.annotations[entityType];
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
    entityType: string,
  ) {
    let cdsAnnotations = await this.getEntityAnnotations_O2(entityType);
    let term = `com.sap.vocabularies.UI.v1.${vocabulary}`;
    let vocabularyKey = Object.keys(cdsAnnotations)
      .filter((key) => key.includes(term))
      .find((key) => key.includes(qualifier));

    return vocabularyKey ? cdsAnnotations[vocabularyKey] : undefined;
  }
  /**
   * Devuelve el label y quickinfo de un campo desde el $metadata del servicio OData.
   * Usa metaModel.loaded() (distinto a annotationsLoaded) que carga el $metadata real del servidor.
   */
  public async getFieldMetadata(
    entityType: string,
    fieldName: string,
  ): Promise<FieldProperty> {
    let model = this.ownerComponent.getModel() as Model;
    let metaModel = model.getMetaModel() as any;
    await metaModel.loaded();
    let entityTypeObj = metaModel.getODataEntityType(entityType);
    let property = metaModel.getODataProperty(entityTypeObj, fieldName);
    return {
      label: property?.["sap:label"] ?? "",
      quickinfo: property?.["sap:quickinfo"] ?? "",
      fieldText: property?.["sap:text"] ?? "",
      maxLength: property.maxLength ?? 0,
      name: property.name ?? "",
    };
  }
  /**
   * Obtiene la información de los campos de una entidad del metadata.
   * Este método hace que el método "getEntityAnnotations_O2" no tenga sentido, pero
   * no se quita por temas de compatibilidad
   * @param entityType
   * @returns
   */
  public async getFieldMetadataList(
    entityType: string,
  ): Promise<FieldsMetadata> {
    let fieldsMetadata: FieldsMetadata = [];
    const model = this.ownerComponent.getModel() as Model;
    const metaModel = model.getMetaModel() as any;
    await metaModel.loaded();
    let entityTypeObj = metaModel.getODataEntityType(entityType);

    // Recorremos los linetem de la entidad donde tengo el orden de campos y su visibilidad
    const lineItemFields = entityTypeObj[
      "com.sap.vocabularies.UI.v1.LineItem"
    ] as any[];
    let fieldPosition = 1;
    lineItemFields.forEach((lineItemField) => {
      const fieldProperty = this.extractFieldProperties(
        entityTypeObj.property as any[],
        lineItemField.Value.Path as string,
      );

      let fieldMetadata: FieldMetadata = {
        ...fieldProperty,
        visible: lineItemField["com.sap.vocabularies.UI.v1.Hidden"]
          ? false
          : true,
        position: fieldPosition++,
        type: lineItemField.EdmType ?? "",
        fieldCritically: lineItemField?.Criticality?.Path ?? "",
      };
      fieldsMetadata.push(fieldMetadata);
    });

    return fieldsMetadata;
  }
  /**
   * Extracto del array propiertes los valores de un campo
   * @param properties
   * @param fieldname
   */
  private extractFieldProperties(
    properties: any[],
    fieldname: string,
  ): FieldProperty {
    const property = properties.find((prop) => prop.name === fieldname);
    return {
      label: property?.["sap:label"] ?? "",
      quickinfo: property?.["sap:quickinfo"] ?? "",
      fieldText: property?.["sap:text"] ?? "",
      maxLength: property.maxLength ?? 0,
      name: property.name ?? "",
    };
  }
}
