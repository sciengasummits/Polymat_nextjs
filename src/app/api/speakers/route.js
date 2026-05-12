import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Speaker from '@/models/Speaker';
import { verifyAuth } from '@/lib/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const conf = searchParams.get('conference') || 'polymat';

    const filter = { visible: true, conference: conf };
    if (category) filter.category = category;

    const speakers = await Speaker.find(filter).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(speakers);
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
    const speaker = new Speaker(body);
    await speaker.save();
    
    return NextResponse.json(speaker, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
