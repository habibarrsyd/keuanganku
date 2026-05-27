'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/currency';

interface WeeklySpendingChartProps {
  data: Array<{ minggu: string; total: number }>;
}

export default function WeeklySpendingChart({ data }: WeeklySpendingChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="card-base">
        <h3 className="text-lg font-semibold mb-4">Pengeluaran Per Minggu</h3>
        <div className="text-gray-500 text-center py-8">Tidak ada data minggu</div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="text-sm font-semibold">{payload[0].payload.minggu}</p>
          <p className="text-sm text-green-600">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-base">
      <h3 className="text-lg font-semibold mb-4">Pengeluaran Per Minggu</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="minggu" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total" fill="#3B7A57" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
