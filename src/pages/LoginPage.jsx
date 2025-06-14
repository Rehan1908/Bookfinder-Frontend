import React from 'react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      // Redirect or perform additional actions after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;