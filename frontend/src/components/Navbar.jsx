import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkUser = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'token') {
        checkUser();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    const handleLogin = () => checkUser();
    window.addEventListener('userLogin', handleLogin);
    window.addEventListener('userLogout', handleLogin);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleLogin);
      window.removeEventListener('userLogout', handleLogin);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('userLogout'));
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 p-4 text-white shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo Section with Gym Image */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="bg-blue-600 p-2 rounded-lg transition-transform group-hover:scale-110">
            {/* Gym Icon (SVG for perfect quality) */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="white" 
              className="w-8 h-8"
            >
              <path d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L7 5.57L5.57 7L4.14 5.57L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L18.43 19.86L17 18.43L18.43 17L19.86 18.43L22 16.29L20.57 14.86Z" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">
            Fit<span className="text-blue-500">Life</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4 flex items-center">
          <Link 
            to="/bmi" 
            className="hidden md:block hover:text-blue-400 transition-colors font-medium px-3 py-2"
          >
            BMI Calc
          </Link>
          
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="bg-gray-800 hover:bg-gray-700 transition-colors font-medium px-4 py-2 rounded-md border border-gray-700"
              >
                Dashboard
              </Link>
              <div className="flex items-center space-x-3 ml-4 border-l border-gray-700 pl-4">
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-gray-400 leading-none">Member</p>
                  <p className="text-sm font-bold text-white">{user.name}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="hover:text-blue-400 transition-colors font-medium px-3 py-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-bold transition-all shadow-lg active:scale-95"
              >
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;