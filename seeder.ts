// Import Mongoose dan model-model yang kita butuhkan
import mongoose from 'mongoose';
import dns from 'node:dns';
import dotenv from 'dotenv';
import MenuItem from './src/models/MenuItem';
import { menuItems } from './src/data/menuData';

// Paksa resolver DNS Node memakai DNS publik untuk menghindari timeout router/ISP
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Konfigurasi untuk membaca file .env.local
const dotenvResult = dotenv.config({ path: './.env.local' });
if (dotenvResult.error) {
  console.error('❌ Error loading .env.local file:', dotenvResult.error);
  process.exit(1);
}

// Izinkan override khusus seeder jika diperlukan
const MONGODB_URI = process.env.SEED_MONGODB_URI || process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

const connectDB = async () => {
  try {
  await mongoose.connect(MONGODB_URI, {
      // Mitigate DNS/IPv6 issues on some networks/ISPs
      serverSelectionTimeoutMS: 30000,
      family: 4,
    } as any);
    console.log('✅ MongoDB connected successfully for seeding.');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    // Hapus semua data lama untuk menghindari duplikasi
    await MenuItem.deleteMany();
    console.log('🗑️ Old menu items deleted.');

    // Masukkan data baru dari file menuData.ts
    await MenuItem.insertMany(menuItems);
  console.log('✅ Data imported successfully!');
  await mongoose.connection.close();
  process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
  try { await mongoose.connection.close(); } catch {}
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await MenuItem.deleteMany();
  console.log('🗑️ Data destroyed successfully!');
  await mongoose.connection.close();
  process.exit(0);
  } catch (error) {
    console.error('❌ Error destroying data:', error);
  try { await mongoose.connection.close(); } catch {}
    process.exit(1);
  }
};

const runSeeder = async () => {
  await connectDB();

  // Cek argumen dari command line
  // 'node seeder.ts -d' akan menghapus data
  // 'node seeder.ts' akan mengimpor data
  if (process.argv[2] === '-d') {
    await destroyData();
  } else {
    await importData();
  }
};

runSeeder();