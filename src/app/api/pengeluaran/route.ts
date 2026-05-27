import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bulanTahun = searchParams.get('bulan_tahun');

    if (!bulanTahun) {
      return NextResponse.json(
        { error: 'Parameter bulan_tahun diperlukan' },
        { status: 400 }
      );
    }

    const data = await db.getPengeluaranByBulan(bulanTahun);
    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('GET /api/pengeluaran error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data pengeluaran' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tanggal, kategori, kegiatan, jumlah } = body;

    // Validation
    if (!tanggal || !kategori || !kegiatan || !jumlah) {
      return NextResponse.json(
        { error: 'tanggal, kategori, kegiatan, dan jumlah diperlukan' },
        { status: 400 }
      );
    }

    if (isNaN(jumlah) || jumlah <= 0) {
      return NextResponse.json(
        { error: 'Jumlah harus angka positif' },
        { status: 400 }
      );
    }

    const result = await db.createPengeluaran(
      tanggal,
      kategori,
      kegiatan,
      parseFloat(jumlah)
    );
    return NextResponse.json({ data: result, success: true }, { status: 201 });
  } catch (error) {
    console.error('POST /api/pengeluaran error:', error);
    return NextResponse.json(
      { error: 'Gagal membuat pengeluaran' },
      { status: 500 }
    );
  }
}
