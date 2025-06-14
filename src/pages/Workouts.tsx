
import { Card } from "@/components/ui/card";
import { Dumbbell, Play, Calendar, Edit, Clock, Target, ChevronRight, MessageCircle } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import MobileHeader from "@/components/MobileHeader";
import DateNavigation from "@/components/DateNavigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const workoutProgram = [
  {
    day: "Monday",
    workout: "Full Body Strength",
    time: "6:00 PM",
    exercises: ["Squats", "Bench Press", "Rows", "Overhead Press", "Deadlifts"],
    duration: "60 mins",
    sets: 3,
    reps: "8-12",
    completed: true,
  },
  {
    day: "Tuesday",
    workout: "Cardio & Abs",
    time: "6:30 PM",
    exercises: ["Running", "Cycling", "Crunches", "Plank", "Leg Raises"],
    duration: "45 mins",
    sets: 3,
    reps: "15-20",
    completed: true,
  },
  {
    day: "Wednesday",
    workout: "Upper Body Hypertrophy",
    time: "6:00 PM",
    exercises: ["Incline Press", "Pull-ups", "Dips", "Lateral Raises", "Bicep Curls"],
    duration: "60 mins",
    sets: 4,
    reps: "10-15",
    completed: true,
  },
  {
    day: "Thursday",
    workout: "Rest or Active Recovery",
    time: "Optional",
    exercises: ["Yoga", "Stretching", "Light Walk"],
    duration: "30 mins",
    sets: 1,
    reps: "N/A",
    completed: false,
  },
  {
    day: "Friday",
    workout: "Lower Body Focus",
    time: "6:00 PM",
    exercises: ["Lunges", "Hamstring Curls", "Calf Raises", "Glute Bridges", "Leg Extensions"],
    duration: "60 mins",
    sets: 3,
    reps: "12-15",
    completed: false,
  },
  {
    day: "Saturday",
    workout: "Full Body Conditioning",
    time: "10:00 AM",
    exercises: ["Burpees", "Mountain Climbers", "Kettlebell Swings", "Box Jumps", "Push-ups"],
    duration: "45 mins",
    sets: 3,
    reps: "15-20",
    completed: false,
  },
  {
    day: "Sunday",
    workout: "Rest Day",
    time: "N/A",
    exercises: ["Total Rest"],
    duration: "N/A",
    sets: 0,
    reps: "N/A",
    completed: false,
  },
];

const fitnessGoals = [
  {
    title: "Strength",
    description: "Increase your overall strength and power.",
    icon: Dumbbell,
    progress: 75,
  },
  {
    title: "Weekly Workouts",
    description: "Complete your weekly workout schedule.",
    icon: Calendar,
    progress: Math.round((workoutProgram.filter(w => w.completed).length / workoutProgram.length) * 100),
    completed: workoutProgram.filter(w => w.completed).length,
    total: workoutProgram.length,
  },
  {
    title: "Endurance",
    description: "Improve your cardiovascular endurance.",
    icon: Play,
    progress: 40,
  },
];

const energyLevels = [
  { time: "8:00 AM", level: 6 },
  { time: "12:00 PM", level: 8 },
  { time: "4:00 PM", level: 9 },
  { time: "8:00 PM", level: 5 },
];

export default function Workouts() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { toast } = useToast();

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getWorkoutForDay = (date) => {
    const dayName = getDayName(date);
    return workoutProgram.find(workout => workout.day === dayName) || {
      day: dayName,
      workout: "No workout scheduled",
      time: "N/A",
      exercises: [],
      duration: "N/A",
      sets: 0,
      reps: "N/A",
    };
  };

  const handleEditProgrammeClick = () => {
    toast({
      title: "Edit Programme",
      description: "Programme editing functionality would be available here",
    });
    console.log("Opening programme editor...");
  };

  const handleTipsClick = () => {
    toast({
      title: "AI Tips Assistant",
      description: "AI agent would be activated here to provide personalized workout tips",
    });
    console.log("Opening AI tips assistant...");
  };

  const workout = getWorkoutForDay(currentDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex flex-col pb-20">
      <MobileHeader title="Workouts" />

      <div className="flex-1 px-4 py-4 space-y-6">
        {/* Date Navigation */}
        <DateNavigation 
          currentDate={currentDate} 
          onDateChange={setCurrentDate}
        />

        {/* Fitness Goals */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-orange-800 mb-4">Fitness Goals</h2>
          <div className="space-y-4">
            {fitnessGoals.map((goal, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <goal.icon className="text-orange-600" size={20} />
                  <div>
                    <div className="font-medium text-orange-800">{goal.title}</div>
                    <div className="text-sm text-gray-500">{goal.description}</div>
                  </div>
                </div>
                <div className="text-sm text-orange-600">
                  {goal.title === "Weekly Workouts" ? `${goal.completed}/${goal.total}` : `${goal.progress}%`}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Energy Status */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-orange-800 mb-4">Energy Levels</h2>
          <div className="flex items-center justify-between">
            {energyLevels.map((level, i) => (
              <div key={i} className="text-center">
                <div className="text-sm text-gray-500">{level.time}</div>
                <div className="text-xl font-bold text-orange-800">{level.level}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Programme */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-orange-800">Weekly Programme</h2>
            <button 
              onClick={handleEditProgrammeClick}
              className="flex items-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              <Edit size={16} />
              Edit Programme
            </button>
          </div>
          <div className="space-y-3">
            {workoutProgram.map((day, i) => (
              <div key={i} className={`p-3 rounded-lg border ${day.completed ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-orange-800">{day.day}</div>
                  <div className="flex items-center gap-2">
                    {day.completed && <span className="text-green-600 text-sm">✓</span>}
                    <span className="text-xs text-gray-500">{day.time}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-700 mb-1">{day.workout}</div>
                <div className="text-xs text-gray-600">{day.duration} | {day.sets} sets | {day.reps} reps</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Today's Workout */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-orange-800">Today's Workout</h2>
            <Edit className="text-orange-600 cursor-pointer" size={18} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Dumbbell className="text-orange-600" size={18} />
              <h3 className="text-lg font-semibold text-orange-800">{workout.workout}</h3>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="text-orange-600" size={16} />
              <span>{workout.time} | {workout.duration}</span>
            </div>
            <div className="text-sm text-gray-600">
              <div className="font-medium mb-1">Exercises:</div>
              <ul className="list-disc pl-5">
                {workout.exercises.map((exercise, i) => (
                  <li key={i}>{exercise}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>Sets: {workout.sets}</div>
              <div>Reps: {workout.reps}</div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <Play className="text-orange-600" size={16} />
              Start Workout
              <ChevronRight className="text-orange-600" size={16} />
            </button>
          </div>
        </Card>

        {/* Workout Tips */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-orange-600" />
              <h2 className="text-xl font-semibold text-orange-800">Workout Tips</h2>
            </div>
            <button 
              onClick={handleTipsClick}
              className="flex items-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              <MessageCircle size={16} />
              Want more tips?
            </button>
          </div>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-800 mb-1">🏋️ Progressive Overload</div>
              <div>Gradually increase weight, reps, or sets each week for continuous gains.</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-800 mb-1">⏱️ Rest Between Sets</div>
              <div>2-3 minutes for strength, 30-90 seconds for endurance training.</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-800 mb-1">🔥 Warm-up Properly</div>
              <div>5-10 minutes of light cardio and dynamic stretching before lifting.</div>
            </div>
          </div>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
}
