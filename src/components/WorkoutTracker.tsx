
import { activity } from "lucide-react";
import { Card } from "@/components/ui/card";

const dummyWorkouts = [
  { ex: "Bench Press", sets: 3, reps: "8/8/7", weight: "60kg", notes: "Felt strong" },
  { ex: "Pull-Ups", sets: 3, reps: "8/7/6", weight: "Bodyweight", notes: "" },
  { ex: "Squats", sets: 4, reps: "10/10/9/8", weight: "70kg", notes: "Tough final set" },
];

export default function WorkoutTracker() {
  return (
    <Card className="p-6 shadow-lg animate-fade-in flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center rounded-full bg-green-50 p-2">
          <activity size={22} className="text-green-600" />
        </span>
        <h2 className="text-2xl font-bold tracking-tight">Workout Tracker</h2>
        <button className="ml-auto px-3 py-1 bg-green-600 text-white rounded shadow hover:scale-105 transition-transform">Add Workout</button>
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-green-50 text-gray-600">
            <tr>
              <th className="px-3 py-2 text-left">Exercise</th>
              <th className="px-3 py-2 text-right">Sets</th>
              <th className="px-3 py-2 text-right">Reps</th>
              <th className="px-3 py-2 text-right">Weight</th>
              <th className="px-3 py-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {dummyWorkouts.map((item, i) => (
              <tr key={i} className="border-t border-gray-200 hover:bg-green-50 transition-colors">
                <td className="px-3 py-2">{item.ex}</td>
                <td className="px-3 py-2 text-right">{item.sets}</td>
                <td className="px-3 py-2 text-right">{item.reps}</td>
                <td className="px-3 py-2 text-right">{item.weight}</td>
                <td className="px-3 py-2">{item.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 bg-green-50 rounded p-3 flex justify-between items-center text-sm font-medium">
        <div>Exercises: <span className="font-semibold">{dummyWorkouts.length}</span></div>
        <div>Total Sets: <span className="font-semibold">{dummyWorkouts.reduce((a,c)=>a+c.sets,0)}</span></div>
      </div>
    </Card>
  );
}
