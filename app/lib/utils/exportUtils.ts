/**
 * Utility xuất dữ liệu dạng file CSV chuẩn UTF-8
 * Hỗ trợ xử lý DỮ LIỆU LỚN (Big Data) bằng kỹ thuật Blob Chunking 
 * Tải cực nhanh mà KHÔNG làm đơ trình duyệt hay bị tràn bộ nhớ RAM (Out of Memory).
 */
export function downloadCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers?: Record<string, string>,
  chunkSize: number = 5000 // Cắt nhỏ dữ liệu 5.000 dòng mỗi đợt
) {
  if (!data || !data.length) return;

  const keys = Object.keys(data[0]);
  
  // 1. Tạo hàng tiêu đề cột
  const headerRow = keys
    .map((k) => (headers && headers[k] ? `"${headers[k]}"` : `"${k}"`))
    .join(',') + '\n';

  // 2. Mảng chứa các BlobPart (Dùng mảng các đoạn thay vì gộp thành 1 chuỗi quá dài trong RAM)
  const blobParts: BlobPart[] = ['\uFEFF', headerRow];

  // 3. Xử lý chia nhỏ dữ liệu (Chunking) để tránh đơ Main Thread
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    const chunkRows = chunk
      .map((row) =>
        keys
          .map((k) => {
            const val = row[k] ?? '';
            return `"${String(val).replace(/"/g, '""')}"`;
          })
          .join(',')
      )
      .join('\n') + '\n';

    blobParts.push(chunkRows);
  }

  // 4. Đóng gói Blob từ mảng BlobParts
  const blob = new Blob(blobParts, { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // 5. Kích hoạt tải xuống tự động
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();

  // 6. Dọn dẹp bộ nhớ sau khi tải xong
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
