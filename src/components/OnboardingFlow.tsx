
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import WelcomeStep from './onboarding/WelcomeStep';
import BasicInfoStep from './onboarding/BasicInfoStep';
import ExperienceStep from './onboarding/ExperienceStep';
import GoalsStep from './onboarding/GoalsStep';
import FoodTrackingStep from './onboarding/FoodTrackingStep';
import ActivityStep from './onboarding/ActivityStep';
import CreditGoalsStep from './onboarding/CreditGoalsStep';
import SummaryStep from './onboarding/SummaryStep';

export interface OnboardingData {
  // Basic Info
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  
  // Experience & Goals
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  primaryGoal: 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_health';
  
  // Food Tracking
  hasTrackedFood: boolean;
  familiarWithMacros: boolean;
  
  // Activity
  currentWorkoutFrequency: number;
  preferredActivities: string[];
  
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

const TOTAL_STEPS = 8;

export default function OnboardingFlow({ onComplete, onClose }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Partial<OnboardingData>>({});

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
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
        return <FoodTrackingStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <ActivityStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 6:
        return <CreditGoalsStep data={data} onUpdate={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 7:
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
