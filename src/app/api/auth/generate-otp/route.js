import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import OTP from '@/models/OTP';
import { CONFERENCE_ACCOUNTS } from '@/lib/auth';
import { RealEmailSender } from '@/lib/emailSender';

export async function POST(req) {
  try {
    await connectDB();
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ success: false, message: 'Username is required.' }, { status: 400 });
    }

    const account = CONFERENCE_ACCOUNTS.find(acc => acc.username.toLowerCase() === username.toLowerCase());
    if (!account) {
      return NextResponse.json({ success: false, message: 'Username not found. Please check and try again.' }, { status: 401 });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTP.deleteMany({ username: account.username });
    await OTP.create({
      username: account.username,
      otp: otpCode,
      email: account.email,
      expiresAt: expiresAt,
      used: false
    });

    // Send email in background
    const emailSender = new RealEmailSender();
    emailSender.sendOTPEmail(account.email, otpCode, account.username, account.conferenceId)
      .then(result => {
        if (result.success) console.log(`✅ OTP email sent to: ${account.email}`);
        else console.log(`⚠️ OTP email failed: ${result.error}`);
      })
      .catch(err => console.error('❌ Background Email error:', err.message));

    return NextResponse.json({
      success: true,
      message: `OTP sent to ${account.email}`,
      email: account.email.replace(/(.{2}).*(@.*)/, '$1***$2'),
    });

  } catch (error) {
    console.error('Generate OTP error:', error);
    return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 });
  }
}
