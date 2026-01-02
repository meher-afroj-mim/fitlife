import React from 'react';

function CalorieResult({ result, onCalculateAgain }) {
  if (!result) return null;

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Calorie Goal</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-600 font-medium">Basal Metabolic Rate (BMR)</span>
            <span className="text-2xl">🔥</span>
          </div>
          <div className="text-4xl font-bold text-blue-800 mb-1">
            {result.bmr.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600">calories/day at rest</div>
          <p className="text-xs text-gray-600 mt-2">
            The number of calories your body needs to perform basic functions
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-600 font-medium">Daily Calorie Goal</span>
            <span className="text-2xl">🎯</span>
          </div>
          <div className="text-4xl font-bold text-green-800 mb-1">
            {result.dailyCalories.toLocaleString()}
          </div>
          <div className="text-sm text-green-600">calories/day</div>
          <p className="text-xs text-gray-600 mt-2">
            Based on your activity level: <strong>{result.activityLevel}</strong>
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="text-sm text-gray-600 mb-2 font-semibold">Your Information:</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <span className="text-gray-500">Height:</span>
            <span className="ml-2 font-medium text-gray-800">{result.height} cm</span>
          </div>
          <div>
            <span className="text-gray-500">Weight:</span>
            <span className="ml-2 font-medium text-gray-800">{result.weight} kg</span>
          </div>
          <div>
            <span className="text-gray-500">Age:</span>
            <span className="ml-2 font-medium text-gray-800">{result.age} years</span>
          </div>
          <div>
            <span className="text-gray-500">Gender:</span>
            <span className="ml-2 font-medium text-gray-800">{result.gender}</span>
          </div>
        </div>
      </div>

      {result.goalType && result.goalCalories && (
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-purple-600 font-semibold text-lg">Goal: {result.goalType}</span>
            <span className="text-2xl">🎯</span>
          </div>
          <div className="text-3xl font-bold text-purple-800 mb-2">
            {result.goalCalories.toLocaleString()} calories/day
          </div>
          <div className="text-sm text-purple-600">
            Adjusted from {result.dailyCalories.toLocaleString()} calories based on your goal
          </div>
        </div>
      )}

      {result.saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-green-700 text-sm text-center">
            ✓ Your calorie goal has been saved successfully!
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

export default CalorieResult;

