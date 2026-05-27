'use client';

import { formatCurrency } from '@/lib/currency';

interface YearToDateSummaryProps {
  data: {
    totalPemasukan: number;
    totalPengeluaran: number;
    sisa: number;
  };
  tahun: string;
}

export default function YearToDateSummary({ data, tahun }: YearToDateSummaryProps) {
  return (
    <div className="card-base">
      <h3 className="text-lg font-semibold mb-4">Ringkasan Tahun {tahun}</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Total Pemasukan</p>
          <p className="text-lg font-bold text-green-600">{formatCurrency(data.totalPemasukan)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Total Pengeluaran</p>
          <p className="text-lg font-bold text-red-600">{formatCurrency(data.totalPengeluaran)}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Sisa</p>
          <p className={`text-lg font-bold ${data.sisa >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {formatCurrency(data.sisa)}
          </p>
        </div>
      </div>
    </div>
  );
}
