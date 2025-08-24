import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
  await dbConnect(5000);
    const { email, password } = await request.json();

    // Cek apakah email atau password kosong
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Cek apakah pengguna sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists.' },
        { status: 409 } // 409 Conflict
      );
    }

    // Buat pengguna baru
    // Password akan di-hash secara otomatis oleh pre-save hook di model User
    const user = new User({ email, password });
    await user.save();

    return NextResponse.json(
      { message: 'User created successfully.' },
      { status: 201 } // 201 Created
    );

  } catch (error) {
    console.error('REGISTRATION_ERROR', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
