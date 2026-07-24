'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { IWorldBankDataPoint, IMultiCountryDataPoint } from '../../lib/interface';

interface IEconomySectionProps {
  gdpData?: IWorldBankDataPoint[];
  aseanGdpData?: IMultiCountryDataPoint[];
}

const defaultGdpData: IWorldBankDataPoint[] = [
  { year: '2010', value: 147.2 },
  { year: '2012', value: 195.6 },
  { year: '2014', value: 233.5 },
  { year: '2016', value: 257.0 },
  { year: '2018', value: 310.1 },
  { year: '2020', value: 346.6 },
  { year: '2022', value: 408.8 },
  { year: '2024', value: 430.2 },
];

const defaultAseanData: IMultiCountryDataPoint[] = [
  { country: 'Singapore', countryCode: 'SGP', value: 82800, year: '2024' },
  { country: 'Malaysia', countryCode: 'MYS', value: 13300, year: '2024' },
  { country: 'Thailand', countryCode: 'THA', value: 7800, year: '2024' },
  { country: 'Indonesia', countryCode: 'IDN', value: 4900, year: '2024' },
  { country: 'Việt Nam', countryCode: 'VNM', value: 4347, year: '2024' },
  { country: 'Philippines', countryCode: 'PHL', value: 3900, year: '2024' },
];

export const EconomySection: React.FC<IEconomySectionProps> = ({
  gdpData = defaultGdpData,
  aseanGdpData = defaultAseanData,
}) => {
  const { t } = useLanguage();

  return (
    <section id="economy" className="scroll-mt-20 py-8 space-y-8 animate-scroll-entry">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
          <span className="w-2.5 h-7 rounded-full bg-gradient-to-b from-sky-400 to-blue-500 inline-block shadow-sm" />
          {t('economy.title')}
        </h2>
        <p className="mt-2 theme-text-muted text-sm max-w-2xl font-normal">{t('economy.desc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-7 rounded-[2rem] theme-card border space-y-4">
          <h3 className="text-base font-semibold tracking-tight">{t('chart.gdpTrend')}</h3>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gdpData.length ? gdpData : defaultGdpData}>
                <defs>
                  <linearGradient id="gdpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-card)',
                    color: 'var(--text-main)',
                    borderRadius: '16px',
                    boxShadow: 'var(--card-shadow)',
                    backdropFilter: 'blur(12px)',
                  }}
                  formatter={(val: any) => [`$${val} Tỷ USD`, 'GDP']}
                />
                <Area type="monotone" dataKey="value" stroke="#34d399" strokeWidth={3} fillOpacity={1} fill="url(#gdpGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-7 rounded-[2rem] theme-card border space-y-4">
          <h3 className="text-base font-semibold tracking-tight">{t('chart.aseanGdp')}</h3>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aseanGdpData.length ? aseanGdpData : defaultAseanData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis dataKey="country" type="category" stroke="#94a3b8" width={90} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-card)',
                    color: 'var(--text-main)',
                    borderRadius: '16px',
                    boxShadow: 'var(--card-shadow)',
                    backdropFilter: 'blur(12px)',
                  }}
                  formatter={(val: any) => [`$${val.toLocaleString()} USD`, 'GDP/Đầu Người']}
                />
                <Bar dataKey="value" fill="#38bdf8" radius={[0, 12, 12, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

