import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ onSearch, placeholder = "Search for services..." }) => {
    const [query, setQuery] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Search Query -', query);
      if (onSearch) onSearch(query);
    };
  
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            autoFocus
            className="w-full px-6 py-4 pr-14 rounded-full border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg shadow-lg bg-white"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>
    );
  };