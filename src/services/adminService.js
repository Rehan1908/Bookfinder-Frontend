import api from './api';

// Dashboard Stats
export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

// User Management
export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const updateUserRole = async (userId, role) => {
  const response = await api.patch(`/admin/users/${userId}/role`, { role });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

// Review Management
export const getAllReviews = async () => {
  const response = await api.get('/admin/reviews');
  return response.data;
};

// This function allows an admin to delete any review.
// It uses the standard review deletion endpoint, which has logic
// in the backend to allow admins to delete reviews.
export const deleteReview = async (bookId, reviewId) => {
  if (!bookId || !reviewId) {
    throw new Error('Book ID and Review ID are required to delete a review.');
  }
  const response = await api.delete(`/books/${bookId}/reviews/${reviewId}`);
  return response.data;
};