import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="animate-spin"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#4A90E2"
          strokeWidth="5"
          fill="none"
        />
      </svg>
      <p>  Loading...</p>
    </div>
  );
};

export default Loader;