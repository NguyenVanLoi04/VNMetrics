'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { VIETNAM_AGRI_EXPORTS } from '../../lib/constants';
import { IWorldBankDataPoint } from '../../lib/interface';
import { Wheat, Award, Sprout, ShieldCheck } from 'lucide-react';

interface IAgricultureSectionProps {
  agriGdpData?: IWorldBankDataPoint[];
}

const defaultAgriGdpData: IWorldBankDataPoint[] = [
  { year: '2010', value: 18.4 },
  { year: '2012', value: 16.2 },
  { year: '2015', value: 14.7 },
  { year: '2018', value: 13.9 },
  { year: '2021', value: 12.6 },
  { year: '2024', value: 11.8 },
];

export const AgricultureSection: React.FC<IAgricultureSectionProps> = ({
  agriGdpData = defaultAgriGdpData,
}) => {
  const { t } = useLanguage();

  return (
    <section id="agriculture" className="scroll-mt-20 py-8 space-y-8 animate-scroll-entry">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
          <span className="w-2.5 h-7 rounded-full bg-gradient-to-b from-lime-400 to-emerald-500 inline-block shadow-sm" />
          {t('agri.title')}
        </h2>
        <p className="mt-2 theme-text-muted text-sm max-w-2xl font-normal">{t('agri.desc')}</p>
      </div>

      {/* Highlights - World Ranking Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl theme-card border flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs theme-text-muted font-medium">Hạt Điều & Hạt Tiêu</p>
            <p className="text-sm font-bold text-amber-400">#1 Thế Giới</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl theme-card border flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Wheat className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs theme-text-muted font-medium">Cà Phê & Gạo</p>
            <p className="text-sm font-bold text-emerald-400">#2 Thế Giới</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl theme-card border flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs theme-text-muted font-medium">Thủy Sản (Tôm, Cá)</p>
            <p className="text-sm font-bold text-cyan-400">Top 3 Thế Giới</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl theme-card border flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs theme-text-muted font-medium">Tổng Kim Ngạch</p>
            <p className="text-sm font-bold text-lime-400">~$54 Tỷ USD</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Key Produce Exports Bar Chart */}
        <div className="p-7 rounded-[2rem] theme-card border space-y-4">
          <h3 className="text-base font-semibold tracking-tight">{t('chart.agriExports')}</h3>
          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VIETNAM_AGRI_EXPORTS} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis dataKey="product" type="category" stroke="#94a3b8" width={150} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-card)',
                    color: 'var(--text-main)',
                    borderRadius: '16px',
                    boxShadow: 'var(--card-shadow)',
                    backdropFilter: 'blur(12px)',
                  }}
                  formatter={(val: any, name: any, item: any) => [
                    `$${val} Tỷ USD (${item.payload.rank})`,
                    'Kim Ngạch',
                  ]}
                />
                <Bar dataKey="valueBillionUSD" fill="#84cc16" radius={[0, 12, 12, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agriculture Value Added % of GDP */}
        <div className="p-7 rounded-[2rem] theme-card border space-y-4">
          <h3 className="text-base font-semibold tracking-tight">{t('chart.agriGdpTrend')}</h3>
          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={agriGdpData.length ? agriGdpData : defaultAgriGdpData}>
                <defs>
                  <linearGradient id="agriGdpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#84cc16" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
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
                  formatter={(val: any) => [`${val}%`, 'Tỷ trọng trong GDP']}
                />
                <Area type="monotone" dataKey="value" stroke="#84cc16" strokeWidth={3} fillOpacity={1} fill="url(#agriGdpGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
