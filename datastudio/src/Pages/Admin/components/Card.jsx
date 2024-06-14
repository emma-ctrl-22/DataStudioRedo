import React from 'react'
import React from 'react';

const Card = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center border-2 border-dotted border-gray-300 p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-gray-600 text-2xl font-bold">{value}</div>
    </div>
  );
}

export default Card;
