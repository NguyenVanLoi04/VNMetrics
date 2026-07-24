import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b1320",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "VNMetrics - Bảng Điều Khiển Dữ Liệu Mở Việt Nam 2026",
    template: "%s | VNMetrics",
  },
  description:
    "Trực quan hóa dữ liệu công khai Việt Nam: GDP, Nông sản xuất khẩu, Dân số, Chất lượng không khí (AQI), Năng lượng tái tạo & Internet. Dữ liệu thời gian thực từ World Bank & OpenAQ.",
  keywords: [
    "VNMetrics",
    "Open Data Vietnam",
    "Dữ liệu mở Việt Nam",
    "GDP Việt Nam",
    "Nông sản Việt Nam xuất khẩu",
    "Gạo Cà phê Hạt điều Việt Nam",
    "Dân số Việt Nam",
    "AQI Hà Nội",
    "AQI TP HCM",
    "World Bank Open Data",
    "Bản đồ tương tác Việt Nam",
  ],
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  authors: [{ name: "Antigravity AI Team" }],
  creator: "Antigravity AI Team",
  publisher: "VNMetrics",
  metadataBase: new URL("https://vnmetrics.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "vi-VN": "/",
      "en-US": "/?lang=en",
    },
  },
  openGraph: {
    title: "VNMetrics - Bảng Điều Khiển Dữ Liệu Mở Việt Nam",
    description:
      "Bản đồ tương tác và biểu đồ thống kê Kinh Tế, Nông Nghiệp, Môi Trường & Dân Số Việt Nam theo thời gian thực.",
    url: "https://vnmetrics.vercel.app",
    siteName: "VNMetrics",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "VNMetrics Open Data Vietnam Social Preview Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VNMetrics - Open Data Vietnam Dashboard",
    description:
      "Trực quan hóa dữ liệu kinh tế, nông sản, môi trường & xã hội Việt Nam với bản đồ tương tác.",
    images: ["/og-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Comprehensive Schema.org Per-Section Structured Data for Search Engine Crawlers
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "VNMetrics",
    url: "https://vnmetrics.vercel.app",
    image: "https://vnmetrics.vercel.app/og-banner.png",
    logo: "https://vnmetrics.vercel.app/logo.png",
    description:
      "Trực quan hóa dữ liệu công khai Việt Nam: GDP, Nông sản xuất khẩu chủ lực, Dân số, Chất lượng không khí (AQI), Năng lượng & Internet.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    author: {
      "@type": "Organization",
      name: "Antigravity AI Team",
      logo: "https://vnmetrics.vercel.app/logo.png",
    },
    hasPart: [
      {
        "@type": "Dataset",
        name: "Tổng Quan Chỉ Số Quốc Gia Việt Nam",
        description: "Bản đồ tương tác 63 tỉnh thành & chỉ số GDP, Dân số, Tuổi thọ trung bình.",
        url: "https://vnmetrics.vercel.app/#overview",
      },
      {
        "@type": "Dataset",
        name: "Kinh Tế & Thương Mại Vĩ Mô",
        description: "Tăng trưởng GDP 20 năm, so sánh GDP/Đầu người ASEAN.",
        url: "https://vnmetrics.vercel.app/#economy",
      },
      {
        "@type": "Dataset",
        name: "Nông Nghiệp & Nông Sản Xuất Khẩu Việt Nam",
        description: "Top nông sản xuất khẩu chủ lực (Gạo, Cà phê, Hạt điều, Thủy sản) & vị thế thế giới.",
        url: "https://vnmetrics.vercel.app/#agriculture",
      },
      {
        "@type": "Dataset",
        name: "Cơ Cấu Thương Mại & Xuất Khẩu",
        description: "Cơ cấu các ngành xuất khẩu điện tử, dệt may & tỷ trọng xuất nhập khẩu/GDP.",
        url: "https://vnmetrics.vercel.app/#exports",
      },
      {
        "@type": "Dataset",
        name: "Năng Lượng & Chuyển Đổi Xanh",
        description: "Cơ cấu nguồn điện quốc gia, tỷ lệ Thủy điện, Than, Mặt trời & Gió.",
        url: "https://vnmetrics.vercel.app/#energy",
      },
      {
        "@type": "Dataset",
        name: "Chất Lượng Không Khí AQI Môi Trường",
        description: "Theo dõi chỉ số AQI, PM2.5, PM10 theo thời gian thực tại các đô thị.",
        url: "https://vnmetrics.vercel.app/#air-quality",
      },
      {
        "@type": "Dataset",
        name: "Dân Số & Công Nghệ Số",
        description: "Xu hướng dân số 30 năm, tỷ lệ người dùng Internet và giáo dục.",
        url: "https://vnmetrics.vercel.app/#population",
      },
    ],
  };

  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0b1320] text-slate-100">{children}</body>
    </html>
  );
}

