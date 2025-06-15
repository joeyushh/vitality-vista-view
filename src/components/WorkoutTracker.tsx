
import { Activity, Play, List, Clock, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TrackingModal from "./TrackingModal";

// This should sync with the exercise data from Workouts page
const todaysWorkout = [
  { 
    name: "Bench Press", 
    sets: 4, 
    lastWeight: "80kg/6", 
    suggestedWeight: "82.5kg/6-8",
    restTime: "2-3min", 
    completed: 0 
  },
  { 
    name: "Incline DB Press", 
    sets: 3, 
    lastWeight: "30kg/8", 
    suggestedWeight: "31kg/8-10",
    restTime: "90s", 
    completed: 0 
  },
  { 
    name: "Cable Flyes", 
    sets: 3, 
    lastWeight: "25kg/10", 
    suggestedWeight: "25.5kg/8-10",
    restTime: "60s", 
    completed: 0 
  },
  { 
    name: "Tricep Pushdowns", 
    sets: 3, 
    lastWeight: "40kg/12", 
    suggestedWeight: "41kg/8-10",
    restTime: "60s", 
    completed: 0 
  },
];

// Get today's day name for workout context
const getTodaysDayName = () => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
};

// Get next workout day and its exercises
const getNextWorkoutInfo = () => {
  const today = new Date();
  const dayName = getTodaysDayName();
  
  // Mock data for next workout (this would come from the workout plan)
  const workoutSchedule = {
    monday: { name: "Push Day - Chest & Triceps", exercises: todaysWorkout },
    tuesday: { name: "Rest Day", exercises: [] },
    wednesday: { name: "Pull Day - Back & Biceps", exercises: [
      { name: "Pull-ups", lastWeight: "BW/8", suggestedWeight: "BW/7-9" },
      { name: "Bent Over Rows", lastWeight: "70kg/8", suggestedWeight: "71.5kg/8-10" }
    ]},
    thursday: { name: "Legs & Glutes", exercises: [
      { name: "Squats", lastWeight: "100kg/6", suggestedWeight: "105kg/6-8" },
      { name: "Romanian Deadlifts", lastWeight: "80kg/8", suggestedWeight: "82kg/8-10" }
    ]},
    friday: { name: "Rest Day", exercises: [] },
    saturday: { name: "Push Day - Shoulders", exercises: [
      { name: "Overhead Press", lastWeight: "50kg/6", suggestedWeight: "52.5kg/6-8" }
    ]},
    sunday: { name: "Rest Day", exercises: [] }
  };
  
  return workoutSchedule[dayName] || { name: "Rest Day", exercises: [] };
};

const bodyBattery = 90;

const getBodyBatteryRecommendation = (bodyBattery: number, isRestDay: boolean, nextWorkout: any) => {
  if (isRestDay) {
    if (bodyBattery >= 90) {
      return { 
        percentage: 5, 
        description: `Excellent recovery! Tomorrow's ${nextWorkout.name} should focus on strength gains`,
        restDayAdvice: 'Perfect time for light stretching and meal prep for tomorrow\'s workout'
      };
    } else if (bodyBattery >= 80) {
      return { 
        percentage: 2.5, 
        description: `Good recovery. Tomorrow's ${nextWorkout.name} should be great for muscle building`,
        restDayAdvice: 'Consider a gentle walk and ensure you get quality sleep tonight'
      };
    } else if (bodyBattery >= 70) {
      return { 
        percentage: 0, 
        description: `Moderate recovery. Tomorrow's ${nextWorkout.name} should maintain current levels`,
        restDayAdvice: 'Focus on hydration, nutrition, and extra rest today'
      };
    } else {
      return { 
        percentage: -2.5, 
        description: `Low energy. Tomorrow's ${nextWorkout.name} should focus on recovery`,
        restDayAdvice: 'Prioritize sleep and consider postponing intense workouts'
      };
    }
  }
  
  if (bodyBattery >= 90) {
    return { percentage: 5, description: 'Excellent energy - push for strength gains' };
  } else if (bodyBattery >= 80) {
    return { percentage: 2.5, description: 'Good energy - ideal for muscle building' };
  } else if (bodyBattery >= 70) {
    return { percentage: 0, description: 'Moderate energy - maintain current levels' };
  } else {
    return { percentage: -2.5, description: 'Low energy - focus on recovery' };
  }
};

export default function WorkoutTracker() {
  const navigate = useNavigate();
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  
  const nextWorkout = getNextWorkoutInfo();
  const isRestDay = nextWorkout.exercises.length === 0;
  const totalSets = todaysWorkout.reduce((sum, w) => sum + w.sets, 0);
  const completedSets = todaysWorkout.reduce((sum, w) => sum + w.completed, 0);
  const recommendation = getBodyBatteryRecommendation(bodyBattery, isRestDay, nextWorkout);

  const handleWorkoutLogClick = () => {
    navigate("/workouts");
  };

  const handleStartWorkoutClick = () => {
    setShowTrackingModal(true);
  };

  if (isRestDay) {
    return (
      <>
        <Card className="p-4 shadow-lg animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-full">
              <Activity size={20} className="text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-green-700 flex-1">Rest Day</h2>
            <div className="flex gap-2">
              <button 
                onClick={handleWorkoutLogClick}
                className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg shadow-sm hover:bg-blue-200 transition-colors active:scale-95">
                <List size={16} />
                <span className="text-sm font-medium">Plan</span>
              </button>
            </div>
          </div>

          {/* Rest Day Info with Body Battery Summary */}
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium text-green-800">Recovery Day</h3>
              <div className="ml-auto flex items-center gap-1 text-xs text-green-600">
                <Clock size={12} />
                <span>Rest & Recover</span>
              </div>
            </div>
            
            {/* Body Battery Summary for Rest Day */}
            <div className="flex items-center justify-between mb-2 p-2 bg-green-100 rounded">
              <div>
                <span className="text-xs text-green-600">Body Battery: </span>
                <span className="text-sm font-medium text-green-800">{bodyBattery}%</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-green-600">{recommendation.description}</div>
                {nextWorkout.exercises.length > 0 && (
                  <div className="text-xs font-medium text-green-800">
                    {recommendation.percentage > 0 ? '+' : ''}{recommendation.percentage}% for next workout
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-xs text-green-600 mb-2">
              {recommendation.restDayAdvice}
            </div>
            
            {nextWorkout.exercises.length > 0 && (
              <div className="text-xs text-green-700">
                Next: {nextWorkout.name} with {nextWorkout.exercises.length} exercises planned
              </div>
            )}
          </div>

          {/* Next Workout Preview */}
          {nextWorkout.exercises.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-green-800 mb-2">Tomorrow's Workout Preview:</h4>
              {nextWorkout.exercises.slice(0, 3).map((exercise, i) => (
                <div key={i} className="bg-white border border-green-200 rounded-lg p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">{exercise.name}</span>
                    <div className="text-xs">
                      <span className="text-gray-500">Target: </span>
                      <span className="font-mono text-green-700">{exercise.suggestedWeight}</span>
                    </div>
                  </div>
                </div>
              ))}
              {nextWorkout.exercises.length > 3 && (
                <div className="text-xs text-center text-green-600">
                  +{nextWorkout.exercises.length - 3} more exercises
                </div>
              )}
            </div>
          )}

          {/* Rest Day Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">Rest</div>
              <div className="text-xs text-gray-600">Today</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{bodyBattery}%</div>
              <div className="text-xs text-gray-600">Recovery</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">Ready</div>
              <div className="text-xs text-gray-600">Tomorrow</div>
            </div>
          </div>

          {/* Help Button */}
          <div className="mt-4 flex justify-center">
            <button className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800 transition-colors">
              <HelpCircle size={14} />
              Need recovery tips?
            </button>
          </div>
        </Card>
      </>
    );
  }

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

        {/* Workout Info with Body Battery Summary */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-blue-800">Push Day - Chest & Triceps</h3>
            <div className="ml-auto flex items-center gap-1 text-xs text-blue-600">
              <Clock size={12} />
              <span>Ready to start</span>
            </div>
          </div>
          
          {/* Body Battery Summary */}
          <div className="flex items-center justify-between mb-2 p-2 bg-blue-100 rounded">
            <div>
              <span className="text-xs text-blue-600">Body Battery: </span>
              <span className="text-sm font-medium text-blue-800">{bodyBattery}%</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-blue-600">{recommendation.description}</div>
              <div className="text-xs font-medium text-blue-800">
                {recommendation.percentage > 0 ? '+' : ''}{recommendation.percentage}% weight increase
              </div>
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
        
        {/* Exercise List - Clean, read-only view for workout launching */}
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
              
              {/* Cleaner Weight Display */}
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs">
                  <span className="text-gray-500">Last: </span>
                  <span className="font-mono text-gray-700">{item.lastWeight}</span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">Target: </span>
                  <span className="font-mono text-green-700 font-medium">{item.suggestedWeight}</span>
                </div>
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

        {/* Help Button */}
        <div className="mt-4 flex justify-center">
          <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors">
            <HelpCircle size={14} />
            Need more tips?
          </button>
        </div>
      </Card>

      {showTrackingModal && (
        <TrackingModal 
          type="workout" 
          onClose={() => setShowTrackingModal(false)}
          prefilledWorkout={todaysWorkout}
        />
      )}
    </>
  );
}
