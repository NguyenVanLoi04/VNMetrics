import React from 'react';

// === IMPORT CÁC COMPONENT GIAO DIỆN ===
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { HighlightsSlider } from './components/home/HighlightsSlider';
import { OverviewSection } from './components/overview/OverviewSection';
import { EconomySection } from './components/economy/EconomySection';
import { AgricultureSection } from './components/agriculture/AgricultureSection';
import { ExportsSection } from './components/exports/ExportsSection';
import { EnergySection } from './components/energy/EnergySection';
import { AirQualitySection } from './components/air-quality/AirQualitySection';
import { PopulationSection } from './components/population/PopulationSection';

// === IMPORT CONTEXT VÀ DASHBOARD SERVICE ===
import { LanguageProvider } from './context/LanguageContext';
import { getDashboardData } from './lib/services/dashboardService';

// Cấu hình ISR Cache trang tĩnh 24h trên Server
export const revalidate = 86400;

// SERVER COMPONENT CHÍNH (SSR - Server-Side Rendering)
export default async function Home() {
  // Lấy toàn bộ dữ liệu đã được xử lý từ dashboardService
  const { metrics, charts } = await getDashboardData();

  return (
    <LanguageProvider>
      <div className="min-h-screen font-sans selection:bg-emerald-500 selection:text-white">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-4">
          <HeroBanner />

          <HighlightsSlider
            gdp={metrics.gdpStr}
            internetPct={metrics.internetStr}
          />

          <OverviewSection
            population={metrics.populationStr}
            gdp={metrics.gdpStr}
            gdpPerCapita={metrics.gdpPerCapitaStr}
            lifeExpectancy={metrics.lifeExpectancyStr}
          />

          <EconomySection
            gdpData={charts.gdpFormatted}
            aseanGdpData={charts.aseanGdpRaw}
          />

          <AgricultureSection
            agriGdpData={charts.agriGdpFormatted}
          />

          <ExportsSection
            exportsPctData={charts.exportsPctFormatted}
          />

          <EnergySection
            urbanData={charts.urbanFormatted}
          />

          <AirQualitySection
            aqiList={charts.aqiData}
          />

          <PopulationSection
            popData={charts.popFormatted}
            internetData={charts.internetFormatted}
          />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
