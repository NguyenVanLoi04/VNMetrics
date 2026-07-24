# Open Data Vietnam Dashboard — Implementation Plan
Dashboard FE-only visualize dữ liệu công khai Việt Nam với bản đồ tương tác + biểu đồ. Không cần backend — fetch trực tiếp từ public API miễn phí.
## User Review Required
> [!IMPORTANT]
> **Dự án mới hay thêm vào portfolio hiện có?**
> Hiện tại bạn đã có repo `loi-dev-portfolio` (Next.js 16). Tôi dự định tạo **dự án mới riêng biệt** (repo mới) để dễ deploy và demo độc lập. Bạn đồng ý không?
> [!IMPORTANT]
> **API Key cho Air Quality**: WAQI API cần token miễn phí (đăng ký bằng email tại https://aqicn.org/data-platform/token/). Bạn có thể đăng ký trước không? Nếu chưa có, tôi sẽ dùng World Bank data thay thế cho phần air quality.
## Open Questions
1. **Ngôn ngữ giao diện**: Tiếng Việt, tiếng Anh, hay cả hai (i18n)?
2. **Dark mode**: Có cần toggle light/dark không?
3. **Bản đồ tỉnh thành**: Dùng bản đồ 63 tỉnh (legacy) hay 34 tỉnh (hành chính mới 2026)?
---
## Nguồn Dữ Liệu (Tất cả FREE, không cần backend)
| Loại dữ liệu | API Source | Key cần? | Format |
|---|---|---|---|
| GDP, GDP/capita | World Bank API v2 | ❌ Không | JSON |
| Dân số, tăng trưởng | World Bank API v2 | ❌ Không | JSON |
| Giáo dục (tỷ lệ biết chữ, đi học) | World Bank API v2 | ❌ Không | JSON |
| Y tế (tuổi thọ, chi tiêu y tế) | World Bank API v2 | ❌ Không | JSON |
| Chất lượng không khí | WAQI / OpenAQ | ✅ Free token | JSON |
| Bản đồ tỉnh thành | GeoJSON static file | ❌ Không | GeoJSON |
| Thông tin quốc gia | REST Countries v3.1 | ❌ Không | JSON |
### World Bank Indicator Codes
```
GDP (current US$):           NY.GDP.MKTP.CD
GDP per capita:              NY.GDP.PCAP.CD
Population:                  SP.POP.TOTL
Population growth:           SP.POP.GROW
Life expectancy:             SP.DYN.LE00.IN
Literacy rate:               SE.ADT.LITR.ZS
School enrollment (primary): SE.PRM.ENRR
Unemployment:                SL.UEM.TOTL.ZS
Inflation (CPI):             FP.CPI.TOTL.ZG
Trade (% GDP):               NE.TRD.GNFS.ZS
Internet users (% pop):      IT.NET.USER.ZS
CO2 emissions (per capita):  EN.ATM.CO2E.PC
```
**API Pattern**: `https://api.worldbank.org/v2/country/VNM/indicator/{CODE}?format=json&per_page=50`
---
## Proposed Changes
### Tech Stack
```
Next.js 16 (App Router) + TypeScript
├── Styling: Tailwind CSS 4 (đã quen dùng)
├── Charts: Recharts (React-native, dễ dùng)
├── Map: Leaflet + react-leaflet (lightweight, free)
├── Animations: Framer Motion (đã có kinh nghiệm)
├── Icons: Lucide React (đã có)
├── Data fetching: Next.js fetch + ISR (revalidate mỗi 24h)
└── Deploy: Vercel (free tier)
```
---
### Cấu Trúc Trang
App sẽ là **single-page dashboard** với 4 section chính, scroll smooth giữa các section:
```
┌─────────────────────────────────────────────┐
│  Header (logo, nav tabs, theme toggle)      │
├─────────────────────────────────────────────┤
│  Section 1: OVERVIEW                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ Dân số   │ │ GDP      │ │ Tuổi thọ │    │
│  │ 100.3M   │ │ $430B    │ │ 75.4 yrs │    │
│  └──────────┘ └──────────┘ └──────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │    Interactive Vietnam Map          │    │
│  │    (hover tỉnh → show tooltip)     │    │
│  └─────────────────────────────────────┘    │
├─────────────────────────────────────────────┤
│  Section 2: KINH TẾ                        │
│  ┌─────────────────┐ ┌─────────────────┐   │
│  │ GDP Line Chart  │ │ GDP/capita Bar  │   │
│  │ (20 năm)        │ │ (so sánh ASEAN) │   │
│  └─────────────────┘ └─────────────────┘   │
│  ┌─────────────────┐ ┌─────────────────┐   │
│  │ Unemployment    │ │ Trade % GDP     │   │
│  └─────────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────┤
│  Section 3: CHẤT LƯỢNG KHÔNG KHÍ           │
│  ┌─────────────────────────────────────┐   │
│  │  Map with AQI pins (HN, HCM, etc.) │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────┐ ┌─────────────────┐   │
│  │ AQI Trend Chart │ │ PM2.5 Gauge     │   │
│  └─────────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────┤
│  Section 4: DÂN SỐ & GIÁO DỤC             │
│  ┌─────────────────┐ ┌─────────────────┐   │
│  │ Population Line │ │ Literacy Rate   │   │
│  │ (30 năm)        │ │ (Area Chart)    │   │
│  └─────────────────┘ └─────────────────┘   │
│  ┌─────────────────┐ ┌─────────────────┐   │
│  │ Internet Users  │ │ School Enroll   │   │
│  └─────────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────┤
│  Footer (data sources, credits, GitHub)     │
└─────────────────────────────────────────────┘
```
---
### File Structure
```
open-data-vietnam/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Main dashboard page
│   ├── globals.css             # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Navigation + theme toggle
│   │   │   └── Footer.tsx      # Credits, data sources
│   │   ├── overview/
│   │   │   ├── OverviewSection.tsx
│   │   │   ├── StatCard.tsx     # Animated stat cards
│   │   │   └── VietnamMap.tsx   # Interactive Leaflet map
│   │   ├── economy/
│   │   │   ├── EconomySection.tsx
│   │   │   ├── GDPChart.tsx
│   │   │   ├── GDPComparisonChart.tsx
│   │   │   └── TradeChart.tsx
│   │   ├── air-quality/
│   │   │   ├── AirQualitySection.tsx
│   │   │   ├── AQIMap.tsx       # Map with AQI pins
│   │   │   ├── AQIGauge.tsx     # Circular gauge
│   │   │   └── AQITrendChart.tsx
│   │   ├── population/
│   │   │   ├── PopulationSection.tsx
│   │   │   ├── PopulationChart.tsx
│   │   │   ├── LiteracyChart.tsx
│   │   │   └── InternetChart.tsx
│   │   └── ui/
│   │       ├── ChartCard.tsx    # Reusable chart wrapper
│   │       ├── SectionTitle.tsx # Section heading
│   │       ├── Tooltip.tsx
│   │       ├── Skeleton.tsx     # Loading state
│   │       └── ScrollNav.tsx    # Smooth scroll nav
│   ├── lib/
│   │   ├── api/
│   │   │   ├── worldbank.ts    # World Bank API fetcher
│   │   │   ├── airquality.ts   # WAQI/OpenAQ fetcher
│   │   │   └── types.ts        # TypeScript interfaces
│   │   ├── constants.ts        # Indicator codes, colors
│   │   └── utils.ts            # Format numbers, dates
│   └── data/
│       └── vietnam-provinces.geojson  # Static map data
├── public/
│   └── images/                  # Icons, OG image
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```
---
### Component Details
#### [NEW] `app/lib/api/worldbank.ts`
- `fetchIndicator(countryCode, indicatorCode, dateRange)` → trả về `{year, value}[]`
- `fetchMultiCountryIndicator(countryCodes[], indicatorCode)` → so sánh ASEAN
- Xử lý pagination (World Bank API phân trang)
- Cache kết quả với Next.js ISR (`revalidate: 86400` = 24h)
#### [NEW] `app/components/overview/VietnamMap.tsx`
- Render bản đồ VN từ GeoJSON
- Hover tỉnh → highlight + tooltip (tên tỉnh, dân số nếu có)
- Zoom + pan gesture
- Responsive: co lại trên mobile
#### [NEW] `app/components/overview/StatCard.tsx`
- Card hiển thị số liệu lớn (dân số, GDP, tuổi thọ)
- Animate count-up khi scroll vào viewport
- Framer Motion entrance animation
- Icon + trend indicator (↑ tăng / ↓ giảm so với năm trước)
#### [NEW] `app/components/economy/GDPComparisonChart.tsx`
- Bar chart ngang so sánh GDP/capita VN vs các nước ASEAN
- Highlight VN bằng màu khác
- Fetch data cho: VNM, THA, IDN, PHL, MYS, SGP
#### [NEW] `app/components/air-quality/AQIGauge.tsx`
- Circular gauge hiển thị AQI hiện tại
- Color coding: Xanh (Good) → Đỏ (Hazardous)
- Animated needle
---
### Design System
```css
/* Color Palette - Dark theme mặc định */
--bg-primary:     hsl(222, 47%, 8%)     /* Deep navy */
--bg-card:        hsl(222, 40%, 12%)    /* Card background */
--bg-card-hover:  hsl(222, 40%, 16%)
--accent-primary: hsl(152, 68%, 52%)    /* Vietnam green */
--accent-secondary: hsl(35, 95%, 58%)   /* Gold/amber */
--accent-danger:  hsl(0, 84%, 60%)      /* Red for AQI */
--text-primary:   hsl(210, 40%, 96%)
--text-secondary: hsl(215, 20%, 65%)
/* Gradient */
--gradient-hero: linear-gradient(135deg, hsl(152, 68%, 52%), hsl(200, 80%, 50%))
```
- **Font**: Inter (Google Fonts) — clean, modern, great for data
- **Border radius**: 12px-16px cho cards
- **Glassmorphism** cho stat cards
- **Smooth scroll** giữa các section
---
### 🎨 Modern Web Guidance — Taste Skills
Áp dụng các pattern hiện đại từ **Modern Web Guidance** (Google Chrome team) để nâng tầm chất lượng UX/UI và thể hiện trình độ senior:
#### 1. Scroll-Driven Animations (CSS-only, không cần JS)
| Pattern | Áp dụng vào | Guide ID |
|---|---|---|
| **Scroll Entry/Exit Effects** | Fade-in cards, charts khi scroll vào viewport | `scroll-entry-exit-effects` |
| **Parallax Scroll Effects** | Hero section, background layers di chuyển tốc độ khác nhau | `parallax-scroll-effects` |
| **Scroll Progress Indicator** | Thanh progress bar trên header cho biết đang ở section nào | `scroll-progress-indicator` |
| **Shrinking Header** | Header thu nhỏ + đổ bóng khi scroll xuống | `shrinking-header-on-scroll` |
| **Scrollytelling** | Animate background color/gradient khi scroll giữa các section | `scrollytelling` |
```css
/* Ví dụ: Fade-in cards khi scroll vào viewport */
@keyframes fade-in {
  from { opacity: 0; translate: 0 40px; }
  to   { opacity: 1; translate: 0 0; }
}
.chart-card {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}
```
> [!TIP]
> Scroll-driven animations chạy hoàn toàn trên compositor thread → **60fps mượt mà** mà không cần Framer Motion hay GSAP cho phần này. Giảm JS bundle size.
#### 2. Dark Mode với `light-dark()` và `color-scheme` (Native CSS)
Thay vì dùng class toggle thủ công, dùng CSS native:
```css
:root {
  color-scheme: light dark;
  
  --bg-primary: light-dark(hsl(210, 20%, 98%), hsl(222, 47%, 8%));
  --bg-card: light-dark(hsl(0, 0%, 100%), hsl(222, 40%, 12%));
  --text-primary: light-dark(hsl(222, 47%, 11%), hsl(210, 40%, 96%));
  --accent-primary: light-dark(hsl(152, 68%, 40%), hsl(152, 68%, 52%));
}
```
- Tự động theo OS preference (`prefers-color-scheme`)
- Browser UI (scrollbar, form controls) cũng tự đổi màu
- Không cần JS cho dark mode logic
Guide IDs: `dark-mode`, `component-specific-light-dark-theme`
#### 3. CSS Anchor Positioning — Tooltips cho Map & Charts
Tooltip hiển thị data khi hover tỉnh trên bản đồ hoặc data point trên chart:
```css
.province-tooltip {
  position-anchor: --active-province;
  position: fixed;
  inset-area: top;
  position-try-fallbacks: --bottom, --left, --right;
  
  /* Auto flip khi gần edge viewport */
  @position-try --bottom { inset-area: bottom; }
  @position-try --left   { inset-area: left; }
  @position-try --right  { inset-area: right; }
}
```
Guide IDs: `position-aware-tooltips`, `interest-triggered-tooltips`
> [!IMPORTANT]
> CSS Anchor Positioning thay thế hoàn toàn Floating UI/Popper.js → **zero JS dependency** cho tooltips. Đây là kỹ năng mà rất ít developer biết dùng — **rất ấn tượng trong phỏng vấn**.
#### 4. Performance Patterns
| Pattern | Mô tả | Guide ID |
|---|---|---|
| **Content Visibility** | Defer rendering chart cards ngoài viewport → faster initial paint | `defer-rendering-heavy-content` |
| **Fetch Priority** | `fetchpriority="high"` cho hero data, `low` cho section 3-4 | `optimize-preload-priority` |
| **Preload Hints** | `<link rel="preload">` cho font Inter, GeoJSON file | `improve-next-page-load-performance` |
| **Break Long Tasks** | `scheduler.yield()` khi parse data lớn từ World Bank API | `break-up-long-tasks` |
```css
/* Defer rendering cho sections ngoài viewport */
.section:not(:first-child) {
  content-visibility: auto;
  contain-intrinsic-size: auto 800px;
}
```
#### 5. Typography & Layout Nâng Cao
| Pattern | Mô tả | Guide ID |
|---|---|---|
| **Text Wrap Balance** | Heading không bị lẻ chữ cuối dòng | `improve-text-layout-and-legibility` |
| **Precise Text Alignment** | `text-box-trim` để căn chỉnh text trong stat cards | `precise-text-alignment` |
| **Container Queries** | Chart cards tự responsive theo kích thước container, không viewport | `size-aware-styling` |
| **Scrollbar Styling** | Scrollbar match dark/light theme | `adapt-scrollbar-to-light-dark-preferences` |
```css
.section-title {
  text-wrap: balance;      /* Cân bằng line breaks */
  text-box: trim-both cap alphabetic;  /* Trim leading/trailing space */
}
.chart-card {
  container-type: inline-size;
  
  @container (width < 400px) {
    /* Layout 1 cột trên container nhỏ */
    .chart-grid { grid-template-columns: 1fr; }
  }
}
```
#### 6. Animate Entry/Exit Elements
Smooth animation khi toggle section visibility hoặc filter data:
```css
.stat-card {
  @starting-style {
    opacity: 0;
    scale: 0.95;
  }
  transition: opacity 0.4s, scale 0.4s;
  transition-behavior: allow-discrete;
}
```
Guide ID: `animate-element-entry-exit`
---
#### Tổng hợp Taste Skills sẽ áp dụng
| # | Feature | Thay thế thư viện nào | Bundle size saved |
|---|---|---|---|
| 1 | Scroll-driven animations | Framer Motion scroll handlers | ~40KB |
| 2 | `light-dark()` + `color-scheme` | JS theme toggle logic | ~2KB |
| 3 | CSS Anchor Positioning | Floating UI / Popper.js | ~15KB |
| 4 | `content-visibility` | Lazy loading wrappers | ~1KB |
| 5 | `text-wrap: balance` | JS text balancer | ~3KB |
| 6 | Container Queries | JS resize observers | ~2KB |
| 7 | `@starting-style` | Framer Motion entry anims | ~0KB (CSS only) |
| **Total** | | | **~63KB saved** |
> [!IMPORTANT]
> Việc sử dụng **native web platform APIs** thay vì thư viện JS cho thấy bạn nắm vững bleeding-edge CSS/HTML — đây là điều **rất ít developer** làm được và sẽ cực kỳ ấn tượng trong mắt nhà tuyển dụng.
---
## Verification Plan
### Manual Verification
1. Chạy `npm run dev` → kiểm tra tất cả 4 section render đúng
2. Kiểm tra responsive trên mobile (375px), tablet (768px), desktop (1440px)
3. Kiểm tra API calls hoạt động (xem Network tab)
4. Kiểm tra animations smooth (60fps)
5. Chạy Lighthouse → target score > 90
6. Deploy lên Vercel → kiểm tra ISR hoạt động (data cache 24h)
### Build Check
```bash
npm run build   # Đảm bảo không lỗi TypeScript
npm run lint     # Clean lint
```