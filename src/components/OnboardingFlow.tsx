
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import WelcomeStep from './onboarding/WelcomeStep';
import BasicInfoStep from './onboarding/BasicInfoStep';
import ExperienceStep from './onboarding/ExperienceStep';
import GoalsStep from './onboarding/GoalsStep';
import TargetGoalsStep from './onboarding/TargetGoalsStep';
import SecondaryGoalsStep from './onboarding/SecondaryGoalsStep';
import FoodTrackingStep from './onboarding/FoodTrackingStep';
import GoalSetupPreferenceStep from './onboarding/GoalSetupPreferenceStep';
import ManualGoalsStep from './onboarding/ManualGoalsStep';
import ActivityStep from './onboarding/ActivityStep';
import CreditGoalsStep from './onboarding/CreditGoalsStep';
import SummaryStep from './onboarding/SummaryStep';
import WearableConnectionStep from './onboarding/WearableConnectionStep';

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

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onClose: () => void;
}

const TOTAL_STEPS = 12; // Updated to include new steps

export default function OnboardingFlow({ onComplete, onClose }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Partial<OnboardingData>>({});

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  // Calculate personalized goals based on user data
  const calculatePersonalizedGoals = (userData: Partial<OnboardingData>) => {
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

  const nextStep = () => {
    console.log('nextStep called, currentStep:', currentStep, 'goalSetupPreference:', data.goalSetupPreference);
    
    // After Goal Setup Preference step (step 7)
    if (currentStep === 7) {
      if (data.goalSetupPreference === 'guided') {
        // For "Help me set goals" users, calculate personalized goals and go to Activity step
        console.log('Guided setup selected, going to Activity step');
        const calculated = calculatePersonalizedGoals(data);
        if (calculated) {
          updateData({ calculatedGoals: calculated });
        }
        setCurrentStep(8); // Go to Activity step
      } else {
        // For "I'll set my own goals" users, go directly to Manual Goals step
        console.log('Manual setup selected, going to Manual Goals step');
        setCurrentStep(9); // Go to Manual Goals step
      }
    }
    // After Manual Goals step (step 9), skip to Wearable Connection (step 10)
    else if (currentStep === 9) {
      setCurrentStep(10);
    }
    // After Activity step (step 8), go to Wearable Connection (step 10)
    else if (currentStep === 8) {
      setCurrentStep(10);
    }
    // Normal progression for other steps
    else if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    // From Wearable Connection step (step 10)
    if (currentStep === 10) {
      if (data.goalSetupPreference === 'manual') {
        setCurrentStep(9); // Go back to Manual Goals
      } else {
        setCurrentStep(8); // Go back to Activity
      }
    }
    // From Activity step (step 8), go back to Goal Setup Preference (step 7)
    else if (currentStep === 8) {
      setCurrentStep(7);
    }
    // From Manual Goals step (step 9), go back to Goal Setup Preference (step 7)
    else if (currentStep === 9) {
      setCurrentStep(7);
    }
    // Normal progression for other steps
    else if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete(data as OnboardingData);
  };

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} />;
      case 1:
        return <BasicInfoStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 2:
        return <ExperienceStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <GoalsStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <TargetGoalsStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <SecondaryGoalsStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 6:
        return <FoodTrackingStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 7:
        return <GoalSetupPreferenceStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 8:
        return <ActivityStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 9:
        return <ManualGoalsStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 10:
        return <WearableConnectionStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 11:
        return <CreditGoalsStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 12:
        return <SummaryStep data={data} onComplete={handleComplete} onPrev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {TOTAL_STEPS}
              </span>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                Skip Setup
              </button>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          {renderStep()}
        </div>
      </Card>
    </div>
  );
}
