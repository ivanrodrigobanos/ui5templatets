export type QueryPairValue = Record<string, string>;
export class UrlUtils {
  /**
   * Obtiene el valor de la query string de la URL actual. Si la URL es:
   * http://localhost:8080/test/flpSandbox.html?sap-ui-xx-viewCache=false&code=333333
   * el valor devuelto será ?sap-ui-xx-viewCache=false&code=333333
   * @returns
   */
  getQueryString(): string {
    return window.location.search;
  }
  /**
   * Devuelve la URL actual.
   * @returns
   */
  getHref(): string {
    return window.location.href;
  }

  /**
   * Convierte el valor de la query string en un objeto.
   * Si se pasa el valor: sap-ui-xx-viewCache=false&code=333333
   * devuelve: {"sap-ui-xx-viewCache": "false", "code": "333333"}
   * @param queryString
   * @returns
   */
  parseQueryString(queryString: string): QueryPairValue {
    const params: QueryPairValue = {};
    const pairs: string[] = queryString.substring(1).split("&");

    pairs.forEach((pair) => {
      const keyValue: string[] = pair.split("=");
      if (keyValue.length === 2) {
        params[keyValue[0]] = decodeURIComponent(keyValue[1]);
      }
    });

    return params;
  }
}
