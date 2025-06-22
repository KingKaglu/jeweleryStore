import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import Header from './Components/Header';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Shop from './Components/Shop';
import CategoryPage from './Components/CategoryPage';
import Cart from './Components/Cart';
import ProductDetails from './Components/ProductDetails';
import Checkout from './Components/Checkout'; // ✅ დაამატე Checkout კომპონენტი

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const onAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const onRemoveItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const onUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const onClearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Header cartItemCount={cartItems.length} />
      <main className="min-h-[calc(100vh-120px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={<Shop onAddToCart={onAddToCart} setAllProducts={setAllProducts} />}
          />
          <Route path="/shop/:categoryId" element={<CategoryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onRemoveItem={onRemoveItem}
                onUpdateQuantity={onUpdateQuantity}
                onClearCart={onClearCart}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                products={allProducts}
                onAddToCart={onAddToCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
