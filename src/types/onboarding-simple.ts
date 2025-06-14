
export interface SimpleOnboardingData {
  // Step 1: Basic Info
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  
  // Step 2: Goal
  goal: 'lose_weight' | 'gain_muscle' | 'maintain';
  
  // Auto-calculated results
  dailyCalories: number;
  dailyProtein: number;
  dailySteps: number;
}
