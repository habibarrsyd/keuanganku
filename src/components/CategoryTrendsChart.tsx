'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatBulanTahun } from '@/lib/currency';

interface CategoryTrendsChartProps {
  kategori: string;
  data: Array<{ bulan: string; total: number }>;
}

export default function CategoryTrendsChart({ kategori, data }: CategoryTrendsChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="card-base">
        <h3 className="text-lg font-semibold mb-4">Trend {kategori}</h3>
        <div className="text-gray-500 text-center py-8">Tidak ada data trend</div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    bulan: formatBulanTahun(item.bulan),
    total: item.total,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="text-sm font-semibold">{payload[0].payload.bulan}</p>
          <p className="text-sm text-blue-600">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-base">
      <h3 className="text-lg font-semibold mb-4">Trend {kategori}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bulan" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#4A6B5D"
            strokeWidth={2}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
