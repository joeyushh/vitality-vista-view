
export interface OnboardingData {
  // Basic Info
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  
  // Goals
  primaryGoal: 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_health';
  secondaryGoal?: string;
  targetWeight?: number;
  timeline?: string;
  weeklyGoal?: number;
  
  // Experience & Goals
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  
  // Goal Setup Preference
  goalSetupPreference: 'guided' | 'manual';
  
  // Calculated Goals (for guided setup)
  calculatedGoals?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    steps: number;
    sleep: number;
    workouts: number;
  };
  
  // Manual Goals (if user chooses manual)
  manualGoals?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    sleep: number;
    steps: number;
    workouts: number;
  };
  
  // Food Tracking
  hasTrackedFood: boolean;
  familiarWithMacros: boolean;
  
  // Activity (only for guided setup)
  currentWorkoutFrequency?: number;
  preferredActivities?: string[];
  
  // Wearable Connection
  connectedWearable?: string;
  
  // Credit Goals
  selectedCreditGoals: Array<{
    id: string;
    name: string;
    value: number;
    unit: string;
    color: string;
  }>;
}
