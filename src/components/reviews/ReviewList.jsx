import React, { useState, useEffect, useCallback, useContext } from 'react';
import { getReviewsByBookId, deleteReview, updateReview } from '../../services/bookService';
import Rating from '../common/Rating';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../common/Loader';
import Button from '../common/Button';
import clsx from 'clsx';

const ReviewList = ({ bookId, refreshTrigger, onReviewDeleted }) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    if (!bookId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getReviewsByBookId(bookId);
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews, refreshTrigger]);

  const handleEditClick = (review) => {
    setEditingReview(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setEditRating(5);
    setEditComment('');
  };

  const handleUpdateReview = async (reviewId) => {
    if (!editRating || !editComment.trim()) {
      return;
    }

    setSubmitting(true);
    try {
      await updateReview(bookId, reviewId, { 
        rating: editRating, 
        comment: editComment.trim() 
      });
      setEditingReview(null);
      fetchReviews();
      if (onReviewDeleted) onReviewDeleted(); // Refresh book details to update ratings
    } catch (err) {
      setError(err.message || 'Failed to update review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await deleteReview(bookId, reviewId);
      fetchReviews();
      if (onReviewDeleted) onReviewDeleted(); // Refresh book details to update ratings
    } catch (err) {
      setError(err.message || 'Failed to delete review');
    }
  };

  // Check if the current user can modify a review
  const canModifyReview = (review) => {
    if (!user) return false;
    // User can modify their own review OR admin can modify any review
    return user._id === review.user?._id || user.role === 'admin';
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.471c-.904-.5-1.853-.8-2.85-.8-.491 0-.98.05-1.464.14A7.99 7.99 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
        </svg>
        <p className="text-gray-600">No reviews yet. Be the first to review this book!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-6">
        {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
      </h3>
      
      {reviews.map((review) => (
        <div key={review._id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {editingReview === review._id ? (
            // Edit form
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Edit Your Review</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <svg
                        className={clsx(
                          'w-8 h-8',
                          star <= editRating ? 'text-yellow-400' : 'text-gray-300'
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({editRating} star{editRating !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>
              
              <div>
                <label htmlFor="editComment" className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  id="editComment"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  placeholder="Update your review..."
                  rows={4}
                  className="input resize-none"
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={() => handleUpdateReview(review._id)}
                  disabled={submitting || !editComment.trim()}
                  variant="primary"
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            // Review display
            <>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-semibold">
                    {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {review.user?.name || 'Anonymous User'}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {review.createdAt 
                        ? new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'Date not available'
                      }
                    </p>
                  </div>
                </div>
                
                {canModifyReview(review) && (
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleEditClick(review)}
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit</span>
                    </Button>
                    <Button
                      onClick={() => handleDeleteReview(review._id)}
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete</span>
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="mb-3">
                <Rating rating={review.rating} size="md" showNumber />
              </div>
              
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;