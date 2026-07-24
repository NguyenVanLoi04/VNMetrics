'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { VIETNAM_TOP_EXPORTS } from '../../lib/constants';
import { IWorldBankDataPoint } from '../../lib/interface';

interface IExportsSectionProps {
  exportsPctData?: IWorldBankDataPoint[];
  importsPctData?: IWorldBankDataPoint[];
}

const defaultExportsPctData: IWorldBankDataPoint[] = [
  { year: '2012', value: 76.5 },
  { year: '2015', value: 89.8 },
  { year: '2018', value: 102.5 },
  { year: '2021', value: 93.3 },
  { year: '2024', value: 91.2 },
];

export const ExportsSection: React.FC<IExportsSectionProps> = ({
  exportsPctData = defaultExportsPctData,
}) => {
  const { t } = useLanguage();

  return (
    <section id="exports" className="scroll-mt-20 py-8 space-y-8 animate-scroll-entry">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
          <span className="w-2.5 h-7 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500 inline-block shadow-sm" />
          {t('exports.title')}
        </h2>
        <p className="mt-2 theme-text-muted text-sm max-w-2xl font-normal">{t('exports.desc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Export Commodities */}
        <div className="p-7 rounded-[2rem] theme-card border space-y-4">
          <h3 className="text-base font-semibold tracking-tight">{t('chart.topExports')}</h3>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VIETNAM_TOP_EXPORTS} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis dataKey="category" type="category" stroke="#94a3b8" width={140} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-card)',
                    color: 'var(--text-main)',
                    borderRadius: '16px',
                    boxShadow: 'var(--card-shadow)',
                    backdropFilter: 'blur(12px)',
                  }}
                  formatter={(val: any) => [`$${val} Tỷ USD`, 'Kim Ngạch']}
                />
                <Bar dataKey="valueBillionUSD" fill="#2dd4bf" radius={[0, 12, 12, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Exports % of GDP */}
        <div className="p-7 rounded-[2rem] theme-card border space-y-4">
          <h3 className="text-base font-semibold tracking-tight">{t('chart.exportsVsImports')}</h3>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={exportsPctData.length ? exportsPctData : defaultExportsPctData}>
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
                  formatter={(val: any) => [`${val}%`, 'Xuất Khẩu / GDP']}
                />
                <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={3} dot={{ r: 5, fill: '#38bdf8', strokeWidth: 2, stroke: 'var(--bg-card)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

