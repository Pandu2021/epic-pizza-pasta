'use client';

import { useCart } from '@/context/CartContext';
import { Trash2 } from 'lucide-react'; // Ikon tong sampah
import Link from 'next/link'; // <-- Pastikan Link diimpor

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/menu" className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
          Go to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          {cartItems.map(item => (
            <div key={item._id} className="flex items-center justify-between border-b py-4 last:border-b-0">
              <div className="flex-grow">
                <p className="font-bold text-lg">{item.name}</p>
                <p className="text-gray-600">฿{item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center border rounded-full">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-3 py-1">-</button>
                  <span className="px-3">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-3 py-1">+</button>
                </div>
                {/* Subtotal */}
                <p className="w-24 text-right font-semibold">฿{(item.price * item.quantity).toLocaleString()}</p>
                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label={`Remove ${item.name} from cart`}
                  title={`Remove ${item.name} from cart`}
                >
                  <Trash2 size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-bold border-b pb-4">Order Summary</h2>
          <div className="flex justify-between mt-4">
            <p>Subtotal</p>
            <p>฿{cartTotal.toLocaleString()}</p>
          </div>
          <div className="flex justify-between mt-2 text-gray-500">
            <p>Taxes & Fees</p>
            <p>Calculated at checkout</p>
          </div>
          <div className="flex justify-between font-bold text-xl mt-4 border-t pt-4">
            <p>Total</p>
            <p>฿{cartTotal.toLocaleString()}</p>
          </div>
          {/* --- PERBAIKAN DI SINI --- */}
          <Link href="/checkout" className="block w-full bg-red-600 text-white mt-6 py-3 rounded-full font-bold text-center hover:bg-red-700 transition-colors">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
