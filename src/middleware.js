import { NextResponse } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://polymatvortexsummit.com',
  'https://www.polymatvortexsummit.com',
  'https://sciengasummits.com',
  'https://www.sciengasummits.com',
];

export function middleware(req) {
  const origin = req.headers.get('origin');
  const res = NextResponse.next();

  if (origin) {
    let allowed = false;
    if (ALLOWED_ORIGINS.includes(origin)) allowed = true;
    else if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) allowed = true;
    else if (/^https:\/\/[a-z0-9-]+-sciengasummits[a-z0-9-]*\.vercel\.app$/.test(origin)) allowed = true;
    else if (/^https:\/\/sciengasummits[a-z0-9-]*\.vercel\.app$/.test(origin)) allowed = true;
    else if (/^https:\/\/litux-workflow[a-z0-9-]*\.vercel\.app$/.test(origin)) allowed = true;
    else if (/^https:\/\/[^.]+\.onrender\.com$/.test(origin)) allowed = true;
    else if (/^https:\/\/[a-z0-9-]+\.sciengasummits\.com$/.test(origin)) allowed = true;

    if (allowed) {
      res.headers.set('Access-Control-Allow-Origin', origin);
      res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
      res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.headers.set('Access-Control-Allow-Credentials', 'true');
    }
  }

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: res.headers });
  }

  return res;
}

export const config = {
  matcher: '/api/:path*',
};
