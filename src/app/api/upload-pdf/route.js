import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { verifyAuth } from '@/lib/auth';
import { buildFileUrl } from '@/lib/utils';
import { existsSync } from 'fs';

export async function POST(req) {
  try {
    const auth = verifyAuth(req);
    if (!auth) return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) await mkdir(uploadsDir, { recursive: true });

    const uniqueName = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase()}`;
    const filePath = join(uploadsDir, uniqueName);

    await writeFile(filePath, buffer);

    const host = req.headers.get('host') || 'localhost:3000';
    const proto = req.headers.get('x-forwarded-proto') || 'http';
    const url = `${proto}://${host}/uploads/${uniqueName}`;

    return NextResponse.json({
      url,
      filename: uniqueName,
      originalName: file.name
    });

  } catch (err) {
    console.error('File upload error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
