import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create API instance with interceptors for token handling
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// Auth API calls
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Books API calls
export const fetchBooks = async (searchQuery, page, limit) => {
  const response = await axios.get(`${API_URL}/books`, {
    params: { search: searchQuery, page, limit },
  });
  return response.data;
};

export const fetchBookById = async (bookId) => {
  const response = await axios.get(`${API_URL}/books/${bookId}`);
  return response.data;
};

export const createBook = async (bookData, token) => {
  const response = await axios.post(`${API_URL}/books`, bookData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateBook = async (bookId, bookData, token) => {
  const response = await axios.put(`${API_URL}/books/${bookId}`, bookData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteBook = async (bookId, token) => {
  const response = await axios.delete(`${API_URL}/books/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Reviews API calls
export const fetchReviewsForBook = async (bookId) => {
  const response = await axios.get(`${API_URL}/books/${bookId}/reviews`);
  return response.data;
};

export const addReview = async (bookId, reviewData, token) => {
  const response = await axios.post(`${API_URL}/books/${bookId}/reviews`, reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateReview = async (bookId, reviewId, reviewData, token) => {
  const response = await axios.put(`${API_URL}/books/${bookId}/reviews/${reviewId}`, reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteReview = async (bookId, reviewId, token) => {
  const response = await axios.delete(`${API_URL}/books/${bookId}/reviews/${reviewId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Export the axios instance as default
export default api;