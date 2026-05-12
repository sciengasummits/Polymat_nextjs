import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SiteContent from '@/models/SiteContent';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const conf = searchParams.get('conference') || 'polymat';
    
    const all = await SiteContent.find({ conference: conf });
    const result = {};
    all.forEach(item => { result[item.key] = item.data; });
    
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
