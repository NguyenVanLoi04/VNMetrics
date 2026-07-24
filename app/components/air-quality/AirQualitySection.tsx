'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { IAQIDataPoint, AQIStatusEnum } from '../../lib/interface';
import { Wind, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

interface IAirQualitySectionProps {
  aqiList?: IAQIDataPoint[];
}

export const AirQualitySection: React.FC<IAirQualitySectionProps> = ({ aqiList = [] }) => {
  const { t } = useLanguage();

  const getStatusBadge = (status: AQIStatusEnum) => {
    switch (status) {
      case AQIStatusEnum.GOOD:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5" /> {t('air.status.good')}
          </span>
        );
      case AQIStatusEnum.MODERATE:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-medium backdrop-blur-md">
            <AlertTriangle className="w-3.5 h-3.5" /> {t('air.status.moderate')}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-medium backdrop-blur-md">
            <ShieldAlert className="w-3.5 h-3.5" /> {t('air.status.unhealthy')}
          </span>
        );
    }
  };

  return (
    <section id="air-quality" className="scroll-mt-20 py-8 space-y-8 animate-scroll-entry">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
          <span className="w-2.5 h-7 rounded-full bg-gradient-to-b from-cyan-400 to-teal-500 inline-block shadow-sm" />
          {t('air.title')}
        </h2>
        <p className="mt-2 theme-text-muted text-sm max-w-2xl font-normal">{t('air.desc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aqiList.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-[2rem] theme-card border space-y-4 stat-card-entry"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Wind className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-base">{item.city}</h3>
              </div>
              {getStatusBadge(item.status)}
            </div>

            <div className="flex items-baseline justify-between pt-2">
              <div>
                <span className="text-4xl font-bold tracking-tight">{item.aqi}</span>
                <span className="text-xs font-medium theme-text-muted ml-1.5">AQI</span>
              </div>
              <div className="text-right text-xs theme-text-muted space-y-1">
                <div>
                  PM2.5: <strong className="font-semibold text-slate-200">{item.pm25} µg/m³</strong>
                </div>
                <div>
                  PM10: <strong className="font-semibold text-slate-200">{item.pm10} µg/m³</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

