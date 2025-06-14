import React, { useEffect, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import SearchBar from '../components/books/SearchBar';
import BookCard from '../components/books/BookCard';
import Pagination from '../components/common/Pagination';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';

const BooksPage = () => {
  const { books, loading, error, pagination, fetchBooks } = useContext(BookContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 16;

  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    setSearchQuery(urlSearch);
    fetchBooks(urlSearch, currentPage, booksPerPage);
  }, [fetchBooks, searchParams]);

  useEffect(() => {
    fetchBooks(searchQuery, currentPage, booksPerPage);
  }, [fetchBooks, searchQuery, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-heading font-bold text-center mb-8">
          Browse Our Collection
        </h1>
        
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Books'}
            </h2>
            <p className="text-gray-600 mt-1">
              {searchQuery 
                ? `Found ${pagination.total || 0} books matching your search`
                : `Showing ${pagination.total || 0} books in our collection`
              }
            </p>
          </div>
          
          {searchQuery && (
            <Button
              variant="outline"
              onClick={handleClearSearch}
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Clear Search</span>
            </Button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : (
          <>
            {books && books.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12 justify-items-center">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {searchQuery ? 'No books found' : 'No books available'}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchQuery 
                      ? `We couldn't find any books matching "${searchQuery}". Try different keywords or browse our categories.`
                      : 'Check back later for new additions to our collection.'
                    }
                  </p>
                  
                  {searchQuery && (
                    <Button variant="primary" onClick={handleClearSearch}>
                      Browse All Books
                    </Button>
                  )}
                </div>
              </div>
            )}

            {books && books.length > 0 && pagination.pages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.pages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BooksPage;