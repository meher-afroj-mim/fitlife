import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ActivityLevelSelector from '../components/ActivityLevelSelector';
import CalorieResult from '../components/CalorieResult';
import api from '../services/api';

function CalorieGoal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    activityLevel: '',
    goalType: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [saveData, setSaveData] = useState(true);

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    // Clear result when form changes
    if (result) {
      setResult(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.height.trim()) {
      newErrors.height = 'Height is required';
    } else {
      const height = parseFloat(formData.height);
      if (isNaN(height) || height < 50 || height > 300) {
        newErrors.height = 'Height must be between 50 and 300 cm';
      }
    }

    if (!formData.weight.trim()) {
      newErrors.weight = 'Weight is required';
    } else {
      const weight = parseFloat(formData.weight);
      if (isNaN(weight) || weight < 20 || weight > 500) {
        newErrors.weight = 'Weight must be between 20 and 500 kg';
      }
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else {
      const age = parseFloat(formData.age);
      if (isNaN(age) || age < 1 || age > 150) {
        newErrors.age = 'Age must be between 1 and 150 years';
      }
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.activityLevel) {
      newErrors.activityLevel = 'Activity level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const payload = {
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        age: parseFloat(formData.age),
        gender: formData.gender,
        activityLevel: formData.activityLevel,
        goalType: formData.goalType || undefined,
        saveData: isLoggedIn && saveData,
      };

      const response = await api.calculateCalorieGoal(payload);
      setResult(response);
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to calculate calorie goal. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCalculateAgain = () => {
    setResult(null);
    setFormData({
      height: '',
      weight: '',
      age: '',
      gender: '',
      activityLevel: '',
      goalType: '',
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Calorie Goal Calculator
            </h1>
            <p className="text-gray-600">
              Calculate your daily calorie needs based on your BMR and activity level
            </p>
          </div>

          {!isLoggedIn && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> You're not logged in. Your data won't be saved.{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-yellow-600 hover:text-yellow-800 underline font-medium"
                >
                  Login
                </button>
                {' '}to save your calorie goals.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.submit}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Height (cm)"
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="e.g., 175"
                error={errors.height}
                required
              />

              <InputField
                label="Weight (kg)"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g., 70"
                error={errors.weight}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Age (years)"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g., 25"
                error={errors.age}
                required
              />

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                )}
              </div>
            </div>

            <ActivityLevelSelector
              value={formData.activityLevel}
              onChange={handleChange}
              error={errors.activityLevel}
              required
            />

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Goal Type (Optional)
              </label>
              <select
                name="goalType"
                value={formData.goalType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Maintain current weight</option>
                <option value="Lose weight">Lose weight (500 cal deficit)</option>
                <option value="Lose weight fast">Lose weight fast (1000 cal deficit)</option>
                <option value="Gain weight">Gain weight (500 cal surplus)</option>
                <option value="Gain weight fast">Gain weight fast (1000 cal surplus)</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Select a goal to adjust your daily calorie target
              </p>
            </div>

            {isLoggedIn && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveData"
                  checked={saveData}
                  onChange={(e) => setSaveData(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="saveData" className="ml-2 text-sm text-gray-700">
                  Save this calorie goal to my account
                </label>
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Calculating...' : 'Calculate Calorie Goal'}
              </Button>
            </div>
          </form>

          {result && <CalorieResult result={result} onCalculateAgain={handleCalculateAgain} />}
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Calorie Goals</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body
              needs to perform basic functions like breathing, circulation, and cell production.
            </p>
            <p>
              <strong>Daily Calorie Goal</strong> is calculated by multiplying your BMR by an
              activity factor that accounts for your daily physical activity level.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold mb-2">Activity Multipliers:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Sedentary:</strong> 1.2x (little or no exercise)</li>
                <li><strong>Lightly active:</strong> 1.375x (light exercise 1-3 days/week)</li>
                <li><strong>Moderately active:</strong> 1.55x (moderate exercise 3-5 days/week)</li>
                <li><strong>Very active:</strong> 1.725x (hard exercise 6-7 days/week)</li>
                <li><strong>Extra active:</strong> 1.9x (very hard exercise, physical job)</li>
              </ul>
            </div>
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> These calculations are estimates. Individual needs may vary.
              Consult with a healthcare provider or nutritionist for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalorieGoal;

