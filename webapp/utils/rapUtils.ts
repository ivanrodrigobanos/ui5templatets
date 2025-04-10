import { ValueState } from "sap/ui/core/library";

export type SAPMessage = {
  code: string;
  message: string;
  severity: string;
};
export type SAPMessages = SAPMessage[];

export type ResponseObject = {
  data: Record<string, any>;
  statusCode: string;
  statusText: string;
  sapMessage: SAPMessages;
};

export type ResponseService = {
  data: Record<string, any>;
  statusCode: string;
  statusText: string;
  headers: Record<string, any>;
};
export default class RapUtils {
  /**
   * Convierte el valor del campo severity en valueState
   * @param severity
   */
  static convertSeverity2ValueState(severity: string): ValueState {
    if (severity === "success") return ValueState.Success;
    if (severity === "error") return ValueState.Error;
    if (severity === "warning") return ValueState.Warning;
    if (severity === "information") return ValueState.Information;

    return ValueState.None;
  }
  public convertResponse2Data(payload: ResponseService): ResponseObject {
    const response: ResponseObject = {
      data: payload.data,
      statusCode: payload.statusCode,
      statusText: payload.statusText,
      sapMessage: payload.headers["sap-message"]
        ? this.parseSAPMessage(payload.headers["sap-message"] as string)
        : [],
    };

    return response;
  }
  /**
   * Parsea los mensajes que devuelve el RAP que vienen de la cabecera y están en formato JSON
   * @param payload
   * @returns
   */
  private parseSAPMessage(payload: string): SAPMessages {
    const messages: SAPMessages = [];
    const object = JSON.parse(payload);

    // Si no esta el campo code es que no hay mensajes y salgo.
    if (!object.code) return [];

    // El primer mensaje esta definido como objeto.
    messages.push({
      code: object.code,
      message: object.message,
      severity: object.severity,
    });

    // Si hay más mensajes vienen el campo DETAILS
    if (object.details && Array.isArray(object.details)) {
      object.details.forEach((row: any) => {
        messages.push({
          code: row.code,
          message: row.message,
          severity: row.severity,
        });
      });
    }

    return messages;
  }
}
