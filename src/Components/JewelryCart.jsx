import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext"; // adjust the path as needed

const JewelryCart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemoveAllClick = () => {
    if (window.confirm("Are you sure you want to remove all items from the cart?")) {
      clearCart();
    }
  };

  const handleItemRemove = (index) => {
    const item = cartItems[index];
    if (item.quantity > 1) {
      removeFromCart(index, "decrease");
    } else {
      removeFromCart(index, "remove");
    }
  };

  return (
    <div
      className="bg-white dark:bg-[#1e1e1e] p-6 mt-8 w-full max-w-full rounded-2xl shadow-lg overflow-hidden sm:max-w-[90%] lg:max-w-[800px] mx-auto"
      aria-live="polite"
    >
      <h2 className="text-xl mb-4 text-center text-gray-800 dark:text-gray-200 font-semibold">
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <>
          <p className="text-center text-gray-500 dark:text-gray-400 italic">
            Your cart is empty.
          </p>
          <div className="mt-4 text-center">
            <Link
              to="/shop"
              className="inline-block mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg transition"
            >
              Go to Shop
            </Link>
          </div>
        </>
      ) : (
        <>
          <ul className="block max-h-[400px] overflow-y-auto mb-6">
            {cartItems.map((item, index) => (
              <li
                key={item.id || index}
                className="flex items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-gray-700 flex-nowrap"
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex flex-col flex-1 min-w-0 max-w-[200px] overflow-hidden">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-base font-bold text-gray-800 dark:text-gray-100 truncate hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="mt-2 text-sm flex items-center gap-4">
                    <span className="text-gray-700 dark:text-gray-300">
                      Quantity: {item.quantity}
                    </span>
                    <button
                      onClick={() => handleItemRemove(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                      aria-label={`Remove one ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            <strong>Total:</strong> ${totalCost.toFixed(2)}
          </div>

          <button
            onClick={handleRemoveAllClick}
            disabled={cartItems.length === 0}
            className={`w-full font-bold rounded-lg py-3 text-base transition-colors ${
              cartItems.length === 0
                ? "bg-gray-300 dark:bg-gray-600 text-white cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            } focus:outline-none focus:ring-4 focus:ring-yellow-400`}
            aria-disabled={cartItems.length === 0}
          >
            Remove All
          </button>
        </>
      )}
    </div>
  );
};

export default JewelryCart;
