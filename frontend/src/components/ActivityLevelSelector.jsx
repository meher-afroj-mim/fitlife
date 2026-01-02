import React from 'react';

function ActivityLevelSelector({ value, onChange, error, required = false }) {
  const activityLevels = [
    {
      value: 'Sedentary',
      label: 'Sedentary',
      description: 'Little or no exercise',
      multiplier: '1.2x',
    },
    {
      value: 'Lightly active',
      label: 'Lightly active',
      description: 'Light exercise 1-3 days/week',
      multiplier: '1.375x',
    },
    {
      value: 'Moderately active',
      label: 'Moderately active',
      description: 'Moderate exercise 3-5 days/week',
      multiplier: '1.55x',
    },
    {
      value: 'Very active',
      label: 'Very active',
      description: 'Hard exercise 6-7 days/week',
      multiplier: '1.725x',
    },
    {
      value: 'Extra active',
      label: 'Extra active',
      description: 'Very hard exercise, physical job',
      multiplier: '1.9x',
    },
  ];

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Activity Level
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {activityLevels.map((level) => (
          <label
            key={level.value}
            className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all ${
              value === level.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 bg-white'
            } ${error ? 'border-red-500' : ''}`}
          >
            <input
              type="radio"
              name="activityLevel"
              value={level.value}
              checked={value === level.value}
              onChange={onChange}
              className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
              required={required}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{level.label}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {level.multiplier}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{level.description}</p>
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

export default ActivityLevelSelector;

