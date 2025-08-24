'use client';

import { useEffect, useState } from 'react';
import MenuItemCard from '../menu/MenuItemCard';
import { IMenuItem } from '@/models/MenuItem';

export default function HomeMenu() {
  const [featuredItems, setFeaturedItems] = useState<IMenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/menu-items')
      .then(res => res.json())
      .then((items: IMenuItem[]) => {
        if (Array.isArray(items)) {
          setFeaturedItems(items.slice(0, 3));
        } else {
          setFeaturedItems([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch featured items:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Best Sellers</h2>
        <p className="text-gray-600 mt-2">Taste what everyone is talking about.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center col-span-3">Loading best sellers...</p>
        ) : featuredItems && featuredItems.length > 0 ? (
          featuredItems
            .filter(item => item && item._id) // Filter pengaman
            .map(item => (
              <MenuItemCard key={String(item._id)} item={item} />
            ))
        ) : (
          <p className="text-center col-span-3">Could not load best sellers at this time.</p>
        )}
      </div>
    </section>
  );
}
