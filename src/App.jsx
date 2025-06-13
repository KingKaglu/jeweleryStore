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
     
          {/* Other routes */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/shop" element={<JewelryShop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div className="p-4">404 Page Not Found</div>} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
