import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SiteContent from '@/models/SiteContent';
import { verifyAuth } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { key } = await params;
    const { searchParams } = new URL(req.url);
    const conf = searchParams.get('conference') || 'polymat';

    const item = await SiteContent.findOne({ conference: conf, key });
    if (!item) return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    
    return NextResponse.json(item.data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const auth = verifyAuth(req);
    if (!auth) return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });

    await connectDB();
    const { key } = await params;
    const body = await req.json();
    const { conference: conf = 'polymat', _items, ...bodyData } = body;

    let updateOp;
    if (_items !== undefined) {
      updateOp = { $set: { data: _items, conference: conf } };
    } else {
      const patch = {};
      for (const [field, value] of Object.entries(bodyData)) {
        patch[`data.${field}`] = value;
      }
      updateOp = { $set: { ...patch, conference: conf } };
    }

    const result = await SiteContent.findOneAndUpdate(
      { conference: conf, key },
      updateOp,
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ success: true, data: result.data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
