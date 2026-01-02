import mongoose from 'mongoose';

const healthSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  height: {
    type: Number,
    required: true,
    min: [50, 'Height must be at least 50 cm'],
    max: [300, 'Height must be at most 300 cm'],
  },
  weight: {
    type: Number,
    required: true,
    min: [20, 'Weight must be at least 20 kg'],
    max: [500, 'Weight must be at most 500 kg'],
  },
  bmi: {
    type: Number,
    required: true,
  },
  bmiCategory: {
    type: String,
    required: true,
    enum: ['Underweight', 'Normal weight', 'Overweight', 'Obesity'],
  },
  age: {
    type: Number,
    min: [1, 'Age must be at least 1'],
    max: [150, 'Age must be at most 150'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  activityLevel: {
    type: String,
    enum: ['Sedentary', 'Lightly active', 'Moderately active', 'Very active', 'Extra active'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for efficient queries
healthSchema.index({ user: 1, createdAt: -1 });

const Health = mongoose.model('Health', healthSchema);

export default Health;

