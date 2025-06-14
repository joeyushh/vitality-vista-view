
import { Activity, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const dummyWorkouts = [
  { ex: "Bench Press", sets: 4, weightReps: "80kg/8, 80kg/7, 75kg/8, 70kg/9", restTime: "2-3min", notes: "Felt strong today" },
  { ex: "Incline DB Press", sets: 3, weightReps: "30kg/10, 30kg/9, 27.5kg/10", restTime: "90s", notes: "" },
  { ex: "Cable Flyes", sets: 3, weightReps: "25kg/12, 25kg/12, 22.5kg/11", restTime: "60s", notes: "" },
  { ex: "Tricep Pushdowns", sets: 3, weightReps: "40kg/15, 40kg/12, 37.5kg/13", restTime: "60s", notes: "" },
];

export default function WorkoutTracker() {
  const totalSets = dummyWorkouts.reduce((sum, w) => sum + w.sets, 0);
  const workoutDuration = "Not started";
  const bodyBattery = 90;

  const getBodyBatteryTip = () => {
    if (bodyBattery < 60) {
      return "Your body battery is low. Consider a lighter workout or rest day today.";
    } else if (bodyBattery < 80) {
      return "You're feeling a bit tired today. Maybe adjust your workout intensity.";
    } else {
      return `You're at ${bodyBattery}% body battery, your body can handle pushing it for your workout today.`;
    }
  };

  return (
    <Card className="p-6 shadow-lg animate-fade-in flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center rounded-full bg-blue-50 p-2">
          <Activity size={22} className="text-blue-600" />
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-blue-700">Today's Workout</h2>
        <div className="ml-auto flex gap-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded shadow hover:scale-105 transition-transform">
            Start Workout
          </button>
          <button className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-300 rounded shadow hover:scale-105 transition-transform">
            Workout Log
          </button>
        </div>
      </div>

      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="font-medium text-blue-800 mb-1">Push Day - Chest & Triceps</div>
        <div className="text-sm text-blue-600">Duration: {workoutDuration} • 0/{totalSets} sets completed</div>
      </div>

      {/* Energy Tip */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-2">
          <Clock size={16} className="text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-700">
            <span className="font-medium">Energy Tip:</span>{" "}
            {getBodyBatteryTip()}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-lg flex-1">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-blue-50 text-gray-600">
            <tr>
              <th className="px-3 py-2 text-left">Exercise</th>
              <th className="px-3 py-2 text-center">Sets</th>
              <th className="px-3 py-2 text-center">Weight/Reps</th>
              <th className="px-3 py-2 text-center">Rest</th>
              <th className="px-3 py-2 text-center">Notes</th>
            </tr>
          </thead>
          <tbody>
            {dummyWorkouts.map((item, i) => (
              <tr key={i} className="border-t border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="px-3 py-2">
                  <div className="font-medium text-blue-800">{item.ex}</div>
                </td>
                <td className="px-3 py-2 text-center text-blue-700">{item.sets}</td>
                <td className="px-3 py-2 text-center font-mono text-xs text-blue-700">{item.weightReps}</td>
                <td className="px-3 py-2 text-center text-xs text-gray-500">{item.restTime}</td>
                <td className="px-3 py-2 text-center text-xs text-gray-500">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
        <div className="bg-blue-50 rounded p-2">
          <div className="font-bold text-blue-600">0/{totalSets}</div>
          <div className="text-gray-600">Sets</div>
        </div>
        <div className="bg-blue-50 rounded p-2">
          <div className="font-bold text-blue-600">0/1</div>
          <div className="text-gray-600">Today</div>
        </div>
        <div className="bg-blue-50 rounded p-2">
          <div className="font-bold text-blue-600">Pending</div>
          <div className="text-gray-600">Status</div>
        </div>
      </div>

      <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
        <div className="font-medium mb-1">Next Session</div>
        <div className="text-gray-600">Pull Day - Back & Biceps (Tomorrow)</div>
      </div>
    </Card>
  );
}
