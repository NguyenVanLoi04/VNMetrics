export interface WorldBankDataPoint {
  year: string;
  value: number | null;
}

export interface IndicatorData {
  indicator: string;
  label: string;
  unit: string;
  data: WorldBankDataPoint[];
  latestValue: number | null;
  latestYear: string | null;
  changeRate: number | null; // percentage change compared to previous year
}

export interface MultiCountryDataPoint {
  country: string;
  countryCode: string;
  value: number | null;
  year: string | null;
}

export interface AQIDataPoint {
  city: string;
  lat: number;
  lng: number;
  aqi: number;
  status: 'Good' | 'Moderate' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  pm25: number;
  pm10: number;
  lastUpdated: string;
}
