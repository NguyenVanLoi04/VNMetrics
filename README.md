# 🇻🇳 VNMetrics — Open Data Vietnam Dashboard

![VNMetrics Banner](https://raw.githubusercontent.com/NguyenVanLoi04/VNMetrics/main/public/og-banner.png)

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**Bảng thống kê & Trực quan hóa Dữ liệu Mở Việt Nam với Bản đồ Tương tác & Biểu đồ Thời gian Thực**

[🌐 Demo Trực Tuyến](https://vnmetrics.vercel.app) • [📄 Báo cáo & Thiết kế](./Plan.md)

</div>

---

## 📌 Giới thiệu

**VNMetrics** (Open Data Vietnam) là bảng điều khiển (Dashboard) trực quan hóa các chỉ số phát triển kinh tế, xã hội, môi trường và dân số của Việt Nam thông qua các nguồn **Open API công khai miễn phí** (World Bank API, WAQI, OpenAQ,...).

---

## ✨ Tính năng chính

- 📊 **Kinh tế & GDP**: Biểu đồ tăng trưởng GDP, GDP bình quân đầu người và so sánh tốc độ phát triển trong khu vực ASEAN.
- 🌍 **Bản đồ Tương tác 63 Tỉnh Thành**: Bản đồ nhiệt (Leaflet Map) tích hợp tooltip thông tin chi tiết từng địa phương.
- 🍃 **Chất lượng Không khí (AQI)**: Cập nhật chỉ số PM2.5, chỉ số AQI thực tế tại các thành phố lớn.
- 👨‍👩‍👧‍👦 **Dân số & Xã hội**: Thống kê quy mô dân số, tỷ lệ tăng trưởng, tuổi thọ trung bình và tỷ lệ sử dụng Internet.
- 🌾 **Nông nghiệp & Năng lượng**: Trực quan hóa sản lượng và xu hướng chuyển dịch năng lượng.
- 📦 **Xuất nhập khẩu**: Tổng quan kim ngạch thương mại (% GDP) và các đối tác thương mại hàng đầu.
- 🌐 **Đa ngôn ngữ (i18n)**: Hỗ trợ chuyển đổi nhanh giữa Tiếng Việt và Tiếng Anh.

---

## 🛠️ Công nghệ sử dụng

- **Core Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 + Soft Dark Theme
- **Bản đồ**: Leaflet + React Leaflet
- **Biểu đồ**: Recharts
- **Nguồn Dữ liệu**: World Bank Open Data API v2, WAQI / OpenAQ API

---

## 🚀 Hướng dẫn Chạy cục bộ (Local Development)

```bash
# Clone repository
git clone https://github.com/NguyenVanLoi04/VNMetrics.git

# Trỏ vào thư mục dự án
cd VNMetrics

# Cài đặt thư viện dependencies
npm install

# Khởi chạy Development Server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để xem kết quả.

---

<div align="center">
Made with ❤️ by Nguyen Van Loi
</div>
