import React from "react";
import SearchableProductList from "../components/SearchableProductList";
import jewelryData from '../data/jewelryData.js';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="font-sans text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-24 bg-gradient-to-r from-yellow-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 py-20 px-6 text-center relative overflow-hidden">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 animate-fadeUp tracking-tight">
          <span className="relative z-10">
            <span className="bg-gradient-to-r from-[#d1913c] to-[#ffd194] bg-clip-text text-transparent">
              Discover Elegant Jewelry
            </span>
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl mx-auto animate-fadeUp delay-100">
          Timeless designs for every occasion. Elevate your style with our handcrafted pieces.
        </p>
        <a href="/shop ">
          <button className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
            Shop Now
          </button>
        </a>
      </section>

      {/* Search with Product List */}
      <SearchableProductList products={jewelryData} />

      {/* Divider */}
      <hr className="border-t border-gray-300 dark:border-gray-700 my-16 mx-auto w-1/2" />

      {/* Featured Products */}
      <section className="py-24 px-6 bg-white dark:bg-gray-900 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white animate-fadeUp">
            <span className="relative z-10">Featured Collections</span>
            <span className="block w-24 h-1 bg-[#b48b6c] mx-auto mt-4 rounded animate-fadeUp delay-100"></span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-lg">
            Hand-picked favorites just for you — stylish, elegant, and one-of-a-kind pieces.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {[...jewelryData].slice(0, 3).map((item, i) => (
            <div
              key={item.id}
              className="shadow-lg dark:shadow-md dark:bg-gray-800 bg-white rounded-2xl overflow-hidden hover:shadow-2xl transform hover:scale-[1.02] transition duration-300 ease-in-out group"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#b48b6c] transition">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">${item.price.toFixed(2)}</p>
                <Link to={`/product/${item.id}`}>
                  <button className="px-5 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full transition duration-300 hover:bg-gray-900 dark:hover:bg-gray-200 hover:scale-105 shadow-md hover:shadow-xl">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 1s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>

    </main>
  );
}
