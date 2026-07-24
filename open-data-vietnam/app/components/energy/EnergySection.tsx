'use client';

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { VIETNAM_ENERGY_MIX } from '../../lib/constants';
import { IWorldBankDataPoint } from '../../lib/interface';

interface IEnergySectionProps {
  urbanData?: IWorldBankDataPoint[];
}

const defaultUrbanData: IWorldBankDataPoint[] = [
  { year: '2000', value: 24.4 },
  { year: '2005', value: 27.3 },
  { year: '2010', value: 30.4 },
  { year: '2015', value: 33.6 },
  { year: '2020', value: 37.3 },
  { year: '2024', value: 40.2 },
];

export const EnergySection: React.FC<IEnergySectionProps> = ({
  urbanData = defaultUrbanData,
}) => {
  const { t } = useLanguage();

  return (
    <section id="energy" className="scroll-mt-20 py-8 space-y-8 animate-scroll-entry">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
          <span className="w-2.5 h-7 rounded-full bg-gradient-to-b from-amber-400 to-yellow-500 inline-block shadow-sm" />
          {t('energy.title')}
        </h2>
        <p className="mt-2 theme-text-muted text-sm max-w-2xl font-normal">{t('energy.desc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* National Energy Mix Donut Chart */}
        <div className="p-7 rounded-[2rem] theme-card border space-y-4">
          <h3 className="text-base font-semibold tracking-tight">{t('chart.energyMix')}</h3>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={VIETNAM_ENERGY_MIX}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={6}
                  dataKey="pct"
                  nameKey="source"
                  cornerRadius={6}
                >
                  {VIETNAM_ENERGY_MIX.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="var(--bg-card)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-card)',
                    color: 'var(--text-main)',
                    borderRadius: '16px',
                    boxShadow: 'var(--card-shadow)',
                    backdropFilter: 'blur(12px)',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Tỷ trọng']}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Urbanization Trend Line Chart */}
        <div className="p-7 rounded-[2rem] theme-card border space-y-4">
          <h3 className="text-base font-semibold tracking-tight">{t('chart.urbanization')}</h3>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={urbanData.length ? urbanData : defaultUrbanData}>
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
                  formatter={(val: any) => [`${val}%`, 'Tỷ lệ Đô thị hóa']}
                />
                <Line type="monotone" dataKey="value" stroke="#fbbf24" strokeWidth={3} dot={{ r: 5, fill: '#fbbf24', strokeWidth: 2, stroke: 'var(--bg-card)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

