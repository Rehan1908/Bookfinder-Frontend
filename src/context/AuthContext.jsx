import React, { createContext, useState, useEffect } from 'react';
import { getProfile } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const fetchUser = async () => {
      // Check if we have a token before trying to fetch profile
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        // Clear token if it's invalid
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = (userData, authToken) => {
    localStorage.setItem('token', authToken);
    setToken(authToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};