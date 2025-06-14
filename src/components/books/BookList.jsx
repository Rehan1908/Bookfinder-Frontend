import React from 'react';
import BookCard from './BookCard';

// FIXED: Removed unnecessary context and useEffect that was causing infinite API calls
const BookList = ({ books = [] }) => {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map(book => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;