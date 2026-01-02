import express from 'express';
import Health from '../models/Health.js';
import { calculateBMI, calculateBMR, calculateDailyCalories, calculateGoalCalories } from '../utils/bmiCalculator.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/health/bmi
// @desc    Calculate BMI and save health data
// @access  Private
router.post('/bmi', protect, async (req, res) => {
  try {
    const { height, weight, age, gender, activityLevel, saveData } = req.body;

    // Validation
    if (!height || !weight) {
      return res.status(400).json({ message: 'Height and weight are required' });
    }

    if (height < 50 || height > 300) {
      return res.status(400).json({ message: 'Height must be between 50 and 300 cm' });
    }

    if (weight < 20 || weight > 500) {
      return res.status(400).json({ message: 'Weight must be between 20 and 500 kg' });
    }

    // Calculate BMI
    const bmiResult = calculateBMI(weight, height);

    // Calculate BMR and daily calories if age and gender are provided
    let bmr = null;
    let dailyCalories = null;

    if (age && gender) {
      bmr = calculateBMR(weight, height, age, gender);
      
      if (activityLevel) {
        dailyCalories = calculateDailyCalories(bmr, activityLevel);
      }
    }

    // Prepare response
    const response = {
      bmi: bmiResult.bmi,
      category: bmiResult.category,
      color: bmiResult.color,
      description: bmiResult.description,
      height,
      weight,
      bmr,
      dailyCalories,
    };

    // Save to database if requested
    if (saveData === true || saveData === 'true') {
      const healthData = await Health.create({
        user: req.user._id,
        height,
        weight,
        bmi: bmiResult.bmi,
        bmiCategory: bmiResult.category,
        age: age || undefined,
        gender: gender || undefined,
        activityLevel: activityLevel || undefined,
      });

      response.healthRecordId = healthData._id;
      response.saved = true;
    }

    res.json(response);
  } catch (error) {
    console.error('BMI calculation error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @route   GET /api/health/history
// @desc    Get user's health history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const healthRecords = await Health.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-__v');

    res.json({
      records: healthRecords,
      count: healthRecords.length,
    });
  } catch (error) {
    console.error('Get health history error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @route   GET /api/health/latest
// @desc    Get user's latest health record
// @access  Private
router.get('/latest', protect, async (req, res) => {
  try {
    const latestRecord = await Health.findOne({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('-__v');

    if (!latestRecord) {
      return res.status(404).json({ message: 'No health records found' });
    }

    res.json(latestRecord);
  } catch (error) {
    console.error('Get latest health record error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @route   POST /api/health/calorie-goal
// @desc    Calculate calorie goal (BMR + activity level + goal adjustment)
// @access  Private
router.post('/calorie-goal', protect, async (req, res) => {
  try {
    const { height, weight, age, gender, activityLevel, goalType, saveData } = req.body;

    // Validation
    if (!height || !weight || !age || !gender || !activityLevel) {
      return res.status(400).json({ 
        message: 'Height, weight, age, gender, and activity level are required' 
      });
    }

    if (height < 50 || height > 300) {
      return res.status(400).json({ message: 'Height must be between 50 and 300 cm' });
    }

    if (weight < 20 || weight > 500) {
      return res.status(400).json({ message: 'Weight must be between 20 and 500 kg' });
    }

    if (age < 1 || age > 150) {
      return res.status(400).json({ message: 'Age must be between 1 and 150 years' });
    }

    // Calculate BMR
    const bmr = calculateBMR(weight, height, age, gender);

    // Calculate base daily calories
    const baseCalories = calculateDailyCalories(bmr, activityLevel);

    // Calculate goal-adjusted calories if goal type is provided
    const goalCalories = goalType 
      ? calculateGoalCalories(baseCalories, goalType)
      : baseCalories;

    // Prepare response
    const response = {
      bmr,
      dailyCalories: baseCalories,
      goalCalories: goalType ? goalCalories : null,
      goalType: goalType || null,
      height,
      weight,
      age,
      gender,
      activityLevel,
    };

    // Save to database if requested
    if (saveData === true || saveData === 'true') {
      // Also calculate BMI for the record
      const bmiResult = calculateBMI(weight, height);
      
      const healthData = await Health.create({
        user: req.user._id,
        height,
        weight,
        bmi: bmiResult.bmi,
        bmiCategory: bmiResult.category,
        age,
        gender,
        activityLevel,
      });

      response.healthRecordId = healthData._id;
      response.saved = true;
    }

    res.json(response);
  } catch (error) {
    console.error('Calorie goal calculation error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

export default router;

