
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { OnboardingData } from '@/types/onboarding';
import { calculatePersonalizedGoals } from '@/utils/onboardingCalculations';
import { TOTAL_STEPS, getNextStep, getPreviousStep } from '@/utils/onboardingNavigation';

// Step components
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

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onClose: () => void;
}

export default function OnboardingFlow({ onComplete, onClose }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Partial<OnboardingData>>({});

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    const nextStepIndex = getNextStep(currentStep, data);
    
    // Special handling for guided setup to calculate goals
    if (currentStep === 7 && data.goalSetupPreference === 'guided') {
      const calculated = calculatePersonalizedGoals(data);
      if (calculated) {
        updateData({ calculatedGoals: calculated });
      }
    }
    
    setCurrentStep(nextStepIndex);
  };

  const prevStep = () => {
    const prevStepIndex = getPreviousStep(currentStep, data);
    setCurrentStep(prevStepIndex);
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
