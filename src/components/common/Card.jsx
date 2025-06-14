import React from 'react';

const Card = ({ title, description, image, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Card;