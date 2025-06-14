import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [authChecked, setAuthChecked] = useState(false);

  const logout = () => {
    // Clear user data and token
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // This function combines setting the token and user
  const login = async (email, password) => {
    try {
      const data = await authService.login({ email, password });
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data);
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const data = await authService.register({ name, email, password });
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data);
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      const data = await authService.updateProfile(userData);
      setUser(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Fetch user profile only once on initial load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const userData = await authService.getProfile();
          setUser(userData);
        } catch (error) {
          // Clear invalid token
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
      setAuthChecked(true);
    };

    checkAuth();
  }, [token]);

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token,
        loading, 
        authChecked,
        isAuthenticated,
        login, 
        logout, 
        register,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};