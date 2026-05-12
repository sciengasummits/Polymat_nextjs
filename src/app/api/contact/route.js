import { NextResponse } from 'next/server';
import { RealEmailSender } from '@/lib/emailSender';
import { CONFERENCE_ACCOUNTS } from '@/lib/auth';
import { escapeHtml } from '@/lib/utils';

export async function POST(req) {
  try {
    const { name, email, subject, message, conference = 'polymat' } = await req.json();
    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'polymat@sciengasummits.com';

    const emailSender = new RealEmailSender();
    
    // Admin notification
    await emailSender.sendEmail(
      adminEmail,
      `📩 Contact Inquiry: ${subject} - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial; padding: 20px;"><h2>New Contact Message</h2><p>From: ${escapeHtml(name)} (${email})</p><p>Subject: ${escapeHtml(subject)}</p><p>Message: ${escapeHtml(message)}</p></div>`,
      'CONTACT',
      conference
    );

    // User confirmation
    await emailSender.sendEmail(
      email,
      `✅ We received your message - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial; padding: 20px;"><h2>Message Received</h2><p>Hello ${escapeHtml(name)}, thank you for reaching out.</p></div>`,
      'CONTACT',
      conference
    );

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
