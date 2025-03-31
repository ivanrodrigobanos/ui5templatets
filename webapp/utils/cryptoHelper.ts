/* eslint-disable no-undef */

import StringHelper from "./stringHelper";

/* eslint-disable @typescript-eslint/no-unsafe-return */
export default class CryptoHelper {
  async sha256(message: string): Promise<string> {
    // Codifica el mensaje como un ArrayBuffer
    //const msgBuffer: ArrayBuffer = new TextEncoder().encode(message);
    const msgBuffer = StringHelper.convertText2ArrayBuffer(message);
    // Calcula el hash SHA-256
    const hashBuffer: ArrayBuffer = await crypto.subtle.digest(
      "SHA-256",
      msgBuffer
    );

    return StringHelper.convertArrayBuffer2Text(hashBuffer);
    // Convierte el ArrayBuffer del hash en una cadena hexadecimal
    /*const hashArray: number[] = Array.from(new Uint8Array(hashBuffer));
    const hashHex: string = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");*/
    //return hashHex;
  }
}
