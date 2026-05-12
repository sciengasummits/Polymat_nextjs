import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

let razorpayInstance = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export async function POST(req) {
  try {
    if (!razorpayInstance) {
      return NextResponse.json({ success: false, error: 'Razorpay is not configured' }, { status: 503 });
    }

    const { amount, currency = 'USD', registrationId, conference = 'polymat', description = 'Conference Registration' } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid amount.' }, { status: 400 });
    }

    const razorpayCurrency = process.env.RAZORPAY_CURRENCY || 'INR';
    const USD_TO_INR = parseFloat(process.env.USD_TO_INR_RATE) || 84;

    let finalAmount = amount;
    if (razorpayCurrency === 'INR' && currency.toUpperCase() === 'USD') {
      finalAmount = Math.round(amount * USD_TO_INR);
    }

    const amountInSmallestUnit = Math.round(finalAmount * 100);

    const options = {
      amount: amountInSmallestUnit,
      currency: razorpayCurrency,
      receipt: `rcpt_${conference}_${Date.now()}`,
      notes: { conference, registrationId: registrationId || '', description, amountUSD: amount },
    };

    const order = await razorpayInstance.orders.create(options);
    
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        amountUSD: amount
      },
    });

  } catch (err) {
    console.error('Razorpay order error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
