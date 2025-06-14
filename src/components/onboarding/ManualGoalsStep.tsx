
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { OnboardingData } from "../OnboardingFlow";

interface ManualGoalsStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ManualGoalsStep({ data, onUpdate, onNext, onPrev }: ManualGoalsStepProps) {
  const [goals, setGoals] = useState({
    calories: data.manualGoals?.calories || '',
    protein: data.manualGoals?.protein || '',
    carbs: data.manualGoals?.carbs || '',
    fats: data.manualGoals?.fats || '',
    sleep: data.manualGoals?.sleep || '',
    steps: data.manualGoals?.steps || '',
    workouts: data.manualGoals?.workouts || ''
  });

  const handleNext = () => {
    const allFilled = Object.values(goals).every(value => value.trim() !== '');
    if (allFilled) {
      onUpdate({ 
        manualGoals: {
          calories: Number(goals.calories),
          protein: Number(goals.protein),
          carbs: Number(goals.carbs),
          fats: Number(goals.fats),
          sleep: Number(goals.sleep),
          steps: Number(goals.steps),
          workouts: Number(goals.workouts)
        }
      });
      onNext();
    }
  };

  const updateGoal = (key: string, value: string) => {
    setGoals(prev => ({ ...prev, [key]: value }));
  };

  const allFilled = Object.values(goals).every(value => value.trim() !== '');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Set Your Daily Goals</h2>
        <p className="text-gray-600 mt-2">Enter your target values for each category</p>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Nutrition Goals</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="calories">Daily Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="e.g. 2200"
                value={goals.calories}
                onChange={(e) => updateGoal('calories', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                placeholder="e.g. 150"
                value={goals.protein}
                onChange={(e) => updateGoal('protein', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input
                id="carbs"
                type="number"
                placeholder="e.g. 275"
                value={goals.carbs}
                onChange={(e) => updateGoal('carbs', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fats">Fats (g)</Label>
              <Input
                id="fats"
                type="number"
                placeholder="e.g. 73"
                value={goals.fats}
                onChange={(e) => updateGoal('fats', e.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Lifestyle Goals</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sleep">Sleep (hours)</Label>
              <Input
                id="sleep"
                type="number"
                placeholder="e.g. 8"
                value={goals.sleep}
                onChange={(e) => updateGoal('sleep', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="steps">Daily Steps</Label>
              <Input
                id="steps"
                type="number"
                placeholder="e.g. 10000"
                value={goals.steps}
                onChange={(e) => updateGoal('steps', e.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Activity Goals</h3>
          <div>
            <Label htmlFor="workouts">Weekly Workouts</Label>
            <Input
              id="workouts"
              type="number"
              placeholder="e.g. 4"
              value={goals.workouts}
              onChange={(e) => updateGoal('workouts', e.target.value)}
            />
          </div>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!allFilled} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
