import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [age, setAge] = useState(user?.age?.toString() || '30');
  const [weight, setWeight] = useState(user?.weight?.toString() || '70');
  const [height, setHeight] = useState(user?.height?.toString() || '175');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setAge(user.age?.toString() || '30');
      setWeight(user.weight?.toString() || '70');
      setHeight(user.height?.toString() || '175');
    }
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!age || !weight || !height) {
      setMessage('Please fill in all fields');
      return;
    }

    const result = updateUserProfile(age, weight, height);
    if (result.success) {
      setMessage('Profile updated successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setMessage('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-160px)]">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-4xl font-bold text-center mb-8">User Profile</h1>
        <form onSubmit={handleUpdateProfile}>
          <InputField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g., 30"
          />
          <InputField
            label="Weight (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 70"
          />
          <InputField
            label="Height (cm)"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g., 175"
          />
          {message && (
            <p className={`text-sm mb-4 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
          <Button type="submit" className="w-full mt-4">Update Profile</Button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
