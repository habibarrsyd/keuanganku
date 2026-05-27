/**
 * Currency Formatting Helper
 * Untuk format Rupiah dan parsing input
 */

/**
 * Format number ke format Rupiah dengan separator ribuan
 * Contoh: 50000 -> "Rp 50.000"
 * @param value - Nilai numerik
 * @param includePrefix - Tambahkan prefix "Rp"? (default: true)
 * @returns String format Rupiah
 */
export function formatCurrency(
  value: number | string,
  includePrefix: boolean = true
): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return '';

  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numValue);

  // Intl returns "Rp50.000,00" format, kita ubah ke "Rp 50.000"
  return formatted.replace(',00', '').replace(/,/g, '.');
}

/**
 * Format currency tanpa prefix "Rp"
 * Contoh: 50000 -> "50.000"
 */
export function formatCurrencyNoPrefix(value: number | string): string {
  const formatted = formatCurrency(value, true);
  return formatted.replace(/^Rp\s?/, '');
}

/**
 * Parse input Rupiah ke angka numerik
 * Contoh: "Rp 50.000" -> 50000
 * Contoh: "50000" -> 50000
 * Contoh: "50.000" -> 50000
 */
export function parseCurrency(value: string): number {
  // Remove "Rp" prefix and spaces
  let cleaned = value.replace(/[^\d.]/g, '');
  // Replace dot with empty string (dot is thousands separator in id-ID)
  cleaned = cleaned.replace(/\./g, '');
  return parseInt(cleaned, 10) || 0;
}

/**
 * Format tanggal ke format lokal Indonesia
 * Contoh: 2026-05-27 -> "27 Mei 2026"
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Jakarta',
  };

  return dateObj.toLocaleDateString('id-ID', options);
}

/**
 * Format waktu ke format lokal Indonesia
 * Contoh: 14:30:45 -> "14:30"
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  };

  return dateObj.toLocaleTimeString('id-ID', options);
}

/**
 * Format datetime lengkap
 * Contoh: "27 Mei 2026, 14:30"
 */
export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)}, ${formatTime(date)}`;
}

/**
 * Convert bulan tahun format MM ke nama bulan
 * Contoh: "2026-05" -> "Mei 2026"
 */
export function formatBulanTahun(bulanTahun: string): string {
  const [tahun, bulan] = bulanTahun.split('-');
  const date = new Date(`${tahun}-${bulan}-01`);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  };

  return date.toLocaleDateString('id-ID', options);
}

/**
 * Get current month-year in format YYYY-MM
 * Contoh: "2026-05"
 */
export function getCurrentMonthYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

/**
 * Generate array of months untuk month selector
 * @param months - Jumlah bulan ke belakang dari sekarang (default: 12)
 */
export function generateMonthOptions(months: number = 12): Array<{
  value: string;
  label: string;
}> {
  const options = [];
  const now = new Date();

  for (let i = 0; i < months; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const value = `${year}-${month}`;
    const label = formatBulanTahun(value);

    options.push({ value, label });
  }

  return options;
}

/**
 * Hitung selisih antara dua nilai untuk percentage change
 * Berguna untuk menampilkan trend (up/down)
 */
export function calculatePercentageChange(
  current: number,
  previous: number
): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

/**
 * Format percentage dengan simbol + atau -
 * Contoh: 15 -> "+15%", -10 -> "-10%"
 */
export function formatPercentage(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value}%`;
}
