import React from 'react';

const Rating = ({ rating, size = 'md', interactive = false, onChange }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    
    // Determine fill level
    const fillPercentage = Math.min(100, Math.max(0, (rating - index) * 100));
    
    // Size classes
    const sizeClasses = {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
    };
    
    return (
      <span 
        key={index} 
        className={`inline-block relative cursor-${interactive ? 'pointer' : 'default'} ${sizeClasses[size]}`}
        onClick={() => interactive && onChange && onChange(starValue)}
      >
        {/* Background star (gray) */}
        <span className="text-gray-300">★</span>
        
        {/* Foreground star (filled portion) */}
        <span 
          className="absolute inset-0 overflow-hidden text-amber-400"
          style={{ width: `${fillPercentage}%` }}
        >
          ★
        </span>
      </span>
    );
  });

  return (
    <div className="flex items-center">
      {stars}
      {rating > 0 && (
        <span className="ml-1 text-gray-700 font-medium">
          {Number(rating).toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;