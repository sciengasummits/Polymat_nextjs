import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, message: 'Missing parameters.' }, { status: 400 });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: 'Invalid payment signature.' }, { status: 400 });
    }

    if (registrationId) {
      await connectDB();
      try {
        await Registration.findByIdAndUpdate(registrationId, {
          status: 'Paid',
          txnId: razorpay_payment_id,
        });
      } catch (dbErr) {
        console.warn(`Payment verified but failed to update registration: ${dbErr.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully.',
      paymentId: razorpay_payment_id,
    });

  } catch (err) {
    console.error('Payment verification error:', err);
    return NextResponse.json({ success: false, message: 'Verification failed.' }, { status: 500 });
  }
}
