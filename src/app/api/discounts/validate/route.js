import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Discount from '@/models/Discount';

export async function POST(req) {
  try {
    const body = await req.json();
    const { coupon, conference = 'polymat' } = body;

    if (!coupon) {
      return NextResponse.json({ valid: false, message: 'Coupon code required' }, { status: 400 });
    }

    await connectDB();
    const doc = await Discount.findOne({ conference, coupon: coupon.toUpperCase(), active: true });

    if (!doc) {
      return NextResponse.json({ valid: false, message: 'Invalid or inactive coupon' });
    }

    return NextResponse.json({
      valid: true,
      percentage: doc.percentage,
      category: doc.category,
      coupon: doc.coupon
    });
  } catch (err) {
    return NextResponse.json({ valid: false, message: err.message }, { status: 500 });
  }
}
