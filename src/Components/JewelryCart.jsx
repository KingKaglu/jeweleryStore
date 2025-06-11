import React from 'react';
import './jewelryCart.css';

const JewelryCart = ({ cartItems, onRemove, onRemoveAll }) => {
  // Calculate total cost considering item quantities
  const totalCost = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleRemoveAllClick = () => {
    if (window.confirm('Are you sure you want to remove all items from the cart?')) {
      onRemoveAll();
    }
  };

  const handleItemRemove = (index) => {
    const item = cartItems[index];

    // If quantity is greater than 1, just decrease quantity
    if (item.quantity > 1) {
      onRemove(index, 'decrease');
    } else {
      // If quantity is 1, remove the item entirely
      onRemove(index, 'remove');
    }
  };

  return (
    <div className="cart-container" aria-live="polite">
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
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="quantity">
                    <span>Quantity: {item.quantity} </span>
                    <button
                      className="remove-btn"
                      onClick={() => handleItemRemove(index)}
                      aria-label={`Remove one ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total:</strong> ${totalCost.toFixed(2)}
          </div>

          <button
            className="remove-all-btn"
            onClick={handleRemoveAllClick}
            disabled={cartItems.length === 0}
            aria-disabled={cartItems.length === 0}
          >
            Remove All
          </button>
        </>
      )}
    </div>
  );
};

export default JewelryCart;
