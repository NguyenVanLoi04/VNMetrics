export const INDICATORS = {
  GDP: 'NY.GDP.MKTP.CD',
  GDP_PER_CAPITA: 'NY.GDP.PCAP.CD',
  POPULATION: 'SP.POP.TOTL',
  POPULATION_GROWTH: 'SP.POP.GROW',
  LIFE_EXPECTANCY: 'SP.DYN.LE00.IN',
  LITERACY_RATE: 'SE.ADT.LITR.ZS',
  SCHOOL_ENROLLMENT: 'SE.PRM.ENRR',
  UNEMPLOYMENT: 'SL.UEM.TOTL.ZS',
  INFLATION: 'FP.CPI.TOTL.ZG',
  TRADE_PCT_GDP: 'NE.TRD.GNFS.ZS',
  EXPORTS_PCT_GDP: 'NE.EXP.GNFS.ZS',
  IMPORTS_PCT_GDP: 'NE.IMP.GNFS.ZS',
  RENEWABLE_ENERGY_PCT: 'EG.FEC.RNEW.ZS',
  URBAN_POP_PCT: 'SP.URB.TOTL.IN.ZS',
  INTERNET_USERS: 'IT.NET.USER.ZS',
  CO2_EMISSIONS: 'EN.ATM.CO2E.PC',
  AGRICULTURE_GDP_PCT: 'NV.AGR.TOTL.ZS',
} as const;

export const ASEAN_COUNTRIES = [
  { code: 'VNM', name: 'Việt Nam', nameEn: 'Vietnam', flag: '🇻🇳' },
  { code: 'THA', name: 'Thái Lan', nameEn: 'Thailand', flag: '🇹🇭' },
  { code: 'IDN', name: 'Indonesia', nameEn: 'Indonesia', flag: '🇮🇩' },
  { code: 'MYS', name: 'Malaysia', nameEn: 'Malaysia', flag: '🇲🇾' },
  { code: 'PHL', name: 'Philippines', nameEn: 'Philippines', flag: '🇵🇭' },
  { code: 'SGP', name: 'Singapore', nameEn: 'Singapore', flag: '🇸🇬' },
];

export const VIETNAM_TOP_EXPORTS = [
  { category: 'Điện thoại & Linh kiện', categoryKey: 'phone', valueBillionUSD: 52.4, sharePct: 14.5 },
  { category: 'Máy tính & Sản phẩm điện tử', categoryKey: 'computer', valueBillionUSD: 57.3, sharePct: 15.8 },
  { category: 'Máy móc & Thiết bị phụ tùng', categoryKey: 'machinery', valueBillionUSD: 41.5, sharePct: 11.5 },
  { category: 'Dệt may & Giày dép', categoryKey: 'textile', valueBillionUSD: 36.2, sharePct: 10.0 },
  { category: 'Nông lâm thủy sản', categoryKey: 'agri', valueBillionUSD: 54.0, sharePct: 14.9 },
];

export const VIETNAM_AGRI_EXPORTS = [
  { product: 'Gỗ & Lâm sản', productKey: 'wood', valueBillionUSD: 15.2, rank: 'Top 5 Thế giới', rankKey: 'top5', fill: '#84cc16' },
  { product: 'Thủy sản (Tôm, Cá tra)', productKey: 'seafood', valueBillionUSD: 9.2, rank: 'Top 3 Thế giới', rankKey: 'top3', fill: '#06b6d4' },
  { product: 'Rau quả & Sầu riêng', productKey: 'fruits', valueBillionUSD: 6.7, rank: 'Top Tăng Trưởng', rankKey: 'topGrowth', fill: '#10b981' },
  { product: 'Cà phê (Robusta)', productKey: 'coffee', valueBillionUSD: 5.4, rank: '#2 Thế giới', rankKey: 'rank2', fill: '#d97706' },
  { product: 'Gạo (Rice)', productKey: 'rice', valueBillionUSD: 5.3, rank: '#2 Thế giới', rankKey: 'rank2', fill: '#eab308' },
  { product: 'Hạt điều (Cashew)', productKey: 'cashew', valueBillionUSD: 4.1, rank: '#1 Thế giới', rankKey: 'rank1', fill: '#f97316' },
  { product: 'Hạt tiêu (Pepper)', productKey: 'pepper', valueBillionUSD: 1.2, rank: '#1 Thế giới', rankKey: 'rank1', fill: '#a855f7' },
];

export const VIETNAM_ENERGY_MIX = [
  { source: 'Thủy điện', sourceKey: 'hydro', pct: 29.5, fill: '#06b6d4' },
  { source: 'Nhiệt điện Than', sourceKey: 'coal', pct: 44.8, fill: '#64748b' },
  { source: 'Nhiệt điện Khí', sourceKey: 'gas', pct: 9.2, fill: '#f59e0b' },
  { source: 'Năng lượng Mặt trời & Gió', sourceKey: 'solarWind', pct: 14.8, fill: '#10b981' },
  { source: 'Nhập khẩu & Khác', sourceKey: 'imports', pct: 1.7, fill: '#a855f7' },
];

