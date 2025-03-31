export default class StringHelper {
  /**
   * Convierte un texto a ArrayBuffer
   * @param text
   * @returns
   */
  static convertText2ArrayBuffer(text: string): ArrayBuffer {
    return new TextEncoder().encode(text);
  }
  /**
   * Convierte un hash buffer a un string en formato hexadecimal
   * @param hashBuffer
   * @returns
   */
  static convertArrayBuffer2Text(hashBuffer: ArrayBuffer): string {
    const hashArray: number[] = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
}
