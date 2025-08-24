import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { isAdmin } from '@/lib/isAdmin';

// GET /api/users - Admin only: list users (exclude password)
export async function GET(request: NextRequest) {
  try {
    const ok = await isAdmin(request);
    if (!ok) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const users = await User.find({}).select('-password');
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('USERS_GET_ERROR', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
