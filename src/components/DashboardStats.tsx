
import { Card } from "@/components/ui/card";
import { Target, Calendar, Trophy, Star } from "lucide-react";

const todaysCredits = {
  calories: { hit: true, credits: 1 },
  protein: { hit: true, credits: 1 },
  workout: { hit: true, credits: 1 },
  steps: { hit: true, credits: 1 },
  sleep: { hit: false, credits: 0 }
};

const totalCreditsToday = Object.values(todaysCredits).reduce((sum, item) => sum + item.credits, 0);

export default function DashboardStats() {
  return (
    <Card className="p-4 shadow-lg animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-full">
          <Star size={20} className="text-purple-600" />
        </div>
        <h2 className="text-lg font-bold text-purple-700">Today's Credits</h2>
        <div className="ml-auto text-2xl font-bold text-orange-600">{totalCreditsToday}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className={`p-3 rounded-lg text-center ${todaysCredits.calories.hit ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
          <div className={`text-lg font-bold ${todaysCredits.calories.hit ? 'text-green-600' : 'text-gray-400'}`}>
            {todaysCredits.calories.hit ? '✓' : '✗'}
          </div>
          <div className="text-xs text-gray-600">Calories</div>
          <div className="text-xs text-orange-600 font-medium">+{todaysCredits.calories.credits}</div>
        </div>

        <div className={`p-3 rounded-lg text-center ${todaysCredits.protein.hit ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
          <div className={`text-lg font-bold ${todaysCredits.protein.hit ? 'text-green-600' : 'text-gray-400'}`}>
            {todaysCredits.protein.hit ? '✓' : '✗'}
          </div>
          <div className="text-xs text-gray-600">Protein</div>
          <div className="text-xs text-orange-600 font-medium">+{todaysCredits.protein.credits}</div>
        </div>

        <div className={`p-3 rounded-lg text-center ${todaysCredits.workout.hit ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
          <div className={`text-lg font-bold ${todaysCredits.workout.hit ? 'text-blue-600' : 'text-gray-400'}`}>
            {todaysCredits.workout.hit ? '✓' : '✗'}
          </div>
          <div className="text-xs text-gray-600">Workout</div>
          <div className="text-xs text-orange-600 font-medium">+{todaysCredits.workout.credits}</div>
        </div>

        <div className={`p-3 rounded-lg text-center ${todaysCredits.steps.hit ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
          <div className={`text-lg font-bold ${todaysCredits.steps.hit ? 'text-blue-600' : 'text-gray-400'}`}>
            {todaysCredits.steps.hit ? '✓' : '✗'}
          </div>
          <div className="text-xs text-gray-600">Steps</div>
          <div className="text-xs text-orange-600 font-medium">+{todaysCredits.steps.credits}</div>
        </div>

        <div className={`p-3 rounded-lg text-center ${todaysCredits.sleep.hit ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50 border border-gray-200'}`}>
          <div className={`text-lg font-bold ${todaysCredits.sleep.hit ? 'text-purple-600' : 'text-gray-400'}`}>
            {todaysCredits.sleep.hit ? '✓' : '✗'}
          </div>
          <div className="text-xs text-gray-600">Sleep</div>
          <div className="text-xs text-orange-600 font-medium">+{todaysCredits.sleep.credits}</div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-orange-700 font-medium">Today's Total</span>
          <span className="text-lg font-bold text-orange-600">{totalCreditsToday} credits</span>
        </div>
      </div>
    </Card>
  );
}
