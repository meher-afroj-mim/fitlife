/**
 * Calculate BMI (Body Mass Index)
 * Formula: BMI = weight (kg) / (height (m))^2
 * @param {number} weight - Weight in kilograms
 * @param {number} height - Height in centimeters
 * @returns {Object} BMI value and category
 */
export const calculateBMI = (weight, height) => {
  // Convert height from cm to meters
  const heightInMeters = height / 100;
  
  // Calculate BMI
  const bmi = weight / (heightInMeters * heightInMeters);
  
  // Round to 1 decimal place
  const bmiRounded = Math.round(bmi * 10) / 10;
  
  // Determine BMI category
  let category;
  let color;
  let description;
  
  if (bmiRounded < 18.5) {
    category = 'Underweight';
    color = 'blue';
    description = 'You may need to gain weight. Consider consulting with a healthcare provider.';
  } else if (bmiRounded >= 18.5 && bmiRounded < 25) {
    category = 'Normal weight';
    color = 'green';
    description = 'You have a healthy weight. Keep up the good work!';
  } else if (bmiRounded >= 25 && bmiRounded < 30) {
    category = 'Overweight';
    color = 'yellow';
    description = 'Consider a balanced diet and regular exercise to reach a healthy weight.';
  } else {
    category = 'Obesity';
    color = 'red';
    description = 'Consider consulting with a healthcare provider for a personalized weight management plan.';
  }
  
  return {
    bmi: bmiRounded,
    category,
    color,
    description,
  };
};

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 * @param {number} weight - Weight in kilograms
 * @param {number} height - Height in centimeters
 * @param {number} age - Age in years
 * @param {string} gender - 'Male', 'Female', or 'Other'
 * @returns {number} BMR in calories per day
 */
export const calculateBMR = (weight, height, age, gender) => {
  // Mifflin-St Jeor Equation
  // Men: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) + 5
  // Women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) - 161
  
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;
  
  if (gender === 'Male') {
    return Math.round(baseBMR + 5);
  } else if (gender === 'Female') {
    return Math.round(baseBMR - 161);
  } else {
    // Average of male and female for 'Other'
    return Math.round(baseBMR - 78);
  }
};

/**
 * Calculate daily calorie needs based on activity level
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level
 * @returns {number} Daily calorie needs
 */
export const calculateDailyCalories = (bmr, activityLevel) => {
  const activityMultipliers = {
    'Sedentary': 1.2,
    'Lightly active': 1.375,
    'Moderately active': 1.55,
    'Very active': 1.725,
    'Extra active': 1.9,
  };
  
  const multiplier = activityMultipliers[activityLevel] || 1.2;
  return Math.round(bmr * multiplier);
};

/**
 * Calculate adjusted calorie goal based on weight goal
 * @param {number} baseCalories - Base daily calorie needs
 * @param {string} goalType - Goal type (lose/gain weight)
 * @returns {number} Adjusted calorie goal
 */
export const calculateGoalCalories = (baseCalories, goalType) => {
  if (!goalType) {
    return baseCalories;
  }

  const goalAdjustments = {
    'Lose weight': -500,        // 500 calorie deficit
    'Lose weight fast': -1000,  // 1000 calorie deficit
    'Gain weight': 500,         // 500 calorie surplus
    'Gain weight fast': 1000,  // 1000 calorie surplus
  };

  const adjustment = goalAdjustments[goalType] || 0;
  return Math.max(1200, Math.round(baseCalories + adjustment)); // Minimum 1200 calories
};

