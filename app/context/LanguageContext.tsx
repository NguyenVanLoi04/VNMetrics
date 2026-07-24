'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'vi' | 'en';

interface ILanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  vi: {
    // Header
    'nav.overview': 'Tổng Quan',
    'nav.economy': 'Kinh Tế',
    'nav.exports': 'Xuất Khẩu',
    'nav.agriculture': 'Nông Nghiệp',
    'nav.energy': 'Năng Lượng',
    'nav.airQuality': 'Không Khí',
    'nav.population': 'Dân Số',
    'app.title': 'VNMetrics - Open Data Dashboard',
    'app.subtitle': 'Trực quan hóa dữ liệu kinh tế - xã hội & môi trường Việt Nam',

    // Overview Section
    'overview.title': 'Tổng Quan Chỉ Số Quốc Gia',
    'overview.desc': 'Các dữ liệu vĩ mô và chỉ số phát triển chính yếu của Việt Nam',
    'stat.population': 'Dân Số',
    'stat.gdp': 'Tổng Sản Phẩm Quốc Nội (GDP)',
    'stat.lifeExpectancy': 'Tuổi Thọ Trung Bình',
    'stat.gdpPerCapita': 'GDP Bình Quân Đầu Người',
    'stat.unit.people': 'người',
    'stat.unit.years': 'tuổi',

    // Map
    'map.title': 'Bản Đồ Tương Tác Việt Nam',
    'map.subtitle': 'Nhấp hoặc di chuột qua vùng địa lý để xem thông tin',

    // Economy Section
    'economy.title': 'Kinh Tế & Thương Mại',
    'economy.desc': 'Tăng trưởng GDP, bình quân đầu người và cán cân thương mại trong 20 năm qua',
    'chart.gdpTrend': 'Tăng Trưởng GDP Việt Nam (US$)',
    'chart.aseanGdp': 'So Sánh GDP Đầu Người ASEAN (US$)',
    'chart.tradePct': 'Tỷ Lệ Thương Mại / GDP (%)',

    // Agriculture Section
    'agri.title': 'Nông Nghiệp & Nông Sản Xuất Khẩu',
    'agri.desc': 'Vị thế nông sản Việt Nam trên bản đồ thế giới & Tỷ trọng Nông nghiệp trong GDP',
    'chart.agriExports': 'Kim Ngạch Xuất Khẩu Nông Sản Chủ Lực (Tỷ USD)',
    'chart.agriGdpTrend': 'Tỷ Trọng Nông Nghiệp Trong GDP (% GDP)',

    // Agriculture & Exports Section
    'exports.title': 'Cơ Cấu Thương Mại & Xuất Khẩu',
    'exports.desc': 'Cơ cấu các mặt hàng xuất khẩu hàng đầu và tỷ lệ xuất nhập khẩu Việt Nam',
    'chart.topExports': 'Top 5 Mặt Hàng Xuất Khẩu Hàng Đầu (Tỷ USD)',
    'chart.exportsVsImports': 'Tỷ Lệ Xuất Khẩu vs Nhập Khẩu (% GDP)',

    // Energy & Environment Section
    'energy.title': 'Năng Lượng & Chuyển Đổi Xanh',
    'energy.desc': 'Cơ cấu nguồn điện quốc gia và xu hướng phát triển Năng lượng Tái tạo (Gió & Mặt trời)',
    'chart.energyMix': 'Cơ Cấu Nguồn Điện Việt Nam (%)',
    'chart.urbanization': 'Tỷ Lệ Đô Thị Hóa (% Dân Số)',

    // Air Quality Section
    'air.title': 'Chất Lượng Không Khí (AQI)',
    'air.desc': 'Chỉ số AQI theo thời gian thực tại các đô thị trọng điểm',
    'air.status.good': 'Tốt',
    'air.status.moderate': 'Trung Bình',
    'air.status.unhealthy': 'Kém/Xấu',
    'air.city': 'Thành Phố',

    // Population Section
    'pop.title': 'Dân Số, Giáo Dục & Công Nghệ',
    'pop.desc': 'Tỉ lệ biết chữ, phổ cập giáo dục và sự bùng nổ người dùng Internet',
    'chart.popGrowth': 'Xu Hướng Dân Số (30 Năm)',
    'chart.internetUsers': 'Tỷ Lệ Người Dùng Internet (% Dân Số)',
    'chart.literacy': 'Tỷ Lệ Biết Chữ Nữ & Nam (%)',

    // Footer
    'footer.datasource': 'Nguồn Dữ Liệu: World Bank Open Data v2 & WAQI / OpenAQ',
    'footer.credit': 'Phát triển bởi Antigravity AI Team — 2026',
  },
  en: {
    // Header
    'nav.overview': 'Overview',
    'nav.economy': 'Economy',
    'nav.exports': 'Exports',
    'nav.agriculture': 'Agriculture',
    'nav.energy': 'Energy & Eco',
    'nav.airQuality': 'Air Quality',
    'nav.population': 'Demographics',
    'app.title': 'VNMetrics - Open Data Dashboard',
    'app.subtitle': 'Interactive visualization of Vietnam socio-economic & environmental metrics',

    // Overview Section
    'overview.title': 'National Macro Overview',
    'overview.desc': 'Key macroeconomic indicators and development statistics of Vietnam',
    'stat.population': 'Total Population',
    'stat.gdp': 'Gross Domestic Product (GDP)',
    'stat.lifeExpectancy': 'Life Expectancy',
    'stat.gdpPerCapita': 'GDP Per Capita',
    'stat.unit.people': 'people',
    'stat.unit.years': 'years',

    // Map
    'map.title': 'Interactive Map of Vietnam',
    'map.subtitle': 'Hover or click regions for details',

    // Economy Section
    'economy.title': 'Economy & Trade',
    'economy.desc': '20-year trends of GDP, per-capita income, and trade openness',
    'chart.gdpTrend': 'Vietnam GDP Growth (US$)',
    'chart.aseanGdp': 'ASEAN GDP Per Capita Comparison (US$)',
    'chart.tradePct': 'Trade Openness (% of GDP)',

    // Agriculture Section
    'agri.title': 'Agriculture & Key Produce Exports',
    'agri.desc': 'Global standing of Vietnam agricultural products & Agriculture value-added share of GDP',
    'chart.agriExports': 'Key Agri-produce Export Volume ($ Billion)',
    'chart.agriGdpTrend': 'Agriculture Value Added (% of GDP)',

    // Agriculture & Exports Section
    'exports.title': 'Trade & Export Structure',
    'exports.desc': 'Top export commodities and trade volume of Vietnam',
    'chart.topExports': 'Top 5 Key Export Sectors (Billion USD)',
    'chart.exportsVsImports': 'Exports vs Imports (% of GDP)',

    // Energy & Environment Section
    'energy.title': 'Energy Mix & Green Transition',
    'energy.desc': 'National power generation mix & renewable energy capacity growth',
    'chart.energyMix': 'Vietnam Power Generation Mix (%)',
    'chart.urbanization': 'Urbanization Rate (% Population)',

    // Air Quality Section
    'air.title': 'Air Quality Index (AQI)',
    'air.desc': 'Real-time AQI monitoring across major urban hubs',
    'air.status.good': 'Good',
    'air.status.moderate': 'Moderate',
    'air.status.unhealthy': 'Unhealthy',
    'air.city': 'City',

    // Population Section
    'pop.title': 'Demographics & Digital Society',
    'pop.desc': 'Literacy rates, educational trends, and internet adoption surge',
    'chart.popGrowth': 'Population Trend (30-Year)',
    'chart.internetUsers': 'Internet Users (% Population)',
    'chart.literacy': 'Literacy Rate (%)',

    // Footer
    'footer.datasource': 'Data Sources: World Bank Open Data v2 & WAQI / OpenAQ',
    'footer.credit': 'Built by Antigravity AI Team — 2026',
  },
};

const LanguageContext = createContext<ILanguageContextType>({
  lang: 'vi',
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('vi');

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['vi']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
