import React from 'react';
import './jewelryCart.css';

const JewelryCart = ({ cartItems, onRemove, onRemoveAll }) => {
  const totalCost = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                  <button className="remove-btn" onClick={() => onRemove(index)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total:</strong> ${totalCost.toFixed(2)}
          </div>

          <button className="remove-all-btn" onClick={onRemoveAll}>
            Remove All
          </button>
        </>
      )}
    </div>
  );
};

export default JewelryCart;
