import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month1 = searchParams.get('month1') || '';
    const month2 = searchParams.get('month2') || '';

    if (!month1 || !month2) {
      return Response.json(
        { error: 'month1 and month2 are required' },
        { status: 400 }
      );
    }

    const data = await db.getMonthlyComparison(month1, month2);
    
    return Response.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Failed to fetch comparison data', details: String(error) },
      { status: 500 }
    );
  }
}
