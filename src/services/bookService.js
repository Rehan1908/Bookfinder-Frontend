import api from './api';

// Get all books with search and pagination
export const getBooks = async (search = '', page = 1, limit = 10) => {
  const response = await api.get('/books', {
    params: { search, page, limit }
  });
  return response.data;
};

// Get single book
export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// Create new book (admin only)
export const createBook = async (bookData) => {
  const response = await api.post('/books', bookData);
  return response.data;
};

// Update book (admin only)
export const updateBook = async (id, bookData) => {
  const response = await api.patch(`/books/${id}`, bookData);
  return response.data;
};

// Delete book (admin only)
export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

// Review functions
export const getReviewsByBookId = async (bookId) => {
  const response = await api.get(`/books/${bookId}/reviews`);
  return response.data;
};

export const addReview = async (bookId, reviewData) => {
  const response = await api.post(`/books/${bookId}/reviews`, reviewData);
  return response.data;
};

export const updateReview = async (bookId, reviewId, reviewData) => {
  const response = await api.put(`/books/${bookId}/reviews/${reviewId}`, reviewData);
  return response.data;
};

export const deleteReview = async (bookId, reviewId) => {
  const response = await api.delete(`/books/${bookId}/reviews/${reviewId}`);
  return response.data;
};