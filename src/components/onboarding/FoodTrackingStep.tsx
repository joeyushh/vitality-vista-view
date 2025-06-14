
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { OnboardingData } from "@/types/onboarding";

interface FoodTrackingStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function FoodTrackingStep({ data, onUpdate, onNext, onPrev }: FoodTrackingStepProps) {
  const [hasTracked, setHasTracked] = useState<boolean | null>(
    data.hasTrackedFood !== undefined ? data.hasTrackedFood : null
  );
  const [knowsMacros, setKnowsMacros] = useState<boolean | null>(
    data.familiarWithMacros !== undefined ? data.familiarWithMacros : null
  );

  const handleNext = () => {
    if (hasTracked !== null && knowsMacros !== null) {
      onUpdate({
        hasTrackedFood: hasTracked,
        familiarWithMacros: knowsMacros
      });
      onNext();
    }
  };

  const isValid = hasTracked !== null && knowsMacros !== null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Food Tracking Experience</h2>
        <p className="text-gray-600 mt-2">Help us customize your food tracking experience</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Have you tracked your food intake before?</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card
              className={`p-4 cursor-pointer transition-all border-2 ${
                hasTracked === true
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setHasTracked(true)}
            >
              <div className="text-center">
                <h4 className="font-medium">Yes</h4>
                <p className="text-sm text-gray-600 mt-1">I've used food tracking apps before</p>
              </div>
            </Card>
            <Card
              className={`p-4 cursor-pointer transition-all border-2 ${
                hasTracked === false
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setHasTracked(false)}
            >
              <div className="text-center">
                <h4 className="font-medium">No</h4>
                <p className="text-sm text-gray-600 mt-1">This is new to me</p>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Are you familiar with macros (protein, carbs, fats)?</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card
              className={`p-4 cursor-pointer transition-all border-2 ${
                knowsMacros === true
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setKnowsMacros(true)}
            >
              <div className="text-center">
                <h4 className="font-medium">Yes</h4>
                <p className="text-sm text-gray-600 mt-1">I understand macronutrients</p>
              </div>
            </Card>
            <Card
              className={`p-4 cursor-pointer transition-all border-2 ${
                knowsMacros === false
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setKnowsMacros(false)}
            >
              <div className="text-center">
                <h4 className="font-medium">No</h4>
                <p className="text-sm text-gray-600 mt-1">I'd like to learn more</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!isValid} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
