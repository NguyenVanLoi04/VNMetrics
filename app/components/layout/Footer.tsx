'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Database, Info, Wind, MapPin, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="theme-header border-t text-sm mt-20 transition-all backdrop-blur-2xl">
      {/* Mục Chú Thích & Nguồn Dữ Liệu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-emerald-500/10">
        <div className="flex items-center gap-2 mb-6">
          <Info className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-semibold theme-text-primary">
            {t('footer.notesTitle')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Card 1: World Bank */}
          <div className="p-4 rounded-xl theme-card hover:border-emerald-500/30 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <h4 className="font-medium text-emerald-400">
                {t('footer.noteWbTitle')}
              </h4>
            </div>
            <p className="text-xs theme-text-muted leading-relaxed">
              {t('footer.noteWbDesc')}
            </p>
          </div>

          {/* Card 2: AQI */}
          <div className="p-4 rounded-xl theme-card hover:border-emerald-500/30 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-4 h-4 text-emerald-400" />
              <h4 className="font-medium text-emerald-400">
                {t('footer.noteAqiTitle')}
              </h4>
            </div>
            <p className="text-xs theme-text-muted leading-relaxed">
              {t('footer.noteAqiDesc')}
            </p>
          </div>

          {/* Card 3: Map */}
          <div className="p-4 rounded-xl theme-card hover:border-emerald-500/30 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <h4 className="font-medium text-emerald-400">
                {t('footer.noteMapTitle')}
              </h4>
            </div>
            <p className="text-xs theme-text-muted leading-relaxed">
              {t('footer.noteMapDesc')}
            </p>
          </div>
        </div>

        <p className="text-xs theme-text-muted bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3 italic">
          {t('footer.disclaimer')}
        </p>
      </div>

      {/* Footer Bottom Credit */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 theme-text-muted">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span className="font-medium">{t('footer.datasource')}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 theme-text-muted font-medium">
            <span>{t('footer.credit')}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </span>
          <a
            href="https://github.com/NguyenVanLoi04"
            target="_blank"
            rel="noreferrer"
            className="ml-2 px-3 py-1 text-xs rounded-full theme-card hover:border-emerald-500/50 hover:text-emerald-400 transition-colors font-medium"
          >
            GitHub @NguyenVanLoi04
          </a>
        </div>
      </div>
    </footer>
  );
};
