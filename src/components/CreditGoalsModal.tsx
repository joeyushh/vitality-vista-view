
import { Card } from "@/components/ui/card";
import { X, Target, Info } from "lucide-react";
import { useState } from "react";

interface CreditGoal {
  id: string;
  name: string;
  value: number;
  unit: string;
  color: string;
}

interface CreditGoalsModalProps {
  onClose: () => void;
  availableGoals: CreditGoal[];
  currentGoals: CreditGoal[];
}

export default function CreditGoalsModal({ onClose, availableGoals, currentGoals }: CreditGoalsModalProps) {
  const [selectedGoals, setSelectedGoals] = useState<CreditGoal[]>(currentGoals);

  const handleGoalToggle = (goal: CreditGoal) => {
    const isSelected = selectedGoals.some(g => g.id === goal.id);
    
    if (isSelected) {
      setSelectedGoals(selectedGoals.filter(g => g.id !== goal.id));
    } else if (selectedGoals.length < 5) {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleSave = () => {
    // Here you would typically save to your state management or backend
    console.log('Saving credit goals:', selectedGoals);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Target className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold">Edit Credit Goals</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Info Section */}
          <div className="mb-6 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="text-blue-600 mt-0.5" size={16} />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Choose up to 5 daily goals</p>
                <p>Complete each goal to earn 1 credit. Maximum 5 credits per day.</p>
              </div>
            </div>
          </div>

          {/* Goal Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Available Goals</h3>
              <span className="text-sm text-gray-600">
                {selectedGoals.length}/5 selected
              </span>
            </div>
            
            <div className="space-y-2">
              {availableGoals.map((goal) => {
                const isSelected = selectedGoals.some(g => g.id === goal.id);
                const canSelect = selectedGoals.length < 5 || isSelected;
                
                return (
                  <button
                    key={goal.id}
                    onClick={() => handleGoalToggle(goal)}
                    disabled={!canSelect}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? `border-${goal.color}-300 bg-${goal.color}-50`
                        : canSelect
                        ? 'border-gray-200 bg-white hover:border-gray-300'
                        : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{goal.name}</div>
                        <div className="text-sm text-gray-600">
                          {goal.value.toLocaleString()}{goal.unit}
                          {goal.id === 'workouts' ? '' : ' daily'}
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
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={selectedGoals.length === 0}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Save Goals
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
