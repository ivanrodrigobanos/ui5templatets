export default class ConversionExitUtils {
  /**
   * Aplica la rutina de conversión ALPHA de salida
   * @param value
   * @returns
   */
  static alphaOutput(value: string): string {
    return String(value).replace(/^0+/, "");
  }
  // Aplica rutina de conversión de entrada
  static alphaInput(value: string, length: number): string {
    if (!value) return "";

    if (!/^\d+$/.test(value)) return value; // Si no es solo números, devolver sin cambios

    return value.padStart(length, "0");
  }
}
