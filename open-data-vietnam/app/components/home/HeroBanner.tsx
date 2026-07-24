'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] theme-card border p-8 md:p-14 my-6 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 backdrop-blur-2xl">
      {/* Background Ambient Glow Effects */}
      <div className="absolute -top-28 -right-28 w-96 h-96 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-teal-400/15 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="relative z-10 max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold tracking-wide backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Realtime Macro Data & Insights 2026</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Khám Phá Dữ Liệu <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Kinh Tế & Môi Trường Việt Nam
          </span>
        </h1>

        <p className="text-base sm:text-lg theme-text-muted max-w-2xl leading-relaxed font-normal">
          Bảng điều khiển trực quan hóa dữ liệu công khai từ <strong className="font-semibold text-emerald-400">World Bank Open Data</strong> & <strong className="font-semibold text-teal-400">OpenAQ</strong>. Theo dõi GDP, Năng lượng tái tạo, Chất lượng không khí và Dân số theo thời gian thực.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => scrollTo('overview')}
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Khám Phá Chỉ Số</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo('exports')}
            className="px-7 py-3.5 rounded-2xl theme-card hover:border-emerald-500/40 text-sm font-semibold flex items-center gap-2.5 transition-all"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Xem Xuất Khẩu & Năng Lượng</span>
          </button>
        </div>

        {/* Feature Badges */}
        <div className="pt-6 border-t border-slate-700/20 flex flex-wrap items-center gap-6 text-xs theme-text-muted font-medium">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Nguồn dữ liệu xác thực
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/5 border border-teal-500/10">
            <Zap className="w-4 h-4 text-cyan-400" /> Cập nhật tự động ISR 24h
          </span>
        </div>
      </div>
    </section>
  );
};

