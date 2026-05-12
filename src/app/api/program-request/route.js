import { NextResponse } from 'next/server';
import { RealEmailSender } from '@/lib/emailSender';
import { CONFERENCE_ACCOUNTS } from '@/lib/auth';
import { escapeHtml } from '@/lib/utils';

export async function POST(req) {
  try {
    const { name, email, phone, conference = 'polymat' } = await req.json();
    
    if (!email || !name) {
      return NextResponse.json({ success: false, error: 'Name and Email required' }, { status: 400 });
    }

    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'polymat@sciengasummits.com';

    const emailSender = new RealEmailSender();
    
    // Admin notification
    await emailSender.sendEmail(
      adminEmail,
      `📩 Program Schedule Requested - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial; padding: 20px;"><h2>Program Schedule Request</h2><p>Name: ${escapeHtml(name)}</p><p>Email: ${escapeHtml(email)}</p><p>Phone: ${escapeHtml(phone || 'N/A')}</p></div>`,
      'PROGRAM',
      conference
    );

    // User confirmation
    await emailSender.sendEmail(
      email,
      `✅ Program Schedule Request Received - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial; padding: 20px;"><h2>Hello ${escapeHtml(name)},</h2><p>We received your request for the program schedule. Our team will get back to you shortly.</p></div>`,
      'PROGRAM',
      conference
    );

    return NextResponse.json({ success: true, message: 'Program request sent successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
