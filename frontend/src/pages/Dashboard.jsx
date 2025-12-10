import React, { useMemo } from 'react';
import ResultCard from '../components/ResultCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  // Calculate BMI and other stats from user data
  const userStats = useMemo(() => {
    if (!user) return null;

    const heightInMeters = user.height / 100;
    const bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(2);
    
    const getBMICategory = (bmi) => {
      if (bmi < 18.5) return 'Underweight';
      if (bmi >= 18.5 && bmi <= 24.9) return 'Normal weight';
      if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
      return 'Obesity';
    };

    // Calculate daily calories using Mifflin-St Jeor Equation (using average of male/female)
    const bmr = (10 * user.weight) + (6.25 * user.height) - (5 * user.age) - 78; // Average of male (+5) and female (-161)
    const dailyCalories = Math.round(bmr * 1.375); // Lightly active

    // Recommend diet based on BMI
    const getRecommendedDiet = (bmi) => {
      if (bmi < 18.5) return 'Weight Gain Diet';
      if (bmi >= 18.5 && bmi <= 24.9) return 'Balanced Diet';
      return 'Weight Loss Diet';
    };

    return {
      bmi: parseFloat(bmi),
      bmiCategory: getBMICategory(parseFloat(bmi)),
      dailyCalories,
      recommendedDiet: getRecommendedDiet(parseFloat(bmi)),
    };
  }, [user]);

  if (!user || !userStats) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Please log in to view your dashboard.</p>
      </div>
    );
  }

  // Get weight progress data
  const weightHistory = user.weightHistory || [];
  const hasProgress = weightHistory.length > 0;
  const latestWeight = weightHistory.length > 0 
    ? weightHistory[weightHistory.length - 1].weight 
    : user.weight;
  const previousWeight = weightHistory.length > 1 
    ? weightHistory[weightHistory.length - 2].weight 
    : null;
  const weightChange = previousWeight ? (latestWeight - previousWeight).toFixed(1) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ResultCard title="Your BMI" value={userStats.bmi} unit="kg/m²" category={userStats.bmiCategory} />
        <ResultCard title="Daily Calorie Goal" value={userStats.dailyCalories} unit="calories" />
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Recommended Diet</h3>
          <p className="text-gray-700 text-lg mb-2">{userStats.recommendedDiet}</p>
          <Link to="/diets" className="text-blue-600 hover:underline">Explore Diet Plans</Link>
        </div>
      </div>

      {/* Weight Progress Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Weight Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-gray-600">Current Weight</p>
            <p className="text-3xl font-bold">{latestWeight} kg</p>
          </div>
          {weightChange && (
            <div>
              <p className="text-gray-600">Change</p>
              <p className={`text-3xl font-bold ${weightChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {weightChange > 0 ? '+' : ''}{weightChange} kg
              </p>
            </div>
          )}
          <div>
            <p className="text-gray-600">Total Entries</p>
            <p className="text-3xl font-bold">{weightHistory.length + 1}</p>
          </div>
        </div>
        
        {hasProgress && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Recent Weight History</h3>
            <div className="space-y-2">
              {weightHistory.slice(-5).reverse().map((entry, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-700">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <span className="font-semibold">{entry.weight} kg</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!hasProgress && (
          <p className="text-gray-600">Update your profile to start tracking your weight progress!</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="text-center">
        <Link to="/profile" className="text-blue-600 hover:underline text-lg mr-4">Update Profile</Link>
        <Link to="/diets" className="text-blue-600 hover:underline text-lg">View Diet Plans</Link>
      </div>
    </div>
  );
}

export default Dashboard;
