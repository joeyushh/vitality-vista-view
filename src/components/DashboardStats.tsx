
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const todaysCredits = {
  calories: { hit: false, credits: 0 }, // Changed to false since 1845 < 2200
  protein: { hit: false, credits: 0 }, // Changed to false since 120 < 150
  workout: { hit: true, credits: 1 },
  steps: { hit: false, credits: 0 }, // Changed to false since 8420 < 10000
  sleep: { hit: false, credits: 0 }
};

const totalCreditsToday = Object.values(todaysCredits).reduce((sum, item) => sum + item.credits, 0);

// Key metrics data
const todaysMetrics = {
  calories: { current: 1845, target: 2200, unit: 'cal' },
  protein: { current: 120, target: 150, unit: 'g' },
  carbs: { current: 180, target: 250, unit: 'g' },
  fats: { current: 65, target: 80, unit: 'g' },
  steps: { current: 8420, target: 10000, unit: '' },
  workoutsCompleted: { current: 1, target: 1 },
  sleep: { current: 6.5, target: 8, unit: 'hrs' },
  bodyBattery: { current: 75, target: 100, unit: '%' }
};

export default function DashboardStats() {
  return (
    <Card className="p-4 shadow-lg animate-fade-in">
      {/* Credits Header - Enhanced styling */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-bold text-gray-800">Today's Progress</h2>
        <div className="ml-auto flex items-center gap-2">
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 px-3 py-1">
            <Star size={14} className="mr-1 fill-yellow-600 text-yellow-600" />
            <span className="text-sm font-medium">Credits Earned: {totalCreditsToday}</span>
          </Badge>
        </div>
      </div>

      {/* Food Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
          <div className="text-xl font-bold text-green-600">{todaysMetrics.calories.current}</div>
          <div className="text-xs text-gray-600 mb-1">Calories</div>
          <div className="text-xs text-green-700">of {todaysMetrics.calories.target}</div>
        </div>

        <div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
          <div className="text-xl font-bold text-green-600">{todaysMetrics.protein.current}g</div>
          <div className="text-xs text-gray-600 mb-1">Protein</div>
          <div className="text-xs text-green-700">of {todaysMetrics.protein.target}g</div>
        </div>

        <div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
          <div className="text-xl font-bold text-green-600">{todaysMetrics.carbs.current}g</div>
          <div className="text-xs text-gray-600 mb-1">Carbs</div>
          <div className="text-xs text-green-700">of {todaysMetrics.carbs.target}g</div>
        </div>

        <div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
          <div className="text-xl font-bold text-green-600">{todaysMetrics.fats.current}g</div>
          <div className="text-xs text-gray-600 mb-1">Fats</div>
          <div className="text-xs text-green-700">of {todaysMetrics.fats.target}g</div>
        </div>
      </div>

      {/* Activity Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-200">
          <div className="text-xl font-bold text-blue-600">{todaysMetrics.steps.current.toLocaleString()}</div>
          <div className="text-xs text-gray-600 mb-1">Steps</div>
          <div className="text-xs text-blue-700">of {todaysMetrics.steps.target.toLocaleString()}</div>
        </div>

        <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-200">
          <div className="text-xl font-bold text-blue-600">{todaysMetrics.workoutsCompleted.current}/{todaysMetrics.workoutsCompleted.target}</div>
          <div className="text-xs text-gray-600 mb-1">Workouts</div>
          <div className="text-xs text-blue-700">completed</div>
        </div>

        <div className="p-3 bg-purple-50 rounded-lg text-center border border-purple-200">
          <div className="text-xl font-bold text-purple-600">{todaysMetrics.sleep.current}hrs</div>
          <div className="text-xs text-gray-600 mb-1">Sleep</div>
          <div className="text-xs text-purple-700">of {todaysMetrics.sleep.target}hrs</div>
        </div>

        <div className="p-3 bg-purple-50 rounded-lg text-center border border-purple-200">
          <div className="text-xl font-bold text-purple-600">{todaysMetrics.bodyBattery.current}%</div>
          <div className="text-xs text-gray-600 mb-1">Body Battery</div>
          <div className="text-xs text-purple-700">of {todaysMetrics.bodyBattery.target}%</div>
        </div>
      </div>
    </Card>
  );
}
