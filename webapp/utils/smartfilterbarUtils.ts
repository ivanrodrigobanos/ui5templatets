/* eslint-disable eqeqeq */
import SmartFilterBar from "sap/ui/comp/smartfilterbar/SmartFilterBar";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import DateFormat from "./dateFormat";

export default class SmartfilterbarUtils {
  private sfb: SmartFilterBar;
  constructor(smartfilterbar: SmartFilterBar) {
    this.sfb = smartfilterbar;
  }
  /**
   * Convierte los filtros de la smartfilterbar a un array de objetos Filter para poder ser usado en servicios
   * @returns
   */
  public convertFilterData2FilterObject() {
    let filters: Filter[] = [];
    let filterData = this.sfb.getFilterData() as Record<any, any>;
    Object.keys(filterData).forEach((key: string) => {
      filters = filters.concat(this.convertFilterKey2FilterObject(key));
    });

    return filters;
  }
  /**
   * Convierte un filtro de la smartfilterbar en objeto de tipo filtro
   * @param filterKey
   * @returns
   */
  private convertFilterKey2FilterObject(filterKey: string): Filter[] {
    let filters: Filter[] = [];
    let filterData = this.sfb.getFilterData() as any;
    let filterRow = filterData[filterKey];
    if (!filterRow) return [];

    if (filterRow.low && filterRow.high) {
      filters.push(
        new Filter(
          filterKey,
          FilterOperator.BT,
          this.convertValue(filterKey, filterRow.low),
          this.convertValue(filterKey, filterRow.high)
        )
      );
    } else if (filterRow.items && filterRow.items.length > 0) {
      filters = filters.concat(
        this.convertItems2FilterObject(filterKey, filterRow.items)
      );
    } else if (filterRow.ranges && filterRow.ranges.length > 0) {
      filters = filters.concat(
        this.convertRanges2FilterObject(filterKey, filterRow.ranges)
      );
    } else {
      filters.push(
        new Filter(
          filterKey,
          FilterOperator.EQ,
          this.convertValue(filterKey, filterRow)
        )
      );
    }

    return filters;
  }
  /**
   * Pasa los datos del array items del filterdata en un objeto de tipo de filtro
   * @param filterRow
   */
  private convertItems2FilterObject(
    filterKey: string,
    filterItems: any
  ): Filter[] {
    let filters: Filter[] = [];
    if (!filterItems) return [];
    filterItems.forEach((row: any) => {
      let value1 = "";
      let operator = FilterOperator.EQ;
      let value2 = "";
      // if (row.key) value1 = `'${row.key}'`;
      if (row.key) value1 = row.key;

      filters.push(new Filter(filterKey, operator, value1, value2));
    });

    return filters;
  }
  private convertValue(filterKey: string, value: any): Date | string {
    if (this.isDateField(filterKey))
      return DateFormat.convertUTCDateToLocalDate(new Date(value as string));
    else return value as string;
  }

  /**
   * Devuelve si un campo es fecha
   * @param filterKey
   */
  public isDateField(filterKey: string): boolean {
    let modelData = this.sfb.getModelData();
    if (modelData[filterKey].low && modelData[filterKey].low instanceof Date)
      return true;
    if (modelData[filterKey] && modelData[filterKey] instanceof Date)
      return true;

    return false;
  }
  /**
   * Pasa los datos del array ranges del filterdata en un objeto de tipo de filtro
   * @param filterRow
   */
  private convertRanges2FilterObject(
    filterKey: string,
    filterRanges: any
  ): Filter[] {
    let filters: Filter[] = [];
    if (!filterRanges) return [];
    filterRanges.forEach((row: any) => {
      let value1 = row.value1;
      let operator = row.operation;
      let value2 = row.value2 ?? "";
      if (row.key) value1 = row.key;
      if (row.exclude) {
        if (row.operation == "Contains") operator = FilterOperator.NotContains;
        else if (row.operation == "BT") operator = FilterOperator.NB;
        else if (row.operation == "EQ") operator = FilterOperator.NE;
        else if (row.operation == "StartsWith")
          operator = FilterOperator.NotStartsWith;
        else if (row.operation == "EndsWith")
          operator = FilterOperator.NotEndsWith;
        else if (row.operation == "LT") operator = FilterOperator.GE;
        else if (row.operation == "GT") operator = FilterOperator.LE;
        else if (row.operation == "LE") operator = FilterOperator.GT;
        else if (row.operation == "GE") operator = FilterOperator.LT;
      }
      filters.push(
        new Filter(filterKey, operator as FilterOperator, value1, value2)
      );
    });

    return filters;
  }

  /**
   * Pasa los datos recogidos en la sfb a un filtro construido según el operator que tenga
   * @param sfbObject
   *
   */
  public convertObject2CustomFilter(
    filterKey: string,
    sfbObject: any
  ): Filter[] {
    let filters: Filter[] = [];
    if (!sfbObject) return [];
    if (sfbObject.items.length > 0) {
      sfbObject.items.forEach((row: any) => {
        let value1 = row.key;
        // let value2 = "";
        filters.push(new Filter(filterKey, FilterOperator.EQ, value1, ""));
      });
    } else if (sfbObject.ranges.length > 0) {
      sfbObject.ranges.forEach((row: any) => {
        filters = filters.concat(
          this.convertRanges2FilterObject(
            row.keyField as string,
            sfbObject.ranges
          )
        );
      });
    }
    return filters;
  }
}
