'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { IMenuItem } from '@/models/MenuItem';

interface MenuItemCardProps {
  item: IMenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      _id: String(item._id),
      name: item.name,
      price: item.basePrice,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <div className="relative h-48 w-full">
        <Image 
          src={item.image} 
          alt={item.name} 
          layout="fill" 
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Menambahkan prop sizes
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/ef4444/ffffff?text=Image+Error'; }} // Fallback jika gambar error
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 mt-2 text-sm h-16 overflow-hidden flex-grow">
          {item.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">
            ฿{item.basePrice.toLocaleString()}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
