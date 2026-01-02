import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white pb-12 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Welcome to <span className="text-blue-600">FitLife</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive fitness and wellness companion. Track your health, monitor progress, and achieve goals.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-3 px-8 rounded-full border-2 border-blue-600 transition-all transform hover:scale-105 shadow-md">
              Get Started
            </Link>
            <Link to="/login" className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-3 px-8 rounded-full border-2 border-blue-600 transition-all transform hover:scale-105 shadow-md">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* What FitLife Does Section - FORCED GRID VIEW */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">What FitLife Does</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need to stay healthy in one place</p>
          </div>
          
          {/* Grid Container: Forces 3 columns on large screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <FeatureCard
              icon="📊"
              title="Health Tracking"
              description="Calculate your BMI, track your daily calorie requirements, and monitor your weight progress over time."
            />
            <FeatureCard
              icon="🥗"
              title="Personalized Diet Plans"
              description="Access tailored diet recommendations based on your goals - whether you want to lose weight or gain muscle."
            />
            <FeatureCard
              icon="💪"
              title="Workout Routines"
              description="Choose from beginner, intermediate, or advanced workout plans designed to help you build strength."
            />
            <FeatureCard
              icon="📈"
              title="Progress Monitoring"
              description="Track your weight journey with detailed history. See your improvements over time visually."
            />
            <FeatureCard
              icon="🎯"
              title="Goal Setting"
              description="Set and achieve your fitness goals with daily calorie targets tailored to your activity level."
            />
            <FeatureCard
              icon="🔒"
              title="Secure & Private"
              description="Your health data is stored securely. Create your account to start tracking your journey privately."
            />
          </div>
        </section>

        {/* Key Features List Section */}
        <section className="bg-white rounded-2xl p-8 md:p-12 mb-20 shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <FeatureItem title="BMI Calculator" description="Instantly calculate your Body Mass Index." />
            <FeatureItem title="Calorie Calculator" description="Determine daily calorie needs based on metrics." />
            <FeatureItem title="Diet Plans" description="Explore options for weight loss and gain." />
            <FeatureItem title="Workout Plans" description="Structured routines for all fitness levels." />
            <FeatureItem title="Progress Tracking" description="Monitor weight changes with history logs." />
            <FeatureItem title="Dashboard" description="View all your health metrics in one place." />
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="text-center pb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Try Our Free Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <QuickLinkCard 
              title="BMI Calculator" 
              description="Calculate your BMI now" 
              link="/bmi" 
              icon="⚖️"
            />
            <QuickLinkCard 
              title="Calorie Calculator" 
              description="Find your daily calorie needs" 
              link="/calories" 
              icon="🔥" 
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  // Added 'text-left' here to override any global center alignment
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full text-left">
      <div className="text-4xl mb-4 bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed flex-grow">{description}</p>
    </div>
  );
}

function FeatureItem({ title, description }) {
  return (
    <div className="flex items-start text-left">
      <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-1.5 mr-4 ring-4 ring-blue-100"></div>
      <div>
        <h4 className="font-bold text-gray-900 text-lg mb-1">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function QuickLinkCard({ title, description, link, icon }) {
  return (
    <Link to={link} className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center text-left">
      <div className="text-4xl mr-6 bg-gray-50 p-3 rounded-full group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

export default Home;