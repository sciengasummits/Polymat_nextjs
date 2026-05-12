import { NextResponse } from 'next/server';
import { RealEmailSender } from '@/lib/emailSender';
import { CONFERENCE_ACCOUNTS } from '@/lib/auth';
import { escapeHtml } from '@/lib/utils';

export async function POST(req) {
  try {
    const { name, email, number, conference = 'polymat' } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ success: false, error: 'Name and Email required' }, { status: 400 });
    }

    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'polymat@sciengasummits.com';

    const emailSender = new RealEmailSender();

    // Admin notification
    await emailSender.sendEmail(
      adminEmail,
      `📩 Brochure Download Request - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3478df, #2563eb); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Brochure Download Request</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">SCIENGASUMMITS 2026</p>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; margin: 0 0 20px 0;">New Brochure Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Name:</td><td style="padding: 8px 0; color: #1e293b;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #1e293b;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #1e293b;">${escapeHtml(number || 'N/A')}</td></tr>
          </table>
        </div>
      </div>`,
      'BROCHURE',
      conference
    );

    // User confirmation
    await emailSender.sendEmail(
      email,
      `✅ Brochure Access Granted - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3478df, #2563eb); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Conference Brochure</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">SCIENGASUMMITS 2026</p>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; margin: 0 0 20px 0;">Hello ${escapeHtml(name)},</h2>
          <p style="color: #64748b; margin: 0 0 20px 0;">Thank you for your interest in our conference! You now have access to download the official brochure.</p>
          <p style="color: #64748b; margin: 0 0 20px 0;">Visit the brochure page to download or view the digital version online.</p>
          <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0;">If you have any questions, feel free to reach out to us.</p>
        </div>
        <div style="text-align: center; margin-top: 20px; padding: 20px;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">© 2026 POLYMAT SUMMIT. All rights reserved.</p>
        </div>
      </div>`,
      'BROCHURE',
      conference
    );

    return NextResponse.json({ success: true, message: 'Brochure request sent successfully' });
  } catch (err) {
    console.error('Brochure request error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
