'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: 'Thailand',
  });
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    const orderData = {
      orderItems: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        menuItemId: item._id,
      })),
      shippingAddress: address,
      totalPrice: cartTotal,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to place order.');
      }

      clearCart();
      // --- PERBAIKAN DI SINI ---
      // Arahkan ke halaman konfirmasi dengan ID pesanan yang baru
      router.push(`/order-confirmation/${data._id}`); 

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (authLoading) {
    return <div className="text-center py-20">Loading your session...</div>;
  }
  
  if (!isAuthenticated) {
    router.push('/login?redirect=/checkout');
    return <div className="text-center py-20">Redirecting to login...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">You can't checkout without any pizza!</p>
        <Link href="/menu" className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
              <input type="text" name="street" id="street" value={address.street} onChange={handleAddressChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" name="city" id="city" value={address.city} onChange={handleAddressChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"/>
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input type="text" name="postalCode" id="postalCode" value={address.postalCode} onChange={handleAddressChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"/>
              </div>
            </div>
             <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input type="text" name="country" id="country" value={address.country} onChange={handleAddressChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"/>
              </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-bold border-b pb-4">Your Order</h2>
          <div className="mt-4 space-y-2">
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span className="font-medium">฿{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-xl mt-4 border-t pt-4">
            <p>Total</p>
            <p>฿{cartTotal.toLocaleString()}</p>
          </div>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-md my-4 text-sm">{error}</p>}
          <button type="submit" disabled={isProcessing} className="w-full bg-red-600 text-white mt-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors disabled:bg-gray-400">
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
