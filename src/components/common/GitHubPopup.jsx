import React, { useState, useEffect } from 'react';
import Button from './Button';

const GitHubPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the popup after a short delay to ensure the page is loaded
    const timer = setTimeout(() => {
      // Check if the popup has been shown before in this session
      if (!sessionStorage.getItem('githubPopupShown')) {
        setIsVisible(true);
        sessionStorage.setItem('githubPopupShown', 'true');
      }
    }, 1500); // 1.5-second delay

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] transition-opacity duration-300 ease-out opacity-100">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl max-w-md w-full text-white transform scale-100 transition-transform duration-300 ease-out">
        <div className="text-center">
          <div className="mb-6">
            <span className="text-5xl animate-bounce inline-block">🚀</span>
          </div>
          <h2 className="text-3xl font-bold font-heading mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Hey Book Explorer!
          </h2>
          <p className="text-gray-300 mb-6 text-lg">
            This app was crafted with passion! Want to see the code magic behind it?
          </p>
          <p className="text-gray-400 mb-8 text-sm">
            Check out my GitHub profile for this project and more.
          </p>

          <Button
            as="a"
            href="https://github.com/Rehan1908"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="w-full mb-4 bg-purple-600 hover:bg-purple-700 border-purple-600 hover:border-purple-700 !text-lg py-3 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 group-hover:animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Beam me to GitHub!
          </Button>

          <Button
            onClick={() => setIsVisible(false)}
            variant="outline"
            className="w-full text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GitHubPopup;