import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get('kategori') || '';
    const months = parseInt(searchParams.get('months') || '6');

    if (!kategori) {
      return Response.json(
        { error: 'kategori is required' },
        { status: 400 }
      );
    }

    const data = await db.getCategoryTrends(kategori, months);
    
    return Response.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Failed to fetch category trends', details: String(error) },
      { status: 500 }
    );
  }
}
