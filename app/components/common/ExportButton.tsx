'use client';

import React from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import { downloadCSV } from '../../lib/utils/exportUtils';
import { useLanguage } from '../../context/LanguageContext';

interface IExportButtonProps {
  data: Record<string, any>[];
  filename: string;
  headers?: Record<string, string>;
  label?: string;
}

export const ExportButton: React.FC<IExportButtonProps> = ({
  data,
  filename,
  headers,
  label,
}) => {
  const { t } = useLanguage();

  const handleExport = () => {
    downloadCSV(data, filename, headers);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl theme-card text-xs font-semibold hover:border-emerald-500/40 hover:text-emerald-400 transition-all active:scale-95 group shadow-sm"
      title={t('export.tooltip')}
    >
      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
      <span>{label || t('export.csv')}</span>
      <Download className="w-3 h-3 theme-text-muted group-hover:text-emerald-400 transition-colors" />
    </button>
  );
};
