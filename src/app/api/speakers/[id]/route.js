import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Speaker from '@/models/Speaker';
import { verifyAuth } from '@/lib/auth';
import { isValidObjectId } from '@/lib/utils';

export async function PUT(req, { params }) {
  try {
    const auth = verifyAuth(req);
    if (!auth) return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    if (!isValidObjectId(id)) return NextResponse.json({ error: 'Invalid speaker ID' }, { status: 400 });

    const body = await req.json();
    const speaker = await Speaker.findByIdAndUpdate(id, body, { new: true });
    if (!speaker) return NextResponse.json({ error: 'Speaker not found' }, { status: 404 });
    
    return NextResponse.json(speaker);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = verifyAuth(req);
    if (!auth) return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    if (!isValidObjectId(id)) return NextResponse.json({ error: 'Invalid speaker ID' }, { status: 400 });

    await Speaker.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
