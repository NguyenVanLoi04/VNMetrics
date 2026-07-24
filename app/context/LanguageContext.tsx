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
    // Export Data
    'export.csv': 'Xuất CSV',
    'export.tooltip': 'Tải dữ liệu biểu đồ dạng file Excel CSV',

    // Header & Nav
    'nav.overview': 'Tổng Quan',
    'nav.economy': 'Kinh Tế',
    'nav.exports': 'Xuất Khẩu',
    'nav.agriculture': 'Nông Nghiệp',
    'nav.energy': 'Năng Lượng',
    'nav.airQuality': 'Không Khí',
    'nav.population': 'Dân Số',
    'app.title': 'VNMetrics - Open Data Dashboard',
    'app.subtitle': 'Trực quan hóa dữ liệu kinh tế - xã hội & môi trường Việt Nam',

    // Highlights Slider
    'slider.sectionTitle': 'Tiêu Điểm & Thành Tựu Nổi Bật',
    'slider.liveHighlights': 'Cập nhật 2026',
    'slider.viewSectionDetails': 'Xem chi tiết mục này',
    'slider.slide1.tag': 'Kinh Tế Vĩ Mô & Quy Mô GDP',
    'slider.slide1.title': 'Việt Nam lọt Top 35+ nền kinh tế lớn nhất thế giới về quy mô GDP',
    'slider.slide1.metric': '$430.2B',
    'slider.slide1.metricLabel': 'Tổng GDP Quốc Gia (USD)',
    'slider.slide1.desc': 'Tăng trưởng GDP duy trì đà bứt phá ấn tượng trong 20 năm qua, đưa thu nhập bình quân đầu người vượt mốc 4.300 USD/năm.',
    'slider.slide2.tag': 'Cường Quốc Nông Sản Xuất Khẩu',
    'slider.slide2.title': 'Vị thế hàng đầu thế giới về Hạt điều, Hạt tiêu, Gạo & Cà phê Robusta',
    'slider.slide2.metric': '~$54B',
    'slider.slide2.metricLabel': 'Kim Ngạch Nông Lâm Thủy Sản',
    'slider.slide2.desc': 'Chiếm giữ vị trí #1 thế giới về Hạt điều & Hạt tiêu, #2 thế giới về Gạo & Cà phê, khẳng định an ninh lương thực toàn cầu.',
    'slider.slide3.tag': 'Chuyển Đổi Năng Lượng Xanh',
    'slider.slide3.title': 'Tiên phong phát triển Điện Mặt Trời & Điện Gió hàng đầu khu vực ASEAN',
    'slider.slide3.metric': '~15%',
    'slider.slide3.metricLabel': 'Tỷ Trọng Năng Lượng Tái Tạo',
    'slider.slide3.desc': 'Đạt tốc độ tăng trưởng điện năng lượng tái tạo nhanh nhất khu vực, hướng tới mục tiêu phát thải ròng bằng 0 (Net Zero 2050).',
    'slider.slide4.tag': 'Xã Hội Số & Công Nghệ',
    'slider.slide4.title': 'Bùng nổ người dùng Internet & Phủ sóng hạ tầng viễn thông 5G',
    'slider.slide4.metric': '82.5%',
    'slider.slide4.metricLabel': 'Tỷ Lệ Người Dùng Internet',
    'slider.slide4.desc': 'Hơn 82% dân số tiếp cận Internet thường xuyên, thúc đẩy chuyển đổi số quốc gia và thương mại điện tử phát triển thần tốc.',

    // Hero Banner
    'hero.badge': 'Realtime Macro Data & Insights 2026',
    'hero.title1': 'Khám Phá Dữ Liệu',
    'hero.title2': 'Kinh Tế & Môi Trường Việt Nam',
    'hero.desc': 'Bảng điều khiển trực quan hóa dữ liệu công khai từ World Bank Open Data & OpenAQ. Theo dõi GDP, Năng lượng tái tạo, Chất lượng không khí và Dân số theo thời gian thực.',
    'hero.btnExplore': 'Khám Phá Chỉ Số',
    'hero.btnExportEnergy': 'Xem Xuất Khẩu & Năng Lượng',
    'hero.verifiedSource': 'Nguồn dữ liệu xác thực',
    'hero.autoUpdate': 'Cập nhật tự động ISR 24h',

    // StatCard
    'stat.vsPrevious': 'so với kỳ trước',

    // Map
    'map.title': 'Bản Đồ Tương Tác Việt Nam',
    'map.subtitle': 'Nhấp hoặc di chuột qua vùng địa lý để xem thông tin',
    'map.loading': 'Đang tải bản đồ tương tác...',
    'map.popLabel': 'Dân số',
    'map.role.hanoi': 'Thủ Đô',
    'map.role.hcm': 'Trung Tâm Kinh Tế',
    'map.role.danang': 'Đô Thị Biển',
    'map.role.haiphong': 'Cảng Biển Lớn',
    'map.role.cantho': 'Miền Tây Nam Bộ',

    // Economy Section
    'economy.title': 'Kinh Tế & Thương Mại',
    'economy.desc': 'Tăng trưởng GDP, bình quân đầu người và cán cân thương mại trong 20 năm qua',
    'chart.gdpTrend': 'Tăng Trưởng GDP Việt Nam (US$)',
    'chart.aseanGdp': 'So Sánh GDP Đầu Người ASEAN (US$)',
    'chart.tradePct': 'Tỷ Lệ Thương Mại / GDP (%)',
    'economy.tooltip.billionUSD': 'Tỷ USD',
    'economy.tooltip.gdpPerCapita': 'GDP/Đầu Người',

    // Agriculture Section
    'agri.title': 'Nông Nghiệp & Nông Sản Xuất Khẩu',
    'agri.desc': 'Vị thế nông sản Việt Nam trên bản đồ thế giới & Tỷ trọng Nông nghiệp trong GDP',
    'chart.agriExports': 'Kim Ngạch Xuất Khẩu Nông Sản Chủ Lực (Tỷ USD)',
    'chart.agriGdpTrend': 'Tỷ Trọng Nông Nghiệp Trong GDP (% GDP)',
    'agri.badge.cashewPepper': 'Hạt Điều & Hạt Tiêu',
    'agri.badge.cashewPepperRank': '#1 Thế Giới',
    'agri.badge.coffeeRice': 'Cà Phê & Gạo',
    'agri.badge.coffeeRiceRank': '#2 Thế Giới',
    'agri.badge.seafood': 'Thủy Sản (Tôm, Cá)',
    'agri.badge.seafoodRank': 'Top 3 Thế Giới',
    'agri.badge.totalTurnover': 'Tổng Kim Ngạch',
    'agri.badge.totalTurnoverVal': '~$54 Tỷ USD',
    'agri.tooltip.turnover': 'Kim Ngạch',
    'agri.tooltip.gdpPct': 'Tỷ trọng trong GDP',

    // Agriculture Product Translation
    'agri.prod.wood': 'Gỗ & Lâm sản',
    'agri.prod.seafood': 'Thủy sản (Tôm, Cá tra)',
    'agri.prod.fruits': 'Rau quả & Sầu riêng',
    'agri.prod.coffee': 'Cà phê (Robusta)',
    'agri.prod.rice': 'Gạo (Rice)',
    'agri.prod.cashew': 'Hạt điều (Cashew)',
    'agri.prod.pepper': 'Hạt tiêu (Pepper)',
    'agri.rank.top5': 'Top 5 Thế giới',
    'agri.rank.top3': 'Top 3 Thế giới',
    'agri.rank.topGrowth': 'Top Tăng Trưởng',
    'agri.rank.rank2': '#2 Thế giới',
    'agri.rank.rank1': '#1 Thế giới',

    // Exports Section
    'exports.title': 'Cơ Cấu Thương Mại & Xuất Khẩu',
    'exports.desc': 'Cơ cấu các mặt hàng xuất khẩu hàng đầu và tỷ lệ xuất nhập khẩu Việt Nam',
    'chart.topExports': 'Top 5 Mặt Hàng Xuất Khẩu Hàng Đầu (Tỷ USD)',
    'chart.exportsVsImports': 'Tỷ Lệ Xuất Khẩu vs Nhập Khẩu (% GDP)',
    'exports.tooltip.turnover': 'Kim Ngạch',
    'exports.tooltip.exportsVsGdp': 'Xuất Khẩu / GDP',
    'exports.cat.phone': 'Điện thoại & Linh kiện',
    'exports.cat.computer': 'Máy tính & Sản phẩm điện tử',
    'exports.cat.machinery': 'Máy móc & Thiết bị phụ tùng',
    'exports.cat.textile': 'Dệt may & Giày dép',
    'exports.cat.agri': 'Nông lâm thủy sản',

    // Energy Section
    'energy.title': 'Năng Lượng & Chuyển Đổi Xanh',
    'energy.desc': 'Cơ cấu nguồn điện quốc gia và xu hướng phát triển Năng lượng Tái tạo (Gió & Mặt trời)',
    'chart.energyMix': 'Cơ Cấu Nguồn Điện Việt Nam (%)',
    'chart.urbanization': 'Tỷ Lệ Đô Thị Hóa (% Dân Số)',
    'energy.tooltip.share': 'Tỷ trọng',
    'energy.tooltip.urbanRate': 'Tỷ lệ Đô thị hóa',
    'energy.source.hydro': 'Thủy điện',
    'energy.source.coal': 'Nhiệt điện Than',
    'energy.source.gas': 'Nhiệt điện Khí',
    'energy.source.solarWind': 'Năng lượng Mặt trời & Gió',
    'energy.source.imports': 'Nhập khẩu & Khác',

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
    'pop.tooltip.population': 'Dân Số',
    'pop.unit.million': 'Triệu Người',
    'pop.tooltip.internetRate': 'Tỷ lệ người dùng Internet',

    // Footer
    'footer.datasource': 'Nguồn Dữ Liệu: World Bank Open Data v2 & WAQI / OpenAQ',
    'footer.credit': 'Phát triển bởi NguyenVanLoi — 2026',
    'footer.notesTitle': 'Chú Thích & Nguồn Dữ Liệu',
    'footer.noteWbTitle': 'Dữ Liệu Vĩ Mô & Kinh Tế',
    'footer.noteWbDesc': 'Các chỉ số GDP, Dân số, Tuổi thọ và Thương mại được truy xuất trực tiếp từ World Bank Open Data API v2.',
    'footer.noteAqiTitle': 'Chất Lượng Không Khí (AQI)',
    'footer.noteAqiDesc': 'Chỉ số không khí & hạt bụi PM2.5 cập nhật theo thời gian thực từ trạm quan trắc công khai WAQI / OpenAQ.',
    'footer.noteMapTitle': 'Bản Đồ Địa Lý',
    'footer.noteMapDesc': 'Bản đồ ranh giới 63 tỉnh thành Việt Nam được chuẩn hóa từ dữ liệu địa lý GeoJSON.',
    'footer.disclaimer': 'Ghi chú: Toàn bộ dữ liệu trên bảng điều khiển được truy xuất tự động từ các public Open API phục vụ mục đích tham khảo & phát triển cộng đồng.',
  },
  en: {
    // Export Data
    'export.csv': 'Export CSV',
    'export.tooltip': 'Download chart dataset as Excel CSV file',

    // Highlights Slider
    'slider.sectionTitle': 'Key Highlights & Milestones',
    'slider.liveHighlights': 'Live Insights 2026',
    'slider.viewSectionDetails': 'View Section Metrics',
    'slider.slide1.tag': 'Macro Economy & GDP Rank',
    'slider.slide1.title': 'Vietnam enters Top 35+ largest global economies by GDP size',
    'slider.slide1.metric': '$430.2B',
    'slider.slide1.metricLabel': 'National Gross Domestic Product',
    'slider.slide1.desc': 'GDP growth maintains impressive momentum over 20 years, bringing per-capita income past $4,300/year.',
    'slider.slide2.tag': 'Agricultural Export Powerhouse',
    'slider.slide2.title': 'Global leading position in Cashews, Pepper, Rice & Robusta Coffee',
    'slider.slide2.metric': '~$54B',
    'slider.slide2.metricLabel': 'Agri-Forestry-Fishery Exports',
    'slider.slide2.desc': 'Holds #1 worldwide rank in Cashews & Pepper, #2 in Rice & Coffee, guaranteeing global food security.',
    'slider.slide3.tag': 'Green Energy Transition',
    'slider.slide3.title': 'Regional ASEAN pioneer in Solar & Wind power expansion',
    'slider.slide3.metric': '~15%',
    'slider.slide3.metricLabel': 'Renewables Share of Power Mix',
    'slider.slide3.desc': 'Fastest renewable capacity expansion rate in SE Asia, heading towards Net Zero 2050 commitment.',
    'slider.slide4.tag': 'Digital Society & Connectivity',
    'slider.slide4.title': 'Explosive internet adoption surge & 5G infrastructure rollout',
    'slider.slide4.metric': '82.5%',
    'slider.slide4.metricLabel': 'Internet User Penetration',
    'slider.slide4.desc': 'Over 82% of the population uses the internet regularly, accelerating national digital transformation.',

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

    // Hero Banner
    'hero.badge': 'Realtime Macro Data & Insights 2026',
    'hero.title1': 'Explore Data on',
    'hero.title2': 'Vietnam Economy & Environment',
    'hero.desc': 'Interactive visualization dashboard of public data from World Bank Open Data & OpenAQ. Track real-time GDP, Renewable Energy, Air Quality, and Demographics.',
    'hero.btnExplore': 'Explore Metrics',
    'hero.btnExportEnergy': 'View Trade & Energy',
    'hero.verifiedSource': 'Verified Data Sources',
    'hero.autoUpdate': 'Automated 24h ISR Sync',

    // StatCard
    'stat.vsPrevious': 'vs previous period',

    // Map
    'map.title': 'Interactive Map of Vietnam',
    'map.subtitle': 'Hover or click regions for details',
    'map.loading': 'Loading interactive map...',
    'map.popLabel': 'Population',
    'map.role.hanoi': 'Capital City',
    'map.role.hcm': 'Economic Hub',
    'map.role.danang': 'Coastal Metropolis',
    'map.role.haiphong': 'Major Seaport',
    'map.role.cantho': 'Mekong Delta Hub',

    // Overview Section
    'overview.title': 'National Macro Overview',
    'overview.desc': 'Key macroeconomic indicators and development statistics of Vietnam',
    'stat.population': 'Total Population',
    'stat.gdp': 'Gross Domestic Product (GDP)',
    'stat.lifeExpectancy': 'Life Expectancy',
    'stat.gdpPerCapita': 'GDP Per Capita',
    'stat.unit.people': 'people',
    'stat.unit.years': 'years',

    // Economy Section
    'economy.title': 'Economy & Trade',
    'economy.desc': '20-year trends of GDP, per-capita income, and trade openness',
    'chart.gdpTrend': 'Vietnam GDP Growth (US$)',
    'chart.aseanGdp': 'ASEAN GDP Per Capita Comparison (US$)',
    'chart.tradePct': 'Trade Openness (% of GDP)',
    'economy.tooltip.billionUSD': 'Billion USD',
    'economy.tooltip.gdpPerCapita': 'GDP/Capita',

    // Agriculture Section
    'agri.title': 'Agriculture & Key Produce Exports',
    'agri.desc': 'Global standing of Vietnam agricultural products & Agriculture value-added share of GDP',
    'chart.agriExports': 'Key Agri-produce Export Volume ($ Billion)',
    'chart.agriGdpTrend': 'Agriculture Value Added (% of GDP)',
    'agri.badge.cashewPepper': 'Cashew & Pepper',
    'agri.badge.cashewPepperRank': '#1 Worldwide',
    'agri.badge.coffeeRice': 'Coffee & Rice',
    'agri.badge.coffeeRiceRank': '#2 Worldwide',
    'agri.badge.seafood': 'Seafood (Shrimp, Pangasius)',
    'agri.badge.seafoodRank': 'Top 3 Worldwide',
    'agri.badge.totalTurnover': 'Total Agri Exports',
    'agri.badge.totalTurnoverVal': '~$54 Billion USD',
    'agri.tooltip.turnover': 'Export Value',
    'agri.tooltip.gdpPct': 'Share of GDP',

    // Agriculture Product Translation
    'agri.prod.wood': 'Timber & Forestry',
    'agri.prod.seafood': 'Seafood (Shrimp, Pangasius)',
    'agri.prod.fruits': 'Fruits & Durian',
    'agri.prod.coffee': 'Coffee (Robusta)',
    'agri.prod.rice': 'Rice',
    'agri.prod.cashew': 'Cashew Nuts',
    'agri.prod.pepper': 'Black Pepper',
    'agri.rank.top5': 'Top 5 Worldwide',
    'agri.rank.top3': 'Top 3 Worldwide',
    'agri.rank.topGrowth': 'Top Growth Sector',
    'agri.rank.rank2': '#2 Worldwide',
    'agri.rank.rank1': '#1 Worldwide',

    // Exports Section
    'exports.title': 'Trade & Export Structure',
    'exports.desc': 'Top export commodities and trade volume of Vietnam',
    'chart.topExports': 'Top 5 Key Export Sectors (Billion USD)',
    'chart.exportsVsImports': 'Exports vs Imports (% of GDP)',
    'exports.tooltip.turnover': 'Export Volume',
    'exports.tooltip.exportsVsGdp': 'Exports / GDP',
    'exports.cat.phone': 'Phones & Components',
    'exports.cat.computer': 'Electronics & Computers',
    'exports.cat.machinery': 'Machinery & Equipment',
    'exports.cat.textile': 'Textiles & Footwear',
    'exports.cat.agri': 'Agri-Forestry-Fishery',

    // Energy Section
    'energy.title': 'Energy Mix & Green Transition',
    'energy.desc': 'National power generation mix & renewable energy capacity growth',
    'chart.energyMix': 'Vietnam Power Generation Mix (%)',
    'chart.urbanization': 'Urbanization Rate (% Population)',
    'energy.tooltip.share': 'Share',
    'energy.tooltip.urbanRate': 'Urbanization Rate',
    'energy.source.hydro': 'Hydropower',
    'energy.source.coal': 'Coal Thermal Power',
    'energy.source.gas': 'Gas Thermal Power',
    'energy.source.solarWind': 'Solar & Wind Energy',
    'energy.source.imports': 'Imports & Others',

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
    'pop.tooltip.population': 'Population',
    'pop.unit.million': 'Million People',
    'pop.tooltip.internetRate': 'Internet User Share',

    // Footer
    'footer.datasource': 'Data Sources: World Bank Open Data v2 & WAQI / OpenAQ',
    'footer.credit': 'Built by NguyenVanLoi — 2026',
    'footer.notesTitle': 'Notes & Data Sources',
    'footer.noteWbTitle': 'Macro & Economy Data',
    'footer.noteWbDesc': 'GDP, Population, Life Expectancy, and Trade indicators are directly fetched from World Bank Open Data API v2.',
    'footer.noteAqiTitle': 'Air Quality Index (AQI)',
    'footer.noteAqiDesc': 'Real-time AQI & PM2.5 readings are gathered from public WAQI / OpenAQ monitoring stations.',
    'footer.noteMapTitle': 'Geographic Map',
    'footer.noteMapDesc': 'Vietnam 63-province boundaries are visualized from open GeoJSON spatial datasets.',
    'footer.disclaimer': 'Disclaimer: All dashboard metrics are automatically retrieved from open public APIs for research & community reference purposes.',
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
