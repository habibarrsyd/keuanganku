'use client';

import { formatCurrency } from '@/lib/currency';

interface TopCategoriesWidgetProps {
  data: Array<{ kategori: string; total: number; transaksi: number }>;
}

export default function TopCategoriesWidget({ data }: TopCategoriesWidgetProps) {
  if (!data || data.length === 0) {
    return (
      <div className="card-base">
        <h3 className="text-lg font-semibold mb-4">Kategori Terbanyak</h3>
        <div className="text-gray-500 text-center py-8">Tidak ada data</div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="card-base">
      <h3 className="text-lg font-semibold mb-4">Kategori Terbanyak</h3>
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = ((item.total / total) * 100).toFixed(1);
          return (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium text-sm">{item.kategori}</p>
                  <p className="text-xs text-gray-500">{item.transaksi} transaksi</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{formatCurrency(item.total)}</p>
                  <p className="text-xs text-gray-500">{percentage}%</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
