import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md border-b border-indigo-900">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold tracking-tight">
              Book<span className="text-amber-400">Finder</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to="/" 
                  className="text-white hover:text-amber-300 transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/books" 
                  className="text-white hover:text-amber-300 transition-colors font-medium"
                >
                  Browse Books
                </Link>
              </li>
              {user?.role === 'admin' && (
                <li>
                  <Link 
                    to="/admin" 
                    className="text-white hover:text-amber-300 transition-colors font-medium"
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-white hover:text-amber-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>{user.name}</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-amber-300 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-indigo-500">
            <ul className="pt-2 space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="block py-2 text-white hover:text-amber-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/books" 
                  className="block py-2 text-white hover:text-amber-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse Books
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link 
                      to="/profile" 
                      className="block py-2 text-white hover:text-amber-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  {user.role === 'admin' && (
                    <li>
                      <Link 
                        to="/admin" 
                        className="block py-2 text-white hover:text-amber-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-white hover:text-amber-300"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className="block py-2 text-white hover:text-amber-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="block py-2 text-white hover:text-amber-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;