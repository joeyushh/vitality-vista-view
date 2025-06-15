
export interface SimpleOnboardingData {
  // Step 1: Basic Info
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  
  // Step 2: Device Linking (optional)
  connectedDevices?: string[];
  
  // Step 3: Experience vs Manual Choice
  setupMethod: 'experience' | 'manual';
  
  // Step 4a: Experience-based (if setupMethod === 'experience')
  fitnessExperience?: 'beginner' | 'intermediate' | 'advanced';
  activityLevel?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
  goal?: 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_fitness';
  
  // Step 4b: Manual Goals (if setupMethod === 'manual')
  manualCalories?: number;
  manualCarbsPercentage?: number;
  manualProteinPercentage?: number;
  manualFatsPercentage?: number;
  manualWorkouts?: number;
  manualSleepHours?: number;
  manualSteps?: number;
  
  // Step 5: Credit Goals Selection
  selectedCreditGoals: string[];
  
  // Auto-calculated or manual results
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFats: number;
  dailyWorkouts: number;
  dailySleepHours: number;
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
