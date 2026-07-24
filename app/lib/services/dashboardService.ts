import { worldBankService } from './worldBankService';
import { airQualityService } from './airQualityService';
import { INDICATORS } from '../constants';
import { IWorldBankDataPoint, IMultiCountryDataPoint, IAQIDataPoint } from '../interface';

export interface IDashboardData {
  metrics: {
    populationStr: string;
    gdpStr: string;
    gdpPerCapitaStr: string;
    lifeExpectancyStr: string;
    internetStr: string;
  };
  charts: {
    gdpFormatted: IWorldBankDataPoint[];
    aseanGdpRaw: IMultiCountryDataPoint[];
    agriGdpFormatted: IWorldBankDataPoint[];
    exportsPctFormatted: IWorldBankDataPoint[];
    urbanFormatted: IWorldBankDataPoint[];
    popFormatted: IWorldBankDataPoint[];
    internetFormatted: IWorldBankDataPoint[];
    aqiData: IAQIDataPoint[];
  };
}

/**
 * Service tổng hợp dữ liệu cho Dashboard
 * Thực hiện gọi song song (Promise.all) các API và định dạng chuỗi / biểu đồ
 */
export async function getDashboardData(): Promise<IDashboardData> {
  // 1. Concurrent Server-side Data Fetching
  const [
    gdpRaw,
    gdpPerCapitaRaw,
    lifeExpectancyRaw,
    aseanGdpRaw,
    agriGdpRaw,
    exportsPctRaw,
    urbanRaw,
    popRaw,
    internetRaw,
    aqiData,
  ] = await Promise.all([
    worldBankService.getIndicator('VNM', INDICATORS.GDP),
    worldBankService.getIndicator('VNM', INDICATORS.GDP_PER_CAPITA, 1),
    worldBankService.getIndicator('VNM', INDICATORS.LIFE_EXPECTANCY, 1),
    worldBankService.getASEANComparison(INDICATORS.GDP_PER_CAPITA),
    worldBankService.getIndicator('VNM', INDICATORS.AGRICULTURE_GDP_PCT),
    worldBankService.getIndicator('VNM', INDICATORS.EXPORTS_PCT_GDP),
    worldBankService.getIndicator('VNM', INDICATORS.URBAN_POP_PCT),
    worldBankService.getIndicator('VNM', INDICATORS.POPULATION),
    worldBankService.getIndicator('VNM', INDICATORS.INTERNET_USERS),
    airQualityService.getAirQualityData(),
  ]);

  // 2. Extract latest metric values
  const latestPopObj = popRaw.length ? popRaw[popRaw.length - 1] : null;
  const latestGdpObj = gdpRaw.length ? gdpRaw[gdpRaw.length - 1] : null;
  const latestGdpPerCapitaObj = gdpPerCapitaRaw.length ? gdpPerCapitaRaw[0] : null;
  const latestLifeExpObj = lifeExpectancyRaw.length ? lifeExpectancyRaw[0] : null;
  const latestInternetObj = internetRaw.length ? internetRaw[internetRaw.length - 1] : null;

  // 3. Format single-value metric strings
  const populationStr = latestPopObj?.value ? `${(latestPopObj.value / 1e6).toFixed(1)}M` : '100.3M';
  const gdpStr = latestGdpObj?.value ? `$${(latestGdpObj.value / 1e9).toFixed(1)}B` : '$430.2B';
  const gdpPerCapitaStr = latestGdpPerCapitaObj?.value ? `$${Math.round(latestGdpPerCapitaObj.value).toLocaleString()}` : '$4,347';
  const lifeExpectancyStr = latestLifeExpObj?.value ? `${latestLifeExpObj.value.toFixed(1)}` : '75.4';
  const internetStr = latestInternetObj?.value ? `${latestInternetObj.value.toFixed(1)}%` : '82.5%';

  // 4. Format time-series data for Recharts components
  const formatSeries = (rawList: IWorldBankDataPoint[], divideBy: number = 1, decimal: number = 1) => {
    return rawList
      .map((d) => ({
        year: d.year,
        value: d.value ? Number((d.value / divideBy).toFixed(decimal)) : null,
      }))
      .filter((d) => d.value !== null);
  };

  return {
    metrics: {
      populationStr,
      gdpStr,
      gdpPerCapitaStr,
      lifeExpectancyStr,
      internetStr,
    },
    charts: {
      gdpFormatted: formatSeries(gdpRaw, 1e9),
      aseanGdpRaw,
      agriGdpFormatted: formatSeries(agriGdpRaw),
      exportsPctFormatted: formatSeries(exportsPctRaw),
      urbanFormatted: formatSeries(urbanRaw),
      popFormatted: formatSeries(popRaw, 1e6),
      internetFormatted: formatSeries(internetRaw),
      aqiData,
    },
  };
}
