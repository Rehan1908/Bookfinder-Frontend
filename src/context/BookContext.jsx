import React, { createContext, useState, useCallback } from 'react';
import { getBooks, getBookById } from '../services/bookService';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0
  });

  const fetchBooks = useCallback(async (searchQuery = '', page = 1, limit = 12) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getBooks(searchQuery, page, limit);
      setBooks(data.books || []);
      setPagination({
        page: data.page || 1,
        pages: data.pages || 1,
        total: data.total || 0
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch books');
      setBooks([]);
      setPagination({ page: 1, pages: 1, total: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBookDetails = useCallback(async (id) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getBookById(id);
      setBook(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch book details');
      setBook(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshBooks = useCallback(() => {
    // Emit event to trigger refresh in HomePage
    window.dispatchEvent(new CustomEvent('reviewUpdated'));
  }, []);

  const value = {
    books,
    book,
    loading,
    error,
    pagination,
    fetchBooks,
    fetchBookDetails,
    refreshBooks
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};