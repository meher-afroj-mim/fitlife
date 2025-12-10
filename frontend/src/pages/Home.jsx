import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

function Home() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Welcome to <span className="text-blue-600">FitLife</span>
        </h1>
        <p className="text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
          Your comprehensive fitness and wellness companion
        </p>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Track your health, monitor your progress, and achieve your fitness goals with personalized diet plans and workout routines.
        </p>
        
        {!user && (
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button className="px-8 py-3 text-lg">Get Started - Sign Up Free</Button>
            </Link>
            <Link to="/login">
              <button className="px-8 py-3 text-lg border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-bold">
                Already have an account? Login
              </button>
            </Link>
          </div>
        )}
        
        {user && (
          <div className="flex justify-center gap-4">
            <Link to="/dashboard">
              <Button className="px-8 py-3 text-lg">Go to Dashboard</Button>
            </Link>
          </div>
        )}
      </section>

      {/* What FitLife Does Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What FitLife Does</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="📊"
            title="Health Tracking"
            description="Calculate your BMI, track your daily calorie requirements, and monitor your weight progress over time. Get personalized insights based on your body metrics."
          />
          <FeatureCard
            icon="🥗"
            title="Personalized Diet Plans"
            description="Access tailored diet recommendations based on your goals - whether you want to lose weight, gain weight, or maintain a healthy lifestyle. Special plans for diabetes management included."
          />
          <FeatureCard
            icon="💪"
            title="Workout Routines"
            description="Choose from beginner, intermediate, or advanced workout plans designed to help you build strength, improve endurance, and reach your fitness goals."
          />
          <FeatureCard
            icon="📈"
            title="Progress Monitoring"
            description="Track your weight journey with detailed history. See your improvements over time and stay motivated with visual progress tracking."
          />
          <FeatureCard
            icon="🎯"
            title="Goal Setting"
            description="Set and achieve your fitness goals with personalized recommendations. Get daily calorie targets and diet suggestions tailored to your BMI and activity level."
          />
          <FeatureCard
            icon="🔒"
            title="Secure & Private"
            description="Your health data is stored securely. Create your account to start tracking your fitness journey privately and safely."
          />
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <FeatureItem title="BMI Calculator" description="Instantly calculate your Body Mass Index and understand your health category" />
          <FeatureItem title="Calorie Calculator" description="Determine your daily calorie needs based on age, gender, height, weight, and activity level" />
          <FeatureItem title="Diet Plans" description="Explore various diet options including weight loss, weight gain, and diabetes-friendly plans" />
          <FeatureItem title="Workout Plans" description="Access structured workout routines for all fitness levels" />
          <FeatureItem title="Weight Progress Tracking" description="Monitor your weight changes over time with detailed history and progress charts" />
          <FeatureItem title="Personalized Dashboard" description="View all your health metrics, recommendations, and progress in one place" />
        </div>
      </section>

      {/* Call to Action Section */}
      {!user && (
        <section className="text-center bg-blue-600 text-white rounded-lg p-12 mb-8">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join FitLife today and take control of your health and wellness
          </p>
          <Link to="/signup">
            <button className="px-10 py-4 text-lg font-bold text-black bg-white hover:bg-gray-100 rounded focus:outline-none focus:shadow-outline">
              Create Your Free Account
            </button>
          </Link>
        </section>
      )}

      {/* Quick Access Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Try Our Free Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <QuickLinkCard title="BMI Calculator" description="Calculate your BMI" link="/bmi" />
          <QuickLinkCard title="Calorie Calculator" description="Find your calorie needs" link="/calories" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function FeatureItem({ title, description }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

function QuickLinkCard({ title, description, link }) {
  return (
    <Link to={link} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
}

export default Home;
