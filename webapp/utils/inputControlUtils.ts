import Input from "sap/m/Input";

export type SuggestionItem = Record<string, any>;
export type SuggestionItems = SuggestionItem[];

export default class InputControlUtils {
  /**
   * Devuelve los valores del control suggestionItems de un Input
   * @param oInput
   * @returns
   */
  public getSuggestionItems(oInput: Input): SuggestionItems {
    if (!oInput) return [];
    const oItems = oInput.getBinding("suggestionItems") as any;
    if (!oItems) return [];

    return oItems
      .getContexts()
      .map((context: any) => context.getObject()) as SuggestionItems;
  }
}
