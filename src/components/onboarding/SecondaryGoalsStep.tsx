
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { OnboardingData } from "../OnboardingFlow";

interface SecondaryGoalsStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SECONDARY_GOALS = [
  {
    id: 'strength',
    title: 'Build Strength',
    description: 'Focus on progressive overload and compound movements'
  },
  {
    id: 'endurance',
    title: 'Improve Endurance',
    description: 'Enhance cardiovascular fitness and stamina'
  },
  {
    id: 'flexibility',
    title: 'Increase Flexibility',
    description: 'Improve mobility and range of motion'
  },
  {
    id: 'body_composition',
    title: 'Body Recomposition',
    description: 'Simultaneously build muscle and lose fat'
  },
  {
    id: 'performance',
    title: 'Athletic Performance',
    description: 'Enhance sport-specific abilities'
  },
  {
    id: 'none',
    title: 'No Secondary Goal',
    description: 'Focus solely on my primary goal'
  }
];

export default function SecondaryGoalsStep({ data, onUpdate, onNext, onPrev }: SecondaryGoalsStepProps) {
  const [selected, setSelected] = useState(data.secondaryGoal || '');

  const handleNext = () => {
    onUpdate({ secondaryGoal: selected });
    onNext();
  };

  const getRelevantGoals = () => {
    // Filter out goals that don't make sense based on primary goal
    switch (data.primaryGoal) {
      case 'lose_weight':
        return SECONDARY_GOALS.filter(goal => 
          ['strength', 'endurance', 'flexibility', 'none'].includes(goal.id)
        );
      case 'gain_muscle':
        return SECONDARY_GOALS.filter(goal => 
          ['strength', 'endurance', 'flexibility', 'performance', 'none'].includes(goal.id)
        );
      case 'maintain':
        return SECONDARY_GOALS.filter(goal => 
          ['strength', 'endurance', 'flexibility', 'performance', 'none'].includes(goal.id)
        );
      default:
        return SECONDARY_GOALS;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Secondary Focus</h2>
        <p className="text-gray-600 mt-2">What else would you like to work on alongside your primary goal?</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {getRelevantGoals().map((goal) => (
          <Card
            key={goal.id}
            className={`p-4 cursor-pointer transition-all border-2 ${
              selected === goal.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelected(goal.id)}
          >
            <div className="space-y-2">
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
