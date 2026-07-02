import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === expectedPassword) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: 'Incorrect password' }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
