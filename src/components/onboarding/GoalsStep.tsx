
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { OnboardingData } from "../OnboardingFlow";

interface GoalsStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const GOALS = [
  {
    id: 'lose_weight',
    title: 'Lose Weight',
    description: 'Reduce body fat and get leaner',
    icon: '📉'
  },
  {
    id: 'gain_muscle',
    title: 'Gain Muscle',
    description: 'Build strength and muscle mass',
    icon: '💪'
  },
  {
    id: 'maintain',
    title: 'Maintain',
    description: 'Keep current weight and fitness level',
    icon: '⚖️'
  },
  {
    id: 'improve_health',
    title: 'Improve Health',
    description: 'Focus on overall wellness and energy',
    icon: '❤️'
  }
];

export default function GoalsStep({ data, onUpdate, onNext, onPrev }: GoalsStepProps) {
  const [selected, setSelected] = useState(data.primaryGoal || '');

  const handleNext = () => {
    if (selected) {
      onUpdate({ primaryGoal: selected as 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_health' });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">What's your primary goal?</h2>
        <p className="text-gray-600 mt-2">This helps us set appropriate calorie and macro targets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            <div className="text-center space-y-2">
              <div className="text-3xl">{goal.icon}</div>
              <h3 className="font-semibold">{goal.title}</h3>
              <p className="text-sm text-gray-600">{goal.description}</p>
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
