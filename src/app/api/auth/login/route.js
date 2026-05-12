import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import OTP from '@/models/OTP';
import { CONFERENCE_ACCOUNTS, generateToken } from '@/lib/auth';

export async function POST(req) {
  try {
    await connectDB();
    const { username, otp } = await req.json();

    if (!username || !otp) {
      return NextResponse.json({ success: false, message: 'Username and OTP are required.' }, { status: 400 });
    }

    const account = CONFERENCE_ACCOUNTS.find(acc => acc.username.toLowerCase() === username.toLowerCase());
    if (!account) {
      return NextResponse.json({ success: false, message: 'Username not found. Please check and try again.' }, { status: 401 });
    }

    if (otp === '____') {
      return NextResponse.json({ success: false, message: 'Invalid OTP. Please try again.' }, { status: 401 });
    }

    const otpRecord = await OTP.findOne({
      username: account.username,
      otp: otp,
      used: false,
      expiresAt: { $gt: new Date() }
    });

    if (!otpRecord) {
      return NextResponse.json({ success: false, message: 'Invalid or expired OTP. Please try again.' }, { status: 401 });
    }

    otpRecord.used = true;
    await otpRecord.save();

    const token = generateToken({
      username: account.username,
      conferenceId: account.conferenceId,
      displayName: account.displayName,
    });

    return NextResponse.json({
      success: true,
      message: 'Login successful.',
      token,
      username: account.username,
      conferenceId: account.conferenceId,
      displayName: account.displayName,
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 });
  }
}
