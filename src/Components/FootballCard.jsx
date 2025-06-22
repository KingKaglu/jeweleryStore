import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const FootballCard = ({ shirt, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(shirt);
    setIsAdded(true);

    toast.success(`"${shirt.name}" დაემატა კალათაში 🛒`, {
      icon: "✅",
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      theme: "light",
    });

    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform group border border-gray-100 dark:border-gray-700">
      
      {/* Image */}
      <div className="relative w-full h-60 md:h-72 overflow-hidden">
        <img
          src={shirt.image}
          alt={shirt.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between flex-grow sm:p-6">
        <div className="flex-grow">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-2 text-gray-900 dark:text-white leading-tight">
            {shirt.name}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {shirt.description}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-3">
          <span className="text-2xl font-bold text-green-700 dark:text-green-400 whitespace-nowrap">
            ₾{shirt.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full sm:w-auto px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4
              ${isAdded
                ? "bg-green-400 text-white cursor-not-allowed scale-100"
                : "bg-green-600 hover:bg-green-700 text-white hover:scale-105 focus:ring-green-500"}`}
            aria-label={`კალათაში დამატება: ${shirt.name}`}
          >
            {isAdded ? "დამატებულია!" : "კალათაში დამატება"}
          </button>
        </div>

        {/* View Details */}
        <Link to={`/product/${shirt.id}`} className="mt-4 block">
          <button
            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            aria-label={`დეტალების ნახვა: ${shirt.name}`}
          >
            დეტალების ნახვა
          </button>
        </Link>

        {/* Mobile Cart Button - Always visible on mobile */}
        <Link to="/cart" className="sm:hidden mt-3">
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow-md transition duration-200"
            aria-label="კალათის ნახვა"
          >
            კალათის ნახვა
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FootballCard;
