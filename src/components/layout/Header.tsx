'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext'; // <-- Import useAuth

export default function Header() {
  const { cartItems } = useCart();
  const { user, isAuthenticated, loading, logout } = useAuth(); // <-- Get auth state

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Pizza Project Logo"
            width={100}
            height={50}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">Home</Link>
          <Link href="/menu" className="text-gray-700 hover:text-red-600 transition-colors">Menu</Link>
          <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {!loading && (
            <>
              {isAuthenticated && user ? (
                <>
                  <span className="text-gray-700 hidden sm:block">Hello, {user.email}</span>
                  <button onClick={logout} className="text-gray-700 hover:text-red-600 transition-colors">Logout</button>
                </>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-red-600 transition-colors">Login</Link>
              )}
            </>
          )}
          <Link href="/cart" className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors flex items-center gap-2">
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="bg-red-700 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
