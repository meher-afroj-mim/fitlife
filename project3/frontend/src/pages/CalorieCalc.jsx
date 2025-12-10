import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';

function CalorieCalc() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(''); // in cm
  const [weight, setWeight] = useState(''); // in kg
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [calories, setCalories] = useState(null);

  const activityFactors = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
    extraActive: 1.9,
  };

  const calculateCalories = () => {
    if (age && height && weight) {
      let bmr;
      if (gender === 'male') {
        bmr = (10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * parseFloat(age)) + 5;
      } else {
        bmr = (10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * parseFloat(age)) - 161;
      }

      const dailyCalories = (bmr * activityFactors[activityLevel]).toFixed(0);
      setCalories(dailyCalories);
    } else {
      setCalories(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Daily Calorie Requirement Calculator</h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <InputField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="e.g., 30"
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <InputField
          label="Height (cm)"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="e.g., 170"
        />
        <InputField
          label="Weight (kg)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g., 65"
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Activity Level</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="lightlyActive">Lightly active (light exercise/sports 1-3 days/week)</option>
            <option value="moderatelyActive">Moderately active (moderate exercise/sports 3-5 days/week)</option>
            <option value="veryActive">Very active (hard exercise/sports 6-7 days a week)</option>
            <option value="extraActive">Extra active (very hard exercise/physical job)</option>
          </select>
        </div>
        <Button onClick={calculateCalories} className="w-full">Calculate Calories</Button>

        {calories && (
          <ResultCard title="Daily Calorie Requirement" value={calories} unit="calories" />
        )}
      </div>
    </div>
  );
}

export default CalorieCalc;
