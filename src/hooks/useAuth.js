import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService';

export const useAuth = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const { token, user } = await authService.login({ email, password });
      localStorage.setItem('token', token);
      setUser(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name, email, password) => {
    setLoading(true);
    try {
      const { token, user } = await authService.register({ name, email, password });
      localStorage.setItem('token', token);
      setUser(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const userProfile = await authService.getProfile();
      setUser(userProfile);
    } catch (err) {
      // Silent fail if token is invalid or missing
      console.log("Could not fetch profile:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    login: handleLogin,
    register: handleRegister,
    loading,
    error,
  };
};

export default useAuth;