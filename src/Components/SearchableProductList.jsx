import React, { useState } from 'react';
// ✅ Correct
import jewelryData from '../data/jewelryData.js';

import "./SearchableProductList.css";

function SearchableProductList({ onBuy }) {
  const [query, setQuery] = useState("");

  const filteredProducts = jewelryData.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    (product.description?.toLowerCase().includes(query.toLowerCase()) || false)
  );

  const shouldShowResults = query.trim().length > 0;

  return (
    <div className="product-search-container">
      <input
        type="text"
        placeholder="Search jewelry..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-bar"
      />

      {shouldShowResults && (
        <div className="product-results">
          {filteredProducts.length > 0 ? (
            <div className={`product-grid ${filteredProducts.length === 1 ? 'single-item' : ''}`}>
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3>{product.name}</h3>
                  {product.description && <p>{product.description}</p>}
                  <span>${product.price.toFixed(2)}</span>
                  <button className="buy-button" onClick={() => onBuy(product)}>Buy</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchableProductList;
