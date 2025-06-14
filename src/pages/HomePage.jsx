import React, { useEffect, useContext, useState } from 'react';
import { BookContext } from '../context/BookContext';
import BookList from '../components/books/BookList';
import SearchBar from '../components/books/SearchBar';
import Loader from '../components/common/Loader';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { books, loading, fetchBooks, error } = useContext(BookContext);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchBooks(query);
  };

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Next Favorite Book
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Explore thousands of books, read reviews, and find your perfect read.
            </p>
            <div className="max-w-xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              {searchQuery ? `Search Results: "${searchQuery}"` : 'Featured Books'}
            </h2>
            <Link 
              to="/books" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader />
            </div>
          ) : (
            books && books.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <BookList books={books} />
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="mt-4 text-xl font-semibold text-gray-700">No books found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or browse our categories</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Fiction', 'Mystery', 'Science Fiction', 'Biography'].map((category) => (
              <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <a href={`/?search=${category}`} className="block p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">{category}</h3>
                  <p className="text-sm text-gray-600">Explore {category.toLowerCase()} books</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;