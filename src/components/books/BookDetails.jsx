import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BookContext } from '../../context/BookContext';
import Loader from '../common/Loader';
import Rating from '../common/Rating';

const BookDetails = () => {
  const { id } = useParams();
  const { getBookDetails, bookDetails, loading } = useContext(BookContext);

  useEffect(() => {
    getBookDetails(id);
  }, [id, getBookDetails]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="book-details">
      <h1>{bookDetails.title}</h1>
      <img src={bookDetails.coverURL} alt={bookDetails.title} />
      <p><strong>Author:</strong> {bookDetails.author}</p>
      <p><strong>Description:</strong> {bookDetails.description}</p>
      <Rating rating={bookDetails.avgRating} />
      <p><strong>Number of Reviews:</strong> {bookDetails.numReviews}</p>
    </div>
  );
};

export default BookDetails;