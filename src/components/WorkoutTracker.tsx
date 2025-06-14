
import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

const dummyWorkouts = [
  { ex: "Bench Press", sets: 4, reps: "8/8/7/6", weight: "80kg", restTime: "2-3min", notes: "Felt strong, good form" },
  { ex: "Incline DB Press", sets: 3, reps: "10/9/8", weight: "30kg", restTime: "90s", notes: "" },
  { ex: "Cable Flyes", sets: 3, reps: "12/12/10", weight: "25kg", restTime: "60s", notes: "Great pump" },
  { ex: "Tricep Pushdowns", sets: 3, reps: "15/12/10", weight: "40kg", restTime: "60s", notes: "Burn on last set" },
];

export default function WorkoutTracker() {
  const totalSets = dummyWorkouts.reduce((sum, w) => sum + w.sets, 0);
  const workoutDuration = "52 min";

  return (
    <Card className="p-6 shadow-lg animate-fade-in flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center rounded-full bg-green-50 p-2">
          <Activity size={22} className="text-green-600" />
        </span>
        <h2 className="text-2xl font-bold tracking-tight">Today's Workout</h2>
        <button className="ml-auto px-3 py-1 bg-green-600 text-white rounded shadow hover:scale-105 transition-transform">
          Start Workout
        </button>
      </div>

      <div className="mb-4 p-3 bg-green-50 rounded-lg">
        <div className="font-medium text-green-800 mb-1">Push Day - Chest & Triceps</div>
        <div className="text-sm text-green-600">Duration: {workoutDuration} • {totalSets} sets completed</div>
      </div>
      
      <div className="overflow-x-auto rounded-lg flex-1">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-green-50 text-gray-600">
            <tr>
              <th className="px-3 py-2 text-left">Exercise</th>
              <th className="px-3 py-2 text-center">Sets</th>
              <th className="px-3 py-2 text-center">Reps</th>
              <th className="px-3 py-2 text-center">Weight</th>
              <th className="px-3 py-2 text-center">Rest</th>
            </tr>
          </thead>
          <tbody>
            {dummyWorkouts.map((item, i) => (
              <tr key={i} className="border-t border-gray-200 hover:bg-green-50 transition-colors">
                <td className="px-3 py-2">
                  <div className="font-medium">{item.ex}</div>
                  {item.notes && <div className="text-xs text-gray-500">{item.notes}</div>}
                </td>
                <td className="px-3 py-2 text-center">{item.sets}</td>
                <td className="px-3 py-2 text-center font-mono text-xs">{item.reps}</td>
                <td className="px-3 py-2 text-center font-semibold">{item.weight}</td>
                <td className="px-3 py-2 text-center text-xs text-gray-500">{item.restTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
        <div className="bg-green-50 rounded p-2">
          <div className="font-bold text-green-600">{totalSets}</div>
          <div className="text-gray-600">Sets</div>
        </div>
        <div className="bg-blue-50 rounded p-2">
          <div className="font-bold text-blue-600">4/5</div>
          <div className="text-gray-600">This Week</div>
        </div>
        <div className="bg-purple-50 rounded p-2">
          <div className="font-bold text-purple-600">✓</div>
          <div className="text-gray-600">Complete</div>
        </div>
      </div>

      <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
        <div className="font-medium mb-1">🎯 Next Session</div>
        <div className="text-gray-600">Pull Day - Back & Biceps (Tomorrow)</div>
      </div>
    </Card>
  );
}
