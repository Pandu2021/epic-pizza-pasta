'use client';

import { useEffect, useState } from 'react';
import MenuItemCard from '@/components/menu/MenuItemCard';
import CategoryFilters from '@/components/menu/CategoryFilters';
import { IMenuItem } from '@/models/MenuItem';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<IMenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/menu-items');
        if (!res.ok) {
          const msg = await res.text().catch(() => '');
          throw new Error(`HTTP ${res.status} ${res.statusText} ${msg}`.trim());
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setMenuItems(data as IMenuItem[]);
          setFilteredItems(data as IMenuItem[]);
        } else {
          console.error('Unexpected response shape from /api/menu-items:', data);
          setMenuItems([]);
          setFilteredItems([]);
        }
      } catch (err) {
        console.error('Failed to fetch menu items:', err);
        setMenuItems([]);
        setFilteredItems([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter(item => item.category === category);
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Our Menu</h1>
        <p className="text-gray-600 mt-2">Explore our delicious offerings, crafted with the finest ingredients.</p>
      </div>

      <CategoryFilters
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {loading ? (
        <p className="text-center">Loading menu, please wait...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* PERBAIKAN: Filter item yang tidak valid sebelum di-map */}
          {Array.isArray(filteredItems) ? filteredItems
            .filter(item => item && item._id)
            .map(item => (
              <MenuItemCard key={String(item._id)} item={item} />
            )) : null}
        </div>
      )}
    </div>
  );
}
