import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/header.jsx';
import JewelryShop from './Components/jewstore.jsx';
import About from './Components/About.jsx';
import Contact from './Components/Contact.jsx';
import Footer from './Components/Footer.jsx';
import Home from './Components/Home.jsx';
import ProductDetails from './Components/ProductDetails.jsx';
import './index.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />

      <main className="flex-grow">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />

          {/* Product details */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Shop, About, Contact */}
          <Route path="/shop" element={<JewelryShop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div className="p-8 text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-lg">The page you're looking for doesn't exist.</p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
