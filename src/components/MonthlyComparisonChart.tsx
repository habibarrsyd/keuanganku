'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatBulanTahun } from '@/lib/currency';

interface MonthlyComparisonChartProps {
  data: Array<{ bulan: string; total: number }>;
}

export default function MonthlyComparisonChart({ data }: MonthlyComparisonChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-gray-500 text-center py-8">Tidak ada data perbandingan</div>;
  }

  const chartData = data.map((item) => ({
    bulan: formatBulanTahun(item.bulan),
    pengeluaran: item.total,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="text-sm font-semibold">{payload[0].payload.bulan}</p>
          <p className="text-sm text-red-600">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-base">
      <h3 className="text-lg font-semibold mb-4">Perbandingan Bulan</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bulan" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="pengeluaran" fill="#C86B55" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
