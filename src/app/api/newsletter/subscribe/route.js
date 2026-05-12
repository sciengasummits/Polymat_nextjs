import { NextResponse } from 'next/server';
import { RealEmailSender } from '@/lib/emailSender';
import { CONFERENCE_ACCOUNTS } from '@/lib/auth';
import { escapeHtml } from '@/lib/utils';

export async function POST(req) {
  try {
    const { email, conference = 'polymat' } = await req.json();
    
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
    }

    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'polymat@sciengasummits.com';

    const emailSender = new RealEmailSender();
    
    // Admin notification
    await emailSender.sendEmail(
      adminEmail,
      `📩 New Newsletter Subscription - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial; padding: 20px;"><h2>New Subscriber</h2><p>Email: ${escapeHtml(email)}</p></div>`,
      'SUBSCRIBE',
      conference
    );

    // User confirmation
    await emailSender.sendEmail(
      email,
      `✅ Subscription Confirmed - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial; padding: 20px;"><h2>Thank you for subscribing!</h2><p>You will now receive updates regarding the ${conference.toUpperCase()} conference.</p></div>`,
      'SUBSCRIBE',
      conference
    );

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
