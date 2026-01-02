import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ActivityLevelSelector from '../components/ActivityLevelSelector';
import BMIResult from '../components/BMIResult';
import api from '../services/api';

function BMICalculator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    activityLevel: '',
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

    if (formData.age && formData.age.trim()) {
      const age = parseFloat(formData.age);
      if (isNaN(age) || age < 1 || age > 150) {
        newErrors.age = 'Age must be between 1 and 150 years';
      }
    }

    if (formData.age && !formData.gender) {
      newErrors.gender = 'Gender is required when age is provided';
    }

    if (formData.activityLevel && !formData.age) {
      newErrors.age = 'Age is required when activity level is provided';
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
        age: formData.age ? parseFloat(formData.age) : undefined,
        gender: formData.gender || undefined,
        activityLevel: formData.activityLevel || undefined,
        saveData: isLoggedIn && saveData,
      };

      const response = await api.calculateBMI(payload);
      setResult(response);
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to calculate BMI. Please try again.' });
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
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              BMI Calculator
            </h1>
            <p className="text-gray-600">
              Calculate your Body Mass Index and get personalized health insights
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
                {' '}to save your health records.
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

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-4">
                Optional: Provide additional information for more accurate calorie calculations
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Age (years)"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g., 25"
                  error={errors.age}
                />

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.gender ? 'border-red-500' : 'border-gray-300'
                    }`}
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

              <div className="mt-4">
                <ActivityLevelSelector
                  value={formData.activityLevel}
                  onChange={handleChange}
                  error={errors.activityLevel}
                />
              </div>
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
                  Save this health record to my account
                </label>
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Calculating...' : 'Calculate BMI'}
              </Button>
            </div>
          </form>

          {result && <BMIResult result={result} onCalculateAgain={handleCalculateAgain} />}
        </div>

        {/* BMI Information Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About BMI</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Body Mass Index (BMI)</strong> is a measure of body fat based on height and weight.
              It's a useful screening tool to identify potential weight problems.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold mb-2">BMI Categories:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Underweight:</strong> BMI less than 18.5</li>
                <li><strong>Normal weight:</strong> BMI 18.5 to 24.9</li>
                <li><strong>Overweight:</strong> BMI 25 to 29.9</li>
                <li><strong>Obesity:</strong> BMI 30 or greater</li>
              </ul>
            </div>
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> BMI is a screening tool, not a diagnostic of body fatness or health.
              Consult with a healthcare provider for a complete health assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BMICalculator;

