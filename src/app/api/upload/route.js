import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get('image');
    const conference = formData.get('conference') || 'polymat';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`;

    const media = new Media({
      filename: file.name,
      mimetype: file.type,
      data: dataUrl,
      conference
    });

    await media.save();

    const host = req.headers.get('host') || 'localhost:3000';
    const proto = req.headers.get('x-forwarded-proto') || 'http';
    const url = `${proto}://${host}/api/media/${media._id}`;

    return NextResponse.json({
      url,
      id: media._id,
      filename: media.filename,
      message: 'Image saved to MongoDB successfully'
    });

  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
