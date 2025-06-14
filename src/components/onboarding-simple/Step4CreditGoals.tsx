
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { SimpleOnboardingData, CreditGoal } from "@/types/onboarding-simple";

interface Step4Props {
  data: Partial<SimpleOnboardingData>;
  availableGoals: CreditGoal[];
  onNext: (data: Partial<SimpleOnboardingData>) => void;
  onPrev: () => void;
}

export default function Step4CreditGoals({ data, availableGoals, onNext, onPrev }: Step4Props) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.selectedCreditGoals || []);

  const handleGoalToggle = (goalId: string) => {
    const isSelected = selectedGoals.includes(goalId);
    
    if (isSelected) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else if (selectedGoals.length < 5) {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleNext = () => {
    if (selectedGoals.length > 0) {
      onNext({ selectedCreditGoals: selectedGoals });
    }
  };

  const getGoalDisplayText = (goal: CreditGoal) => {
    if (goal.id === 'workouts') {
      return 'Complete workout';
    }
    return `${goal.value.toLocaleString()}${goal.unit} daily`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Choose your credit goals</h2>
        <p className="text-gray-600 mt-2">Earn credits by completing daily goals (max 5)</p>
      </div>

      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800 text-center">
          <strong>Selected: {selectedGoals.length}/5</strong> - Each completed goal earns 1 credit
        </p>
      </div>

      <div className="space-y-3">
        {availableGoals.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id);
          const canSelect = selectedGoals.length < 5 || isSelected;
          
          return (
            <Card
              key={goal.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                isSelected
                  ? `border-${goal.color}-300 bg-${goal.color}-50`
                  : canSelect
                  ? 'border-gray-200 hover:border-gray-300'
                  : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
              }`}
              onClick={() => canSelect && handleGoalToggle(goal.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold">{goal.name}</h3>
                    <span className="text-sm font-medium text-gray-600">
                      {getGoalDisplayText(goal)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{goal.description}</p>
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
        <Button 
          onClick={handleNext} 
          disabled={selectedGoals.length === 0} 
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
