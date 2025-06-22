import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductDetails = ({ products, onAddToCart }) => {
  const { id } = useParams();
  const product = products.find((item) => item.id.toString() === id);

  if (!product) return <div className="p-6 text-red-500">პროდუქტი ვერ მოიძებნა</div>;

  const handleAdd = () => {
    onAddToCart(product);
    toast.success(`"${product.name}" დაემატა კალათაში 🛒`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-xl shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {product.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6">
            ₾{product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
          >
            კალათაში დამატება
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
