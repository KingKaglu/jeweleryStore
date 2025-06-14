import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import JewelryCard from './JewelryCard.jsx';
import SortControl from './SortControl.jsx';
import JewelryCart from './JewelryCart.jsx';
import Contact from './Contact.jsx';
import jewelryData from '../data/jewelryData.js';

const JewelryShop = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCartItems(prev => {
      const itemExists = prev.some(cartItem => cartItem.id === item.id);
      if (itemExists) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id, action = 'decrease') => {
    setCartItems(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index === -1) return prev;

      const updated = [...prev];
      const item = updated[index];

      if (action === 'decrease') {
        if (item.quantity > 1) {
          updated[index] = { ...item, quantity: item.quantity - 1 };
        } else {
          updated.splice(index, 1);
        }
      } else if (action === 'remove') {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  const removeAllFromCart = () => setCartItems([]);
  const handleReview = (id) => navigate(`/product/${id}`);

  const filteredJewelry = useMemo(() => {
    return jewelryData
      .filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
  }, [searchTerm, sortOrder]);

  const totalPages = Math.ceil(filteredJewelry.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJewelry = filteredJewelry.slice(startIndex, startIndex + itemsPerPage);

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  return (
    <section
      id="shop"
      className="pt-24 min-h-screen bg-[#fdf9f8] dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-16"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center font-playfair tracking-wide">
          Jewelry Store
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <SortControl sortOrder={sortOrder} onChange={handleSortChange} />
          <input
            type="text"
            placeholder="Search jewelry..."
            className="px-4 py-2 border rounded-lg w-full md:w-1/3 dark:bg-gray-800 dark:border-gray-600"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentJewelry.map(item => (
            <JewelryCard
              key={item.id}
              {...item}
              onBuy={() => addToCart(item)}
              onReview={() => handleReview(item.id)}
              className="bg-white dark:bg-[#2a2a2a] rounded-3xl shadow-lg hover:scale-105 transition-transform overflow-hidden"
              imageClassName="w-full h-[260px] object-cover"
              contentClassName="p-6 text-center"
              nameClassName="font-playfair text-2xl font-bold mt-4 mb-3 text-[#3e342e] dark:text-[#f0e7dc]"
              priceClassName="text-lg text-[#7c6c60] dark:text-[#d4c5b2] mb-6"
              buyButtonClassName="bg-gradient-to-br from-[#d4a373] to-[#b5835a] text-white font-semibold py-3 px-10 rounded-3xl hover:scale-105 transition-transform"
            />
          ))}
        </div>

        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              aria-current={currentPage === i + 1 ? 'page' : undefined}
              aria-label={`Page ${i + 1}`}
              className={`px-4 py-2 rounded-full ${
                currentPage === i + 1
                  ? 'bg-[#b48b6c] text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <JewelryCart
          cartItems={cartItems}
          onRemove={removeFromCart}
          onRemoveAll={removeAllFromCart}
          className="mt-16"
        />

        <Contact cartItems={cartItems} />
      </div>
    </section>
  );
};

export default JewelryShop;
