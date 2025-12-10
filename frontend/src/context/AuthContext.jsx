import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('fitlife_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('fitlife_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('fitlife_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        email: foundUser.email,
        age: foundUser.age || 30,
        weight: foundUser.weight || 70,
        height: foundUser.height || 175,
        weightHistory: foundUser.weightHistory || [],
        createdAt: foundUser.createdAt
      };
      setUser(userData);
      localStorage.setItem('fitlife_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (email, password, weight, height) => {
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('fitlife_users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'User already exists' };
    }

    // Create initial weight history entry with signup weight
    const initialWeightEntry = {
      date: new Date().toISOString(),
      weight: weight
    };

    // Create new user
    const newUser = {
      email,
      password,
      age: 30, // Default age, can be updated in profile
      weight: weight,
      height: height,
      weightHistory: [initialWeightEntry], // Start with initial weight entry
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('fitlife_users', JSON.stringify(users));

    // Auto-login the new user
    const userData = {
      email: newUser.email,
      age: newUser.age,
      weight: newUser.weight,
      height: newUser.height,
      weightHistory: newUser.weightHistory,
      createdAt: newUser.createdAt
    };
    setUser(userData);
    localStorage.setItem('fitlife_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitlife_user');
  };

  const updateUserProfile = (age, weight, height) => {
    if (!user) return { success: false };

    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('fitlife_users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    
    if (userIndex !== -1) {
      const oldWeight = users[userIndex].weight;
      const newWeight = parseFloat(weight);
      
      // Add weight to history if it changed
      if (oldWeight !== newWeight) {
        const weightEntry = {
          date: new Date().toISOString(),
          weight: newWeight
        };
        users[userIndex].weightHistory = [
          ...(users[userIndex].weightHistory || []),
          weightEntry
        ];
      }

      // Update user data
      users[userIndex].age = parseInt(age);
      users[userIndex].weight = newWeight;
      users[userIndex].height = parseFloat(height);
      
      localStorage.setItem('fitlife_users', JSON.stringify(users));

      // Update current user state
      const updatedUser = {
        email: user.email,
        age: parseInt(age),
        weight: newWeight,
        height: parseFloat(height),
        weightHistory: users[userIndex].weightHistory,
        createdAt: user.createdAt
      };
      setUser(updatedUser);
      localStorage.setItem('fitlife_user', JSON.stringify(updatedUser));
      
      return { success: true };
    }
    return { success: false };
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

