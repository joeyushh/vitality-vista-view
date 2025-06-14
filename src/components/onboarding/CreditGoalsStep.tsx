
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useState } from "react";
import { OnboardingData } from "../OnboardingFlow";

interface CreditGoalsStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const AVAILABLE_GOALS = [
  { id: 'calories', name: 'Calories', value: 2200, unit: '', color: 'green' },
  { id: 'carbs', name: 'Carbs', value: 275, unit: 'g', color: 'green' },
  { id: 'fats', name: 'Fats', value: 73, unit: 'g', color: 'green' },
  { id: 'protein', name: 'Protein', value: 220, unit: 'g', color: 'green' },
  { id: 'sleep', name: 'Sleep', value: 8, unit: 'hrs', color: 'purple' },
  { id: 'steps', name: 'Steps', value: 10000, unit: '', color: 'blue' },
  { id: 'workouts', name: 'Workouts', value: 1, unit: 'scheduled', color: 'blue' }
];

export default function CreditGoalsStep({ data, onUpdate, onNext, onPrev }: CreditGoalsStepProps) {
  const [selectedGoals, setSelectedGoals] = useState(data.selectedCreditGoals || []);

  const handleGoalToggle = (goal: typeof AVAILABLE_GOALS[0]) => {
    const isSelected = selectedGoals.some(g => g.id === goal.id);
    
    if (isSelected) {
      setSelectedGoals(selectedGoals.filter(g => g.id !== goal.id));
    } else if (selectedGoals.length < 5) {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = () => {
    if (selectedGoals.length > 0) {
      onUpdate({ selectedCreditGoals: selectedGoals });
      onNext();
    }
  };

  const getGoalDisplayText = (goal: typeof AVAILABLE_GOALS[0]) => {
    if (goal.id === 'workouts') {
      return 'Complete scheduled workout';
    }
    return `${goal.value.toLocaleString()}${goal.unit} daily`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Daily Goals</h2>
        <p className="text-gray-600 mt-2">Earn credits by completing these daily targets</p>
      </div>

      <div className="p-3 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="text-blue-600 mt-0.5" size={16} />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Choose up to 5 daily goals</p>
            <p>Complete each goal to earn 1 credit. Maximum 5 credits per day.</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Available Goals</h3>
          <span className="text-sm text-gray-600">
            {selectedGoals.length}/5 selected
          </span>
        </div>
        
        {AVAILABLE_GOALS.map((goal) => {
          const isSelected = selectedGoals.some(g => g.id === goal.id);
          const canSelect = selectedGoals.length < 5 || isSelected;
          
          return (
            <Card
              key={goal.id}
              className={`p-3 cursor-pointer transition-all border-2 ${
                isSelected
                  ? `border-${goal.color}-300 bg-${goal.color}-50`
                  : canSelect
                  ? 'border-gray-200 hover:border-gray-300'
                  : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
              }`}
              onClick={() => canSelect && handleGoalToggle(goal)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{goal.name}</div>
                  <div className="text-sm text-gray-600">
                    {getGoalDisplayText(goal)}
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected 
                    ? `border-${goal.color}-500 bg-${goal.color}-500` 
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} disabled={selectedGoals.length === 0} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
