import { axiosClient } from '../utils/axios';
import { IWorldBankDataPoint, IMultiCountryDataPoint } from '../interface';
import { ASEAN_COUNTRIES } from '../constants';

const WORLD_BANK_BASE_URL = 'https://api.worldbank.org/v2';

export const worldBankService = {
  async getIndicator(
    countryCode: string = 'VNM',
    indicatorCode: string,
    perPage: number = 30
  ): Promise<IWorldBankDataPoint[]> {
    try {
      const url = `${WORLD_BANK_BASE_URL}/country/${countryCode}/indicator/${indicatorCode}?format=json&per_page=${perPage}`;
      const data = await axiosClient.get<any, any>(url);

      if (!data || !data[1]) return [];

      const rawList = data[1] as Array<{ date: string; value: number | null }>;
      return rawList
        .map((item) => ({
          year: item.date,
          value: item.value,
        }))
        .reverse();
    } catch (error) {
      console.error(`Error in worldBankService.getIndicator (${indicatorCode}):`, error);
      return [];
    }
  },

  async getASEANComparison(indicatorCode: string): Promise<IMultiCountryDataPoint[]> {
    try {
      const results = await Promise.all(
        ASEAN_COUNTRIES.map(async (c) => {
          try {
            const url = `${WORLD_BANK_BASE_URL}/country/${c.code}/indicator/${indicatorCode}?format=json&per_page=1`;
            const data = await axiosClient.get<any, any>(url);
            if (!data || !data[1] || !data[1][0]) return null;
            const item = data[1][0];
            return {
              country: c.name,
              countryCode: c.code,
              value: item.value ? Math.round(item.value) : null,
              year: item.date,
            };
          } catch {
            return null;
          }
        })
      );

      const validData = results.filter(
        (item): item is IMultiCountryDataPoint => item !== null && item.value !== null
      );

      return validData.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
    } catch (error) {
      console.error(`Error in worldBankService.getASEANComparison (${indicatorCode}):`, error);
      return [];
    }
  },
};
