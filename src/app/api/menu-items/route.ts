import dbConnect from '@/lib/dbConnect';
import MenuItem from '@/models/MenuItem';
import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/isAdmin';

// Handler untuk GET request (mengambil semua item menu)
export async function GET() {
  try {
    await dbConnect();
    const menuItems = await MenuItem.find({});
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    console.error('MENU_ITEMS_GET_ERROR', error);
    // Pastikan selalu mengembalikan JSON, bahkan saat error
    return NextResponse.json(
      { message: 'An internal server error occurred while fetching menu items.' },
      { status: 500 }
    );
  }
}

// Handler untuk POST request (membuat item menu baru)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const isAdminUser = await isAdmin(request);
    if (!isAdminUser) {
      return NextResponse.json(
        { message: 'Unauthorized: Admin access required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const menuItem = new MenuItem(body);
    await menuItem.save();

    return NextResponse.json(
      { message: 'Menu item created successfully.', data: menuItem },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('MENU_ITEMS_POST_ERROR', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json({ message: error.message, errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'An internal server error occurred while creating menu item.' },
      { status: 500 }
    );
  }
}
