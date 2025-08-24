import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import MenuItem from '@/models/MenuItem';
import User from '@/models/User'; // Import User model
import jwt, { JwtPayload } from 'jsonwebtoken';

// Helper function to get user ID from token
interface DecodedToken extends JwtPayload {
  userId: string;
}

const getUserIdFromToken = (req: NextRequest): string | null => {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return decoded.userId;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};


export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    // Verifikasi apakah user benar-benar ada di database
    const userExists = await User.findById(userId);
    if (!userExists) {
        return NextResponse.json({ message: 'Unauthorized. User not found.' }, { status: 401 });
    }

    const body = await request.json();
  const { orderItems, shippingAddress, totalPrice } = body;

    // Validasi input yang lebih ketat
  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return NextResponse.json({ message: 'Cannot create order with no items.' }, { status: 400 });
    }
    if (!shippingAddress || typeof shippingAddress !== 'object') {
        return NextResponse.json({ message: 'Shipping address is required and must be an object.' }, { status: 400 });
    }
    if (typeof totalPrice !== 'number' || totalPrice <= 0) {
        return NextResponse.json({ message: 'Total price is invalid.' }, { status: 400 });
    }

    // Normalize and validate order items to ensure menuItemId is a valid ObjectId
    const normalizedItems = [] as any[];
    for (const it of orderItems) {
      // Accept either real ObjectId strings or try to resolve by name when client sent static placeholder
      let menuItemId = it.menuItemId as string | undefined;
      if (!menuItemId || menuItemId.includes('-')) {
        // try resolve by exact name match from DB
        const dbItem = await MenuItem.findOne({ name: it.name }).select('_id name');
        if (!dbItem) {
          return NextResponse.json({ message: `Menu item not found: ${it.name}` }, { status: 400 });
        }
        menuItemId = String(dbItem._id);
      }
      normalizedItems.push({
        name: it.name,
        quantity: it.quantity,
        price: it.price,
        menuItemId,
      });
    }

    const order = new Order({
      user: userId,
      orderItems: normalizedItems,
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();

    return NextResponse.json(createdOrder, { status: 201 });

  } catch (error: any) {
    console.error('ORDER_CREATION_ERROR', error);

    // Menangani error jika body request bukan JSON yang valid
    if (error instanceof SyntaxError) {
        return NextResponse.json({ message: 'Invalid JSON in request body.' }, { status: 400 });
    }

    // Menangani error validasi dari Mongoose
    if (error.name === 'ValidationError') {
        return NextResponse.json({ message: 'Validation Error', errors: error.errors }, { status: 400 });
    }

    // Error default untuk masalah lainnya
    return NextResponse.json(
      { message: 'An internal server error occurred while creating the order.' },
      { status: 500 }
    );
  }
}
