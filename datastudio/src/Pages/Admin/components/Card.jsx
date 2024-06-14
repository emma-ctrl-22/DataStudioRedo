import React from 'react'

const Card = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center bg-white border-2 border-dotted border-gray-300 p-1 rounded-lg shadow-sm h-32 w-80">
      <h2 className="text-sm font-semibold text-black mb-2">{title}</h2>
      <div className="text-gray-600 text-2xl font-bold">{value}</div>
    </div>
  );
}

export default Card;
