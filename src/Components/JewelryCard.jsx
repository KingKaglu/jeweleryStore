// src/Components/JewelryCard.jsx
import React from 'react';
import './jewelerycard.css';

const JewelryCard = ({ name, price, image, onBuy }) => {
  return (
    <div className="jewelry-card">
      <img src={image} alt={name} className="jewelry-image" />
      <div className="jewelry-card-content">
        <h2 className="jewelry-name">{name}</h2>
        <p className="jewelry-price">${price.toFixed(2)}</p>
        <button className="buy-button" onClick={onBuy}>Buy Now</button>
      </div>
    </div>
  );
};

export default JewelryCard;
