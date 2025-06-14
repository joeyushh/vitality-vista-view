import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, ArrowLeft, TrendingDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const strengthData = [
  { session: "Week 1", push: 100, pull: 90, legs: 110 },
  { session: "Week 2", push: 98, pull: 94, legs: 108 },
  { session: "Week 3", push: 105, pull: 97, legs: 115 },
  { session: "Week 4", push: 103, pull: 99, legs: 118 },
  { session: "Week 5", push: 110, pull: 96, legs: 120 },
  { session: "Week 6", push: 112, pull: 102, legs: 123 },
];

// Exercise progress data for each workout type with 1RM calculations
const exerciseProgress = {
  push: [
    { exercise: "Bench Press", startWeight: "75kg", currentWeight: "82kg", start1RM: 95, current1RM: 104, change: 9.5, trend: "up" },
    { exercise: "Incline DB Press", startWeight: "25kg", currentWeight: "30kg", start1RM: 32, current1RM: 38, change: 18.8, trend: "up" },
    { exercise: "Cable Flyes", startWeight: "20kg", currentWeight: "25kg", start1RM: 26, current1RM: 32, change: 23.1, trend: "up" },
    { exercise: "Tricep Pushdowns", startWeight: "35kg", currentWeight: "40kg", start1RM: 44, current1RM: 51, change: 15.9, trend: "up" },
    { exercise: "Overhead Press", startWeight: "40kg", currentWeight: "50kg", start1RM: 50, current1RM: 63, change: 26.0, trend: "up" },
    { exercise: "Lateral Raises", startWeight: "10kg", currentWeight: "12.5kg", start1RM: 15, current1RM: 19, change: 26.7, trend: "up" },
  ],
  pull: [
    { exercise: "Pull-ups", startWeight: "BW", currentWeight: "BW+5kg", start1RM: 85, current1RM: 98, change: 15.3, trend: "up" },
    { exercise: "Bent Over Rows", startWeight: "60kg", currentWeight: "70kg", start1RM: 76, current1RM: 89, change: 17.1, trend: "up" },
    { exercise: "Lat Pulldowns", startWeight: "55kg", currentWeight: "65kg", start1RM: 70, current1RM: 83, change: 18.6, trend: "up" },
    { exercise: "Face Pulls", startWeight: "30kg", currentWeight: "35kg", start1RM: 38, current1RM: 44, change: 15.8, trend: "up" },
    { exercise: "Bicep Curls", startWeight: "12.5kg", currentWeight: "17.5kg", start1RM: 18, current1RM: 25, change: 38.9, trend: "up" },
    { exercise: "Deadlifts", startWeight: "100kg", currentWeight: "110kg", start1RM: 127, current1RM: 140, change: 10.2, trend: "up" },
  ],
  legs: [
    { exercise: "Squats", startWeight: "80kg", currentWeight: "100kg", start1RM: 102, current1RM: 127, change: 24.5, trend: "up" },
    { exercise: "Romanian Deadlifts", startWeight: "70kg", currentWeight: "80kg", start1RM: 89, current1RM: 102, change: 14.6, trend: "up" },
    { exercise: "Bulgarian Split Squats", startWeight: "20kg", currentWeight: "25kg", start1RM: 28, current1RM: 35, change: 25.0, trend: "up" },
    { exercise: "Leg Press", startWeight: "160kg", currentWeight: "180kg", start1RM: 203, current1RM: 229, change: 12.8, trend: "up" },
    { exercise: "Calf Raises", startWeight: "45kg", currentWeight: "60kg", start1RM: 63, current1RM: 84, change: 33.3, trend: "up" },
    { exercise: "Leg Curls", startWeight: "30kg", currentWeight: "45kg", start1RM: 42, current1RM: 63, change: 50.0, trend: "up" },
  ]
};

// Past workout data for each type
const workoutHistory = {
  push: [
    { date: "2024-06-10", exercises: ["Bench Press", "Incline DB Press", "Cable Flyes", "Tricep Pushdowns"], totalSets: 13 },
    { date: "2024-06-07", exercises: ["Overhead Press", "Lateral Raises", "Face Pulls", "Tricep Extensions"], totalSets: 13 },
    { date: "2024-06-03", exercises: ["Bench Press", "Incline DB Press", "Dips", "Close Grip Bench"], totalSets: 12 },
    { date: "2024-05-31", exercises: ["Push-ups", "Pike Push-ups", "Diamond Push-ups", "Tricep Dips"], totalSets: 16 },
  ],
  pull: [
    { date: "2024-06-12", exercises: ["Pull-ups", "Bent Over Rows", "Lat Pulldowns", "Face Pulls", "Bicep Curls"], totalSets: 16 },
    { date: "2024-06-05", exercises: ["Deadlifts", "T-Bar Rows", "Cable Rows", "Hammer Curls"], totalSets: 14 },
    { date: "2024-06-01", exercises: ["Chin-ups", "Single Arm Rows", "Reverse Flyes", "Preacher Curls"], totalSets: 15 },
    { date: "2024-05-28", exercises: ["Assisted Pull-ups", "Machine Rows", "Lat Pulldowns", "21s Curls"], totalSets: 13 },
  ],
  legs: [
    { date: "2024-06-13", exercises: ["Squats", "Romanian Deadlifts", "Bulgarian Split Squats", "Leg Press", "Calf Raises", "Leg Curls"], totalSets: 19 },
    { date: "2024-06-06", exercises: ["Front Squats", "Stiff Leg Deadlifts", "Walking Lunges", "Leg Extensions"], totalSets: 16 },
    { date: "2024-06-02", exercises: ["Goblet Squats", "Hip Thrusts", "Step-ups", "Calf Raises"], totalSets: 14 },
    { date: "2024-05-29", exercises: ["Bodyweight Squats", "Single Leg Deadlifts", "Wall Sits", "Jump Squats"], totalSets: 12 },
  ]
};

export default function StrengthProgressChart() {
  const [selectedWorkoutType, setSelectedWorkoutType] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const calculateGrowth = (data: any[], key: string) => {
    const first = data[0][key];
    const last = data[data.length - 1][key];
    return Math.round(((last - first) / first) * 100);
  };

  const pushGrowth = calculateGrowth(strengthData, 'push');
  const pullGrowth = calculateGrowth(strengthData, 'pull');
  const legsGrowth = calculateGrowth(strengthData, 'legs');

  const handleWorkoutTypeClick = (type: string) => {
    setSelectedWorkoutType(type);
    setShowHistory(false);
  };

  const handleBackClick = () => {
    if (showHistory) {
      setShowHistory(false);
    } else {
      setSelectedWorkoutType(null);
    }
  };

  const handleViewHistoryClick = () => {
    setShowHistory(true);
  };

  if (selectedWorkoutType && showHistory) {
    const history = workoutHistory[selectedWorkoutType as keyof typeof workoutHistory];
    const workoutTypeName = selectedWorkoutType.charAt(0).toUpperCase() + selectedWorkoutType.slice(1);
    
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={handleBackClick}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="text-red-600" size={18} />
          </button>
          <TrendingUp className="text-red-600" size={18} />
          <h3 className="text-lg font-semibold text-red-800">{workoutTypeName} Workout History</h3>
        </div>

        <div className="space-y-3">
          {history.map((workout, i) => (
            <div key={i} className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-red-800">
                  {new Date(workout.date).toLocaleDateString(undefined, { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-sm text-red-600">{workout.totalSets} sets completed</div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="font-medium mb-1">Exercises:</div>
                <div className="flex flex-wrap gap-1">
                  {workout.exercises.map((exercise, idx) => (
                    <span key={idx} className="text-xs bg-white px-2 py-1 rounded border">
                      {exercise}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (selectedWorkoutType) {
    const exercises = exerciseProgress[selectedWorkoutType as keyof typeof exerciseProgress];
    const workoutTypeName = selectedWorkoutType.charAt(0).toUpperCase() + selectedWorkoutType.slice(1);
    
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={handleBackClick}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="text-red-600" size={18} />
          </button>
          <TrendingUp className="text-red-600" size={18} />
          <h3 className="text-lg font-semibold text-red-800">{workoutTypeName} Exercise Progress</h3>
        </div>

        <div className="space-y-3 mb-4">
          {exercises.map((exercise, i) => (
            <div key={i} className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-red-800">{exercise.exercise}</div>
                <div className="flex items-center gap-2">
                  {exercise.trend === 'up' ? (
                    <TrendingUp className="text-green-600" size={16} />
                  ) : (
                    <TrendingDown className="text-red-600" size={16} />
                  )}
                  <span className={`text-lg font-bold ${
                    exercise.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {exercise.trend === 'up' ? '+' : '-'}{exercise.change}%
                  </span>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Working Weight:</span> {exercise.startWeight} → {exercise.currentWeight}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Calculated 1RM:</span> {exercise.start1RM}kg → {exercise.current1RM}kg
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleViewHistoryClick}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          View Workout History
        </button>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="text-red-600" size={18} />
        <h3 className="text-lg font-semibold text-red-800">Strength Progression</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">Click on any category below to see detailed lift progress and percentage changes</p>
      
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={strengthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="session" />
            <YAxis label={{ value: 'Weight (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="push" stroke="#ef4444" strokeWidth={2} name="Push" />
            <Line type="monotone" dataKey="pull" stroke="#3b82f6" strokeWidth={2} name="Pull" />
            <Line type="monotone" dataKey="legs" stroke="#10b981" strokeWidth={2} name="Legs" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button 
          onClick={() => handleWorkoutTypeClick('push')}
          className="group relative text-center p-3 bg-red-50 border-2 border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="text-lg font-bold text-red-600">+{pushGrowth}%</div>
            <ChevronRight className="text-red-400 group-hover:text-red-600 transition-colors" size={16} />
          </div>
          <div className="text-xs text-red-700 font-medium mb-1">Push Growth</div>
          <div className="text-xs text-red-500">Check Stats</div>
          <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-5 rounded-lg transition-opacity"></div>
        </button>
        <button 
          onClick={() => handleWorkoutTypeClick('pull')}
          className="group relative text-center p-3 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="text-lg font-bold text-blue-600">+{pullGrowth}%</div>
            <ChevronRight className="text-blue-400 group-hover:text-blue-600 transition-colors" size={16} />
          </div>
          <div className="text-xs text-blue-700 font-medium mb-1">Pull Growth</div>
          <div className="text-xs text-blue-500">Check Stats</div>
          <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 rounded-lg transition-opacity"></div>
        </button>
        <button 
          onClick={() => handleWorkoutTypeClick('legs')}
          className="group relative text-center p-3 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="text-lg font-bold text-green-600">+{legsGrowth}%</div>
            <ChevronRight className="text-green-400 group-hover:text-green-600 transition-colors" size={16} />
          </div>
          <div className="text-xs text-green-700 font-medium mb-1">Legs Growth</div>
          <div className="text-xs text-green-500">Check Stats</div>
          <div className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-5 rounded-lg transition-opacity"></div>
        </button>
      </div>
    </Card>
  );
}
