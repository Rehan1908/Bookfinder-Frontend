import axios from 'axios';

const API_URL = '/api/auth/';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await axios.get(`${API_URL}profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

// Also export as a default object for compatibility
const authService = {
  register,
  login,
  getProfile,
};

export default authService;