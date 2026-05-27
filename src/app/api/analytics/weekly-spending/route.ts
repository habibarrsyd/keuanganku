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

    const data = await db.getWeeklySpending(bulanTahun);
    
    return Response.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Failed to fetch weekly spending', details: String(error) },
      { status: 500 }
    );
  }
}
