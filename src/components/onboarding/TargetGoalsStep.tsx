
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { OnboardingData } from "@/types/onboarding";

interface TargetGoalsStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function TargetGoalsStep({ data, onUpdate, onNext, onPrev }: TargetGoalsStepProps) {
  const [targetWeight, setTargetWeight] = useState(data.targetWeight?.toString() || '');
  const [timeline, setTimeline] = useState(data.timeline || '');
  const [weeklyGoal, setWeeklyGoal] = useState(data.weeklyGoal?.toString() || '');

  const handleNext = () => {
    if (targetWeight && timeline) {
      const weeklyGoalValue = data.primaryGoal !== 'maintain' && weeklyGoal ? 
        parseFloat(weeklyGoal) : 0;

      onUpdate({
        targetWeight: parseFloat(targetWeight),
        timeline: timeline,
        weeklyGoal: weeklyGoalValue
      });
      onNext();
    }
  };

  const getGoalText = () => {
    switch (data.primaryGoal) {
      case 'lose_weight': return 'lose';
      case 'gain_muscle': return 'reach';
      case 'maintain': return 'maintain';
      default: return 'reach';
    }
  };

  const getWeeklyGoalLabel = () => {
    switch (data.primaryGoal) {
      case 'lose_weight': return 'How much weight do you want to lose per week? (kg)';
      case 'gain_muscle': return 'How much weight do you want to gain per week? (kg)';
      default: return '';
    }
  };

  const getWeeklyGoalPlaceholder = () => {
    switch (data.primaryGoal) {
      case 'lose_weight': return '0.5';
      case 'gain_muscle': return '0.3';
      default: return '';
    }
  };

  const isValid = targetWeight && timeline && (data.primaryGoal === 'maintain' || weeklyGoal);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Set Your Target</h2>
        <p className="text-gray-600 mt-2">Help us calculate your personalized nutrition plan</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="target-weight">What weight do you want to {getGoalText()}? (kg)</Label>
          <Input
            id="target-weight"
            type="number"
            step="0.1"
            placeholder="65"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
          />
        </div>

        <div>
          <Label>What's your timeline?</Label>
          <Select value={timeline} onValueChange={setTimeline}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3_months">3 months</SelectItem>
              <SelectItem value="6_months">6 months</SelectItem>
              <SelectItem value="12_months">12 months</SelectItem>
              <SelectItem value="maintain">No specific timeline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {data.primaryGoal !== 'maintain' && data.primaryGoal !== 'improve_health' && (
          <div>
            <Label htmlFor="weekly-goal">{getWeeklyGoalLabel()}</Label>
            <Input
              id="weekly-goal"
              type="number"
              step="0.1"
              min="0.1"
              max="2"
              placeholder={getWeeklyGoalPlaceholder()}
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended: {data.primaryGoal === 'lose_weight' ? '0.25-0.75' : '0.2-0.5'} kg per week
            </p>
          </div>
        )}
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
