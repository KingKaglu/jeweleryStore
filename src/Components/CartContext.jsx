import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add a product or increase quantity if already in cart
  // Optional callback called after update
  const addToCart = (product, callback) => {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        const updatedItems = prevItems.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + 1 } : item
        );
        if (callback) callback();
        return updatedItems;
      } else {
        if (callback) callback();
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove one quantity or remove product completely
  const removeFromCart = (index, action) => {
    setCartItems((prevItems) => {
      if (action === "decrease") {
        const updated = prevItems.map((item, i) =>
          i === index && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        return updated;
      } else if (action === "remove") {
        return prevItems.filter((_, i) => i !== index);
      }
      return prevItems;
    });
  };

  // Clear entire cart
  const clearCart = () => setCartItems([]);

  // Utility: Get total cost of cart items
  const getCartTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Utility: Get total number of items in cart
  const getTotalItems = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
