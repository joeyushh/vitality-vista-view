
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";

// Default selected credit goals (these would come from user's onboarding choices)
const selectedCreditGoals = ['calories', 'protein', 'workouts', 'steps', 'sleep'];

export default function DashboardStats() {
  const { getDailyStats, getGoalStatus, targets } = useAppData();
  const today = new Date().toISOString().split('T')[0];
  const todaysStats = getDailyStats(today);
  const goalStatus = getGoalStatus(today);
  
  const totalCreditsToday = Object.values(goalStatus).reduce((sum, item) => sum + item.credits, 0);

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
    const metricValue = todaysStats[metricId as keyof typeof todaysStats];
    const target = targets[metricId as keyof typeof targets];
    
    if (typeof metricValue !== 'number' || typeof target !== 'number') return false;
    
    // Special case for workouts - exact match
    if (metricId === 'workoutsCompleted') {
      return metricValue >= target;
    }
    
    return metricValue >= target;
  };

  const getProgressPercentage = (metricId: string) => {
    const metricValue = todaysStats[metricId as keyof typeof todaysStats];
    const target = targets[metricId as keyof typeof targets];
    
    if (typeof metricValue !== 'number' || typeof target !== 'number') return 0;
    return Math.min((metricValue / target) * 100, 100);
  };

  const getMetricClasses = (metricId: string, baseColor: string) => {
    const isCompleted = isGoalCompleted(metricId);
    
    if (isCompleted) {
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-600',
        subtext: 'text-yellow-700',
        progressBg: 'bg-yellow-200',
        progressFill: 'bg-yellow-500'
      };
    }
    
    return {
      bg: `bg-${baseColor}-50`,
      border: `border-${baseColor}-200`,
      text: `text-${baseColor}-600`,
      subtext: `text-${baseColor}-700`,
      progressBg: `bg-${baseColor}-200`,
      progressFill: `bg-${baseColor}-500`
    };
  };

  const getProgressBarColor = (metricId: string, baseColor: string) => {
    const isCompleted = isGoalCompleted(metricId);
    if (isCompleted) {
      return '#eab308'; // Yellow color for completed goals
    }
    
    // Return the appropriate color based on metric type
    switch (baseColor) {
      case 'green':
        return '#16a34a'; // Green
      case 'blue':
        return '#3b82f6'; // Blue
      case 'purple':
        return '#a855f7'; // Purple
      default:
        return '#3b82f6'; // Default blue
    }
  };

  return (
    <Card className="p-4 shadow-lg animate-fade-in">
      {/* Credits Header */}
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
        <div className={`p-4 rounded-lg border relative ${getMetricClasses('calories', 'green').bg} ${getMetricClasses('calories', 'green').border}`}>
          {isTrackedForCredits('calories') && (
            <Star size={12} className={`absolute top-2 right-2 fill-${isGoalCompleted('calories') ? 'yellow' : 'green'}-700 text-${isGoalCompleted('calories') ? 'yellow' : 'green'}-700`} />
          )}
          <div className="space-y-3">
            <div className="text-center">
              <div className={`text-xl font-bold ${getMetricClasses('calories', 'green').text} mb-1`}>{Math.round(todaysStats.calories)}</div>
              <div className="text-xs text-gray-600 mb-1">Calories</div>
              <div className={`text-xs ${getMetricClasses('calories', 'green').subtext}`}>of {targets.calories}</div>
            </div>
            <Progress 
              value={getProgressPercentage('calories')} 
              className="h-2"
              indicatorColor={getProgressBarColor('calories', 'green')}
            />
          </div>
        </div>

        <div className={`p-4 rounded-lg border relative ${getMetricClasses('protein', 'green').bg} ${getMetricClasses('protein', 'green').border}`}>
          {isTrackedForCredits('protein') && (
            <Star size={12} className={`absolute top-2 right-2 fill-${isGoalCompleted('protein') ? 'yellow' : 'green'}-700 text-${isGoalCompleted('protein') ? 'yellow' : 'green'}-700`} />
          )}
          <div className="space-y-3">
            <div className="text-center">
              <div className={`text-xl font-bold ${getMetricClasses('protein', 'green').text} mb-1`}>{Math.round(todaysStats.protein)}g</div>
              <div className="text-xs text-gray-600 mb-1">Protein</div>
              <div className={`text-xs ${getMetricClasses('protein', 'green').subtext}`}>of {targets.protein}g</div>
            </div>
            <Progress 
              value={getProgressPercentage('protein')} 
              className="h-2"
              indicatorColor={getProgressBarColor('protein', 'green')}
            />
          </div>
        </div>

        <div className={`p-4 rounded-lg border relative ${getMetricClasses('carbs', 'green').bg} ${getMetricClasses('carbs', 'green').border}`}>
          {isTrackedForCredits('carbs') && (
            <Star size={12} className={`absolute top-2 right-2 fill-${isGoalCompleted('carbs') ? 'yellow' : 'green'}-700 text-${isGoalCompleted('carbs') ? 'yellow' : 'green'}-700`} />
          )}
          <div className="space-y-3">
            <div className="text-center">
              <div className={`text-xl font-bold ${getMetricClasses('carbs', 'green').text} mb-1`}>{Math.round(todaysStats.carbs)}g</div>
              <div className="text-xs text-gray-600 mb-1">Carbs</div>
              <div className={`text-xs ${getMetricClasses('carbs', 'green').subtext}`}>of {targets.carbs}g</div>
            </div>
            <Progress 
              value={getProgressPercentage('carbs')} 
              className="h-2"
              indicatorColor={getProgressBarColor('carbs', 'green')}
            />
          </div>
        </div>

        <div className={`p-4 rounded-lg border relative ${getMetricClasses('fats', 'green').bg} ${getMetricClasses('fats', 'green').border}`}>
          {isTrackedForCredits('fats') && (
            <Star size={12} className={`absolute top-2 right-2 fill-${isGoalCompleted('fats') ? 'yellow' : 'green'}-700 text-${isGoalCompleted('fats') ? 'yellow' : 'green'}-700`} />
          )}
          <div className="space-y-3">
            <div className="text-center">
              <div className={`text-xl font-bold ${getMetricClasses('fats', 'green').text} mb-1`}>{Math.round(todaysStats.fats)}g</div>
              <div className="text-xs text-gray-600 mb-1">Fats</div>
              <div className={`text-xs ${getMetricClasses('fats', 'green').subtext}`}>of {targets.fats}g</div>
            </div>
            <Progress 
              value={getProgressPercentage('fats')} 
              className="h-2"
              indicatorColor={getProgressBarColor('fats', 'green')}
            />
          </div>
        </div>
      </div>

      {/* Activity Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={`p-4 rounded-lg border relative ${getMetricClasses('steps', 'blue').bg} ${getMetricClasses('steps', 'blue').border}`}>
          {isTrackedForCredits('steps') && (
            <Star size={12} className={`absolute top-2 right-2 fill-${isGoalCompleted('steps') ? 'yellow' : 'blue'}-700 text-${isGoalCompleted('steps') ? 'yellow' : 'blue'}-700`} />
          )}
          <div className="space-y-3">
            <div className="text-center">
              <div className={`text-xl font-bold ${getMetricClasses('steps', 'blue').text} mb-1`}>{todaysStats.steps.toLocaleString()}</div>
              <div className="text-xs text-gray-600 mb-1">Steps</div>
              <div className={`text-xs ${getMetricClasses('steps', 'blue').subtext}`}>of {targets.steps.toLocaleString()}</div>
            </div>
            <Progress 
              value={getProgressPercentage('steps')} 
              className="h-2"
              indicatorColor={getProgressBarColor('steps', 'blue')}
            />
          </div>
        </div>

        <div className={`p-4 rounded-lg border relative ${getMetricClasses('workoutsCompleted', 'blue').bg} ${getMetricClasses('workoutsCompleted', 'blue').border}`}>
          {isTrackedForCredits('workoutsCompleted') && (
            <Star size={12} className={`absolute top-2 right-2 fill-${isGoalCompleted('workoutsCompleted') ? 'yellow' : 'blue'}-700 text-${isGoalCompleted('workoutsCompleted') ? 'yellow' : 'blue'}-700`} />
          )}
          <div className="space-y-3">
            <div className="text-center">
              <div className={`text-xl font-bold ${getMetricClasses('workoutsCompleted', 'blue').text} mb-1`}>{todaysStats.workoutsCompleted}/{targets.workouts}</div>
              <div className="text-xs text-gray-600 mb-1">Workouts</div>
              <div className={`text-xs ${getMetricClasses('workoutsCompleted', 'blue').subtext}`}>completed</div>
            </div>
            <Progress 
              value={getProgressPercentage('workoutsCompleted')} 
              className="h-2"
              indicatorColor={getProgressBarColor('workoutsCompleted', 'blue')}
            />
          </div>
        </div>

        <div className={`p-4 rounded-lg border relative ${getMetricClasses('sleep', 'purple').bg} ${getMetricClasses('sleep', 'purple').border}`}>
          {isTrackedForCredits('sleep') && (
            <Star size={12} className={`absolute top-2 right-2 fill-${isGoalCompleted('sleep') ? 'yellow' : 'purple'}-700 text-${isGoalCompleted('sleep') ? 'yellow' : 'purple'}-700`} />
          )}
          <div className="space-y-3">
            <div className="text-center">
              <div className={`text-xl font-bold ${getMetricClasses('sleep', 'purple').text} mb-1`}>{todaysStats.sleep}hrs</div>
              <div className="text-xs text-gray-600 mb-1">Sleep</div>
              <div className={`text-xs ${getMetricClasses('sleep', 'purple').subtext}`}>of {targets.sleep}hrs</div>
            </div>
            <Progress 
              value={getProgressPercentage('sleep')} 
              className="h-2"
              indicatorColor={getProgressBarColor('sleep', 'purple')}
            />
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 relative">
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600 mb-1">{todaysStats.bodyBattery}%</div>
              <div className="text-xs text-gray-600 mb-1">Body Battery</div>
              <div className="text-xs text-purple-700">of 100%</div>
            </div>
            <Progress 
              value={todaysStats.bodyBattery} 
              className="h-2"
              indicatorColor={getProgressBarColor('bodyBattery', 'purple')}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
