'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Database, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="theme-header border-t text-sm py-10 mt-20 transition-all backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 theme-text-muted">
          <Database className="w-4 h-4 text-emerald-400" />
          <span className="font-medium">{t('footer.datasource')}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 theme-text-muted font-medium">
            {t('footer.credit')}
          </span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full theme-card hover:border-emerald-500/40 transition-colors"
          >
            <Code className="w-4 h-4 text-emerald-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};
