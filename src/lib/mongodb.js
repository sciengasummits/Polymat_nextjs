import mongoose from 'mongoose';
import dns from 'dns';

// ─── Critical Fix: Node.js c-ares DNS fails for mongodb.net on Windows ──────
dns.setDefaultResultOrder('ipv4first');

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 45000,
      socketTimeoutMS: 60000,
      connectTimeoutMS: 45000,
      heartbeatFrequencyMS: 10000,
      maxPoolSize: 5,
      minPoolSize: 1,
      family: 4,       // Force IPv4
      lookup: dns.lookup, // Use OS DNS resolver (fixes c-ares failures on Windows)
      bufferCommands: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
