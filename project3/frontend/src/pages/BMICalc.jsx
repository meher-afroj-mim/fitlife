import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';

function BMICalc() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100; // convert cm to meters
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      setCategory(getBMICategory(bmiValue));
    } else {
      setBmi(null);
      setCategory('');
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi <= 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
    return 'Obesity';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">BMI Calculator</h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <InputField
          label="Height (cm)"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="e.g., 175"
        />
        <InputField
          label="Weight (kg)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g., 70"
        />
        <Button onClick={calculateBMI} className="w-full">Calculate BMI</Button>

        {bmi && (
          <ResultCard title="Your BMI" value={bmi} unit="kg/m²" category={category} />
        )}
      </div>
    </div>
  );
}

export default BMICalc;
