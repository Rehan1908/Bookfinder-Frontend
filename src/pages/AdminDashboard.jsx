import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import BookManagement from '../components/admin/BookManagement';
import UserManagement from '../components/admin/UserManagement';
import ReviewManagement from '../components/admin/ReviewManagement';
import DashboardStats from '../components/admin/DashboardStats';
import Button from '../components/common/Button';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Redirect if not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'books', label: 'Books', icon: '📚' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats />;
      case 'books':
        return <BookManagement />;
      case 'users':
        return <UserManagement />;
      case 'reviews':
        return <ReviewManagement />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your BookFinder application
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-card mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-brand-500 text-brand-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;