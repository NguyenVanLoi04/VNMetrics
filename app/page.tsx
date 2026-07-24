import React from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { OverviewSection } from './components/overview/OverviewSection';
import { EconomySection } from './components/economy/EconomySection';
import { AgricultureSection } from './components/agriculture/AgricultureSection';
import { ExportsSection } from './components/exports/ExportsSection';
import { EnergySection } from './components/energy/EnergySection';
import { AirQualitySection } from './components/air-quality/AirQualitySection';
import { PopulationSection } from './components/population/PopulationSection';
import { LanguageProvider } from './context/LanguageContext';
import { worldBankService } from './lib/services/worldBankService';
import { airQualityService } from './lib/services/airQualityService';
import { INDICATORS } from './lib/constants';

export const revalidate = 86400; // ISR Cache 24h

export default async function Home() {
  // Concurrent Server-side Data Fetching via World Bank REST API & AQI API
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

  // Dynamic values from live World Bank API calls
  const latestPopObj = popRaw.length ? popRaw[popRaw.length - 1] : null;
  const latestGdpObj = gdpRaw.length ? gdpRaw[gdpRaw.length - 1] : null;
  const latestGdpPerCapitaObj = gdpPerCapitaRaw.length ? gdpPerCapitaRaw[0] : null;
  const latestLifeExpObj = lifeExpectancyRaw.length ? lifeExpectancyRaw[0] : null;

  const populationStr = latestPopObj?.value ? `${(latestPopObj.value / 1e6).toFixed(1)}M` : '100.3M';
  const gdpStr = latestGdpObj?.value ? `$${(latestGdpObj.value / 1e9).toFixed(1)}B` : '$430.2B';
  const gdpPerCapitaStr = latestGdpPerCapitaObj?.value ? `$${Math.round(latestGdpPerCapitaObj.value).toLocaleString()}` : '$4,347';
  const lifeExpectancyStr = latestLifeExpObj?.value ? `${latestLifeExpObj.value.toFixed(1)}` : '75.4';

  // Format data series for chart presentation
  const gdpFormatted = gdpRaw
    .map((d) => ({
      year: d.year,
      value: d.value ? Number((d.value / 1e9).toFixed(1)) : null,
    }))
    .filter((d) => d.value !== null);

  const agriGdpFormatted = agriGdpRaw
    .map((d) => ({
      year: d.year,
      value: d.value ? Number(d.value.toFixed(1)) : null,
    }))
    .filter((d) => d.value !== null);

  const exportsPctFormatted = exportsPctRaw
    .map((d) => ({
      year: d.year,
      value: d.value ? Number(d.value.toFixed(1)) : null,
    }))
    .filter((d) => d.value !== null);

  const urbanFormatted = urbanRaw
    .map((d) => ({
      year: d.year,
      value: d.value ? Number(d.value.toFixed(1)) : null,
    }))
    .filter((d) => d.value !== null);

  const popFormatted = popRaw
    .map((d) => ({
      year: d.year,
      value: d.value ? Number((d.value / 1e6).toFixed(1)) : null,
    }))
    .filter((d) => d.value !== null);

  const internetFormatted = internetRaw
    .map((d) => ({
      year: d.year,
      value: d.value ? Number(d.value.toFixed(1)) : null,
    }))
    .filter((d) => d.value !== null);

  return (
    <LanguageProvider>
      <div className="min-h-screen font-sans selection:bg-emerald-500 selection:text-white">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-4">
          <HeroBanner />
          <OverviewSection
            population={populationStr}
            gdp={gdpStr}
            gdpPerCapita={gdpPerCapitaStr}
            lifeExpectancy={lifeExpectancyStr}
          />
          <EconomySection gdpData={gdpFormatted} aseanGdpData={aseanGdpRaw} />
          <AgricultureSection agriGdpData={agriGdpFormatted} />
          <ExportsSection exportsPctData={exportsPctFormatted} />
          <EnergySection urbanData={urbanFormatted} />
          <AirQualitySection aqiList={aqiData} />
          <PopulationSection popData={popFormatted} internetData={internetFormatted} />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}

