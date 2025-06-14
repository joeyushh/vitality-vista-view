
import { Card } from "@/components/ui/card";
import { Check, Clock } from "lucide-react";

const todaysStats = {
  calories: { current: 1450, target: 2200 },
  protein: { current: 89, target: 165 },
  carbs: { current: 142, target: 220 },
  fat: { current: 48, target: 73 },
  water: { current: 6, target: 8 },
  steps: { current: 8234, target: 10000 },
  workoutCompleted: true
};

export default function DashboardStats() {
  const caloriesPercent = (todaysStats.calories.current / todaysStats.calories.target) * 100;
  const proteinPercent = (todaysStats.protein.current / todaysStats.protein.target) * 100;
  const stepsPercent = (todaysStats.steps.current / todaysStats.steps.target) * 100;

  return (
    <Card className="p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Today's Progress</h2>
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
          {todaysStats.workoutCompleted && (
            <>
              <Check size={16} />
              <span>Workout Complete</span>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {/* Calories */}
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {todaysStats.calories.current}
          </div>
          <div className="text-xs text-gray-500 mb-2">/ {todaysStats.calories.target} cal</div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all" 
              style={{ width: `${Math.min(caloriesPercent, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Protein */}
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {todaysStats.protein.current}g
          </div>
          <div className="text-xs text-gray-500 mb-2">/ {todaysStats.protein.target}g</div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all" 
              style={{ width: `${Math.min(proteinPercent, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Carbs */}
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {todaysStats.carbs.current}g
          </div>
          <div className="text-xs text-gray-500 mb-2">/ {todaysStats.carbs.target}g</div>
          <div className="w-full bg-yellow-200 rounded-full h-2">
            <div 
              className="bg-yellow-600 h-2 rounded-full transition-all" 
              style={{ width: `${Math.min((todaysStats.carbs.current / todaysStats.carbs.target) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Fat */}
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {todaysStats.fat.current}g
          </div>
          <div className="text-xs text-gray-500 mb-2">/ {todaysStats.fat.target}g</div>
          <div className="w-full bg-purple-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all" 
              style={{ width: `${Math.min((todaysStats.fat.current / todaysStats.fat.target) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Water */}
        <div className="bg-cyan-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-cyan-600">
            {todaysStats.water.current}
          </div>
          <div className="text-xs text-gray-500 mb-2">/ {todaysStats.water.target} cups</div>
          <div className="w-full bg-cyan-200 rounded-full h-2">
            <div 
              className="bg-cyan-600 h-2 rounded-full transition-all" 
              style={{ width: `${Math.min((todaysStats.water.current / todaysStats.water.target) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {todaysStats.steps.current.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mb-2">/ {todaysStats.steps.target.toLocaleString()}</div>
          <div className="w-full bg-orange-200 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all" 
              style={{ width: `${Math.min(stepsPercent, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Streak */}
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            14
          </div>
          <div className="text-xs text-gray-500 mb-2">day streak</div>
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-2">
          <Clock size={16} className="text-gray-500 mt-0.5" />
          <div className="text-sm text-gray-600">
            <span className="font-medium">Pro Tip:</span> Remember to weigh your rice and chicken raw for accurate tracking. You're 650 calories away from your target - perfect for a post-workout meal!
          </div>
        </div>
      </div>
    </Card>
  );
}
