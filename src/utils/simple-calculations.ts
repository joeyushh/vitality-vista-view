
import { SimpleOnboardingData } from '@/types/onboarding-simple';

export const calculateGoals = (data: Partial<SimpleOnboardingData>): {
  dailyCalories: number;
  dailyProtein: number;
  dailySteps: number;
} => {
  if (!data.height || !data.weight || !data.age || !data.gender || !data.goal) {
    return { dailyCalories: 2000, dailyProtein: 100, dailySteps: 8000 };
  }

  // Calculate BMR
  let bmr;
  if (data.gender === 'male') {
    bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
  } else {
    bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
  }

  // Adjust for activity and goal
  let calories = bmr * 1.4; // Light activity
  
  if (data.goal === 'lose_weight') {
    calories -= 500; // 0.5kg per week deficit
  } else if (data.goal === 'gain_muscle') {
    calories += 300; // Small surplus
  }

  const protein = data.weight * (data.goal === 'gain_muscle' ? 2.2 : 1.6);
  const steps = 10000;

  return {
    dailyCalories: Math.round(calories),
    dailyProtein: Math.round(protein),
    dailySteps: steps
  };
};
