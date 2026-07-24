'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronLeft, ChevronRight, Award, Wheat, Zap, Globe, ArrowUpRight } from 'lucide-react';

interface ISlideItem {
  id: number;
  icon: React.ReactNode;
  tagKey: string;
  titleKey: string;
  metricValue: string;
  metricLabelKey: string;
  descKey: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  targetId: string;
}

interface IHighlightsSliderProps {
  gdp?: string;
  agriTurnover?: string;
  renewablePct?: string;
  internetPct?: string;
}

export const HighlightsSlider: React.FC<IHighlightsSliderProps> = ({
  gdp = '$430.2B',
  agriTurnover = '~$54B',
  renewablePct = '~15%',
  internetPct = '82.5%',
}) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides: ISlideItem[] = [
    {
      id: 1,
      icon: <Award className="w-6 h-6 text-emerald-400" />,
      tagKey: 'slider.slide1.tag',
      titleKey: 'slider.slide1.title',
      metricValue: gdp,
      metricLabelKey: 'slider.slide1.metricLabel',
      descKey: 'slider.slide1.desc',
      gradient: 'from-emerald-500/15 via-teal-500/10 to-slate-900/60',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/20',
      badgeText: 'text-emerald-400',
      targetId: 'economy',
    },
    {
      id: 2,
      icon: <Wheat className="w-6 h-6 text-amber-400" />,
      tagKey: 'slider.slide2.tag',
      titleKey: 'slider.slide2.title',
      metricValue: agriTurnover,
      metricLabelKey: 'slider.slide2.metricLabel',
      descKey: 'slider.slide2.desc',
      gradient: 'from-amber-500/15 via-yellow-500/10 to-slate-900/60',
      badgeBg: 'bg-amber-500/10 border-amber-500/20',
      badgeText: 'text-amber-400',
      targetId: 'agriculture',
    },
    {
      id: 3,
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      tagKey: 'slider.slide3.tag',
      titleKey: 'slider.slide3.title',
      metricValue: renewablePct,
      metricLabelKey: 'slider.slide3.metricLabel',
      descKey: 'slider.slide3.desc',
      gradient: 'from-cyan-500/15 via-sky-500/10 to-slate-900/60',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/20',
      badgeText: 'text-cyan-400',
      targetId: 'energy',
    },
    {
      id: 4,
      icon: <Globe className="w-6 h-6 text-purple-400" />,
      tagKey: 'slider.slide4.tag',
      titleKey: 'slider.slide4.title',
      metricValue: internetPct,
      metricLabelKey: 'slider.slide4.metricLabel',
      descKey: 'slider.slide4.desc',
      gradient: 'from-purple-500/15 via-indigo-500/10 to-slate-900/60',
      badgeBg: 'bg-purple-500/10 border-purple-500/20',
      badgeText: 'text-purple-400',
      targetId: 'population',
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const activeSlide = slides[currentIndex];

  return (
    <section 
      className="relative overflow-hidden rounded-[2.5rem] theme-card border p-6 sm:p-10 transition-all duration-500"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${activeSlide.gradient} backdrop-blur-2xl transition-all duration-700 pointer-events-none`} />

      {/* Header controls */}
      <div className="relative z-10 flex items-center justify-between pb-6 border-b border-slate-700/20">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-6 rounded-full bg-emerald-400 inline-block shadow-sm" />
          <h3 className="text-base sm:text-lg font-bold tracking-tight">
            {t('slider.sectionTitle')}
          </h3>
          <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            {t('slider.liveHighlights')}
          </span>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono theme-text-muted">
            0{currentIndex + 1} / 0{slides.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full theme-card hover:border-emerald-500/40 hover:text-emerald-400 transition-all active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full theme-card hover:border-emerald-500/40 hover:text-emerald-400 transition-all active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Slide Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
        <div className="lg:col-span-8 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold backdrop-blur-md ${activeSlide.badgeBg} ${activeSlide.badgeText}`}>
            {activeSlide.icon}
            <span>{t(activeSlide.tagKey)}</span>
          </div>

          <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-snug">
            {t(activeSlide.titleKey)}
          </h4>

          <p className="text-sm sm:text-base theme-text-muted max-w-2xl font-normal leading-relaxed">
            {t(activeSlide.descKey)}
          </p>

          <div className="pt-2">
            <button
              onClick={() => scrollTo(activeSlide.targetId)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl theme-card hover:border-emerald-500/40 text-xs font-semibold text-emerald-400 transition-all group"
            >
              <span>{t('slider.viewSectionDetails')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Big Metric Display */}
        <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
          <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            {activeSlide.metricValue}
          </span>
          <span className="mt-2 text-xs font-semibold uppercase tracking-wider theme-text-muted">
            {t(activeSlide.metricLabelKey)}
          </span>
        </div>
      </div>

      {/* Progress Dots Indicator */}
      <div className="relative z-10 flex items-center justify-center gap-2 pt-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-8 bg-gradient-to-r from-emerald-400 to-teal-400'
                : 'w-2 bg-slate-700/50 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
