import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TrackingModal from "./TrackingModal";

const dummyWorkouts = [
  { ex: "Bench Press", sets: 4, weightReps: "80kg/6, 75kg/7, 70kg/8, 65kg/9", restTime: "2-3min", notes: "" },
  { ex: "Incline DB Press", sets: 3, weightReps: "30kg/8, 27.5kg/9, 25kg/10", restTime: "90s", notes: "" },
  { ex: "Cable Flyes", sets: 3, weightReps: "25kg/10, 22.5kg/12, 20kg/11", restTime: "60s", notes: "" },
  { ex: "Tricep Pushdowns", sets: 3, weightReps: "40kg/12, 37.5kg/13, 35kg/15", restTime: "60s", notes: "" },
];

export default function WorkoutTracker() {
  const navigate = useNavigate();
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  
  const totalSets = dummyWorkouts.reduce((sum, w) => sum + w.sets, 0);
  const workoutDuration = "Not started";

  const handleWorkoutLogClick = () => {
    navigate("/workouts");
  };

  const handleStartWorkoutClick = () => {
    setShowTrackingModal(true);
  };

  return (
    <>
      <Card className="p-4 md:p-6 shadow-lg animate-fade-in flex flex-col h-full">
        <div className="flex items-center gap-2 md:gap-3 mb-4">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-50 p-1.5 md:p-2">
            <Activity size={18} className="text-blue-600 md:w-5 md:h-5" />
          </span>
          <h2 className="text-lg md:text-2xl font-bold tracking-tight text-blue-700 flex-1">Today's Workout</h2>
          <div className="flex gap-1 md:gap-2">
            <button 
              onClick={handleStartWorkoutClick}
              className="px-2 md:px-3 py-1 md:py-1 text-xs md:text-sm bg-blue-600 text-white rounded shadow hover:scale-105 transition-transform min-h-[32px] md:min-h-[36px]">
              Start Workout
            </button>
            <button 
              onClick={handleWorkoutLogClick}
              className="px-2 md:px-3 py-1 md:py-1 text-xs md:text-sm bg-blue-100 text-blue-700 border border-blue-300 rounded shadow hover:scale-105 transition-transform min-h-[32px] md:min-h-[36px]">
              Workout Log
            </button>
          </div>
        </div>

        <div className="mb-3 md:mb-4 p-2 md:p-3 bg-blue-50 rounded-lg">
          <div className="font-medium text-blue-800 mb-1 text-sm md:text-base">Push Day - Chest & Triceps</div>
          <div className="text-xs md:text-sm text-blue-600">Duration: {workoutDuration} • 0/{totalSets} sets completed</div>
        </div>
        
        {/* Mobile: Hide table headers, use card layout instead */}
        <div className="flex-1">
          {/* Desktop table view */}
          <div className="hidden md:block overflow-x-auto rounded-lg">
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
                    <td className="px-3 py-2 text-center text-xs text-gray-500">{item.notes || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card view */}
          <div className="md:hidden space-y-2">
            {dummyWorkouts.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="font-medium text-blue-800 mb-2">{item.ex}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Sets:</span>
                    <span className="ml-1 text-blue-700 font-medium">{item.sets}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Rest:</span>
                    <span className="ml-1 text-gray-500">{item.restTime}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-gray-500 text-xs mb-1">Weight/Reps:</div>
                  <div className="font-mono text-xs text-blue-700 break-all">{item.weightReps}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 md:mt-4 grid grid-cols-3 gap-2 md:gap-3 text-center text-xs md:text-sm">
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

        <div className="mt-2 md:mt-3 p-2 md:p-3 bg-gray-50 rounded text-xs md:text-sm">
          <div className="font-medium mb-1">Next Session</div>
          <div className="text-gray-600">Pull Day - Back & Biceps (Tomorrow)</div>
        </div>
      </Card>

      {showTrackingModal && (
        <TrackingModal 
          type="workout" 
          onClose={() => setShowTrackingModal(false)} 
        />
      )}
    </>
  );
}
