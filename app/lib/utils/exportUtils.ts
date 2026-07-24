/**
 * Utility xuất dữ liệu dạng file CSV chuẩn UTF-8 (mở được trên Microsoft Excel / Google Sheets không bị lỗi font Tiếng Việt)
 */
export function downloadCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers?: Record<string, string>
) {
  if (!data || !data.length) return;

  const keys = Object.keys(data[0]);
  
  // Tiêu đề cột
  const headerRow = keys
    .map((k) => (headers && headers[k] ? `"${headers[k]}"` : `"${k}"`))
    .join(',');

  // Dữ liệu từng hàng
  const rows = data.map((row) =>
    keys
      .map((k) => {
        const val = row[k] ?? '';
        return `"${String(val).replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  // Ký tự \uFEFF đại diện cho UTF-8 BOM giúp Excel đọc đúng tiếng Việt
  const csvContent = '\uFEFF' + [headerRow, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
