import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await dbConnect();

    // Cari pesanan berdasarkan ID dan ambil email pengguna yang terkait
    const order = await Order.findById(id).populate('user', 'email');

    if (!order) {
      return NextResponse.json({ message: 'Order not found.' }, { status: 404 });
    }

    // Untuk keamanan, di aplikasi nyata Anda akan memverifikasi
    // bahwa pengguna yang meminta adalah pemilik pesanan ini.
    // Untuk saat ini, kita akan langsung mengembalikannya.

    return NextResponse.json(order, { status: 200 });

  } catch (error) {
    console.error('GET_ORDER_ERROR', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
