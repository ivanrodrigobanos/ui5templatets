/**
 * Tipos para poder recuperar y pasarle información a una smartfilterbar usando los métodos
 * setFilterData o getFilterData
 */
export type RangeFilter = {
  exclude: boolean;
  keyfield: string;
  operation: string;
  tokenText: string | null;
  value1: string | number;
  value2: string | number;
};
export type RangesFilter = RangeFilter[];

export type ItemFilter = {
  key: string;
  text: string;
};
export type ItemsFilter = ItemFilter[];
export type FieldFilter = {
  items: ItemsFilter;
  ranges: RangesFilter;
};

export type FieldDataFilter = Record<any, FieldFilter>;
