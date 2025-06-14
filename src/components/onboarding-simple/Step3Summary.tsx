
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { SimpleOnboardingData } from "@/types/onboarding-simple";

interface Step3Props {
  data: SimpleOnboardingData;
  onComplete: () => void;
  onPrev: () => void;
}

export default function Step3Summary({ data, onComplete, onPrev }: Step3Props) {
  const getGoalText = (goal?: string) => {
    const goals = {
      lose_weight: 'Lose Weight',
      gain_muscle: 'Gain Muscle',
      maintain: 'Maintain Weight',
      improve_fitness: 'Improve Fitness'
    };
    return goal ? goals[goal as keyof typeof goals] || goal : 'Custom Goals';
  };

  const getSetupMethodText = (method: string) => {
    return method === 'experience' ? 'Experience-based calculation' : 'Manual goal setting';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold">Setup Complete!</h2>
        <p className="text-gray-600 mt-2">Here's your personalized Momentum profile</p>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Your Profile</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Height:</span>
              <span className="font-medium">{data.height} cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weight:</span>
              <span className="font-medium">{data.weight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Age:</span>
              <span className="font-medium">{data.age} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Setup Method:</span>
              <span className="font-medium">{getSetupMethodText(data.setupMethod)}</span>
            </div>
            {data.goal && (
              <div className="flex justify-between">
                <span className="text-gray-600">Primary Goal:</span>
                <span className="font-medium">{getGoalText(data.goal)}</span>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">Your Daily Targets</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Calories:</span>
              <span className="font-medium text-green-600">{data.dailyCalories.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Protein:</span>
              <span className="font-medium text-blue-600">{data.dailyProtein}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Daily Steps:</span>
              <span className="font-medium text-purple-600">{data.dailySteps.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">Credit Goals Selected</h3>
          <div className="text-sm text-gray-600">
            You'll earn credits by completing {data.selectedCreditGoals.length} daily goals
          </div>
        </Card>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-800 text-center">
          Welcome to Momentum! Your personalized fitness journey starts now.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={onComplete} className="flex-1 bg-gradient-to-r from-blue-500 to-green-500">
          Start Using Momentum
        </Button>
      </div>
    </div>
  );
}
