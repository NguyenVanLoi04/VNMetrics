'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { StatCard } from './StatCard';
import { useLanguage } from '../../context/LanguageContext';
import { Users, DollarSign, HeartPulse, TrendingUp } from 'lucide-react';

const VietnamMap = dynamic(
  () => import('./VietnamMap').then((mod) => mod.VietnamMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[450px] w-full rounded-[2rem] bg-slate-900/50 border border-slate-800 animate-pulse flex items-center justify-center text-slate-500">
        Loading map...
      </div>
    ),
  }
);

interface IOverviewProps {
  population?: string;
  gdp?: string;
  lifeExpectancy?: string;
  gdpPerCapita?: string;
}

export const OverviewSection: React.FC<IOverviewProps> = ({
  population = '100.3M',
  gdp = '$430.2B',
  lifeExpectancy = '75.4',
  gdpPerCapita = '$4,347',
}) => {
  const { t } = useLanguage();

  return (
    <section id="overview" className="scroll-mt-20 py-8 space-y-8 animate-scroll-entry">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
          <span className="w-2.5 h-7 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500 inline-block shadow-sm" />
          {t('overview.title')}
        </h2>
        <p className="mt-2 theme-text-muted text-sm max-w-2xl font-normal">
          {t('overview.desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('stat.population')}
          value={population}
          unit={t('stat.unit.people')}
          change="0.8%"
          isPositive={true}
          icon={<Users className="w-5 h-5" />}
          gradient="from-emerald-500/20 to-teal-500/5"
        />
        <StatCard
          title={t('stat.gdp')}
          value={gdp}
          unit="USD"
          change="5.05%"
          isPositive={true}
          icon={<DollarSign className="w-5 h-5" />}
          gradient="from-sky-500/20 to-cyan-500/5"
        />
        <StatCard
          title={t('stat.gdpPerCapita')}
          value={gdpPerCapita}
          unit="USD"
          change="4.2%"
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5" />}
          gradient="from-amber-500/20 to-yellow-500/5"
        />
        <StatCard
          title={t('stat.lifeExpectancy')}
          value={lifeExpectancy}
          unit={t('stat.unit.years')}
          change="0.3%"
          isPositive={true}
          icon={<HeartPulse className="w-5 h-5" />}
          gradient="from-rose-500/20 to-pink-500/5"
        />
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">{t('map.title')}</h3>
          <span className="text-xs theme-text-muted px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10">{t('map.subtitle')}</span>
        </div>
        <VietnamMap />
      </div>
    </section>
  );
};

