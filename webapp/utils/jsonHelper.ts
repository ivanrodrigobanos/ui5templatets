import StringHelper from "./stringHelper";

export default class JSONHelper {
  /**
   * Convierte un objeto JSON a un hexadecimal
   * @param jsonObject
   * @returns
   */
  static convertJSON2HexString(jsonObject: Record<string, any>): string {
    const jsonString = JSON.stringify(jsonObject);
    return StringHelper.convertArrayBuffer2Text(
      StringHelper.convertText2ArrayBuffer(jsonString)
    );
  }
}
