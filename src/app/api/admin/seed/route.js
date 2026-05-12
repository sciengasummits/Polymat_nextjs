import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SiteContent from '@/models/SiteContent';
import { conferences } from '@/lib/seedData';

export async function POST(req) {
  try {
    // Basic security: require a secret header or check for dev mode
    const authHeader = req.headers.get('x-seed-secret');
    if (process.env.NODE_ENV === 'production' && authHeader !== process.env.ADMIN_SECRET) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const mergeDefaults = ['hero', 'about'];

    for (const { name: confName, defaults } of conferences) {
      for (const item of defaults) {
        if (mergeDefaults.includes(item.key)) {
          const existing = await SiteContent.findOne({ conference: confName, key: item.key });
          if (!existing) {
            await SiteContent.create({ conference: confName, key: item.key, data: item.data });
          } else {
            const patch = {};
            for (const [field, value] of Object.entries(item.data)) {
              if (existing.data[field] === undefined || existing.data[field] === null || existing.data[field] === '') {
                patch[`data.${field}`] = value;
              }
            }
            if (Object.keys(patch).length > 0) {
              await SiteContent.updateOne({ conference: confName, key: item.key }, { $set: patch });
            }
          }
        } else {
          await SiteContent.findOneAndUpdate(
            { conference: confName, key: item.key },
            { $setOnInsert: { conference: confName, key: item.key, data: item.data } },
            { upsert: true, new: true }
          );
        }
      }
      console.log(`✅ Default data seeded (${confName})`);
    }

    return NextResponse.json({ success: true, message: 'Database seeded successfully' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
