import axios from 'axios';

const BOOK_API_URL = '/api/books';

export const getBooks = async (searchQuery, page = 1, limit = 10) => {
  const response = await axios.get(`${BOOK_API_URL}?search=${searchQuery}&page=${page}&limit=${limit}`);
  return response.data;
};

export const getBookById = async (bookId) => {
  const response = await axios.get(`${BOOK_API_URL}/${bookId}`);
  return response.data;
};

export const createBook = async (bookData, token) => {
  const response = await axios.post(BOOK_API_URL, bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateBook = async (bookId, bookData, token) => {
  const response = await axios.put(`${BOOK_API_URL}/${bookId}`, bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteBook = async (bookId, token) => {
  const response = await axios.delete(`${BOOK_API_URL}/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getReviewsByBookId = async (bookId) => {
  const response = await axios.get(`${BOOK_API_URL}/${bookId}/reviews`);
  return response.data;
};