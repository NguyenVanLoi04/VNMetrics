'use client';

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { IWorldBankDataPoint } from '../../lib/interface';

interface IPopulationSectionProps {
  popData?: IWorldBankDataPoint[];
  internetData?: IWorldBankDataPoint[];
}

const defaultPopData: IWorldBankDataPoint[] = [
  { year: '1995', value: 74.0 },
  { year: '2000', value: 79.8 },
  { year: '2005', value: 83.8 },
  { year: '2010', value: 87.9 },
  { year: '2015', value: 92.6 },
  { year: '2020', value: 97.3 },
  { year: '2024', value: 100.3 },
];

const defaultInternetData: IWorldBankDataPoint[] = [
  { year: '2010', value: 30.6 },
  { year: '2013', value: 38.5 },
  { year: '2016', value: 53.0 },
  { year: '2019', value: 68.7 },
  { year: '2022', value: 78.6 },
  { year: '2024', value: 82.5 },
];

export const PopulationSection: React.FC<IPopulationSectionProps> = ({
  popData = defaultPopData,
  internetData = defaultInternetData,
}) => {
  const { t } = useLanguage();

  return (
    <section id="population" className="scroll-mt-20 py-8 space-y-8 animate-scroll-entry">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
          <span className="w-2.5 h-7 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500 inline-block shadow-sm" />
          {t('pop.title')}
        </h2>
        <p className="mt-2 theme-text-muted text-sm max-w-2xl font-normal">{t('pop.desc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-7 rounded-[2rem] theme-card border space-y-4">
          <h3 className="text-base font-semibold tracking-tight">{t('chart.popGrowth')}</h3>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={popData.length ? popData : defaultPopData}>
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
                  formatter={(val: any) => [`${val} Triệu Người`, 'Dân Số']}
                />
                <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={3} dot={{ r: 5, fill: '#38bdf8', strokeWidth: 2, stroke: 'var(--bg-card)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-7 rounded-[2rem] theme-card border space-y-4">
          <h3 className="text-base font-semibold tracking-tight">{t('chart.internetUsers')}</h3>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={internetData.length ? internetData : defaultInternetData}>
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
                  formatter={(val: any) => [`${val}%`, 'Tỷ lệ người dùng Internet']}
                />
                <Line type="monotone" dataKey="value" stroke="#c084fc" strokeWidth={3} dot={{ r: 5, fill: '#c084fc', strokeWidth: 2, stroke: 'var(--bg-card)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

