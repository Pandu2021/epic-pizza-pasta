import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User, { IUser } from '@/models/User';

interface DecodedToken extends JwtPayload {
  userId: string;
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    
    const user: IUser | null = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Invalid token or server error' }, { status: 401 });
  }
}
