import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'POLYMAT Dashboard Next.js API running' });
}
