// src/components/JewelryShop.jsx
import React, { useState, useEffect } from 'react';
import JewelryCard from './JewelryCard.jsx';
import SortControl from './SortControl.jsx';
import JewelryCart from './JewelryCart.jsx';
import './JewelryStore.css';
import SearchableProductList from './SearchableProductList.jsx';
import jewelryData from '../data/jewelryData.js';

const JewelryShop = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [cartItems, setCartItems] = useState([]);

  // Add an item to the cart
  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  // Remove an item from the cart by index
  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Remove all items from the cart
  const removeAllFromCart = () => {
    setCartItems([]);
  };

  // Responsive items per page based on window width
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

  // Reset pagination when sort order or items per page changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [sortOrder, itemsPerPage]);

  // Sort jewelry items based on price and selected order
  const sortedJewelry = [...jewelryData].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );

  // Get visible items for current page
  const visibleItems = sortedJewelry.slice(currentIndex, currentIndex + itemsPerPage);

  // Pagination controls
  const handlePrev = () => setCurrentIndex(prev => Math.max(prev - itemsPerPage, 0));
  const handleNext = () =>
    setCurrentIndex(prev => Math.min(prev + itemsPerPage, sortedJewelry.length - itemsPerPage));

  // Keyboard navigation support for carousel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, itemsPerPage]);

  return (
    <div id="shop" className="jewelry-container" tabIndex={0} aria-label="Jewelry shop carousel">
      <h1 className="jewelry-title">Modern Jewelry Collection</h1>

      <SortControl sortOrder={sortOrder} onChange={setSortOrder} />

      {/* ✅ Search bar with products */}
      <SearchableProductList onBuy={addToCart} />

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
        {visibleItems.map((item) => (
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
