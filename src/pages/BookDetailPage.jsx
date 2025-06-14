import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import { AuthContext } from '../context/AuthContext';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import Loader from '../components/common/Loader';
import Rating from '../components/common/Rating';

const BookDetailPage = () => {
  const { id } = useParams();
  const { fetchBookDetails, book, loading } = useContext(BookContext);
  const { user } = useContext(AuthContext);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBookDetails(id);
  }, [fetchBookDetails, id, reviewSubmitted]);

  const handleReviewSubmit = () => {
    setReviewSubmitted(!reviewSubmitted);
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
          <Link to="/" className="btn-primary">
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen fade-in">
      {/* Book Header with Cover */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Book Cover */}
            <div className="w-48 md:w-64 flex-shrink-0 mb-6 md:mb-0 md:mr-8">
              <img 
                src={book.coverURL || 'https://via.placeholder.com/384x560?text=No+Cover'} 
                alt={book.title} 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            {/* Book Info */}
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
              
              {user?.role === 'admin' && (
                <div className="flex space-x-3 justify-center md:justify-start mb-4">
                  <Link 
                    to={`/admin/books/edit/${book._id}`} 
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Edit Book
                  </Link>
                  <button 
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Delete Book
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Book Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Reviews</h2>
              
              {/* Review Form */}
              <div className="mb-8">
                <ReviewForm bookId={id} onReviewSubmit={handleReviewSubmit} />
              </div>
              
              {/* Review List */}
              <ReviewList bookId={id} key={reviewSubmitted ? 'refreshed' : 'initial'} />
            </div>
          </div>
          
          {/* Sidebar - Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Book Details</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Genre:</span>
                  <span className="font-medium">{book.genre || 'Not specified'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Average Rating:</span>
                  <span className="font-medium">{book.avgRating ? `${book.avgRating.toFixed(1)}/5` : 'No ratings yet'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-medium">{book.numReviews || 0}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Added:</span>
                  <span className="font-medium">
                    {new Date(book.createdAt).toLocaleDateString()}
                  </span>
                </li>
              </ul>
            </div>
            
            {/* Similar Books Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Similar Books</h3>
              <p className="text-gray-600 mb-4">You might also enjoy these books:</p>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-12 h-16 bg-gray-200 rounded"></div>
                    <div>
                      <p className="font-medium">Similar Book {i}</p>
                      <p className="text-sm text-gray-600">Author Name</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;