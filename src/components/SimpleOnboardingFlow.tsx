import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SimpleOnboardingData } from '@/types/onboarding-simple';
import { calculateExperienceBasedGoals, getManualGoals, getAvailableCreditGoals } from '@/utils/simple-calculations';

import Step1BasicInfo from './onboarding-simple/Step1BasicInfo';
import Step2Method from './onboarding-simple/Step2Method';
import Step3Experience from './onboarding-simple/Step3Experience';
import Step3Manual from './onboarding-simple/Step3Manual';
import Step4CreditGoals from './onboarding-simple/Step4CreditGoals';
import Step3Summary from './onboarding-simple/Step3Summary';

interface SimpleOnboardingFlowProps {
  onComplete: (data: SimpleOnboardingData) => void;
  onClose: () => void;
}

export default function SimpleOnboardingFlow({ onComplete, onClose }: SimpleOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Partial<SimpleOnboardingData>>({});

  // Calculate total steps based on setup method
  const getTotalSteps = () => {
    if (!data.setupMethod) return 5; // Default estimate
    return data.setupMethod === 'experience' ? 5 : 5; // Both paths have 5 steps
  };

  const updateData = (stepData: Partial<SimpleOnboardingData>) => {
    const newData = { ...data, ...stepData };
    setData(newData);
    
    // Calculate goals when we have enough data
    if (newData.height && newData.weight && newData.age && newData.gender && newData.setupMethod) {
      let calculatedGoals;
      
      if (newData.setupMethod === 'experience' && newData.goal && newData.activityLevel && newData.fitnessExperience) {
        calculatedGoals = calculateExperienceBasedGoals(newData);
      } else if (newData.setupMethod === 'manual' && newData.manualCalories && newData.manualWorkouts && newData.manualSleepHours && newData.manualSteps) {
        calculatedGoals = getManualGoals(newData);
      }
      
      if (calculatedGoals) {
        setData({ ...newData, ...calculatedGoals });
      }
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

  const totalSteps = getTotalSteps();
  const progress = ((currentStep + 1) / totalSteps) * 100;

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
          <Step2Method 
            data={data} 
            onNext={(stepData) => {
              updateData(stepData);
              nextStep();
            }}
            onPrev={prevStep}
          />
        );
      case 2:
        if (data.setupMethod === 'experience') {
          return (
            <Step3Experience 
              data={data} 
              onNext={(stepData) => {
                updateData(stepData);
                nextStep();
              }}
              onPrev={prevStep}
            />
          );
        } else {
          return (
            <Step3Manual 
              data={data} 
              onNext={(stepData) => {
                updateData(stepData);
                nextStep();
              }}
              onPrev={prevStep}
            />
          );
        }
      case 3:
        const calculatedGoals = data.setupMethod === 'experience' 
          ? calculateExperienceBasedGoals(data)
          : getManualGoals(data);
        const availableGoals = getAvailableCreditGoals(calculatedGoals);
        
        return (
          <Step4CreditGoals 
            data={data}
            availableGoals={availableGoals}
            onNext={(stepData) => {
              updateData(stepData);
              nextStep();
            }}
            onPrev={prevStep}
          />
        );
      case 4:
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
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header with Momentum branding */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Momentum
            </h1>
            <p className="text-gray-600">
              Let's set up your personalized fitness journey
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {totalSteps}
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
