import { ValueState } from "sap/ui/core/library";
import Main from "ui5templatets/controller/Main.controller"; //Mete aquí el controlador que esté ligado a la vista donde usas el formatter e importa el formatter en el controlador tal y como hacemos en este proyecto
import {
  ABAP_VALUE_STATE,
  ABAP_VALUE_STATE_NUMBER,
} from "ui5templatets/coreConstants/stateConstants";

export default {
  stateArea: function (this: Main, state: string): ValueState {
    if (state === null || state === undefined) return ValueState.None;
    if (state === ABAP_VALUE_STATE.SUCESS) return ValueState.Success;
    if (state === ABAP_VALUE_STATE.ERROR) return ValueState.Error;
    if (state === ABAP_VALUE_STATE.WARNING) return ValueState.Warning;

    return ValueState.None;
  },
  textoWithState: function (this: Main, texto: string): string {
    if (!texto) return "";
    let parts = texto.split("|");
    if (parts.length > 0) return parts[0];
    else return "";
  },
  stateWithTexto: function (this: Main, texto: string): ValueState {
    if (!texto) return ValueState.None;
    let parts = texto.split("|");
    if (parts.length <= 1) return ValueState.None;
    const state = parts[1];

    if (state === null || state === undefined) return ValueState.None;
    if (state === ABAP_VALUE_STATE.SUCESS) return ValueState.Success;
    if (state === ABAP_VALUE_STATE.ERROR) return ValueState.Error;
    if (state === ABAP_VALUE_STATE.WARNING) return ValueState.Warning;

    return ValueState.None;
  },
  iconArea: function (this: Main, state: string): string {
    if (state === null || state === undefined) return "";
    if (state === ABAP_VALUE_STATE.SUCESS) return "sap-icon://status-positive";
    if (state === ABAP_VALUE_STATE.ERROR) return "sap-icon://status-negative";
    if (state === ABAP_VALUE_STATE.WARNING) return "sap-icon://status-critical";
    if (
      state === ABAP_VALUE_STATE.INFORMATION_NEW ||
      state === ABAP_VALUE_STATE.INFORMATION_OLD
    )
      return "sap-icon://message-information";

    return "";
  },
  stateAreaNumberFormat: function (this: Main, state: Number): string {
    if (state === null || state === undefined) return "Information";
    if (state === ABAP_VALUE_STATE_NUMBER.SUCESS) return "Success";
    if (state === ABAP_VALUE_STATE_NUMBER.ERROR) return "Error";
    if (state === ABAP_VALUE_STATE_NUMBER.WARNING) return "Warning";

    return "Information";
  },
  iconAreaNumberState: function (this: Main, state: Number): string {
    if (state === null || state === undefined) return "";
    if (state === ABAP_VALUE_STATE_NUMBER.SUCESS)
      return "sap-icon://status-positive";
    if (state === ABAP_VALUE_STATE_NUMBER.ERROR)
      return "sap-icon://status-negative";
    if (state === ABAP_VALUE_STATE_NUMBER.WARNING)
      return "sap-icon://status-critical";
    if (
      state === ABAP_VALUE_STATE_NUMBER.INFORMATION_NEW ||
      state === ABAP_VALUE_STATE_NUMBER.INFORMATION_OLD
    )
      return "sap-icon://message-information";

    return "";
  },
};
