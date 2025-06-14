
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Watch, Smartphone, Activity } from "lucide-react";
import { useState } from "react";
import { OnboardingData } from "../OnboardingFlow";

interface WearableConnectionStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const WEARABLE_OPTIONS = [
  {
    id: 'apple_watch',
    name: 'Apple Watch',
    icon: Watch,
    description: 'Sync steps, heart rate, and workouts',
    available: true
  },
  {
    id: 'garmin',
    name: 'Garmin',
    icon: Activity,
    description: 'Track activities and health metrics',
    available: true
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    icon: Smartphone,
    description: 'Monitor daily activity and sleep',
    available: false
  },
  {
    id: 'none',
    name: 'Skip for now',
    icon: Smartphone,
    description: 'Connect later in settings',
    available: true
  }
];

export default function WearableConnectionStep({ data, onUpdate, onNext, onPrev }: WearableConnectionStepProps) {
  const [selectedWearable, setSelectedWearable] = useState(data.connectedWearable || '');

  const handleConnect = (wearableId: string) => {
    if (wearableId === 'none') {
      setSelectedWearable('none');
      return;
    }
    
    // Simulate connection process
    setSelectedWearable(wearableId);
    
    // In a real app, this would trigger the actual connection flow
    setTimeout(() => {
      alert(`${WEARABLE_OPTIONS.find(w => w.id === wearableId)?.name} connection would be initiated here`);
    }, 500);
  };

  const handleNext = () => {
    onUpdate({ connectedWearable: selectedWearable });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Connect Your Wearable</h2>
        <p className="text-gray-600 mt-2">Automatically track your activities, steps, and health data</p>
      </div>

      <div className="space-y-3">
        {WEARABLE_OPTIONS.map((wearable) => {
          const IconComponent = wearable.icon;
          return (
            <Card
              key={wearable.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                selectedWearable === wearable.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${!wearable.available ? 'opacity-50' : ''}`}
              onClick={() => wearable.available && handleConnect(wearable.id)}
            >
              <div className="flex items-center space-x-4">
                <IconComponent size={24} className="text-gray-600" />
                <div className="flex-1">
                  <h3 className="font-semibold">{wearable.name}</h3>
                  <p className="text-sm text-gray-600">{wearable.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedWearable === wearable.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedWearable === wearable.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Privacy Note:</strong> Your health data stays secure and is only used to help you track your fitness goals.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!selectedWearable} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
