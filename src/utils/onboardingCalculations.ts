
import { OnboardingData } from '@/types/onboarding';

// Calculate personalized goals based on user data
export const calculatePersonalizedGoals = (userData: Partial<OnboardingData>) => {
  if (!userData.height || !userData.weight || !userData.age || !userData.gender) return null;

  // Basic BMR calculation (Mifflin-St Jeor)
  let bmr;
  if (userData.gender === 'male') {
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
  } else {
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
  }

  // Activity multiplier based on workout frequency
  const activityMultiplier = userData.currentWorkoutFrequency 
    ? 1.2 + (userData.currentWorkoutFrequency * 0.1) 
    : 1.4; // Default for guided users

  let tdee = bmr * activityMultiplier;

  // Adjust calories based on goal
  if (userData.primaryGoal === 'lose_weight' && userData.weeklyGoal) {
    tdee -= userData.weeklyGoal * 7700 / 7; // 7700 cal per kg of fat
  } else if (userData.primaryGoal === 'gain_muscle' && userData.weeklyGoal) {
    tdee += userData.weeklyGoal * 7700 / 7;
  }

  // Calculate macros
  const protein = userData.weight * (userData.primaryGoal === 'gain_muscle' ? 2.2 : 1.8);
  const fats = Math.round(tdee * 0.25 / 9);
  const carbs = Math.round((tdee - (protein * 4) - (fats * 9)) / 4);

  return {
    calories: Math.round(tdee),
    protein: Math.round(protein),
    carbs,
    fats,
    steps: userData.fitnessLevel === 'beginner' ? 8000 : userData.fitnessLevel === 'intermediate' ? 10000 : 12000,
    sleep: 8,
    workouts: userData.currentWorkoutFrequency || 3
  };
};
