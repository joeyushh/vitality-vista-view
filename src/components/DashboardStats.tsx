
import { Card } from "@/components/ui/card";
import { Check, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const todaysStats = {
  calories: { current: 1450, target: 2200 },
  protein: { current: 89, target: 165 },
  carbs: { current: 142, target: 220 },
  fat: { current: 48, target: 73 },
  steps: { current: 8234, target: 10000 },
  sleep: { current: 7.5, target: 8 },
  workoutCompleted: true,
  dailyWorkoutsLogged: 1,
  dailyWorkoutTarget: 1,
  foodStreak: 12,
  workoutStreak: 8,
  bodyBattery: 90,
  hasPlannedWorkout: false,
  plannedWorkout: ""
};

const tomorrowStats = {
  calories: { current: 0, target: 2200 },
  protein: { current: 0, target: 165 },
  carbs: { current: 0, target: 220 },
  fat: { current: 0, target: 73 },
  steps: { current: 0, target: 10000 },
  sleep: { current: 0, target: 8 },
  workoutCompleted: false,
  dailyWorkoutsLogged: 0,
  dailyWorkoutTarget: 1,
  foodStreak: 12,
  workoutStreak: 8,
  bodyBattery: 85,
  hasPlannedWorkout: true,
  plannedWorkout: "Pull Day - Back & Biceps"
};

const yesterdayStats = {
  calories: { current: 2180, target: 2200 },
  protein: { current: 158, target: 165 },
  carbs: { current: 215, target: 220 },
  fat: { current: 71, target: 73 },
  steps: { current: 9567, target: 10000 },
  sleep: { current: 6.5, target: 8 },
  workoutCompleted: true,
  dailyWorkoutsLogged: 1,
  dailyWorkoutTarget: 1,
  foodStreak: 11,
  workoutStreak: 7,
  bodyBattery: 72,
  hasPlannedWorkout: false,
  plannedWorkout: ""
};

export default function DashboardStats() {
  const [currentDay, setCurrentDay] = useState(0); // 0 = today, 1 = tomorrow, -1 = yesterday
  
  const getStatsForDay = () => {
    switch (currentDay) {
      case 1: return tomorrowStats;
      case -1: return yesterdayStats;
      default: return todaysStats;
    }
  };

  const getDayLabel = () => {
    switch (currentDay) {
      case 1: return "Tomorrow's Progress";
      case -1: return "Yesterday's Progress";
      default: return "Today's Progress";
    }
  };

  const stats = getStatsForDay();
  const caloriesPercent = (stats.calories.current / stats.calories.target) * 100;
  const proteinPercent = (stats.protein.current / stats.protein.target) * 100;
  const carbsPercent = (stats.carbs.current / stats.carbs.target) * 100;
  const fatPercent = (stats.fat.current / stats.fat.target) * 100;
  const stepsPercent = (stats.steps.current / stats.steps.target) * 100;
  const sleepPercent = (stats.sleep.current / stats.sleep.target) * 100;

  const getBodyBatteryTip = () => {
    if (stats.bodyBattery < 60) {
      return "Your body battery is low. Consider a lighter workout or rest day today.";
    } else if (stats.bodyBattery < 80) {
      return "You're feeling a bit tired today. Maybe adjust your workout intensity.";
    } else {
      return "You're at " + stats.bodyBattery + "% body battery, your body can handle pushing it for your workout today.";
    }
  };

  return (
    <Card className="p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">{getDayLabel()}</h2>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentDay(currentDay - 1)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-500" />
            </button>
            <button 
              onClick={() => setCurrentDay(currentDay + 1)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
          {stats.workoutCompleted && currentDay <= 0 && (
            <>
              <Check size={16} className="text-emerald-600" />
              <span>Workout Complete</span>
            </>
          )}
          {currentDay === 1 && stats.hasPlannedWorkout && (
            <span className="text-gray-700">Workout Planned: {stats.plannedWorkout}</span>
          )}
        </div>
      </div>
      
      {/* Food & Nutrition Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-green-800">Food & Nutrition</h3>
          <div className="bg-orange-50 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-orange-600">{stats.foodStreak}</div>
            <div className="text-xs text-orange-500">food streak</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Calories */}
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-800">
              {stats.calories.current}
            </div>
            <div className="text-xs text-green-600 mb-2">/ {stats.calories.target} calories</div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(caloriesPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Protein */}
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-800">
              {stats.protein.current}g
            </div>
            <div className="text-xs text-green-600 mb-2">/ {stats.protein.target}g protein</div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(proteinPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-800">
              {stats.carbs.current}g
            </div>
            <div className="text-xs text-green-600 mb-2">/ {stats.carbs.target}g carbs</div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(carbsPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Fat */}
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-800">
              {stats.fat.current}g
            </div>
            <div className="text-xs text-green-600 mb-2">/ {stats.fat.target}g fat</div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(fatPercent, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise & Activity Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-blue-800">Exercise & Activity</h3>
          <div className="bg-orange-50 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-orange-600">{stats.workoutStreak}</div>
            <div className="text-xs text-orange-500">workout streak</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Steps */}
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-800">
              {stats.steps.current.toLocaleString()}
            </div>
            <div className="text-xs text-blue-600 mb-2">/ {stats.steps.target.toLocaleString()} steps</div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(stepsPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Daily Workouts Logged */}
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-800">
              {stats.dailyWorkoutsLogged}/{stats.dailyWorkoutTarget}
            </div>
            <div className="text-xs text-blue-600 mb-2">workouts logged</div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min((stats.dailyWorkoutsLogged / stats.dailyWorkoutTarget) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Sleep */}
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-800">
              {stats.sleep.current}hrs
            </div>
            <div className="text-xs text-blue-600 mb-2">/ {stats.sleep.target}hrs sleep</div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(sleepPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Body Battery */}
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-800">
              {stats.bodyBattery}%
            </div>
            <div className="text-xs text-blue-600 mb-2">body battery</div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  stats.bodyBattery >= 80 ? 'bg-emerald-500' : 
                  stats.bodyBattery >= 60 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${stats.bodyBattery}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Tips */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-2">
          <Clock size={16} className="text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-700">
            <span className="font-medium">Energy Tip:</span>{" "}
            {getBodyBatteryTip()}
          </div>
        </div>
      </div>
    </Card>
  );
}
