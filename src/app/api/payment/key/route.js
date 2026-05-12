import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.RAZORPAY_KEY_ID;
  if (!key || key === 'rzp_test_YOUR_KEY_ID') {
    return NextResponse.json({ error: 'Razorpay is not configured' }, { status: 503 });
  }
  return NextResponse.json({ key });
}
