import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
  await dbConnect(5000);
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 } // 401 Unauthorized
      );
    }

    // Bandingkan password yang dikirim dengan yang ada di database
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    // Jika password cocok, buat token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' } // Token berlaku selama 1 hari
    );
    
    // Kirim response berhasil
    const response = NextResponse.json({
      message: 'Logged in successfully.',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    }, { status: 200 });

    // Set token di httpOnly cookie untuk keamanan
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 hari
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('LOGIN_ERROR', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
