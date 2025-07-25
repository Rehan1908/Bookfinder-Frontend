import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import SearchBar from '../components/books/SearchBar';
import BookCard from '../components/books/BookCard';
import Pagination from '../components/common/Pagination';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';

const HomePage = () => {
  const { books, loading, error, pagination, fetchBooks } = useContext(BookContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const booksPerPage = 12;

  // Fetch books on mount and when dependencies change
  useEffect(() => {
    fetchBooks(searchQuery, currentPage, booksPerPage);
  }, [fetchBooks, searchQuery, currentPage, refreshKey]);

  // Refresh books when reviews are updated
  useEffect(() => {
    const handleReviewUpdate = () => {
      setRefreshKey(prev => prev + 1);
    };

    // Listen for review updates
    window.addEventListener('reviewUpdated', handleReviewUpdate);
    return () => window.removeEventListener('reviewUpdated', handleReviewUpdate);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Discover Your Next
              <span className="text-accent-400"> Great Read</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-100 mb-8 max-w-2xl mx-auto">
              Explore thousands of books, read reviews, and find your perfect match in our curated collection.
            </p>
            <div className="max-w-xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Books'}
            </h2>
            <p className="text-gray-600 mt-2">
              {searchQuery ? `Found ${pagination.total || 0} books` : 'Discover our handpicked collection'}
            </p>
          </div>
          
          {searchQuery && (
            <Button
              variant="outline"
              onClick={() => handleSearch('')}
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Clear Search</span>
            </Button>
          )}
        </div>

        {/* Error State */}
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

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : (
          <>
            {/* Books Grid */}
            {books && books.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12 justify-items-center">
                {books.map((book) => (
                  <BookCard key={`${book._id}-${refreshKey}`} book={book} />
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
                      ? `We couldn't find any books matching "${searchQuery}". Try different keywords.`
                      : 'Check back later for new additions to our collection.'
                    }
                  </p>
                  
                  {searchQuery && (
                    <Button variant="primary" onClick={() => handleSearch('')}>
                      Browse All Books
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Pagination */}
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
      </section>

      {/* CTA Section */}
      {!searchQuery && (
        <section className="bg-white border-t">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
                Ready to find your next favorite book?
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Browse our complete collection and discover books tailored to your interests.
              </p>
              <Button as={Link} to="/books" variant="primary" size="lg">
                Explore All Books
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;