import React from 'react';

const SortControl = ({ sortOrder, onChange }) => {
  return (
    <div className="sort-control">
      <label htmlFor="sort-select">Sort by price:</label>
      <select
        id="sort-select"
        value={sortOrder}
        onChange={e => onChange(e.target.value)}
        aria-label="Sort jewelry by price"
      >
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>
  );
};

export default SortControl;
