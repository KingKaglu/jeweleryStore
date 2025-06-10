import React, { useState, useEffect } from 'react';
import JewelryCard from './JewelryCard.jsx';
import SortControl from './SortControl.jsx';
import JewelryCart from './JewelryCart.jsx';
import './JewelryStore.css';

import goldRing from '../assets/gold-ring.jpg';
import SilverNeck from '../assets/silverNecklace.jpg';
import SapphireRing from '../assets/Sapphire Ring.jpg';
import PearlEarrings from '../assets/PearlEarrings.jpg';
import RubyBraclet from '../assets/Ruby Braclet.jpg';
import EmeraldChoker from '../assets/Emerald Choker.jpg';
import DiamondPendant from '../assets/Diamond Pendant.jpg';
import goldChoker from '../assets/gold Choker.jpg';

const sampleJewelry = [
  { id: 1, name: "Gold Ring", price: 199.99, image: goldRing },
  { id: 2, name: "Silver Necklace", price: 149.49, image: SilverNeck },
  { id: 3, name: "Pearl Earrings", price: 229.99, image: PearlEarrings },
  { id: 4, name: "Diamond Pendant", price: 479.99, image: DiamondPendant },
  { id: 5, name: "Ruby Bracelet", price: 389.95, image: RubyBraclet },
  { id: 6, name: "Sapphire Ring", price: 559.99, image: SapphireRing },
  { id: 7, name: "Emerald Choker", price: 619.99, image: EmeraldChoker },
  { id: 8, name: "Gold Choker", price: 721.99, image: goldChoker },
];

const JewelryShop = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  // Remove one item from cart by index
  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Remove all items from cart
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

  useEffect(() => setCurrentIndex(0), [sortOrder, itemsPerPage]);

  const sortedJewelry = [...sampleJewelry].sort((a, b) =>
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

      {/* Pass both cartItems and removal handlers */}
      <JewelryCart 
        cartItems={cartItems} 
        onRemove={removeFromCart} 
        onRemoveAll={removeAllFromCart} 
      />
    </div>
  );
};

export default JewelryShop;
