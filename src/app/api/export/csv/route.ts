import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bulanTahun = searchParams.get('bulanTahun') || '';

    if (!bulanTahun) {
      return Response.json(
        { error: 'bulanTahun is required' },
        { status: 400 }
      );
    }

    const pengeluaran = await db.getAllPengeluaranForExport(bulanTahun);
    const summary = await db.getDashboardSummary(bulanTahun);

    // Generate CSV
    const headers = ['Tanggal', 'Kategori', 'Kegiatan', 'Jumlah'];
    const rows = pengeluaran.map((row: any) => [
      row.tanggal,
      row.kategori,
      row.kegiatan,
      row.jumlah,
    ]);

    const csv =
      [headers, ...rows]
        .map((row: any[]) => row.map((cell: any) => `"${cell}"`).join(','))
        .join('\n') +
      '\n\n' +
      `Ringkasan Bulan ${bulanTahun}\n` +
      `Total Pemasukan,${summary.totalPemasukan}\n` +
      `Total Pengeluaran,${summary.totalPengeluaran}\n` +
      `Sisa,${summary.sisa}`;

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="laporan-${bulanTahun}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Failed to export CSV', details: String(error) },
      { status: 500 }
    );
  }
}
