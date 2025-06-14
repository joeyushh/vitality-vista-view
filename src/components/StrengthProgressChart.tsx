
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { useState } from "react";

const strengthData = [
  { session: "Week 1", push: 100, pull: 90, legs: 110 },
  { session: "Week 2", push: 102, pull: 92, legs: 112 },
  { session: "Week 3", push: 105, pull: 95, legs: 115 },
  { session: "Week 4", push: 107, pull: 97, legs: 118 },
  { session: "Week 5", push: 110, pull: 100, legs: 120 },
  { session: "Week 6", push: 112, pull: 102, legs: 123 },
];

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
  };

  const handleBackClick = () => {
    setSelectedWorkoutType(null);
  };

  if (selectedWorkoutType) {
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

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-red-600" size={18} />
        <h3 className="text-lg font-semibold text-red-800">Strength Progression</h3>
      </div>
      
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
          className="text-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
        >
          <div className="text-lg font-bold text-red-600">+{pushGrowth}%</div>
          <div className="text-xs text-gray-600">Push Growth</div>
        </button>
        <button 
          onClick={() => handleWorkoutTypeClick('pull')}
          className="text-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
        >
          <div className="text-lg font-bold text-red-600">+{pullGrowth}%</div>
          <div className="text-xs text-gray-600">Pull Growth</div>
        </button>
        <button 
          onClick={() => handleWorkoutTypeClick('legs')}
          className="text-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
        >
          <div className="text-lg font-bold text-red-600">+{legsGrowth}%</div>
          <div className="text-xs text-gray-600">Legs Growth</div>
        </button>
      </div>
    </Card>
  );
}
