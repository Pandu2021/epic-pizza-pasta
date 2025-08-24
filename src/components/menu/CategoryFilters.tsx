'use client';

// Tipe untuk props, termasuk fungsi yang akan dipanggil saat kategori berubah
interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = ['all', 'pizza', 'pasta', 'appetizer', 'dessert'];

export default function CategoryFilters({ selectedCategory, onSelectCategory }: CategoryFiltersProps) {
  return (
    <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full font-semibold text-sm md:text-base transition-colors capitalize
            ${selectedCategory === category
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
