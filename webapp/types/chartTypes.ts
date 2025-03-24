export type ChartComponentData = Record<string, number | string>;

export type ChartComponentDatas = ChartComponentData[];

export type ChartPeriodValue = {
  period: string;
  value1: number;
  value2?: number;
  value3?: number;
};
export type ChartPeriodValues = ChartPeriodValue[];
export type ChartData = {
  currency: string;
  value1Label: string;
  value2Label?: string;
  value3Label?: string;
  values: ChartPeriodValues;
};

export type ValueChangeProps = {
  categoryClicked: string;
  [key: string]: number | string;
};

export type ValueChange = ValueChangeProps | null | undefined;

export type MarkerValue = { country: string; value: number; valueChar: string };
export type MarkerValues = MarkerValue[];
