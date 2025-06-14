
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, Settings } from "lucide-react";
import { useState } from "react";
import { OnboardingData } from "@/types/onboarding";

interface GoalSetupPreferenceStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GoalSetupPreferenceStep({ data, onUpdate, onNext, onPrev }: GoalSetupPreferenceStepProps) {
  const [preference, setPreference] = useState<'guided' | 'manual' | null>(
    data.goalSetupPreference || null
  );

  const handleNext = () => {
    if (preference) {
      onUpdate({ goalSetupPreference: preference });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">How would you like to set your goals?</h2>
        <p className="text-gray-600 mt-2">Choose the approach that works best for you</p>
      </div>

      <div className="space-y-4">
        <Card
          className={`p-6 cursor-pointer transition-all border-2 ${
            preference === 'guided'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setPreference('guided')}
        >
          <div className="flex items-start space-x-4">
            <Target className="text-blue-600 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Help me set goals</h3>
              <p className="text-gray-600 mt-1">
                We'll calculate recommended calories, macros, and activity targets based on your profile and goals.
              </p>
              <p className="text-sm text-blue-600 mt-2 font-medium">Recommended for beginners</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              preference === 'guided'
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            }`}>
              {preference === 'guided' && (
                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
              )}
            </div>
          </div>
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all border-2 ${
            preference === 'manual'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setPreference('manual')}
        >
          <div className="flex items-start space-x-4">
            <Settings className="text-green-600 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">I'll set my own goals</h3>
              <p className="text-gray-600 mt-1">
                You know your targets and prefer to input your own calories, macros, sleep, and activity goals.
              </p>
              <p className="text-sm text-green-600 mt-2 font-medium">Perfect for experienced users</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              preference === 'manual'
                ? 'border-green-500 bg-green-500'
                : 'border-gray-300'
            }`}>
              {preference === 'manual' && (
                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!preference} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
