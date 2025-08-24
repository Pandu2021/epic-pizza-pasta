import { NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '@/models/User';
import dbConnect from './dbConnect';

// Interface untuk payload token yang sudah di-decode
interface DecodedToken extends JwtPayload {
  userId: string;
  role: 'user' | 'admin';
}

export const isAdmin = async (req: NextRequest): Promise<boolean> => {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    if (decoded.role === 'admin') {
  // Opsi tambahan: verifikasi apakah user ID dari token benar-benar ada di database
  await dbConnect(5000);
  const user = await User.findById(decoded.userId);
      if (user && user.role === 'admin') {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};
