
import { Card } from "@/components/ui/card";
import { Activity, Target, Calendar, Zap } from "lucide-react";

const weeklyGoals = {
  workoutsPerWeek: 4,
  currentWorkouts: 2,
  primaryGoal: "Muscle Gain",
  secondaryGoal: "Strength"
};

const weeklyProgram = [
  { day: "Monday", workout: "Push Day - Chest & Triceps", completed: true, exercises: 4 },
  { day: "Tuesday", workout: "Pull Day - Back & Biceps", completed: true, exercises: 5 },
  { day: "Wednesday", workout: "Rest Day", completed: true, exercises: 0 },
  { day: "Thursday", workout: "Legs & Glutes", completed: false, exercises: 6 },
  { day: "Friday", workout: "Push Day - Shoulders", completed: false, exercises: 4 },
  { day: "Saturday", workout: "Pull Day - Back Focus", completed: false, exercises: 5 },
  { day: "Sunday", workout: "Rest Day", completed: false, exercises: 0 },
];

const todaysWorkout = [
  { ex: "Squats", sets: 4, weightReps: "100kg/6, 95kg/7, 90kg/8, 85kg/10", restTime: "3min", notes: "Focus on depth" },
  { ex: "Romanian Deadlifts", sets: 3, weightReps: "80kg/8, 75kg/9, 70kg/10", restTime: "2min", notes: "" },
  { ex: "Bulgarian Split Squats", sets: 3, weightReps: "25kg/10, 22.5kg/11, 20kg/12", restTime: "90s", notes: "Each leg" },
  { ex: "Leg Press", sets: 3, weightReps: "180kg/12, 170kg/13, 160kg/15", restTime: "90s", notes: "" },
  { ex: "Calf Raises", sets: 4, weightReps: "60kg/15, 55kg/16, 50kg/18, 45kg/20", restTime: "60s", notes: "" },
  { ex: "Leg Curls", sets: 3, weightReps: "45kg/12, 40kg/13, 35kg/15", restTime: "60s", notes: "" },
];

const bodyBattery = 90;
const currentCarbs = 142;

export default function Workouts() {
  const getEnergyTip = () => {
    if (bodyBattery >= 80) {
      return `You're feeling great today (${bodyBattery}% body battery)! You've had ${currentCarbs}g carbs - perfect energy for a strong workout. Consider pushing your limits today.`;
    } else if (bodyBattery >= 60) {
      return `You're feeling decent today (${bodyBattery}% body battery). With ${currentCarbs}g carbs consumed, you should have good energy. Maybe adjust intensity based on how you feel during warm-up.`;
    } else {
      return `Your body battery is low (${bodyBattery}%). You've only had ${currentCarbs}g carbs today - consider having a banana 30 minutes before your workout for extra energy.`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-50 p-3">
            <Activity size={28} className="text-blue-600" />
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-blue-700">Workout Tracker</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Today's Workout */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fitness Goals */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Fitness Goals</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-800">{weeklyGoals.currentWorkouts}/{weeklyGoals.workoutsPerWeek}</div>
                  <div className="text-xs text-blue-600">Weekly Workouts</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-blue-800">{weeklyGoals.primaryGoal}</div>
                  <div className="text-xs text-blue-600">Primary Goal</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-blue-800">{weeklyGoals.secondaryGoal}</div>
                  <div className="text-xs text-blue-600">Secondary Goal</div>
                </div>
              </div>
            </Card>

            {/* Today's Workout */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-blue-800">Today's Workout - Legs & Glutes</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Start Workout
                </button>
              </div>
              
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full bg-white border border-gray-200 text-sm">
                  <thead className="bg-blue-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 text-left">Exercise</th>
                      <th className="px-4 py-3 text-center">Sets</th>
                      <th className="px-4 py-3 text-center">Weight/Reps</th>
                      <th className="px-4 py-3 text-center">Rest</th>
                      <th className="px-4 py-3 text-center">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todaysWorkout.map((item, i) => (
                      <tr key={i} className="border-t border-gray-200 hover:bg-blue-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-blue-800">{item.ex}</div>
                        </td>
                        <td className="px-4 py-3 text-center text-blue-700">{item.sets}</td>
                        <td className="px-4 py-3 text-center font-mono text-xs text-blue-700">{item.weightReps}</td>
                        <td className="px-4 py-3 text-center text-xs text-gray-500">{item.restTime}</td>
                        <td className="px-4 py-3 text-center text-xs text-gray-500">{item.notes || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right Column - Program & Tips */}
          <div className="space-y-6">
            {/* Energy Tip */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">Energy Status</h2>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-700">{getEnergyTip()}</div>
              </div>
            </Card>

            {/* Weekly Program */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">Weekly Program</h2>
              </div>
              <div className="space-y-2">
                {weeklyProgram.map((day, i) => (
                  <div key={i} className={`flex justify-between items-center p-3 rounded-lg ${
                    day.completed ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <div>
                      <div className="font-medium text-gray-800">{day.day}</div>
                      <div className="text-sm text-gray-600">{day.workout}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {day.exercises > 0 && (
                        <span className="text-xs text-gray-500">{day.exercises} exercises</span>
                      )}
                      {day.completed && (
                        <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Workout Tips */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">Workout Tips</h2>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-1">Progressive Overload</div>
                  <div>Gradually increase weight, reps, or sets each week for continued progress.</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-1">Rest Between Sets</div>
                  <div>Take adequate rest between sets - 2-3 minutes for compound exercises.</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-1">Listen to Your Body</div>
                  <div>Adjust intensity based on your body battery and energy levels.</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
