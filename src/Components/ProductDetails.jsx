import React from "react";
import { useParams, Link } from "react-router-dom";
import jewelryData from "../data/jewelryData";

export default function ProductDetails() {
  const { id } = useParams();
  const product = jewelryData.find((item) => item.id.toString() === id);

  if (!product) {
    return (
      <div className="text-center p-10 text-red-500 text-lg font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <main
      className="
        min-h-[70vh] 
        max-w-6xl 
        mx-auto 
        pt-28 
        px-4 sm:px-6 lg:px-12 
        bg-white dark:bg-gray-900 
        text-gray-900 dark:text-gray-100 
        transition-colors duration-500
        flex flex-col justify-center
      "
      style={{ paddingBottom: "2rem" }} // smaller bottom padding
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="overflow-hidden rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 sm:h-96 object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">
            {product.name}
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#b48b6c]">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-prose">
            {product.description ||
              "This is a beautiful handcrafted piece perfect for every occasion."}
          </p>

          <button
            className="inline-block bg-[#b48b6c] text-white font-semibold rounded-full px-8 sm:px-10 py-3 shadow-lg hover:bg-[#a17552] transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#b48b6c]/50"
            aria-label={`Buy ${product.name}`}
          >
            Buy Now
          </button>

          <Link
            to="/"
            className="block mt-4 sm:mt-6 text-base sm:text-lg text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
