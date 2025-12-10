import React from 'react';
import { Link } from 'react-router-dom';

const dietCategories = [
  { name: 'Normal Diet', description: 'Balanced meals for general health.', link: '/diets/normal' },
  { name: 'Weight Loss Diet', description: 'Calorie-controlled plans to lose weight.', link: '/diets/weight-loss' },
  { name: 'Weight Gain Diet', description: 'High-calorie plans for muscle and weight gain.', link: '/diets/weight-gain' },
  { name: 'Diabetes Diet', description: 'Specialized plans for managing diabetes.', link: '/diabetes' },
  // Add more diet categories as needed
];

function DietPlans() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Diet Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dietCategories.map((diet, index) => (
          <DietCard key={index} {...diet} />
        ))}
      </div>
    </div>
  );
}

function DietCard({ name, description, link }) {
  return (
    <Link to={link} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

export default DietPlans;
