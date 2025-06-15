
import { Activity, Play, List, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TrackingModal from "./TrackingModal";

// This should sync with the exercise data from Workouts page
// For now, using the enhanced data structure with suggestions
const todaysWorkout = [
  { 
    name: "Bench Press", 
    sets: 4, 
    lastWeight: "80kg/6", 
    suggestedWeight: "82.5kg/6-8",
    suggestedExplanation: "Body battery: 90% (Excellent). 5% weight increase for strength focus. Weight change: +5.0% (80kg → 82.5kg).",
    restTime: "2-3min", 
    completed: 0 
  },
  { 
    name: "Incline DB Press", 
    sets: 3, 
    lastWeight: "30kg/8", 
    suggestedWeight: "31kg/8-10",
    suggestedExplanation: "Body battery: 90% (Excellent). 5% weight increase for hypertrophy. Weight change: +5.0% (30kg → 31kg).",
    restTime: "90s", 
    completed: 0 
  },
  { 
    name: "Cable Flyes", 
    sets: 3, 
    lastWeight: "25kg/10", 
    suggestedWeight: "25.5kg/8-10",
    suggestedExplanation: "Body battery: 90% (Excellent). 2.5% weight increase for hypertrophy. Weight change: +2.5% (25kg → 25.5kg).",
    restTime: "60s", 
    completed: 0 
  },
  { 
    name: "Tricep Pushdowns", 
    sets: 3, 
    lastWeight: "40kg/12", 
    suggestedWeight: "41kg/8-10",
    suggestedExplanation: "Body battery: 90% (Excellent). 2.5% weight increase for hypertrophy. Weight change: +2.5% (40kg → 41kg).",
    restTime: "60s", 
    completed: 0 
  },
];

export default function WorkoutTracker() {
  const navigate = useNavigate();
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  
  const totalSets = todaysWorkout.reduce((sum, w) => sum + w.sets, 0);
  const completedSets = todaysWorkout.reduce((sum, w) => sum + w.completed, 0);

  const handleWorkoutLogClick = () => {
    navigate("/workouts");
  };

  const handleStartWorkoutClick = () => {
    setShowTrackingModal(true);
  };

  return (
    <>
      <Card className="p-4 shadow-lg animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <Activity size={20} className="text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-blue-700 flex-1">Today's Workout</h2>
          <div className="flex gap-2">
            <button 
              onClick={handleStartWorkoutClick}
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors active:scale-95">
              <Play size={16} />
              <span className="text-sm font-medium">Start</span>
            </button>
            <button 
              onClick={handleWorkoutLogClick}
              className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg shadow-sm hover:bg-blue-200 transition-colors active:scale-95">
              <List size={16} />
              <span className="text-sm font-medium">Edit</span>
            </button>
          </div>
        </div>

        {/* Workout Info */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-blue-800">Push Day - Chest & Triceps</h3>
            <div className="ml-auto flex items-center gap-1 text-xs text-blue-600">
              <Clock size={12} />
              <span>Ready to start</span>
            </div>
          </div>
          <div className="text-xs text-blue-600">
            Progress: {completedSets}/{totalSets} sets completed
          </div>
          <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(completedSets / totalSets) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Exercise List - Read-only for starting workout */}
        <div className="space-y-3">
          {todaysWorkout.map((item, i) => (
            <div key={i} className="bg-white border border-blue-200 rounded-lg p-3 active:bg-blue-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-800 text-sm">{item.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {item.sets} sets
                  </span>
                  <span className="text-xs text-gray-500">{item.restTime}</span>
                </div>
              </div>
              
              {/* Last vs Suggested Weight Comparison */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="text-xs">
                  <div className="text-gray-500">Last Time</div>
                  <div className="font-mono text-gray-700">{item.lastWeight}</div>
                </div>
                <div className="text-xs">
                  <div className="text-gray-500">Today's Target</div>
                  <div className="font-mono text-green-700 font-medium">{item.suggestedWeight}</div>
                </div>
              </div>
              
              {/* Suggestion Explanation */}
              <div className="text-xs text-green-600 bg-green-50 rounded p-2 mb-2">
                {item.suggestedExplanation}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-blue-600">
                  {item.completed}/{item.sets} completed
                </div>
                <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors active:scale-95">
                  Start Set
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{completedSets}/{totalSets}</div>
            <div className="text-xs text-gray-600">Sets</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">0:00</div>
            <div className="text-xs text-gray-600">Duration</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">Ready</div>
            <div className="text-xs text-gray-600">Status</div>
          </div>
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
