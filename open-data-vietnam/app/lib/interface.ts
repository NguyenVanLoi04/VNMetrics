export interface IWorldBankDataPoint {
  year: string;
  value: number | null;
}

export interface IIndicatorData {
  indicator: string;
  label: string;
  unit: string;
  data: IWorldBankDataPoint[];
  latestValue: number | null;
  latestYear: string | null;
  changeRate: number | null;
}

export interface IMultiCountryDataPoint {
  country: string;
  countryCode: string;
  value: number | null;
  year: string | null;
}

export interface IAQIDataPoint {
  city: string;
  lat: number;
  lng: number;
  aqi: number;
  status: AQIStatusEnum;
  pm25: number;
  pm10: number;
  lastUpdated: string;
}

export interface IExportCategory {
  category: string;
  valueBillionUSD: number;
  sharePct: number;
}

export interface IEnergyMixItem {
  source: string;
  pct: number;
  fill: string;
}

export enum AQIStatusEnum {
  GOOD = 'Good',
  MODERATE = 'Moderate',
  UNHEALTHY = 'Unhealthy',
  VERY_UNHEALTHY = 'Very Unhealthy',
  HAZARDOUS = 'Hazardous',
}
