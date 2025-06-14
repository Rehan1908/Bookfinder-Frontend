import React, { createContext, useState, useCallback } from 'react';
import { getBooks, getBookById } from '../services/bookService';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async (searchQuery = '', page = 1, limit = 10) => {
    setLoading(true);
    try {
      const data = await getBooks(searchQuery, page, limit);
      setBooks(data.books || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBookDetails = useCallback(async (id) => {
    setLoading(true);
    try {
      const data = await getBookById(id);
      setBook(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch book details');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <BookContext.Provider value={{ 
      books, 
      book, 
      loading, 
      error, 
      fetchBooks,
      fetchBookDetails
    }}>
      {children}
    </BookContext.Provider>
  );
};