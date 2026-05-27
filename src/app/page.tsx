'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { FinancialChart } from '@/components/FinancialChart';
import { DailySpendingChart } from '@/components/DailySpendingChart';
import MonthlyComparisonChart from '@/components/MonthlyComparisonChart';
import TopCategoriesWidget from '@/components/TopCategoriesWidget';
import CategoryTrendsChart from '@/components/CategoryTrendsChart';
import WeeklySpendingChart from '@/components/WeeklySpendingChart';
import YearToDateSummary from '@/components/YearToDateSummary';
import ExportButton from '@/components/ExportButton';
import { formatCurrency, getCurrentMonthYear, generateMonthOptions, formatBulanTahun } from '@/lib/currency';

interface Transaction {
  id: number;
  type: string;
  kategori: string;
  kegiatan: string;
  jumlah: number;
  created_at: string;
}

export default function Dashboard() {
  const [bulanTahun, setBulanTahun] = useState<string>(getCurrentMonthYear());
  const [summary, setSummary] = useState({ totalPemasukan: 0, totalPengeluaran: 0, sisa: 0 });
  const [chartData, setChartData] = useState<any[]>([]);
  const [dailySpendingData, setDailySpendingData] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  
  // New analytics data
  const [monthlyComparisonData, setMonthlyComparisonData] = useState<any[]>([]);
  const [topCategoriesData, setTopCategoriesData] = useState<any[]>([]);
  const [categoryTrendsData, setCategoryTrendsData] = useState<any[]>([]);
  const [weeklySpendings, setWeeklySpendings] = useState<any[]>([]);
  const [yearToDateData, setYearToDateData] = useState({ totalPemasukan: 0, totalPengeluaran: 0, sisa: 0 });
  const [dailyAverage, setDailyAverage] = useState({ average: 0, max_daily: 0, min_daily: 0 });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const monthOptions = generateMonthOptions(12);

  const getPreviousMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    date.setMonth(date.getMonth() - 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch main dashboard data
        const dashResponse = await fetch(`/api/dashboard?bulanTahun=${bulanTahun}`);
        if (!dashResponse.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const dashData = await dashResponse.json();
        setSummary(dashData.summary);
        setChartData(dashData.chartData);
        setDailySpendingData(dashData.dailySpending);
        setRecentTransactions(dashData.recentTransactions as Transaction[]);

        // Fetch monthly comparison (current vs previous)
        const prevMonth = getPreviousMonth(bulanTahun);
        const comparisonResponse = await fetch(
          `/api/analytics/monthly-comparison?month1=${prevMonth}&month2=${bulanTahun}`
        );
        if (comparisonResponse.ok) {
          const comparisonData = await comparisonResponse.json();
          setMonthlyComparisonData(comparisonData.data);
        }

        // Fetch top categories
        const topCatResponse = await fetch(`/api/analytics/top-categories?bulanTahun=${bulanTahun}`);
        if (topCatResponse.ok) {
          const topCatData = await topCatResponse.json();
          setTopCategoriesData(topCatData.data);

          // Fetch trends for top category if exists
          if (topCatData.data && topCatData.data.length > 0) {
            const trendsResponse = await fetch(
              `/api/analytics/category-trends?kategori=${topCatData.data[0].kategori}`
            );
            if (trendsResponse.ok) {
              const trendsData = await trendsResponse.json();
              setCategoryTrendsData(trendsData.data);
            }
          }
        }

        // Fetch weekly spending
        const weeklyResponse = await fetch(`/api/analytics/weekly-spending?bulanTahun=${bulanTahun}`);
        if (weeklyResponse.ok) {
          const weeklyData = await weeklyResponse.json();
          setWeeklySpendings(weeklyData.data);
        }

        // Fetch year-to-date summary
        const tahun = bulanTahun.split('-')[0];
        const ytdResponse = await fetch(`/api/analytics/year-summary?tahun=${tahun}`);
        if (ytdResponse.ok) {
          const ytdData = await ytdResponse.json();
          setYearToDateData(ytdData.data);
        }

        // Fetch daily average
        const avgResponse = await fetch(`/api/analytics/daily-average?bulanTahun=${bulanTahun}`);
        if (avgResponse.ok) {
          const avgData = await avgResponse.json();
          setDailyAverage(avgData.data);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error('Error fetching dashboard data:', errorMessage);
        setError(`Gagal memuat data: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bulanTahun]);

  return (
    <main className="min-h-screen bg-[#FBFBFA] py-8 pb-24 lg:pb-8">
      <div className="container-max">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-text-dark">Dashboard</h1>
            <ExportButton bulanTahun={bulanTahun} />
          </div>
          
          {/* Month Selector */}
          <Select
            value={bulanTahun}
            onChange={(e) => setBulanTahun(e.target.value)}
            options={monthOptions}
            className="w-full lg:w-64"
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#FFEBEE] text-negative rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Pemasukan Card */}
          <Card className="border-l-4 border-l-positive">
            <CardContent>
              <p className="text-sm text-text-muted mb-2">Pemasukan</p>
              <p className="text-2xl font-bold text-text-dark">
                {formatCurrency(summary.totalPemasukan)}
              </p>
            </CardContent>
          </Card>

          {/* Pengeluaran Card */}
          <Card className="border-l-4 border-l-negative">
            <CardContent>
              <p className="text-sm text-text-muted mb-2">Pengeluaran</p>
              <p className="text-2xl font-bold text-text-dark">
                {formatCurrency(summary.totalPengeluaran)}
              </p>
            </CardContent>
          </Card>

          {/* Sisa Card */}
          <Card className="bg-primary-light border-l-4 border-l-primary">
            <CardContent>
              <p className="text-sm text-text-muted mb-2">Sisa Uang</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(summary.sisa)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Spending Alert */}
        {dailyAverage.average > 0 && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              💡 <strong>Rata-rata Pengeluaran Harian:</strong> {formatCurrency(dailyAverage.average)} 
              (Tertinggi: {formatCurrency(dailyAverage.max_daily)}, 
              Terendah: {formatCurrency(dailyAverage.min_daily)})
            </p>
          </div>
        )}

        {/* Daily Spending Chart */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <DailySpendingChart 
                data={dailySpendingData}
                title={`Pengeluaran Harian - ${formatBulanTahun(bulanTahun)}`}
              />
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Comparison Chart */}
          {monthlyComparisonData.length > 0 && (
            <MonthlyComparisonChart data={monthlyComparisonData} />
          )}

          {/* Weekly Spending Chart */}
          {weeklySpendings.length > 0 && (
            <WeeklySpendingChart data={weeklySpendings} />
          )}
        </div>

        {/* Category Breakdown and Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Category Chart */}
          <div className="lg:col-span-2">
            <FinancialChart 
              data={chartData} 
              title={`Pengeluaran per Kategori - ${formatBulanTahun(bulanTahun)}`}
            />
          </div>

          {/* Top Categories Widget */}
          {topCategoriesData.length > 0 && (
            <TopCategoriesWidget data={topCategoriesData} />
          )}
        </div>

        {/* Category Trends */}
        {categoryTrendsData.length > 0 && topCategoriesData.length > 0 && (
          <div className="mb-8">
            <CategoryTrendsChart 
              kategori={topCategoriesData[0].kategori} 
              data={categoryTrendsData} 
            />
          </div>
        )}

        {/* Year-to-Date Summary */}
        <div className="mb-8">
          <YearToDateSummary 
            data={yearToDateData} 
            tahun={bulanTahun.split('-')[0]} 
          />
        </div>

        {/* Recent Transactions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Transaksi Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentTransactions.length === 0 ? (
                  <p className="text-text-muted text-sm text-center py-4">
                    Tidak ada transaksi
                  </p>
                ) : (
                  recentTransactions.map((tx) => (
                    <div key={`${tx.type}-${tx.id}`} className="pb-3 border-b border-border-light last:border-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-semibold text-text-dark">
                          {tx.type === 'pemasukan' ? tx.kategori : tx.kategori}
                        </p>
                        <p className={`text-sm font-bold ${
                          tx.type === 'pemasukan' ? 'text-positive' : 'text-negative'
                        }`}>
                          {tx.type === 'pemasukan' ? '+' : '-'}{formatCurrency(tx.jumlah)}
                        </p>
                      </div>
                      {tx.kegiatan && (
                        <p className="text-xs text-text-muted">{tx.kegiatan}</p>
                      )}
                      <p className="text-xs text-text-muted mt-1">
                        {new Date(tx.created_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
