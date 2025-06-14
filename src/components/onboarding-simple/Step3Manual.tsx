
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { SimpleOnboardingData } from "@/types/onboarding-simple";

interface Step3Props {
  data: Partial<SimpleOnboardingData>;
  onNext: (data: Partial<SimpleOnboardingData>) => void;
  onPrev: () => void;
}

export default function Step3Manual({ data, onNext, onPrev }: Step3Props) {
  const [calories, setCalories] = useState(data.manualCalories?.toString() || '');
  const [carbsPercentage, setCarbsPercentage] = useState(data.manualCarbsPercentage?.toString() || '45');
  const [proteinPercentage, setProteinPercentage] = useState(data.manualProteinPercentage?.toString() || '25');
  const [fatsPercentage, setFatsPercentage] = useState(data.manualFatsPercentage?.toString() || '30');
  const [workouts, setWorkouts] = useState(data.manualWorkouts?.toString() || '');
  const [sleepHours, setSleepHours] = useState(data.manualSleepHours?.toString() || '');
  const [steps, setSteps] = useState(data.manualSteps?.toString() || '');

  // Calculate actual macro grams for display
  const caloriesNum = parseInt(calories) || 0;
  const carbsGrams = Math.round((caloriesNum * (parseInt(carbsPercentage) || 0)) / 100 / 4);
  const proteinGrams = Math.round((caloriesNum * (parseInt(proteinPercentage) || 0)) / 100 / 4);
  const fatsGrams = Math.round((caloriesNum * (parseInt(fatsPercentage) || 0)) / 100 / 9);

  // Check if percentages add up to 100
  const totalPercentage = (parseInt(carbsPercentage) || 0) + (parseInt(proteinPercentage) || 0) + (parseInt(fatsPercentage) || 0);
  const percentageValid = totalPercentage === 100;

  const handleNext = () => {
    if (calories && workouts && sleepHours && steps && percentageValid) {
      onNext({
        manualCalories: parseInt(calories),
        manualCarbsPercentage: parseInt(carbsPercentage),
        manualProteinPercentage: parseInt(proteinPercentage),
        manualFatsPercentage: parseInt(fatsPercentage),
        manualWorkouts: parseInt(workouts),
        manualSleepHours: parseInt(sleepHours),
        manualSteps: parseInt(steps)
      });
    }
  };

  const isValid = calories && workouts && sleepHours && steps && percentageValid;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Set your daily targets</h2>
        <p className="text-gray-600 mt-2">Enter your preferred daily goals</p>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Nutrition Goals</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="calories">Daily Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="2000"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">Total calories you want to consume daily</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="carbs">Carbs %</Label>
                <Input
                  id="carbs"
                  type="number"
                  placeholder="45"
                  value={carbsPercentage}
                  onChange={(e) => setCarbsPercentage(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">{carbsGrams}g</p>
              </div>
              <div>
                <Label htmlFor="protein-percent">Protein %</Label>
                <Input
                  id="protein-percent"
                  type="number"
                  placeholder="25"
                  value={proteinPercentage}
                  onChange={(e) => setProteinPercentage(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">{proteinGrams}g</p>
              </div>
              <div>
                <Label htmlFor="fats">Fats %</Label>
                <Input
                  id="fats"
                  type="number"
                  placeholder="30"
                  value={fatsPercentage}
                  onChange={(e) => setFatsPercentage(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">{fatsGrams}g</p>
              </div>
            </div>
            
            {!percentageValid && (
              <p className="text-sm text-red-600">
                Macro percentages must add up to 100% (currently {totalPercentage}%)
              </p>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">Activity & Recovery Goals</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workouts">Weekly Workouts</Label>
              <Input
                id="workouts"
                type="number"
                placeholder="3"
                value={workouts}
                onChange={(e) => setWorkouts(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">Workouts per week</p>
            </div>

            <div>
              <Label htmlFor="sleep">Sleep Hours</Label>
              <Input
                id="sleep"
                type="number"
                placeholder="8"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">Hours per night</p>
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="steps">Daily Steps</Label>
            <Input
              id="steps"
              type="number"
              placeholder="10000"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">Step target for daily movement</p>
          </div>
        </Card>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800 text-center">
          These targets can be adjusted anytime in your settings after setup
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!isValid} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
