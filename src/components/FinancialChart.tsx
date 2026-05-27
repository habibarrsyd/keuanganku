'use client';

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface FinancialChartProps {
  data: ChartData[];
  title?: string;
}

const COLORS = ['#4A6B5D', '#3B7A57', '#C86B55', '#717672', '#E8EFE9'];

export function FinancialChart({ data, title }: FinancialChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white rounded-xl border border-border-light">
        <p className="text-text-muted text-sm">Tidak ada data untuk ditampilkan</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl p-6 border border-border-light">
      {title && <h3 className="text-lg font-semibold text-text-dark mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              `Rp ${(value as number).toLocaleString('id-ID')}`
            }
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E8E8',
              borderRadius: '8px',
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
            }}
            formatter={(value) => <span className="text-xs text-text-muted">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
