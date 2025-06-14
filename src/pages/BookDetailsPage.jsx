import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import { AuthContext } from '../context/AuthContext';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import Loader from '../components/common/Loader';
import Rating from '../components/common/Rating';

const BookDetailsPage = () => {
  const { id } = useParams();
  const { fetchBookDetails, book, loading } = useContext(BookContext);
  const { user } = useContext(AuthContext);
  const [reviewRefresh, setReviewRefresh] = useState(Date.now());
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBookDetails(id);
  }, [fetchBookDetails, id]);

  const handleReviewSubmit = () => {
    setReviewRefresh(Date.now());
    fetchBookDetails(id);
  };

  const handleReviewDeleted = () => {
    fetchBookDetails(id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Book Not Found</h2>
          <p className="mb-6">The book you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const defaultCover = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA9MEg5MFY5NUg3NVY5MFpNNzUgMTAwSDEyNVYxMDVINzVWMTAwWk03NSAxMTBIMTI1VjExNUg3NVYxMTBaTTc1IDEyMEgxMjVWMTI1SDc1VjEyMFpNNzUgMTMwSDEyNVYxMzVINzVWMTMwWk03NSAxNDBIMTI1VjE0NUg3NVYxNDBaTTc1IDE1MEgxMjVWMTU1SDc1VjE1MFpNNzUgMTYwSDEyNVYxNjVINzVWMTYwWk03NSAxNzBIMTI1VjE3NUg3NVYxNzBaTTc1IDE4MEgxMjVWMTg1SDc1VjE4MFpNNzUgMTkwSDEyNVYxOTVINzVWMTkwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';

  return (
    <div className="bg-gray-50 min-h-screen fade-in">
      {/* Book Header */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-48 md:w-64 flex-shrink-0 mb-6 md:mb-0 md:mr-8">
              <img 
                src={book.coverURL || defaultCover}
                alt={book.title} 
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => { 
                  e.target.src = defaultCover; 
                }}
              />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <div className="mb-1">
                <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {book.genre || 'Fiction'}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
              <p className="text-blue-200 text-xl mb-4">by {book.author}</p>
              
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Rating rating={book.avgRating || 0} size="lg" />
                <span className="ml-2 text-blue-200">
                  {book.numReviews || 0} {book.numReviews === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Book Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{book.summary || 'No description available.'}</p>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Reviews</h2>
              
              <div className="mb-8">
                <ReviewForm bookId={id} onReviewSubmit={handleReviewSubmit} />
              </div>
              
              <ReviewList 
                bookId={id} 
                refreshTrigger={reviewRefresh}
                onReviewDeleted={handleReviewDeleted} 
              />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Book Details</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Genre:</span>
                  <span className="font-medium">{book.genre || 'Not specified'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">ISBN:</span>
                  <span className="font-medium">{book.isbn || 'Not available'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Average Rating:</span>
                  <span className="font-medium">{book.avgRating ? `${book.avgRating.toFixed(1)}/5` : 'No ratings yet'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-medium">{book.numReviews || 0}</span>
                </li>
              </ul>
            </div>
            
            {/* Back to Books */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <Link 
                to="/books"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors text-center block"
              >
                ← Back to Books
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;