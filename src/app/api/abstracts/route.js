import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Abstract from '@/models/Abstract';
import { RealEmailSender } from '@/lib/emailSender';
import { CONFERENCE_ACCOUNTS } from '@/lib/auth';
import { escapeHtml } from '@/lib/utils';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const conf = searchParams.get('conference') || 'polymat';
    const abstracts = await Abstract.find({ conference: conf }).sort({ createdAt: -1 });
    return NextResponse.json(abstracts);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const abs = new Abstract(body);
    await abs.save();

    const { name, email, title, conference = 'polymat' } = body;
    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'polymat@sciengasummits.com';
    const siteUrl = process.env.FRONTEND_URL || 'https://polymatvortexsummit.com';

    const emailSender = new RealEmailSender();
    
    // User confirmation
    emailSender.sendEmail(
      email,
      `✅ Abstract Submission Received - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial; padding: 20px;"><h2>Abstract Received</h2><p>Hello ${escapeHtml(name)}, your abstract "${escapeHtml(title)}" has been received.</p></div>`,
      'ABSTRACT',
      conference
    ).catch(e => console.error('User email error:', e.message));

    // Admin notification
    emailSender.sendEmail(
      adminEmail,
      `📄 New Abstract Submission - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial; padding: 20px;"><h2>New Abstract</h2><p>Name: ${escapeHtml(name)}</p><p>Email: ${email}</p><p>Title: ${escapeHtml(title)}</p></div>`,
      'ABSTRACT',
      conference
    ).catch(e => console.error('Admin email error:', e.message));

    return NextResponse.json(abs, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
