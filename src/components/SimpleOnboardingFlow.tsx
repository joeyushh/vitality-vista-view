
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SimpleOnboardingData } from '@/types/onboarding-simple';
import { calculateGoals } from '@/utils/simple-calculations';

import Step1BasicInfo from './onboarding-simple/Step1BasicInfo';
import Step2Goals from './onboarding-simple/Step2Goals';
import Step3Summary from './onboarding-simple/Step3Summary';

interface SimpleOnboardingFlowProps {
  onComplete: (data: SimpleOnboardingData) => void;
  onClose: () => void;
}

export default function SimpleOnboardingFlow({ onComplete, onClose }: SimpleOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Partial<SimpleOnboardingData>>({});

  const updateData = (stepData: Partial<SimpleOnboardingData>) => {
    const newData = { ...data, ...stepData };
    setData(newData);
    
    // If we have enough data, calculate goals
    if (newData.height && newData.weight && newData.age && newData.gender && newData.goal) {
      const calculated = calculateGoals(newData);
      setData({ ...newData, ...calculated });
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleComplete = () => {
    onComplete(data as SimpleOnboardingData);
  };

  const progress = ((currentStep + 1) / 3) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1BasicInfo 
            data={data} 
            onNext={(stepData) => {
              updateData(stepData);
              nextStep();
            }} 
          />
        );
      case 1:
        return (
          <Step2Goals 
            data={data} 
            onNext={(stepData) => {
              updateData(stepData);
              nextStep();
            }}
            onPrev={prevStep}
          />
        );
      case 2:
        return (
          <Step3Summary 
            data={data as SimpleOnboardingData} 
            onComplete={handleComplete}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of 3
              </span>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                Skip
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
