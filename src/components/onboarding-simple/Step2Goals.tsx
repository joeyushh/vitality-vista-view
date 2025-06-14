
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { SimpleOnboardingData } from "@/types/onboarding-simple";

interface Step2Props {
  data: Partial<SimpleOnboardingData>;
  onNext: (data: Partial<SimpleOnboardingData>) => void;
  onPrev: () => void;
}

const GOALS = [
  {
    id: 'lose_weight',
    title: 'Lose Weight',
    description: 'Reduce body fat and get leaner',
    emoji: '📉'
  },
  {
    id: 'gain_muscle',
    title: 'Gain Muscle',
    description: 'Build strength and muscle mass',
    emoji: '💪'
  },
  {
    id: 'maintain',
    title: 'Maintain Weight',
    description: 'Keep current weight and stay healthy',
    emoji: '⚖️'
  }
];

export default function Step2Goals({ data, onNext, onPrev }: Step2Props) {
  const [selected, setSelected] = useState(data.goal || '');

  const handleNext = () => {
    if (selected) {
      onNext({ goal: selected as 'lose_weight' | 'gain_muscle' | 'maintain' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">What's your goal?</h2>
        <p className="text-gray-600 mt-2">We'll calculate your daily targets automatically</p>
      </div>

      <div className="space-y-3">
        {GOALS.map((goal) => (
          <Card
            key={goal.id}
            className={`p-4 cursor-pointer transition-all border-2 ${
              selected === goal.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelected(goal.id)}
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{goal.emoji}</span>
              <div className="flex-1">
                <h3 className="font-semibold">{goal.title}</h3>
                <p className="text-sm text-gray-600">{goal.description}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                selected === goal.id
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selected === goal.id && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!selected} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
