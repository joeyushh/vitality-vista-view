
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

// Default selected credit goals (these would come from user's onboarding choices)
const selectedCreditGoals = ['calories', 'protein', 'workouts', 'steps', 'sleep'];

export default function DashboardStats() {
  const isTrackedForCredits = (metricId: string) => {
    // Map metric IDs to credit goal IDs
    const metricToCreditMap: { [key: string]: string } = {
      'calories': 'calories',
      'protein': 'protein',
      'carbs': 'carbs',
      'fats': 'fats',
      'steps': 'steps',
      'workoutsCompleted': 'workouts',
      'sleep': 'sleep'
    };
    
    const creditGoalId = metricToCreditMap[metricId];
    return creditGoalId && selectedCreditGoals.includes(creditGoalId);
  };

  const isGoalCompleted = (metricId: string) => {
    const metric = todaysMetrics[metricId as keyof typeof todaysMetrics];
    if (!metric) return false;
    
    // Special case for workouts - exact match
    if (metricId === 'workoutsCompleted') {
      return metric.current >= metric.target;
    }
    
    return metric.current >= metric.target;
  };

  const getMetricClasses = (metricId: string, baseColor: string) => {
    const isCompleted = isGoalCompleted(metricId);
    
    if (isCompleted) {
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-600',
        subtext: 'text-yellow-700'
      };
    }
    
    return {
      bg: `bg-${baseColor}-50`,
      border: `border-${baseColor}-200`,
      text: `text-${baseColor}-600`,
      subtext: `text-${baseColor}-700`
    };
  };

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
        <div className={`p-3 rounded-lg text-center border relative ${getMetricClasses('calories', 'green').bg} ${getMetricClasses('calories', 'green').border}`}>
          {isTrackedForCredits('calories') && (
            <Star size={12} className={`absolute top-1 right-1 fill-${isGoalCompleted('calories') ? 'yellow' : 'green'}-700 text-${isGoalCompleted('calories') ? 'yellow' : 'green'}-700`} />
          )}
          <div className={`text-xl font-bold ${getMetricClasses('calories', 'green').text}`}>{todaysMetrics.calories.current}</div>
          <div className="text-xs text-gray-600 mb-1">Calories</div>
          <div className={`text-xs ${getMetricClasses('calories', 'green').subtext}`}>of {todaysMetrics.calories.target}</div>
        </div>

        <div className={`p-3 rounded-lg text-center border relative ${getMetricClasses('protein', 'green').bg} ${getMetricClasses('protein', 'green').border}`}>
          {isTrackedForCredits('protein') && (
            <Star size={12} className={`absolute top-1 right-1 fill-${isGoalCompleted('protein') ? 'yellow' : 'green'}-700 text-${isGoalCompleted('protein') ? 'yellow' : 'green'}-700`} />
          )}
          <div className={`text-xl font-bold ${getMetricClasses('protein', 'green').text}`}>{todaysMetrics.protein.current}g</div>
          <div className="text-xs text-gray-600 mb-1">Protein</div>
          <div className={`text-xs ${getMetricClasses('protein', 'green').subtext}`}>of {todaysMetrics.protein.target}g</div>
        </div>

        <div className={`p-3 rounded-lg text-center border relative ${getMetricClasses('carbs', 'green').bg} ${getMetricClasses('carbs', 'green').border}`}>
          {isTrackedForCredits('carbs') && (
            <Star size={12} className={`absolute top-1 right-1 fill-${isGoalCompleted('carbs') ? 'yellow' : 'green'}-700 text-${isGoalCompleted('carbs') ? 'yellow' : 'green'}-700`} />
          )}
          <div className={`text-xl font-bold ${getMetricClasses('carbs', 'green').text}`}>{todaysMetrics.carbs.current}g</div>
          <div className="text-xs text-gray-600 mb-1">Carbs</div>
          <div className={`text-xs ${getMetricClasses('carbs', 'green').subtext}`}>of {todaysMetrics.carbs.target}g</div>
        </div>

        <div className={`p-3 rounded-lg text-center border relative ${getMetricClasses('fats', 'green').bg} ${getMetricClasses('fats', 'green').border}`}>
          {isTrackedForCredits('fats') && (
            <Star size={12} className={`absolute top-1 right-1 fill-${isGoalCompleted('fats') ? 'yellow' : 'green'}-700 text-${isGoalCompleted('fats') ? 'yellow' : 'green'}-700`} />
          )}
          <div className={`text-xl font-bold ${getMetricClasses('fats', 'green').text}`}>{todaysMetrics.fats.current}g</div>
          <div className="text-xs text-gray-600 mb-1">Fats</div>
          <div className={`text-xs ${getMetricClasses('fats', 'green').subtext}`}>of {todaysMetrics.fats.target}g</div>
        </div>
      </div>

      {/* Activity Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={`p-3 rounded-lg text-center border relative ${getMetricClasses('steps', 'blue').bg} ${getMetricClasses('steps', 'blue').border}`}>
          {isTrackedForCredits('steps') && (
            <Star size={12} className={`absolute top-1 right-1 fill-${isGoalCompleted('steps') ? 'yellow' : 'blue'}-700 text-${isGoalCompleted('steps') ? 'yellow' : 'blue'}-700`} />
          )}
          <div className={`text-xl font-bold ${getMetricClasses('steps', 'blue').text}`}>{todaysMetrics.steps.current.toLocaleString()}</div>
          <div className="text-xs text-gray-600 mb-1">Steps</div>
          <div className={`text-xs ${getMetricClasses('steps', 'blue').subtext}`}>of {todaysMetrics.steps.target.toLocaleString()}</div>
        </div>

        <div className={`p-3 rounded-lg text-center border relative ${getMetricClasses('workoutsCompleted', 'blue').bg} ${getMetricClasses('workoutsCompleted', 'blue').border}`}>
          {isTrackedForCredits('workoutsCompleted') && (
            <Star size={12} className={`absolute top-1 right-1 fill-${isGoalCompleted('workoutsCompleted') ? 'yellow' : 'blue'}-700 text-${isGoalCompleted('workoutsCompleted') ? 'yellow' : 'blue'}-700`} />
          )}
          <div className={`text-xl font-bold ${getMetricClasses('workoutsCompleted', 'blue').text}`}>{todaysMetrics.workoutsCompleted.current}/{todaysMetrics.workoutsCompleted.target}</div>
          <div className="text-xs text-gray-600 mb-1">Workouts</div>
          <div className={`text-xs ${getMetricClasses('workoutsCompleted', 'blue').subtext}`}>completed</div>
        </div>

        <div className={`p-3 rounded-lg text-center border relative ${getMetricClasses('sleep', 'purple').bg} ${getMetricClasses('sleep', 'purple').border}`}>
          {isTrackedForCredits('sleep') && (
            <Star size={12} className={`absolute top-1 right-1 fill-${isGoalCompleted('sleep') ? 'yellow' : 'purple'}-700 text-${isGoalCompleted('sleep') ? 'yellow' : 'purple'}-700`} />
          )}
          <div className={`text-xl font-bold ${getMetricClasses('sleep', 'purple').text}`}>{todaysMetrics.sleep.current}hrs</div>
          <div className="text-xs text-gray-600 mb-1">Sleep</div>
          <div className={`text-xs ${getMetricClasses('sleep', 'purple').subtext}`}>of {todaysMetrics.sleep.target}hrs</div>
        </div>

        <div className="p-3 bg-purple-50 rounded-lg text-center border border-purple-200 relative">
          <div className="text-xl font-bold text-purple-600">{todaysMetrics.bodyBattery.current}%</div>
          <div className="text-xs text-gray-600 mb-1">Body Battery</div>
          <div className="text-xs text-purple-700">of {todaysMetrics.bodyBattery.target}%</div>
        </div>
      </div>
    </Card>
  );
}
