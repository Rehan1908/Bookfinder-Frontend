import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">BookFinder</h3>
            <p className="text-gray-400 mb-4">
              Discover your next great read with our curated collection of books and user reviews.
            </p>
            <div className="flex space-x-4">
              {/* Existing social icons */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.36 9.5 5.32v2.14H6v4.44h3.5v12h4.44V11.9h3.81l.42-4.44z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21A12.93 12.93 0 0021.1 7.86c0-.2.0-.4-.02-.6.9-.63 1.67-1.41 2.28-2.26z" />
                </svg>
              </a>
              {/* GitHub Icon Link */}
              <a 
                href="https://github.com/Rehan1908" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.5.49.09.66-.213.66-.473 0-.234-.01-1.043-.015-1.845-2.782.602-3.369-1.206-3.369-1.206-.445-1.131-1.088-1.432-1.088-1.432-.89-.609.067-.597.067-.597.985.07 1.506 1.012 1.506 1.012.875 1.5 2.294 1.065 2.854.815.09-.633.342-1.065.623-1.31-2.177-.248-4.464-1.09-4.464-4.843 0-1.068.38-1.943 1.004-2.627-.1-.248-.436-1.243.096-2.59 0 0 .823-.263 2.695 1.006.782-.217 1.62-.327 2.454-.33.834.003 1.672.113 2.454.33 1.872-1.269 2.695-1.006 2.695-1.006.532 1.347.196 2.342.096 2.59.624.684 1.004 1.559 1.004 2.627 0 3.763-2.289 4.592-4.472 4.836.35.308.656.912.656 1.842 0 1.33-.012 2.404-.012 2.73 0 .26.168.563.666.47C19.137 20.193 22 16.437 22 12.017 22 6.484 17.523 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-400 hover:text-white transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/books?search=Fiction" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Fiction
                </Link>
              </li>
              <li>
                <Link 
                  to="/books?search=Mystery" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mystery
                </Link>
              </li>
              <li>
                <Link 
                  to="/books?search=Science Fiction" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Science Fiction
                </Link>
              </li>
              <li>
                <Link 
                  to="/books?search=Fantasy" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Fantasy
                </Link>
              </li>
              <li>
                <Link 
                  to="/books?search=Biography" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Biography
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest books and reviews.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-900"
              />
              <button
                type="submit"
                className="bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BookFinder. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;