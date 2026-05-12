import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_me';

export const CONFERENCE_ACCOUNTS = [
  {
    username: 'FOODAGRISUMMIT2026',
    email: process.env.FOODAGRI_EMAIL || 'food@sciengasummits.com',
    conferenceId: 'foodagri',
    displayName: 'FOOD AGRI SUMMIT 2026',
  },
  {
    username: 'FLUIDMECHSUMMIT2026',
    email: process.env.FLUID_EMAIL || 'fluid@sciengasummits.com',
    conferenceId: 'fluid',
    displayName: 'FLUID MECHANICS & TURBOMACHINERY 2026',
  },
  {
    username: 'RENEWABLECLISUMMIT2026',
    email: process.env.RENEWABLE_EMAIL || 'renewable@sciengasummits.com',
    conferenceId: 'renewable',
    displayName: 'RENEWABLE ENERGY & CLIMATE CHANGE 2026',
  },
  {
    username: 'CYBERQUANTUMSUMMIT2026',
    email: process.env.CYBER_EMAIL || 'contact@cyberquantumsummit.com',
    conferenceId: 'cyber',
    displayName: 'CYBERSECURITY & QUANTUM COMPUTING 2026',
  },
  {
    username: 'POWERENGSUMMIT2026',
    email: process.env.POWERENG_EMAIL || 'contact@powerenergysummit.com',
    conferenceId: 'powereng',
    displayName: 'POWER ENERGY & ELECTRICAL ENGINEERING 2026',
  },
  {
    username: 'POLYMATSUMMIT2026',
    email: process.env.POLYMAT_EMAIL || 'contact@polymatsummit.com',
    conferenceId: 'polymat',
    displayName: 'ANNUAL INTERNATIONAL CONFERENCE ON POLYMERS AND COMPOSITE MATERIALS 2026',
  },
  {
    username: 'IQCES2026',
    email: process.env.IQCES_EMAIL || 'quantumengineering@sciengasummits.com',
    conferenceId: 'iqces2026',
    displayName: 'QUANTUM COMPUTING & ENGINEERING 2026',
  },
];

export function verifyAuth(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}
