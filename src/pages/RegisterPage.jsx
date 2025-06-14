import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;