import React, { useState, useEffect } from 'react';
import JewelryCard from './JewelryCard.jsx';
import SortControl from './SortControl.jsx';
import JewelryCart from './JewelryCart.jsx';
import SearchableProductList from './SearchableProductList.jsx';
import Contact from './Contact.jsx'; // ✅ Import the Contact component
import jewelryData from '../data/jewelryData.js';
import './JewelryStore.css';

const JewelryShop = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const itemExists = prev.some(cartItem => cartItem.id === item.id);
      if (itemExists) {
        // Update the quantity if the item already exists in the cart
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCartItems(prev => {
      const updatedCartItems = [...prev];
      const item = updatedCartItems[index];
      
      // If quantity is greater than 1, decrease the quantity
      if (item.quantity > 1) {
        updatedCartItems[index] = { ...item, quantity: item.quantity - 1 };
      } else {
        // Otherwise, remove the item completely
        updatedCartItems.splice(index, 1);
      }
      
      return updatedCartItems;
    });
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
  const handleNext = () =>
    setCurrentIndex(prev => Math.min(prev + itemsPerPage, sortedJewelry.length - itemsPerPage));

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

      {/* ✅ Add the contact form and pass cartItems */}
      <Contact cartItems={cartItems} />
    </div>
  );
};

export default JewelryShop;
