import React from 'react';

const workoutPlans = {
  beginner: {
    title: "Beginner Full Body Workout",
    description: "A great starting point to build strength and endurance.",
    exercises: [
      { name: "Squats", sets: "3", reps: "10-12" },
      { name: "Push-ups", sets: "3", reps: "8-10 (or knee push-ups)" },
      { name: "Lunges", sets: "3", reps: "10-12 per leg" },
      { name: "Plank", sets: "3", reps: "30-60 seconds" },
      { name: "Dumbbell Rows", sets: "3", reps: "10-12 per arm" },
    ],
  },
  intermediate: {
    title: "Intermediate Strength & Conditioning",
    description: "Progress to build more strength and improve conditioning.",
    exercises: [
      { name: "Barbell Squats", sets: "4", reps: "8-10" },
      { name: "Bench Press", sets: "4", reps: "8-10" },
      { name: "Deadlifts", sets: "3", reps: "5-8" },
      { name: "Overhead Press", sets: "3", reps: "8-10" },
      { name: "Pull-ups", sets: "3", reps: "As many as possible" },
      { name: "Burpees", sets: "3", reps: "10-15" },
    ],
  },
  advanced: {
    title: "Advanced Power & Hypertrophy",
    description: "Challenging routines for experienced lifters.",
    exercises: [
      { name: "Heavy Back Squats", sets: "5", reps: "5" },
      { name: "Incline Dumbbell Press", sets: "4", reps: "6-8" },
      { name: "Romanian Deadlifts", sets: "3", reps: "8-10" },
      { name: "Weighted Pull-ups", sets: "4", reps: "6-8" },
      { name: "Box Jumps", sets: "3", reps: "8-10" },
      { name: "Sprints", sets: "5", reps: "50m" },
    ],
  },
};

function WorkoutPlans() {
  const [selectedPlan, setSelectedPlan] = React.useState('beginner');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Workout Plans</h1>

      <div className="flex justify-center mb-8 space-x-4">
        <button
          className={`px-6 py-3 rounded-lg font-semibold ${
            selectedPlan === 'beginner' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setSelectedPlan('beginner')}
        >
          Beginner
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold ${
            selectedPlan === 'intermediate' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setSelectedPlan('intermediate')}
        >
          Intermediate
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold ${
            selectedPlan === 'advanced' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => setSelectedPlan('advanced')}
        >
          Advanced
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{workoutPlans[selectedPlan].title}</h2>
        <p className="text-gray-600 mb-6">{workoutPlans[selectedPlan].description}</p>

        <h3 className="text-2xl font-semibold mb-4">Exercises:</h3>
        <ul className="space-y-4">
          {workoutPlans[selectedPlan].exercises.map((exercise, index) => (
            <li key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
              <span className="text-lg font-medium text-gray-700">{exercise.name}</span>
              <span className="text-gray-600">Sets: {exercise.sets}, Reps: {exercise.reps}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorkoutPlans;
