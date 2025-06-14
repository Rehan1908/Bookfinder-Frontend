import React, { useEffect, useState } from 'react';
import { getReviewsByBookId } from '../../services/bookService';
import Rating from '../common/Rating';

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByBookId(bookId);
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [bookId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error loading reviews: {error}</div>;

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map(review => (
          <div key={review._id} className="review">
            <Rating rating={review.rating} />
            <p>{review.comment}</p>
            <p>— {review.user.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;