import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FootballCard from '../components/FootballCard';
import shirtsData from '../data/shirtsData';

const Shop = ({ onAddToCart, setAllProducts }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const location = useLocation();
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'ყველა კატეგორია' },
    { id: 'retro', name: 'რეტრო მაისურები' },
    { id: 'kids-retro', name: 'საბავშვო რეტრო მაისურები' },
    { id: 'player-2025-2026', name: '2025-2026 სეზონის მაისურები (მოთამაშის ვერსია)' },
    { id: 'fan-2025-2026', name: '2025-2026 სეზონის მაისურები (ფან ვერსია)' },
  ];

  useEffect(() => {
    // გადაეცემა პროდუქტის სია მშობელ კომპონენტს (App.jsx)
    setAllProducts(shirtsData);
  }, [setAllProducts]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam && categories.some(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('all');
    }
  }, [location.search]);

  const filteredShirts = useMemo(() => {
    const filtered = shirtsData.filter(shirt => {
      const matchesCategory = selectedCategory === 'all' || shirt.category === selectedCategory;
      const price = shirt.price;
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      const matchesMinPrice = isNaN(min) || price >= min;
      const matchesMaxPrice = isNaN(max) || price <= max;
      return matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    const uniqueShirtsMap = new Map();
    filtered.forEach(shirt => {
      if (!uniqueShirtsMap.has(shirt.id)) {
        uniqueShirtsMap.set(shirt.id, shirt);
      }
    });

    return Array.from(uniqueShirtsMap.values());
  }, [minPrice, maxPrice, selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'all') {
      navigate('/shop');
    } else {
      navigate(`/shop?category=${categoryId}`);
    }
  };

  return (
    <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto font-sans text-gray-900 dark:text-gray-100 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-12 text-center text-gray-800 dark:text-gray-100 tracking-wide drop-shadow-sm">
        საფეხბურთო მაისურები
      </h1>

      {/* Filters & Categories */}
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 mb-14 flex flex-col gap-8">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm sm:text-base transition-colors duration-300
                ${selectedCategory === cat.id
                  ? 'bg-green-600 text-white shadow-lg shadow-green-400/50 transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-700 hover:text-green-700 dark:hover:text-green-300'}
                focus:outline-none focus:ring-4 focus:ring-green-400/60`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 max-w-xl mx-auto w-full">
          <div className="flex-1">
            <label
              htmlFor="min-price"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              მინ. ფასი:
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 dark:text-gray-500">₾</span>
              <input
                type="number"
                id="min-price"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                placeholder="0"
                className="w-full pl-9 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-transparent shadow-sm transition duration-300"
              />
            </div>
          </div>
          <div className="flex-1">
            <label
              htmlFor="max-price"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              მაქს. ფასი:
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 dark:text-gray-500">₾</span>
              <input
                type="number"
                id="max-price"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                placeholder="500"
                className="w-full pl-9 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-transparent shadow-sm transition duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      {filteredShirts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fadeInProducts">
          {filteredShirts.map(shirt => (
            <FootballCard key={shirt.id} shirt={shirt} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-xl font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-3xl shadow-lg transition-colors duration-300">
          ვერ მოიძებნა მაისურები თქვენი ფილტრების შესაბამისად.
        </div>
      )}

      <style>{`
        @keyframes fadeInProducts {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInProducts {
          animation: fadeInProducts 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Shop;
