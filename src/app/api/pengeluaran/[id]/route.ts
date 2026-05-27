import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json(
        { error: 'ID harus berupa angka' },
        { status: 400 }
      );
    }

    const result = await db.deletePengeluaran(parsedId);
    if (!result) {
      return NextResponse.json(
        { error: 'Pengeluaran tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/pengeluaran/[id] error:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus pengeluaran' },
      { status: 500 }
    );
  }
}
