import React from 'react';

function ResultCard({ title, value, unit, category }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 text-3xl font-bold mb-2">{value} <span className="text-lg font-normal">{unit}</span></p>
      {category && <p className="text-gray-600 text-lg">Category: <span className="font-semibold">{category}</span></p>}
    </div>
  );
}

export default ResultCard;
