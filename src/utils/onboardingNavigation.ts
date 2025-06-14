
import { OnboardingData } from '@/types/onboarding';

export const TOTAL_STEPS = 12;

export const getNextStep = (currentStep: number, data: Partial<OnboardingData>): number => {
  console.log('getNextStep called, currentStep:', currentStep, 'goalSetupPreference:', data.goalSetupPreference);
  
  // After Goal Setup Preference step (step 7)
  if (currentStep === 7) {
    if (data.goalSetupPreference === 'guided') {
      // For "Help me set goals" users, go to Activity step
      console.log('Guided setup selected, going to Activity step');
      return 8;
    } else {
      // For "I'll set my own goals" users, go directly to Manual Goals step
      console.log('Manual setup selected, going to Manual Goals step');
      return 9;
    }
  }
  // After Manual Goals step (step 9), skip to Wearable Connection (step 10)
  else if (currentStep === 9) {
    return 10;
  }
  // After Activity step (step 8), go to Wearable Connection (step 10)
  else if (currentStep === 8) {
    return 10;
  }
  // Normal progression for other steps
  else if (currentStep < TOTAL_STEPS - 1) {
    return currentStep + 1;
  }
  
  return currentStep;
};

export const getPreviousStep = (currentStep: number, data: Partial<OnboardingData>): number => {
  // From Wearable Connection step (step 10)
  if (currentStep === 10) {
    if (data.goalSetupPreference === 'manual') {
      return 9; // Go back to Manual Goals
    } else {
      return 8; // Go back to Activity
    }
  }
  // From Activity step (step 8), go back to Goal Setup Preference (step 7)
  else if (currentStep === 8) {
    return 7;
  }
  // From Manual Goals step (step 9), go back to Goal Setup Preference (step 7)
  else if (currentStep === 9) {
    return 7;
  }
  // Normal progression for other steps
  else if (currentStep > 0) {
    return currentStep - 1;
  }
  
  return currentStep;
};
