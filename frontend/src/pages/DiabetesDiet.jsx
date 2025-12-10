import React from 'react';

const diabetesDietInfo = {
  whatToEat: [
    'Non-starchy vegetables (broccoli, carrots, spinach)',
    'Lean protein (chicken, fish, tofu)',
    'Whole grains (oats, quinoa, brown rice) in moderation',
    'Fruits (berries, apples) in moderation',
    'Healthy fats (avocado, nuts, olive oil)',
  ],
  avoid: [
    'Sugary drinks and foods',
    'Refined grains (white bread, pasta)',
    'Processed snacks',
    'Fried foods',
    'High-fat meats',
  ],
  weeklyPlan: [
    { day: 'Monday', meal: 'Breakfast: Oatmeal with berries. Lunch: Grilled chicken salad. Dinner: Baked salmon with steamed vegetables.' },
    { day: 'Tuesday', meal: 'Breakfast: Scrambled eggs with spinach. Lunch: Lentil soup. Dinner: Turkey stir-fry with brown rice.' },
    { day: 'Wednesday', meal: 'Breakfast: Greek yogurt with nuts. Lunch: Whole-wheat wrap with hummus and veggies. Dinner: Lean beef with roasted sweet potatoes and green beans.' },
    { day: 'Thursday', meal: 'Breakfast: Smoothie with protein powder and greens. Lunch: Tuna salad (with avocado) on lettuce cups. Dinner: Chicken breast with quinoa and broccoli.' },
    { day: 'Friday', meal: 'Breakfast: Whole-grain toast with avocado. Lunch: Leftover dinner. Dinner: Fish tacos on whole-wheat tortillas with salsa.' },
    { day: 'Saturday', meal: 'Breakfast: Vegetable omelet. Lunch: Quinoa salad with chickpeas. Dinner: Sugar-free lean beef burgers on whole-wheat buns.' },
    { day: 'Sunday', meal: 'Breakfast: Cottage cheese with fruit. Lunch: Grilled vegetable and mozzarella sandwich. Dinner: Roast chicken with a large mixed salad.' },
  ],
};

function DiabetesDiet() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Diabetes Diet Plan</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">What to Eat</h2>
        <ul className="list-disc list-inside space-y-2">
          {diabetesDietInfo.whatToEat.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">What to Avoid</h2>
        <ul className="list-disc list-inside space-y-2 text-red-600">
          {diabetesDietInfo.avoid.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Weekly Meal Plan</h2>
        <div className="space-y-4">
          {diabetesDietInfo.weeklyPlan.map((dayPlan, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h3 className="text-xl font-bold text-gray-800">{dayPlan.day}</h3>
              <p className="text-gray-700">{dayPlan.meal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiabetesDiet;
