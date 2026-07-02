import { NextResponse } from 'next/server';
import { getPortfolioContent, savePortfolioContent } from '@/lib/portfolio-service';

export async function GET() {
  const content = await getPortfolioContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const saved = await savePortfolioContent(payload);
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
