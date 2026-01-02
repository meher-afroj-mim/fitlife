import React from 'react';

function BMIResult({ result, onCalculateAgain }) {
  if (!result) return null;

  const getColorClass = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 border-blue-500 text-blue-800',
      green: 'bg-green-100 border-green-500 text-green-800',
      yellow: 'bg-yellow-100 border-yellow-500 text-yellow-800',
      red: 'bg-red-100 border-red-500 text-red-800',
    };
    return colorMap[color] || 'bg-gray-100 border-gray-500 text-gray-800';
  };

  const getCategoryIcon = (category) => {
    if (category === 'Normal weight') return '✅';
    if (category === 'Underweight') return '📉';
    if (category === 'Overweight') return '⚠️';
    if (category === 'Obesity') return '🔴';
    return '📊';
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your BMI Result</h3>
        <div className="text-6xl font-extrabold text-blue-600 mb-2">
          {result.bmi}
        </div>
        <div className={`inline-block px-4 py-2 rounded-lg border-2 font-semibold ${getColorClass(result.color)}`}>
          <span className="text-2xl mr-2">{getCategoryIcon(result.category)}</span>
          {result.category}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-gray-700 text-center">{result.description}</p>
      </div>

      {result.bmr && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-blue-600 font-medium mb-1">Basal Metabolic Rate (BMR)</div>
            <div className="text-2xl font-bold text-blue-800">{result.bmr.toLocaleString()}</div>
            <div className="text-xs text-blue-600 mt-1">calories/day</div>
          </div>
          {result.dailyCalories && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-sm text-green-600 font-medium mb-1">Daily Calorie Needs</div>
              <div className="text-2xl font-bold text-green-800">{result.dailyCalories.toLocaleString()}</div>
              <div className="text-xs text-green-600 mt-1">calories/day</div>
            </div>
          )}
        </div>
      )}

      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <div className="text-sm text-gray-600 mb-2">Your Measurements:</div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Height: <strong>{result.height} cm</strong></span>
          <span className="text-gray-700">Weight: <strong>{result.weight} kg</strong></span>
        </div>
      </div>

      {result.saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-green-700 text-sm text-center">
            ✓ Your health data has been saved successfully!
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={onCalculateAgain}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
        >
          Calculate Again
        </button>
      </div>
    </div>
  );
}

export default BMIResult;

