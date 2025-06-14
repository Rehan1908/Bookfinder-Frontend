import { useEffect, useState } from 'react';
import { getBooks, getReviewsByBookId } from '../services/bookService';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async (searchQuery = '', page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBooks(searchQuery, page, limit);
      setBooks(response.books);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (bookId, reviewData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/books/${bookId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reviewData)
      });
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return { books, loading, error, fetchBooks, addReview };
};

// Also keep the default export for backward compatibility
export default useBooks;