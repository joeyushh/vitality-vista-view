
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { OnboardingData } from "@/types/onboarding";

interface ActivityStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ACTIVITIES = [
  'Weight Training',
  'Cardio/Running',
  'Yoga',
  'Swimming',
  'Cycling',
  'Sports',
  'Hiking',
  'Dancing'
];

export default function ActivityStep({ data, onUpdate, onNext, onPrev }: ActivityStepProps) {
  const [frequency, setFrequency] = useState(data.currentWorkoutFrequency || 3);
  const [activities, setActivities] = useState(data.preferredActivities || []);

  const handleActivityToggle = (activity: string) => {
    if (activities.includes(activity)) {
      setActivities(activities.filter(a => a !== activity));
    } else {
      setActivities([...activities, activity]);
    }
  };

  const handleNext = () => {
    onUpdate({
      currentWorkoutFrequency: frequency,
      preferredActivities: activities
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Activity Preferences</h2>
        <p className="text-gray-600 mt-2">Help us recommend workouts you'll enjoy</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-base font-semibold">
            How many days per week do you currently work out?
          </Label>
          <div className="mt-4 space-y-4">
            <Slider
              value={[frequency]}
              onValueChange={(value) => setFrequency(value[0])}
              max={7}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>0 days</span>
              <span className="font-semibold text-blue-600">{frequency} days</span>
              <span>7 days</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-base font-semibold mb-3 block">
            What activities do you enjoy? (Select all that apply)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {ACTIVITIES.map((activity) => (
              <Card
                key={activity}
                className={`p-3 cursor-pointer transition-all border-2 ${
                  activities.includes(activity)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleActivityToggle(activity)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={activities.includes(activity)}
                    onChange={() => {}}
                  />
                  <span className="text-sm font-medium">{activity}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
