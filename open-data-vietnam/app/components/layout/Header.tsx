'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, Moon, Sun } from 'lucide-react';

export const Header: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl theme-header border-b transition-all">
      {/* Scroll Progress Bar */}
      <div 
        className="h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 w-full origin-left"
        style={{ animationTimeline: 'scroll()', animation: 'scale-progress linear' }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-10 h-10 rounded-2xl overflow-hidden shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform border border-emerald-500/20 bg-slate-900/50 backdrop-blur-md flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="VNMetrics Logo"
              width={80}
              height={80}
              quality={100}
              className="w-full h-full object-cover rounded-2xl"
              priority
            />
          </div>
          <div>
            <span className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              VNMetrics
            </span>
            <span className="hidden sm:inline-block ml-2.5 text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
              Open Data
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium theme-text-muted">
          <button onClick={() => scrollTo('overview')} className="hover:text-emerald-400 transition-colors py-1">
            {t('nav.overview')}
          </button>
          <button onClick={() => scrollTo('economy')} className="hover:text-emerald-400 transition-colors py-1">
            {t('nav.economy')}
          </button>
          <button onClick={() => scrollTo('agriculture')} className="hover:text-emerald-400 transition-colors py-1">
            {t('nav.agriculture')}
          </button>
          <button onClick={() => scrollTo('exports')} className="hover:text-emerald-400 transition-colors py-1">
            {t('nav.exports')}
          </button>
          <button onClick={() => scrollTo('energy')} className="hover:text-emerald-400 transition-colors py-1">
            {t('nav.energy')}
          </button>
          <button onClick={() => scrollTo('air-quality')} className="hover:text-emerald-400 transition-colors py-1">
            {t('nav.airQuality')}
          </button>
          <button onClick={() => scrollTo('population')} className="hover:text-emerald-400 transition-colors py-1">
            {t('nav.population')}
          </button>
        </nav>

        {/* Action Controls (i18n & Theme) */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full theme-card text-xs font-semibold hover:border-emerald-500/30 transition-all"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full theme-card hover:border-emerald-500/30 transition-all"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-teal-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

