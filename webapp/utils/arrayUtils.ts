export default class ArrayUtils {
  /**
   * Devuelve los valores de un campo sin duplicados
   * @param array
   * @param fieldname
   * @returns
   */
  static deleteDuplicates(array: Array<any>): any {
    return array.filter((value, index) => array.indexOf(value) === index);
    //new Set(array.map((items) => items[fieldname]));
  }
}
