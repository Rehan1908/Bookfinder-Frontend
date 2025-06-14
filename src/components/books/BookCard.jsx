import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const BookCard = ({ book }) => {
  const [imageError, setImageError] = useState(false);
  
  const defaultCover = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA5MEg5MFY5NUg3NVY5MFpNNzUgMTAwSDEyNVYxMDVINzVWMTAwWk03NSAxMTBIMTI1VjExNUg3NVYxMTBaTTc1IDEyMEgxMjVWMTI1SDc1VjEyMFpNNzUgMTMwSDEyNVYxMzVINzVWMTMwWk03NSAxNDBIMTI1VjE0NUg3NVYxNDBaTTc1IDE1MEgxMjVWMTU1SDc1VjE1MFpNNzUgMTYwSDEyNVYxNjVINzVWMTYwWk03NSAxNzBIMTI1VjE3NUg3NVYxNzBaTTc1IDE4MEgxMjVWMTg1SDc1VjE4MFpNNzUgMTkwSDEyNVYxOTVINzVWMTkwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';

  return (
    <div className="card card-hover group transition-all duration-300 hover:scale-[1.02] max-w-xs">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-t-xl">
        <img
          src={imageError ? defaultCover : book.coverURL || defaultCover}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            as={Link}
            to={`/books/${book._id}`}
            variant="primary"
            size="sm"
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            View Details
          </Button>
        </div>
      </div>
      
      <div className="p-3 space-y-1">
        <h3 className="font-heading font-semibold text-base leading-tight line-clamp-2">
          <Link 
            to={`/books/${book._id}`} 
            className="hover:text-brand-600 transition-colors"
          >
            {book.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-1">
          by {book.author}
        </p>
        
        {book.genre && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700">
            {book.genre}
          </span>
        )}
      </div>
    </div>
  );
};

export default BookCard;