import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useBooks } from '../../hooks/useBooks';

const ReviewForm = ({ bookId, onReviewSubmit = () => {} }) => {
  const { user } = useAuth();
  const { addReview } = useBooks();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to submit a review.');
      return;
    }

    setSubmitting(true);
    try {
      const reviewData = { rating, comment };
      await addReview(bookId, reviewData);
      onReviewSubmit();
      setRating(1);
      setComment('');
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="p-4 bg-gray-100 rounded">
        <p>Please log in to submit a review.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Submit a Review</h2>
      <div className="mb-4">
        <label htmlFor="rating" className="block mb-1">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} {star === 1 ? 'Star' : 'Stars'}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block mb-1">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-full p-2 border rounded min-h-[100px]"
        />
      </div>
      <button 
        type="submit" 
        disabled={submitting}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;