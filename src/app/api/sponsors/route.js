import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sponsor from '@/models/Sponsor';
import { verifyAuth } from '@/lib/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const conf = searchParams.get('conference') || 'polymat';

    const filter = { visible: true, conference: conf };
    if (type) filter.type = type;

    const sponsors = await Sponsor.find(filter).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(sponsors);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const auth = verifyAuth(req);
    if (!auth) return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const sponsor = new Sponsor(body);
    await sponsor.save();
    
    return NextResponse.json(sponsor, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
