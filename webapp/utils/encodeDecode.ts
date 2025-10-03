export default class EncodeDecode {
  /**
   * Decodifica una cadena Base64 a texto
   * @param base64 Cadena en formato Base64
   * @returns Texto decodificado
   */
  static decodeBase64ToString(base64: string): string {
    return atob(base64);
  }
  /**
   * Decodifica una cadena Base64 a un array de bytes
   * @param base64 Cadena en formato Base64
   * @returns Array de bytes
   */
  static decodeBase64ToArrayString(base64: string) {
    const binaryString = this.decodeBase64ToString(base64);

    let byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    return byteArray;
  }
}
