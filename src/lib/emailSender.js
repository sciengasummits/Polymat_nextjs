import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Per-conference email sender.
 * Each conference has its own Gmail account + App Password so OTPs
 * arrive from the matching address (e.g. food@sciengasummits.com).
 *
 * Falls back to the legacy SMTP_USER / SMTP_PASS if a conference-specific
 * password has not been set yet.
 */
export class RealEmailSender {
    constructor() {
        // Legacy / fallback credentials
        this._defaultUser = process.env.SMTP_USER || 'polymat@sciengasummits.com';
        this._defaultPass = (process.env.SMTP_PASS || '').replace(/\s/g, '');

        // Per-conference credential map  { conferenceId → { user, pass } }
        this._accounts = {
            polymat: {
                user: process.env.POLYMAT_SMTP_USER || this._defaultUser,
                pass: (process.env.POLYMAT_SMTP_PASS || this._defaultPass).replace(/\s/g, ''),
            },
            foodagri: {
                user: process.env.FOODAGRI_SMTP_USER || this._defaultUser,
                pass: (process.env.FOODAGRI_SMTP_PASS || this._defaultPass).replace(/\s/g, ''),
            },
            fluid: {
                user: process.env.FLUID_SMTP_USER || this._defaultUser,
                pass: (process.env.FLUID_SMTP_PASS || this._defaultPass).replace(/\s/g, ''),
            },
            renewable: {
                user: process.env.RENEWABLE_SMTP_USER || this._defaultUser,
                pass: (process.env.RENEWABLE_SMTP_PASS || this._defaultPass).replace(/\s/g, ''),
            },
            cyber: {
                user: process.env.CYBER_SMTP_USER || this._defaultUser,
                pass: (process.env.CYBER_SMTP_PASS || this._defaultPass).replace(/\s/g, ''),
            },
            powereng: {
                user: process.env.POWERENG_SMTP_USER || this._defaultUser,
                pass: (process.env.POWERENG_SMTP_PASS || this._defaultPass).replace(/\s/g, ''),
            },
            iqces: {
                user: process.env.IQCES_SMTP_USER || this._defaultUser,
                pass: (process.env.IQCES_SMTP_PASS || this._defaultPass).replace(/\s/g, ''),
            },
        };

        // Build one transporter per conference account
        this._transporters = {};
        for (const [confId, creds] of Object.entries(this._accounts)) {
            // If the password is a placeholder or empty, we'll fall back to the
            // default transporter at send time instead of crashing at startup.
            if (!creds.pass || creds.pass.startsWith('REPLACE_WITH')) {
                console.warn(`⚠️  No valid SMTP password for "${confId}" — will fall back to polymat sender`);
                continue;
            }

            this._transporters[confId] = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: creds.user, pass: creds.pass },
            });
        }

        // Always build a default/fallback transporter (polymat)
        this._defaultTransporter = this._transporters['polymat'] || nodemailer.createTransport({
            service: 'gmail',
            auth: { user: this._defaultUser, pass: this._defaultPass },
        });

        // Backward-compat: keep .user / .pass / .transporter so nothing else breaks
        this.user = this._defaultUser;
        this.pass = this._defaultPass;
        this.transporter = this._defaultTransporter;
    }

    /**
     * Send an email using the conference-specific sender when available.
     * @param {string} to          - Recipient address
     * @param {string} subject     - Email subject
     * @param {string} htmlContent - HTML body
     * @param {string} otp         - OTP value (also sent as plain-text)
     * @param {string} [conferenceId] - Optional: 'polymat' | 'foodagri' | 'fluid' | 'renewable'
     */
    async sendEmail(to, subject, htmlContent, otp, conferenceId) {
        // Pick the right transporter
        const transporter = (conferenceId && this._transporters[conferenceId])
            ? this._transporters[conferenceId]
            : this._defaultTransporter;

        const fromUser = (conferenceId && this._accounts[conferenceId] && this._transporters[conferenceId])
            ? this._accounts[conferenceId].user
            : this.user;

        try {
            console.log(`📧 Attempting Gmail send → from: ${fromUser}  to: ${to}`);

            const info = await transporter.sendMail({
                from: `"Conference Management System" <${fromUser}>`,
                to,
                subject,
                html: htmlContent,
                text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
            });

            console.log(`✅ Email sent! Message ID: ${info.messageId}`);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error(`❌ Nodemailer Gmail error:`, error.message);
            return { success: false, error: error.message };
        }
    }

    async sendOTPEmail(email, otp, username, conferenceId) {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">Conference Management System</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">SCIENGASUMMITS 2026</p>
                </div>
                
                <div style="background: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
                    <h2 style="color: #1e293b; margin: 0 0 20px 0;">Your Login OTP</h2>
                    <p style="color: #64748b; margin: 0 0 20px 0;">
                        Hello! You've requested to login to the Conference Management System with username: <strong>${username}</strong>
                    </p>
                    
                    <div style="background: white; border: 2px solid #6366f1; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                        <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">Your 6-digit OTP is:</p>
                        <div style="font-size: 32px; font-weight: bold; color: #6366f1; letter-spacing: 8px; font-family: monospace;">${otp}</div>
                    </div>
                    
                    <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
                        <p style="color: #92400e; margin: 0; font-size: 14px;">
                            <strong>⚠️ Important:</strong> This OTP is valid for <strong>10 minutes</strong> only. 
                            Do not share this code with anyone.
                        </p>
                    </div>
                    
                    <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0;">
                        If you didn't request this OTP, please ignore this email or contact support.
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 20px; padding: 20px;">
                    <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                        © 2026 POLYMAT SUMMIT. All rights reserved.
                    </p>
                </div>
            </div>
        `;
        return await this.sendEmail(email, 'Your Login OTP - Conference Management System', htmlContent, otp, conferenceId);
    }
}