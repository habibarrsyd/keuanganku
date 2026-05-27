import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tahun = searchParams.get('tahun') || new Date().getFullYear().toString();

    const data = await db.getYearToDateSummary(tahun);
    
    return Response.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Failed to fetch year-to-date summary', details: String(error) },
      { status: 500 }
    );
  }
}
