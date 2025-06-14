
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { OnboardingData } from "../OnboardingFlow";

interface ExperienceStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const EXPERIENCE_LEVELS = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'New to fitness or getting back into it'
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Regular exercise routine, some experience'
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Experienced with structured training'
  }
];

export default function ExperienceStep({ data, onUpdate, onNext, onPrev }: ExperienceStepProps) {
  const [selected, setSelected] = useState(data.fitnessLevel || '');

  const handleNext = () => {
    if (selected) {
      onUpdate({ fitnessLevel: selected as 'beginner' | 'intermediate' | 'advanced' });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">What's your fitness experience?</h2>
        <p className="text-gray-600 mt-2">This helps us recommend the right workouts for you</p>
      </div>

      <div className="space-y-3">
        {EXPERIENCE_LEVELS.map((level) => (
          <Card
            key={level.id}
            className={`p-4 cursor-pointer transition-all border-2 ${
              selected === level.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelected(level.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <h3 className="font-semibold">{level.title}</h3>
                <p className="text-sm text-gray-600">{level.description}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                selected === level.id
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selected === level.id && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!selected} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
