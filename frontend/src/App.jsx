import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import BMICalc from './pages/BMICalc';
import CalorieCalc from './pages/CalorieCalc';
import DietPlans from './pages/DietPlans';
import DiabetesDiet from './pages/DiabetesDiet';
import WorkoutPlans from './pages/WorkoutPlans';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bmi" element={<BMICalc />} />
              <Route path="/calories" element={<CalorieCalc />} />
              <Route path="/diets" element={<DietPlans />} />
              <Route path="/diabetes" element={<DiabetesDiet />} />
              <Route path="/workouts" element={<WorkoutPlans />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
