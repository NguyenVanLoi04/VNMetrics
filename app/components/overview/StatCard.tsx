'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface IStatCardProps {
  title: string;
  value: string;
  unit?: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  gradient?: string;
}

export const StatCard: React.FC<IStatCardProps> = ({
  title,
  value,
  unit,
  change,
  isPositive = true,
  icon,
  gradient = 'from-emerald-500/15 to-teal-500/5',
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-[2rem] theme-card p-6 border transition-all duration-500 group stat-card-entry">
      <div className={`absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-gradient-to-br ${gradient} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider theme-text-muted">{title}</p>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight">{value}</span>
            {unit && <span className="text-xs font-medium theme-text-muted">{unit}</span>}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl theme-card text-emerald-400 border border-emerald-500/15 shadow-sm group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
      </div>

      {change && (
        <div className="mt-5 flex items-center gap-2 text-xs font-medium relative z-10">
          <span className={`px-2.5 py-0.5 rounded-full backdrop-blur-md ${isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
          <span className="theme-text-muted text-[11px]">{t('stat.vsPrevious')}</span>
        </div>
      )}
    </div>
  );
};

