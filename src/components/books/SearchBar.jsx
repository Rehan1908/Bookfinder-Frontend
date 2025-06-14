import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '../common/Button';

const SearchBar = ({ onSearch, placeholder = "Search books by title, author, or genre..." }) => {
  const [term, setTerm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTerm = term.trim();
    
    if (!trimmedTerm) {
      setError('Please enter a search term');
      return;
    }
    
    setError('');
    onSearch(trimmedTerm);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    setError('');
    
    // Clear search when input is empty
    if (value === '') {
      onSearch('');
    }
  };

  const handleClear = () => {
    setTerm('');
    setError('');
    onSearch('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex rounded-lg shadow-sm">
          <div className="relative flex-1">
            <input
              type="text"
              value={term}
              onChange={handleChange}
              placeholder={placeholder}
              className={clsx(
                'input rounded-r-none pr-10',
                error && 'input-error'
              )}
            />
            {term && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <Button 
            type="submit" 
            variant="primary" 
            className="rounded-l-none border-l-0"
            disabled={!term.trim()}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </Button>
        </div>
        {error && (
          <p className="absolute mt-1 text-sm text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
};

export default SearchBar;