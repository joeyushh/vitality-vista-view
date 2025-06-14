
import { SimpleOnboardingData } from '@/types/onboarding-simple';

export const calculateExperienceBasedGoals = (data: Partial<SimpleOnboardingData>): {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFats: number;
  dailyWorkouts: number;
  dailySleepHours: number;
  dailySteps: number;
} => {
  if (!data.height || !data.weight || !data.age || !data.gender || !data.goal || !data.activityLevel || !data.fitnessExperience) {
    return { 
      dailyCalories: 2000, 
      dailyProtein: 100, 
      dailyCarbs: 250,
      dailyFats: 80,
      dailyWorkouts: 3,
      dailySleepHours: 8,
      dailySteps: 8000 
    };
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

  // Calculate macros based on standard ratios
  const proteinCalories = protein * 4;
  const fatsCalories = calories * 0.25; // 25% from fats
  const carbsCalories = calories - proteinCalories - fatsCalories;
  
  const carbs = carbsCalories / 4;
  const fats = fatsCalories / 9;

  // Workouts based on goal and experience
  let workouts = 3; // base
  if (data.goal === 'gain_muscle') {
    workouts = data.fitnessExperience === 'advanced' ? 5 : 4;
  } else if (data.goal === 'lose_weight') {
    workouts = 4;
  } else if (data.goal === 'improve_fitness') {
    workouts = data.fitnessExperience === 'beginner' ? 3 : 4;
  }

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

  // Sleep hours based on goal and activity
  let sleepHours = 8; // base recommendation
  if (data.goal === 'gain_muscle' || data.activityLevel === 'very_active') {
    sleepHours = 9; // More recovery needed
  }

  return {
    dailyCalories: Math.round(calories),
    dailyProtein: Math.round(protein),
    dailyCarbs: Math.round(carbs),
    dailyFats: Math.round(fats),
    dailyWorkouts: workouts,
    dailySleepHours: sleepHours,
    dailySteps: steps
  };
};

export const getManualGoals = (data: Partial<SimpleOnboardingData>): {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFats: number;
  dailyWorkouts: number;
  dailySleepHours: number;
  dailySteps: number;
} => {
  const calories = data.manualCalories || 2000;
  
  // Calculate macros from percentages
  const carbsPercentage = data.manualCarbsPercentage || 45;
  const proteinPercentage = data.manualProteinPercentage || 25;
  const fatsPercentage = data.manualFatsPercentage || 30;
  
  const carbsCalories = (calories * carbsPercentage) / 100;
  const proteinCalories = (calories * proteinPercentage) / 100;
  const fatsCalories = (calories * fatsPercentage) / 100;
  
  return {
    dailyCalories: calories,
    dailyProtein: Math.round(proteinCalories / 4),
    dailyCarbs: Math.round(carbsCalories / 4),
    dailyFats: Math.round(fatsCalories / 9),
    dailyWorkouts: data.manualWorkouts || 3,
    dailySleepHours: data.manualSleepHours || 8,
    dailySteps: data.manualSteps || 10000
  };
};

export const getAvailableCreditGoals = (calculatedGoals: { 
  dailyCalories: number; 
  dailyProtein: number; 
  dailyCarbs: number;
  dailyFats: number;
  dailyWorkouts: number;
  dailySleepHours: number;
  dailySteps: number;
}) => [
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
    id: 'carbs', 
    name: 'Carbs', 
    value: calculatedGoals.dailyCarbs, 
    unit: 'g', 
    color: 'green',
    description: 'Meet your carbs target'
  },
  { 
    id: 'fats', 
    name: 'Fats', 
    value: calculatedGoals.dailyFats, 
    unit: 'g', 
    color: 'green',
    description: 'Hit your fats goal'
  },
  { 
    id: 'workouts', 
    name: 'Workouts', 
    value: calculatedGoals.dailyWorkouts, 
    unit: 'per week', 
    color: 'blue',
    description: 'Complete your scheduled workouts'
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
    id: 'sleep', 
    name: 'Sleep', 
    value: calculatedGoals.dailySleepHours, 
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
