'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { IOrder } from '@/models/Order';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/orders/${id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Order not found or you do not have permission to view it.');
          }
          return res.json();
        })
        .then(data => {
          setOrder(data);
        })
        .catch(err => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading your order details...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }

  if (!order) {
    return <div className="text-center py-20">Could not find your order.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Thank You for Your Order!</h1>
        <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
        <p className="text-sm text-gray-500 mt-4">Order ID: {String(order._id ?? '')}</p>

        <div className="text-left border-t my-6 pt-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {order.orderItems.map(item => (
            <div key={item.menuItemId.toString()} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span className="font-medium">฿{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
            <span>Total</span>
            <span>฿{order.totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <div className="text-left border-t my-6 pt-6">
            <h2 className="text-xl font-semibold mb-2">Shipping to</h2>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
        </div>

        <Link href="/menu" className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors inline-block mt-4">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
