
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
  const [protein, setProtein] = useState(data.manualProtein?.toString() || '');
  const [steps, setSteps] = useState(data.manualSteps?.toString() || '');

  const handleNext = () => {
    if (calories && protein && steps) {
      onNext({
        manualCalories: parseInt(calories),
        manualProtein: parseInt(protein),
        manualSteps: parseInt(steps)
      });
    }
  };

  const isValid = calories && protein && steps;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Set your daily targets</h2>
        <p className="text-gray-600 mt-2">Enter your preferred daily goals</p>
      </div>

      <Card className="p-6">
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

          <div>
            <Label htmlFor="protein">Daily Protein (g)</Label>
            <Input
              id="protein"
              type="number"
              placeholder="150"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">Protein target in grams</p>
          </div>

          <div>
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
        </div>
      </Card>

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
