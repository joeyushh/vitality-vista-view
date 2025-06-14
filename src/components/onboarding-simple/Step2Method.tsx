
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { SimpleOnboardingData } from "@/types/onboarding-simple";
import { Calculator, Target } from "lucide-react";

interface Step2Props {
  data: Partial<SimpleOnboardingData>;
  onNext: (data: Partial<SimpleOnboardingData>) => void;
  onPrev: () => void;
}

const METHODS = [
  {
    id: 'experience',
    title: 'Calculate for Me',
    description: 'Answer a few questions and we\'ll calculate your optimal targets',
    icon: Calculator,
    recommended: true
  },
  {
    id: 'manual',
    title: 'Set My Own Goals',
    description: 'I know my targets and want to set them manually',
    icon: Target,
    recommended: false
  }
];

export default function Step2Method({ data, onNext, onPrev }: Step2Props) {
  const [selected, setSelected] = useState(data.setupMethod || '');

  const handleNext = () => {
    if (selected) {
      onNext({ setupMethod: selected as 'experience' | 'manual' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">How would you like to set up your goals?</h2>
        <p className="text-gray-600 mt-2">Choose the method that works best for you</p>
      </div>

      <div className="space-y-3">
        {METHODS.map((method) => {
          const IconComponent = method.icon;
          return (
            <Card
              key={method.id}
              className={`p-4 cursor-pointer transition-all border-2 relative ${
                selected === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelected(method.id)}
            >
              {method.recommended && (
                <div className="absolute -top-2 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Recommended
                </div>
              )}
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <IconComponent className="text-gray-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{method.title}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selected === method.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selected === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
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
        <Button onClick={handleNext} disabled={!selected} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
