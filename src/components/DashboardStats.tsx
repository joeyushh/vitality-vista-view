
import { Card } from "@/components/ui/card";
import { Check, Clock } from "lucide-react";

const todaysStats = {
  calories: { current: 1450, target: 2200 },
  protein: { current: 89, target: 165 },
  carbs: { current: 142, target: 220 },
  fat: { current: 48, target: 73 },
  water: { current: 6, target: 8 },
  steps: { current: 8234, target: 10000 },
  sleep: { current: 7.5, target: 8 },
  workoutCompleted: true,
  setsCompleted: 13,
  targetSets: 16,
  foodStreak: 12,
  workoutStreak: 8,
  combinedStreak: 14
};

export default function DashboardStats() {
  const caloriesPercent = (todaysStats.calories.current / todaysStats.calories.target) * 100;
  const proteinPercent = (todaysStats.protein.current / todaysStats.protein.target) * 100;
  const carbsPercent = (todaysStats.carbs.current / todaysStats.carbs.target) * 100;
  const fatPercent = (todaysStats.fat.current / todaysStats.fat.target) * 100;
  const stepsPercent = (todaysStats.steps.current / todaysStats.steps.target) * 100;
  const sleepPercent = (todaysStats.sleep.current / todaysStats.sleep.target) * 100;

  return (
    <Card className="p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Today's Progress</h2>
        <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
          {todaysStats.workoutCompleted && (
            <>
              <Check size={16} />
              <span>Workout Complete</span>
            </>
          )}
        </div>
      </div>
      
      {/* Food & Nutrition Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-green-700">Food & Nutrition</h3>
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-green-600">{todaysStats.foodStreak}</div>
            <div className="text-xs text-gray-500">food streak</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Calories */}
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {todaysStats.calories.current}
            </div>
            <div className="text-xs text-gray-500 mb-2">/ {todaysStats.calories.target} calories</div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(caloriesPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Protein */}
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {todaysStats.protein.current}g
            </div>
            <div className="text-xs text-gray-500 mb-2">/ {todaysStats.protein.target}g protein</div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(proteinPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {todaysStats.carbs.current}g
            </div>
            <div className="text-xs text-gray-500 mb-2">/ {todaysStats.carbs.target}g carbs</div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(carbsPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Fat */}
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {todaysStats.fat.current}g
            </div>
            <div className="text-xs text-gray-500 mb-2">/ {todaysStats.fat.target}g fat</div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(fatPercent, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Streak */}
      <div className="flex justify-center mb-6">
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-orange-600">{todaysStats.combinedStreak}</div>
          <div className="text-xs text-gray-500">day consistency streak</div>
        </div>
      </div>

      {/* Exercise & Activity Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-blue-700">Exercise & Activity</h3>
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-blue-600">{todaysStats.workoutStreak}</div>
            <div className="text-xs text-gray-500">workout streak</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Steps */}
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {todaysStats.steps.current.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mb-2">/ {todaysStats.steps.target.toLocaleString()} steps</div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(stepsPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Workout Sets */}
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {todaysStats.setsCompleted}
            </div>
            <div className="text-xs text-gray-500 mb-2">/ {todaysStats.targetSets} sets completed</div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min((todaysStats.setsCompleted / todaysStats.targetSets) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Sleep */}
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {todaysStats.sleep.current}hrs
            </div>
            <div className="text-xs text-gray-500 mb-2">/ {todaysStats.sleep.target}hrs sleep</div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(sleepPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Water */}
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {todaysStats.water.current}
            </div>
            <div className="text-xs text-gray-500 mb-2">/ {todaysStats.water.target} cups water</div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min((todaysStats.water.current / todaysStats.water.target) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-2">
          <Clock size={16} className="text-gray-500 mt-0.5" />
          <div className="text-sm text-gray-600">
            <span className="font-medium">Tracking Tip:</span> Remember to weigh your rice and chicken raw for accurate tracking. You're 650 calories away from your target - perfect for a post-workout meal!
          </div>
        </div>
      </div>
    </Card>
  );
}
