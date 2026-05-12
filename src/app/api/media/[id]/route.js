import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';
import { isValidObjectId } from '@/lib/utils';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    if (!isValidObjectId(id)) return new Response('Invalid ID', { status: 400 });

    const media = await Media.findById(id);
    if (!media) return new Response('Image not found', { status: 404 });

    const data = media.data.split(',')[1] || media.data;
    const imgBuffer = Buffer.from(data, 'base64');

    return new Response(imgBuffer, {
      headers: {
        'Content-Type': media.mimetype,
        'Content-Length': imgBuffer.length,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (err) {
    console.error('Media fetch error:', err);
    return new Response('Server error', { status: 500 });
  }
}
