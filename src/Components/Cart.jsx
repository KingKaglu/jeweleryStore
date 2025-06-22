import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveItem, onUpdateQuantity, onClearCart }) => {
  const navigate = useNavigate();

  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-sans text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-10 text-center text-green-700 dark:text-green-400 tracking-tight drop-shadow-md">
        თქვენი კალათა
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl text-center">
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-6">
            თქვენი კალათა ცარიელია.
          </p>
          <Link to="/shop">
            <button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50">
              დაათვალიერეთ მაღაზია
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
          
          {/* Clear All Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300"
            >
              კალათის გასუფთავება
            </button>
          </div>

          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {cartItems.map(item => (
              <li key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-4">
                {/* Product Image and Name */}
                <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
                  <div className="mb-2 sm:mb-0 sm:pr-4">
                    <Link to={`/product/${item.id}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ₾{item.price.toFixed(2)} / ცალი
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0 sm:mr-4">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label={`შეამცირე ${item.name}-ის რაოდენობა`}
                    >
                      -
                    </button>
                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      aria-label={`გაზარდე ${item.name}-ის რაოდენობა`}
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total Price and Remove Button */}
                  <div className="flex items-center sm:ml-auto">
                    <span className="text-lg font-bold text-green-700 dark:text-green-400 mr-4 whitespace-nowrap">
                      ₾{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition-colors"
                      aria-label={`წაშალე ${item.name} კალათიდან`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Cart Total */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-right">
            <span className="text-xl sm:text-2xl font-extrabold text-green-800 dark:text-green-300">
              ჯამი: ₾{totalCost}
            </span>
            <button
              onClick={handleCheckout}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 ml-4"
            >
              შეკვეთის გაფორმება
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
