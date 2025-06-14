
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { SimpleOnboardingData } from "@/types/onboarding-simple";

interface Step3Props {
  data: Partial<SimpleOnboardingData>;
  onNext: (data: Partial<SimpleOnboardingData>) => void;
  onPrev: () => void;
}

const EXPERIENCE_LEVELS = [
  { id: 'beginner', label: 'Beginner', description: 'New to fitness or getting back into it' },
  { id: 'intermediate', label: 'Intermediate', description: 'Exercise regularly, comfortable with basics' },
  { id: 'advanced', label: 'Advanced', description: 'Experienced with structured training' }
];

const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: 'Sedentary', description: 'Desk job, little to no exercise' },
  { id: 'lightly_active', label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
  { id: 'moderately_active', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
  { id: 'very_active', label: 'Very Active', description: 'Heavy exercise 6-7 days/week' }
];

const GOALS = [
  { id: 'lose_weight', label: 'Lose Weight', description: 'Reduce body fat and get leaner' },
  { id: 'gain_muscle', label: 'Gain Muscle', description: 'Build strength and muscle mass' },
  { id: 'maintain', label: 'Maintain Weight', description: 'Keep current weight and stay healthy' },
  { id: 'improve_fitness', label: 'Improve Fitness', description: 'Enhance overall fitness and performance' }
];

export default function Step3Experience({ data, onNext, onPrev }: Step3Props) {
  const [experience, setExperience] = useState(data.fitnessExperience || '');
  const [activity, setActivity] = useState(data.activityLevel || '');
  const [goal, setGoal] = useState(data.goal || '');

  const handleNext = () => {
    if (experience && activity && goal) {
      onNext({
        fitnessExperience: experience as 'beginner' | 'intermediate' | 'advanced',
        activityLevel: activity as 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active',
        goal: goal as 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_fitness'
      });
    }
  };

  const isValid = experience && activity && goal;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Tell us about your fitness</h2>
        <p className="text-gray-600 mt-2">This helps us calculate your optimal targets</p>
      </div>

      <div className="space-y-6">
        <Card className="p-4">
          <Label className="text-base font-semibold mb-3 block">Fitness Experience</Label>
          <RadioGroup value={experience} onValueChange={setExperience}>
            {EXPERIENCE_LEVELS.map((level) => (
              <div key={level.id} className="flex items-start space-x-3 p-2">
                <RadioGroupItem value={level.id} id={level.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={level.id} className="font-medium cursor-pointer">
                    {level.label}
                  </Label>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </Card>

        <Card className="p-4">
          <Label className="text-base font-semibold mb-3 block">Activity Level</Label>
          <RadioGroup value={activity} onValueChange={setActivity}>
            {ACTIVITY_LEVELS.map((level) => (
              <div key={level.id} className="flex items-start space-x-3 p-2">
                <RadioGroupItem value={level.id} id={level.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={level.id} className="font-medium cursor-pointer">
                    {level.label}
                  </Label>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </Card>

        <Card className="p-4">
          <Label className="text-base font-semibold mb-3 block">Primary Goal</Label>
          <RadioGroup value={goal} onValueChange={setGoal}>
            {GOALS.map((goalOption) => (
              <div key={goalOption.id} className="flex items-start space-x-3 p-2">
                <RadioGroupItem value={goalOption.id} id={goalOption.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={goalOption.id} className="font-medium cursor-pointer">
                    {goalOption.label}
                  </Label>
                  <p className="text-sm text-gray-600">{goalOption.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </Card>
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
