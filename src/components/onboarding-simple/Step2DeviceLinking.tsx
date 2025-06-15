
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { SimpleOnboardingData } from "@/types/onboarding-simple";
import { Smartphone, Watch, Heart, Zap } from "lucide-react";

interface Step2DeviceLinkingProps {
  data: Partial<SimpleOnboardingData>;
  onNext: (data: Partial<SimpleOnboardingData>) => void;
  onPrev: () => void;
}

const DEVICES = [
  {
    id: 'apple',
    name: 'Apple Health',
    description: 'Connect to Apple Health for seamless data sync',
    icon: Smartphone,
    color: 'bg-gray-100 text-gray-700'
  },
  {
    id: 'garmin',
    name: 'Garmin Connect',
    description: 'Sync workouts and health metrics from Garmin',
    icon: Watch,
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'whoop',
    name: 'WHOOP',
    description: 'Connect recovery and strain data from WHOOP',
    icon: Heart,
    color: 'bg-red-100 text-red-700'
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    description: 'Sync steps, sleep, and activity from Fitbit',
    icon: Zap,
    color: 'bg-green-100 text-green-700'
  }
];

export default function Step2DeviceLinking({ data, onNext, onPrev }: Step2DeviceLinkingProps) {
  const [selectedDevices, setSelectedDevices] = useState<string[]>(data.connectedDevices || []);

  const toggleDevice = (deviceId: string) => {
    setSelectedDevices(prev => 
      prev.includes(deviceId) 
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const handleNext = () => {
    onNext({ connectedDevices: selectedDevices });
  };

  const handleSkip = () => {
    onNext({ connectedDevices: [] });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Connect Your Devices</h2>
        <p className="text-gray-600 mt-2">
          Link your fitness devices for automatic data tracking (optional)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEVICES.map((device) => {
          const IconComponent = device.icon;
          const isSelected = selectedDevices.includes(device.id);
          
          return (
            <Card
              key={device.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleDevice(device.id)}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${device.color}`}>
                  <IconComponent size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{device.name}</h3>
                  <p className="text-sm text-gray-600">{device.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedDevices.length > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Device connections will be set up after completing onboarding. 
            You'll receive instructions on how to authorize each selected device.
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button variant="ghost" onClick={handleSkip} className="flex-1">
          Skip for Now
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
