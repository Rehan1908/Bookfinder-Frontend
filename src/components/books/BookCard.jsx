import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../common/Rating';
import { truncateText } from '../../utils/helpers';

const BookCard = ({ book }) => {
  // Default image if book.coverURL is missing
  const coverImage = book.coverURL || 'https://via.placeholder.com/150x225?text=No+Cover';
  
  return (
    <div className="card group h-full flex flex-col">
      <div className="relative overflow-hidden aspect-[2/3]">
        <img 
          src={coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center transition-opacity duration-300">
          <Link 
            to={`/books/${book._id}`} 
            className="btn-primary mb-4 mx-4 w-full text-center py-2"
          >
            View Details
          </Link>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold line-clamp-1 hover:text-blue-600">
          <Link to={`/books/${book._id}`}>{book.title}</Link>
        </h3>
        <p className="text-gray-600 mb-2">by {book.author}</p>
        <div className="flex items-center mt-1 mb-3">
          <Rating rating={book.avgRating || 0} />
          <span className="ml-2 text-sm text-gray-500">
            {book.numReviews || 0} {book.numReviews === 1 ? 'review' : 'reviews'}
          </span>
        </div>
        {book.description && (
          <p className="text-gray-700 text-sm line-clamp-3 mb-3 flex-grow">
            {truncateText(book.description, 120)}
          </p>
        )}
        <div className="mt-auto">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {book.genre || 'Fiction'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;