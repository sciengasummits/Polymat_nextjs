import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';
import { isValidObjectId } from '@/lib/utils';

// Global cache to persist across hot reloads in development and speed up production
const mediaCache = global._mediaCache || (global._mediaCache = new Map());

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    if (!isValidObjectId(id)) return new Response('Invalid ID', { status: 400 });

    // Check memory cache first (instantly returns cached image buffer)
    const cached = mediaCache.get(id);
    if (cached) {
      return new Response(cached.buffer, {
        headers: {
          'Content-Type': cached.mimetype,
          'Content-Length': cached.buffer.length.toString(),
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    await connectDB();
    const media = await Media.findById(id).lean();
    if (!media) return new Response('Image not found', { status: 404 });

    const data = media.data.split(',')[1] || media.data;
    const imgBuffer = Buffer.from(data, 'base64');

    // Store in cache
    mediaCache.set(id, {
      buffer: imgBuffer,
      mimetype: media.mimetype,
    });

    return new Response(imgBuffer, {
      headers: {
        'Content-Type': media.mimetype,
        'Content-Length': imgBuffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error('Media fetch error:', err);
    return new Response('Server error', { status: 500 });
  }
}

