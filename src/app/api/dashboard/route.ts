import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bulanTahun = searchParams.get('bulanTahun');

    if (!bulanTahun) {
      return NextResponse.json(
        { error: 'bulanTahun parameter is required' },
        { status: 400 }
      );
    }

    console.log('Fetching dashboard data for:', bulanTahun);

    const summaryData = await db.getDashboardSummary(bulanTahun);
    const kategoriData = await db.getPengeluaranByKategori(bulanTahun);
    const recentTransactions = await db.getRecentTransactions(bulanTahun, 10);
    const dailySpending = await db.getDailySpending(bulanTahun);

    console.log('Daily spending data:', dailySpending?.length || 0, 'days');

    return NextResponse.json({
      summary: summaryData,
      chartData: kategoriData.map((item: any) => ({
        name: item.kategori,
        value: Number(item.total),
      })),
      recentTransactions,
      dailySpending: dailySpending || [],
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Dashboard API error:', errorMessage);
    console.error('Full error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch dashboard data',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
