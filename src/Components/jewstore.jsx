// src/components/JewelryShop.jsx
import React, { useState, useEffect } from 'react';
import JewelryCard from './JewelryCard.jsx';
import SortControl from './SortControl.jsx';
import JewelryCart from './JewelryCart.jsx';
import './JewelryStore.css';

import jewelryData from '../data/jewelryData.js'; // ✅ import from data file

const JewelryShop = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const removeAllFromCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 600) setItemsPerPage(1);
      else if (window.innerWidth < 900) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [sortOrder, itemsPerPage]);

  const sortedJewelry = [...jewelryData].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );

  const visibleItems = sortedJewelry.slice(currentIndex, currentIndex + itemsPerPage);

  const handlePrev = () => setCurrentIndex(prev => Math.max(prev - itemsPerPage, 0));
  const handleNext = () => setCurrentIndex(prev =>
    Math.min(prev + itemsPerPage, sortedJewelry.length - itemsPerPage)
  );

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, itemsPerPage]);

  return (
    <div id="shop" className="jewelry-container" tabIndex={0} aria-label="Jewelry shop carousel">
      <h1 className="jewelry-title">Modern Jewelry Collection</h1>

      <SortControl sortOrder={sortOrder} onChange={setSortOrder} />

      <div className="carousel-controls">
        <button onClick={handlePrev} disabled={currentIndex === 0} className="arrow-btn left">
          &#8592;
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= sortedJewelry.length - itemsPerPage}
          className="arrow-btn right"
        >
          &#8594;
        </button>
      </div>

      <div className="jewelry-grid carousel">
        {visibleItems.map(item => (
          <JewelryCard key={item.id} {...item} onBuy={() => addToCart(item)} />
        ))}
      </div>

      <JewelryCart 
        cartItems={cartItems} 
        onRemove={removeFromCart} 
        onRemoveAll={removeAllFromCart} 
      />
    </div>
  );
};

export default JewelryShop;
