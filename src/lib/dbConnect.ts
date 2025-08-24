// Mengimpor library mongoose
import mongoose from 'mongoose';
import dns from 'node:dns';
let __dnsConfigured = false;

// TypeScript butuh kita untuk mendefinisikan tipe dari variabel global
declare global {
  var mongoose: any; // mendeklarasikan variabel global mongoose
}

// Mengambil URI MongoDB dari file .env.local
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Default timeout to match mongoose server selection timeout
const SERVER_SELECTION_TIMEOUT_MS = 10000;

/**
 * Koneksi global digunakan untuk caching.
 * Di lingkungan serverless, kita ingin menggunakan kembali koneksi yang ada
 * daripada membuat koneksi baru setiap kali fungsi serverless dipanggil.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(timeoutMs: number = 0) {
  // Paksa resolver DNS publik, mitigasi timeout resolver router/ISP terhadap SRV/TXT MongoDB Atlas
  if (!__dnsConfigured) {
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
      __dnsConfigured = true;
      console.log('🔧 Using public DNS resolvers (8.8.8.8, 1.1.1.1)');
    } catch (e) {
      console.warn('DNS_SET_SERVERS_WARNING', e);
    }
  }

  // Jika koneksi sudah ada, gunakan koneksi yang sudah di-cache
  if (cached.conn) {
    console.log('🚀 Using cached database connection');
    return cached.conn;
  }

  // Jika tidak ada promise koneksi, buat yang baru
  if (!cached.promise) {
    // Opsi koneksi dengan timeout yang masuk akal dan paksa IPv4
    const opts: any = {
      bufferCommands: false,
      serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT_MS,
      family: 4,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('\u2705 New database connection established');
        return mongoose;
      });
  }

  // Tunggu promise koneksi selesai dan simpan koneksinya
  try {
    if (timeoutMs && timeoutMs > 0) {
      const effectiveTimeout = Math.max(
        timeoutMs,
        // fallback ke default nilai serverSelectionTimeoutMS
        SERVER_SELECTION_TIMEOUT_MS
      );
      console.log('DB_CONNECT: using effective timeout (ms) =', effectiveTimeout);

      // race between connect promise and timeout to fail fast for API routes
      cached.conn = await Promise.race([
        cached.promise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('DB_CONNECT_TIMEOUT')), effectiveTimeout)
        ),
      ]);
    } else {
      cached.conn = await cached.promise;
    }
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  // Kembalikan koneksi yang berhasil
  return cached.conn;
}

export default dbConnect;
