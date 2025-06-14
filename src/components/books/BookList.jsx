import React, { useContext, useEffect } from 'react';
import { BookContext } from '../../context/BookContext';
import BookCard from './BookCard';
import Loader from '../common/Loader';

const BookList = () => {
  const { books, loading, fetchBooks } = useContext(BookContext);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (loading) {
    return <Loader />;
  }

  if (!books || books.length === 0) {
    return <p>No books available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map(book => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;