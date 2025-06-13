import React from 'react';

const SortControl = ({ sortOrder, onChange }) => {
  return (
    <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-medium">
      <label htmlFor="sort-select" className="text-base">
        Sort by price:
      </label>
      <select
        id="sort-select"
        value={sortOrder}
        onChange={e => onChange(e.target.value)}
        aria-label="Sort jewelry by price"
        className="px-4 py-2 rounded-lg bg-[#fdf9f8] dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-[#d4a373] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373] transition-all"
      >
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>
  );
};

export default SortControl;
