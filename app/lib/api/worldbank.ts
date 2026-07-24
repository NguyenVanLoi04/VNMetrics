import { IndicatorData, WorldBankDataPoint, MultiCountryDataPoint } from './types';
import { INDICATORS, ASEAN_COUNTRIES } from '../constants';

const BASE_URL = 'https://api.worldbank.org/v2';

export async function fetchWorldBankIndicator(
  countryCode: string = 'VNM',
  indicatorCode: string,
  perPage: number = 30
): Promise<WorldBankDataPoint[]> {
  try {
    const url = `${BASE_URL}/country/${countryCode}/indicator/${indicatorCode}?format=json&per_page=${perPage}`;
    const res = await fetch(url, {
      next: { revalidate: 86400 }, // Cache ISR 24h
    });

    if (!res.ok) {
      console.warn(`World Bank fetch returned non-ok status ${res.status} for ${indicatorCode}`);
      return [];
    }

    const data = await res.json();
    if (!data || !data[1]) return [];

    const rawList = data[1] as Array<{ date: string; value: number | null }>;
    return rawList
      .map((item) => ({
        year: item.date,
        value: item.value,
      }))
      .reverse(); // Thứ tự thời gian từ quá khứ đến hiện tại
  } catch (error) {
    console.error(`Error fetching World Bank indicator ${indicatorCode}:`, error);
    return [];
  }
}

export async function fetchASEANComparison(
  indicatorCode: string
): Promise<MultiCountryDataPoint[]> {
  try {
    // World Bank REST API v2 requires individual country queries or multi-country formatted queries
    // Fetch individual countries in parallel to guarantee high reliability & bypass query limits
    const results = await Promise.all(
      ASEAN_COUNTRIES.map(async (c) => {
        try {
          const url = `${BASE_URL}/country/${c.code}/indicator/${indicatorCode}?format=json&per_page=1`;
          const res = await fetch(url, { next: { revalidate: 86400 } });
          if (!res.ok) return null;
          const data = await res.json();
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

    const validData = results.filter((item): item is MultiCountryDataPoint => item !== null && item.value !== null);
    if (validData.length > 0) {
      return validData.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
    }

    return [];
  } catch (error) {
    console.error(`Error fetching ASEAN comparison for ${indicatorCode}:`, error);
    return [];
  }
}
