
export interface SimpleOnboardingData {
  // Step 1: Basic Info
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  
  // Step 2: Experience vs Manual Choice
  setupMethod: 'experience' | 'manual';
  
  // Step 3a: Experience-based (if setupMethod === 'experience')
  fitnessExperience?: 'beginner' | 'intermediate' | 'advanced';
  activityLevel?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
  goal?: 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_fitness';
  
  // Step 3b: Manual Goals (if setupMethod === 'manual')
  manualCalories?: number;
  manualProtein?: number;
  manualSteps?: number;
  
  // Step 4: Credit Goals Selection
  selectedCreditGoals: string[];
  
  // Auto-calculated or manual results
  dailyCalories: number;
  dailyProtein: number;
  dailySteps: number;
}

export interface CreditGoal {
  id: string;
  name: string;
  value: number;
  unit: string;
  color: string;
  description: string;
}
