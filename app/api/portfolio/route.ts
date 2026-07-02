import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { getPortfolioContent, savePortfolioContent } from '@/lib/portfolio-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const content = await getPortfolioContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const saved = await savePortfolioContent(payload);
    revalidatePath('/');
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
