import { useEffect, useState } from 'react';
import * as bookService from '../services/bookService';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async (searchQuery = '', page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookService.getBooks(searchQuery, page, limit);
      setBooks(response.books || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (bookId, reviewData) => {
    try {
      return await bookService.addReview(bookId, reviewData);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return { books, loading, error, fetchBooks, addReview };
};

export default useBooks;