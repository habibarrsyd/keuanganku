'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/lib/currency';

interface DailySpendingData {
  tanggal: string;
  total: string | number;
}

interface DailySpendingChartProps {
  data: DailySpendingData[];
  title?: string;
}

export function DailySpendingChart({ data, title = 'Pengeluaran Harian' }: DailySpendingChartProps) {
  // Handle empty atau invalid data
  if (!data || data.length === 0) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold text-text-dark mb-4">{title}</h3>
        <div className="w-full h-80 bg-white rounded-lg p-4 border border-[#E8E8E8] flex items-center justify-center">
          <p className="text-text-muted">Tidak ada data pengeluaran untuk bulan ini</p>
        </div>
      </div>
    );
  }

  // Format data untuk chart
  const chartData = data
    .map((item) => {
      try {
        const dateObj = new Date(item.tanggal);
        return {
          date: dateObj.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
          }),
          tanggal: item.tanggal,
          total: typeof item.total === 'string' ? parseInt(item.total) : Number(item.total),
        };
      } catch (e) {
        console.error('Error parsing date:', item.tanggal, e);
        return null;
      }
    })
    .filter((d) => d !== null) as any[];

  if (chartData.length === 0) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold text-text-dark mb-4">{title}</h3>
        <div className="w-full h-80 bg-white rounded-lg p-4 border border-[#E8E8E8] flex items-center justify-center">
          <p className="text-text-muted">Tidak ada data pengeluaran untuk bulan ini</p>
        </div>
      </div>
    );
  }

  // Hitung statistik
  const totalSpending = chartData.reduce((sum, item) => sum + item.total, 0);
  const avgDaily = chartData.filter((d) => d.total > 0).length > 0
    ? totalSpending / chartData.filter((d) => d.total > 0).length
    : 0;
  const maxSpending = chartData.length > 0 ? Math.max(...chartData.map((d) => d.total)) : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-[#E8E8E8] rounded shadow-md">
          <p className="text-sm text-text-dark font-semibold">{payload[0].payload.tanggal}</p>
          <p className="text-sm text-positive font-bold">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-text-dark mb-4">{title}</h3>
      <div className="mb-6">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#E8F5E9] to-[#F1F8F5] p-4 rounded-lg">
            <p className="text-sm text-text-muted mb-1">Total Pengeluaran</p>
            <p className="text-lg font-bold text-positive">{formatCurrency(totalSpending)}</p>
          </div>
          <div className="bg-gradient-to-br from-[#F3E5F5] to-[#FCE4EC] p-4 rounded-lg">
            <p className="text-sm text-text-muted mb-1">Rata-rata Harian</p>
            <p className="text-lg font-bold text-primary">{formatCurrency(avgDaily)}</p>
          </div>
          <div className="bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] p-4 rounded-lg">
            <p className="text-sm text-text-muted mb-1">Pengeluaran Tertinggi</p>
            <p className="text-lg font-bold text-negative">{formatCurrency(maxSpending)}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-80 bg-white rounded-lg p-4 border border-[#E8E8E8]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
              <XAxis
                dataKey="date"
                stroke="#717672"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#717672"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `Rp ${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3B7A57"
                strokeWidth={3}
                dot={{ fill: '#3B7A57', r: 5 }}
                activeDot={{ r: 7 }}
                name="Pengeluaran"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-text-muted">Tidak ada data pengeluaran untuk bulan ini</p>
          </div>
        )}
      </div>
    </div>
  );
}
