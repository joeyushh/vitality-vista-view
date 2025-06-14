
import { SimpleOnboardingData } from '@/types/onboarding-simple';

export const calculateExperienceBasedGoals = (data: Partial<SimpleOnboardingData>): {
  dailyCalories: number;
  dailyProtein: number;
  dailySteps: number;
} => {
  if (!data.height || !data.weight || !data.age || !data.gender || !data.goal || !data.activityLevel || !data.fitnessExperience) {
    return { dailyCalories: 2000, dailyProtein: 100, dailySteps: 8000 };
  }

  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr;
  if (data.gender === 'male') {
    bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
  } else {
    bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
  }

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725
  };

  let calories = bmr * activityMultipliers[data.activityLevel];
  
  // Goal adjustments
  if (data.goal === 'lose_weight') {
    calories -= 500; // 0.5kg per week deficit
  } else if (data.goal === 'gain_muscle') {
    calories += 300; // Small surplus for muscle gain
  } else if (data.goal === 'improve_fitness') {
    calories += 100; // Small surplus for performance
  }

  // Protein based on goal and experience
  let proteinMultiplier = 1.6; // base
  if (data.goal === 'gain_muscle') {
    proteinMultiplier = data.fitnessExperience === 'advanced' ? 2.4 : 2.0;
  } else if (data.goal === 'lose_weight') {
    proteinMultiplier = 2.0; // Higher protein for weight loss
  }

  const protein = data.weight * proteinMultiplier;

  // Steps based on fitness experience and goal
  let steps = 8000; // base
  if (data.fitnessExperience === 'advanced') {
    steps = 12000;
  } else if (data.fitnessExperience === 'intermediate') {
    steps = 10000;
  }
  
  // Adjust for activity level
  if (data.activityLevel === 'very_active') {
    steps += 2000;
  } else if (data.activityLevel === 'moderately_active') {
    steps += 1000;
  }

  return {
    dailyCalories: Math.round(calories),
    dailyProtein: Math.round(protein),
    dailySteps: steps
  };
};

export const getManualGoals = (data: Partial<SimpleOnboardingData>): {
  dailyCalories: number;
  dailyProtein: number;
  dailySteps: number;
} => {
  return {
    dailyCalories: data.manualCalories || 2000,
    dailyProtein: data.manualProtein || 150,
    dailySteps: data.manualSteps || 10000
  };
};

export const getAvailableCreditGoals = (calculatedGoals: { dailyCalories: number; dailyProtein: number; dailySteps: number }) => [
  { 
    id: 'calories', 
    name: 'Calories', 
    value: calculatedGoals.dailyCalories, 
    unit: '', 
    color: 'green',
    description: 'Meet your daily calorie target'
  },
  { 
    id: 'protein', 
    name: 'Protein', 
    value: calculatedGoals.dailyProtein, 
    unit: 'g', 
    color: 'green',
    description: 'Hit your protein goal'
  },
  { 
    id: 'steps', 
    name: 'Steps', 
    value: calculatedGoals.dailySteps, 
    unit: '', 
    color: 'blue',
    description: 'Reach your step target'
  },
  { 
    id: 'workouts', 
    name: 'Workouts', 
    value: 1, 
    unit: 'completed', 
    color: 'blue',
    description: 'Complete your scheduled workout'
  },
  { 
    id: 'sleep', 
    name: 'Sleep', 
    value: 8, 
    unit: 'hrs', 
    color: 'purple',
    description: 'Get quality sleep'
  },
  { 
    id: 'hydration', 
    name: 'Water', 
    value: 2500, 
    unit: 'ml', 
    color: 'blue',
    description: 'Stay hydrated throughout the day'
  }
];
