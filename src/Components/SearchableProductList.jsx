import React, { useState } from 'react';
import jewelryData from '../data/jewelryData.js';

function SearchableProductList({ onBuy }) {
  const [query, setQuery] = useState('');

  const filteredProducts = jewelryData.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    (product.description?.toLowerCase().includes(query.toLowerCase()) || false)
  );

  const shouldShowResults = query.trim().length > 0;

  const handleBuyClick = (product) => {
    onBuy(product);
    setQuery('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 mt-10">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search jewelry..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-5 py-3 text-base rounded-xl border border-[#d4a373] focus:outline-none focus:ring-2 focus:ring-[#d4a373] shadow-sm placeholder:text-[#b5835a] text-[#3e342e] bg-[#fffaf5] dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 transition-all"
        aria-label="Search jewelry products"
      />

      {/* Search Results */}
      {shouldShowResults && (
        <div className="mt-6">
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-8 ${filteredProducts.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-2 md:grid-cols-3'}`}>
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-md p-5 text-center flex flex-col items-center transition-transform hover:scale-[1.03] hover:shadow-xl"
                  role="listitem"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[#3e342e] dark:text-white font-playfair mb-1">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-[#7c6c60] dark:text-gray-300 mb-2">
                      {product.description}
                    </p>
                  )}
                  <span className="text-lg font-medium text-[#b5835a] dark:text-yellow-400 mb-4">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleBuyClick(product)}
                    className="px-6 py-2 rounded-2xl bg-gradient-to-br from-[#d4a373] to-[#b5835a] text-white font-semibold hover:scale-105 transition-transform shadow-md dark:from-yellow-600 dark:to-yellow-500"
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#7c6c60] dark:text-gray-400 text-base mt-6">
              No results found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchableProductList;
