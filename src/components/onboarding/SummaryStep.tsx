
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface SummaryStepProps {
  data: Partial<OnboardingData>;
  onComplete: () => void;
  onPrev: () => void;
}

export default function SummaryStep({ data, onComplete, onPrev }: SummaryStepProps) {
  const getGoalText = (goal: string) => {
    const goals = {
      lose_weight: 'Lose Weight',
      gain_muscle: 'Gain Muscle',
      maintain: 'Maintain Weight',
      improve_health: 'Improve Health'
    };
    return goals[goal as keyof typeof goals] || goal;
  };

  const getExperienceText = (level: string) => {
    const levels = {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    };
    return levels[level as keyof typeof levels] || level;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">You're All Set!</h2>
        <p className="text-gray-600 mt-2">Here's a summary of your personalized profile</p>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <div className="space-y-3">
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
              <span className="text-gray-600">Gender:</span>
              <span className="font-medium capitalize">{data.gender}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Experience Level:</span>
              <span className="font-medium">{getExperienceText(data.fitnessLevel || '')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Primary Goal:</span>
              <span className="font-medium">{getGoalText(data.primaryGoal || '')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Workout Frequency:</span>
              <span className="font-medium">{data.currentWorkoutFrequency} days/week</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-3">
            <h4 className="font-semibold">Daily Credit Goals ({data.selectedCreditGoals?.length || 0}/5)</h4>
            <div className="space-y-1">
              {data.selectedCreditGoals?.map((goal) => (
                <div key={goal.id} className="text-sm text-gray-600">
                  • {goal.name}: {goal.id === 'workouts' ? 'Complete scheduled workout' : `${goal.value.toLocaleString()}${goal.unit} daily`}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
        <p className="text-sm text-center text-gray-700">
          🎉 Your personalized targets and recommendations are ready! 
          You can always adjust these settings later in your profile.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={onComplete} className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
          Complete Setup
        </Button>
      </div>
    </div>
  );
}
