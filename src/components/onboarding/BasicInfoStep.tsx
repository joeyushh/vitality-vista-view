
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { OnboardingData } from "../OnboardingFlow";

interface BasicInfoStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function BasicInfoStep({ data, onUpdate, onNext, onPrev }: BasicInfoStepProps) {
  const [height, setHeight] = useState(data.height?.toString() || '');
  const [weight, setWeight] = useState(data.weight?.toString() || '');
  const [age, setAge] = useState(data.age?.toString() || '');
  const [gender, setGender] = useState(data.gender || '');

  const handleNext = () => {
    if (height && weight && age && gender) {
      onUpdate({
        height: parseInt(height),
        weight: parseInt(weight),
        age: parseInt(age),
        gender: gender as 'male' | 'female' | 'other'
      });
      onNext();
    }
  };

  const isValid = height && weight && age && gender;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Tell us about yourself</h2>
        <p className="text-gray-600 mt-2">This helps us calculate your personalized targets</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div>
          <Label>Gender</Label>
          <RadioGroup value={gender} onValueChange={setGender} className="mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
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
