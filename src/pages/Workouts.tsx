import { Card } from "@/components/ui/card";
import { Activity, Target, Calendar, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import MobileHeader from "@/components/MobileHeader";

const NAV_LINKS = [
  { label: "Dashboard", href: "/", active: false },
  { label: "Food", href: "/food", active: false },
  { label: "Workouts", href: "/workouts", active: true },
  { label: "Progress", href: "/progress", active: false },
  { label: "Rewards", href: "/rewards", active: false },
];

const weeklyGoals = {
  workoutsPerWeek: 4,
  currentWorkouts: 2,
  primaryGoal: "Weight Loss",
  secondaryGoal: "Strength"
};

const weeklyProgram = [
  { day: "Monday", workout: "Push Day - Chest & Triceps", completed: true, exercises: 4 },
  { day: "Tuesday", workout: "Rest Day", completed: true, exercises: 0 },
  { day: "Wednesday", workout: "Pull Day - Back & Biceps", completed: true, exercises: 5 },
  { day: "Thursday", workout: "Legs & Glutes", completed: false, exercises: 6 },
  { day: "Friday", workout: "Rest Day", completed: false, exercises: 0 },
  { day: "Saturday", workout: "Push Day - Shoulders", completed: false, exercises: 4 },
  { day: "Sunday", workout: "Rest Day", completed: false, exercises: 0 },
];

const workoutVariations = {
  monday: [
    { ex: "Bench Press", sets: 4, weightReps: "80kg/6, 75kg/7, 70kg/8, 65kg/9", restTime: "3min", notes: "" },
    { ex: "Incline DB Press", sets: 3, weightReps: "30kg/8, 27.5kg/9, 25kg/10", restTime: "2min", notes: "" },
    { ex: "Cable Flyes", sets: 3, weightReps: "25kg/10, 22.5kg/12, 20kg/11", restTime: "90s", notes: "" },
    { ex: "Tricep Pushdowns", sets: 3, weightReps: "40kg/12, 37.5kg/13, 35kg/15", restTime: "60s", notes: "" },
  ],
  wednesday: [
    { ex: "Pull-ups", sets: 4, weightReps: "BW/8, BW/7, BW/6, BW/6", restTime: "2min", notes: "" },
    { ex: "Bent Over Rows", sets: 3, weightReps: "70kg/8, 65kg/9, 60kg/10", restTime: "2min", notes: "" },
    { ex: "Lat Pulldowns", sets: 3, weightReps: "65kg/10, 60kg/12, 55kg/12", restTime: "90s", notes: "" },
    { ex: "Face Pulls", sets: 3, weightReps: "35kg/15, 30kg/15, 30kg/15", restTime: "60s", notes: "" },
    { ex: "Bicep Curls", sets: 3, weightReps: "17.5kg/10, 15kg/12, 12.5kg/15", restTime: "60s", notes: "" },
  ],
  thursday: [
    { ex: "Squats", sets: 4, weightReps: "100kg/6, 95kg/7, 90kg/8, 85kg/10", restTime: "3min", notes: "Focus on depth" },
    { ex: "Romanian Deadlifts", sets: 3, weightReps: "80kg/8, 75kg/9, 70kg/10", restTime: "2min", notes: "" },
    { ex: "Bulgarian Split Squats", sets: 3, weightReps: "25kg/10, 22.5kg/11, 20kg/12", restTime: "90s", notes: "Each leg" },
    { ex: "Leg Press", sets: 3, weightReps: "180kg/12, 170kg/13, 160kg/15", restTime: "90s", notes: "" },
    { ex: "Calf Raises", sets: 4, weightReps: "60kg/15, 55kg/16, 50kg/18, 45kg/20", restTime: "60s", notes: "" },
    { ex: "Leg Curls", sets: 3, weightReps: "45kg/12, 40kg/13, 35kg/15", restTime: "60s", notes: "" },
  ],
  saturday: [
    { ex: "Overhead Press", sets: 4, weightReps: "50kg/6, 45kg/8, 40kg/10, 35kg/12", restTime: "2-3min", notes: "" },
    { ex: "Lateral Raises", sets: 3, weightReps: "12.5kg/12, 10kg/15, 7.5kg/18", restTime: "90s", notes: "" },
    { ex: "Face Pulls", sets: 3, weightReps: "35kg/15, 32.5kg/15, 30kg/15", restTime: "60s", notes: "" },
    { ex: "Tricep Extensions", sets: 3, weightReps: "30kg/12, 25kg/15, 20kg/18", restTime: "60s", notes: "" },
  ]
};

const bodyBattery = 90;
const currentCarbs = 142;

export default function Workouts() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get day name for current date (e.g., "monday", "tuesday")
  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  };

  // Select workout based on day
  const getWorkoutForDay = (day) => {
    const dayName = getDayName(day);
    
    switch(dayName) {
      case 'monday': return workoutVariations.monday;
      case 'wednesday': return workoutVariations.wednesday;
      case 'thursday': return workoutVariations.thursday;
      case 'saturday': return workoutVariations.saturday;
      default: return [];
    }
  };
  
  // Get workout name based on day
  const getWorkoutName = (day) => {
    const dayName = getDayName(day);
    
    switch(dayName) {
      case 'monday': return "Push Day - Chest & Triceps";
      case 'wednesday': return "Pull Day - Back & Biceps";
      case 'thursday': return "Legs & Glutes";
      case 'saturday': return "Push Day - Shoulders";
      default: return "Rest Day";
    }
  };

  const todaysWorkout = getWorkoutForDay(currentDate);
  const workoutName = getWorkoutName(currentDate);
  const isRestDay = todaysWorkout.length === 0;

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
    }
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setCurrentDate(previousDay);
    toast({
      title: "Day Changed",
      description: `Viewing data for ${previousDay.toLocaleDateString()}`,
    });
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
    toast({
      title: "Day Changed",
      description: `Viewing data for ${nextDay.toLocaleDateString()}`,
    });
  };

  // Get different body battery values based on the day
  const getBodyBatteryForDay = () => {
    const day = getDayName(currentDate);
    const today = new Date().toDateString();
    const selectedDay = currentDate.toDateString();
    
    // Future dates have 100% battery
    if (new Date(selectedDay) > new Date(today)) {
      return 100;
    }
    
    // Past days have different values
    switch(day) {
      case 'monday': return 85;
      case 'tuesday': return 92;
      case 'wednesday': return 78;
      case 'thursday': return 90;
      case 'friday': return 95;
      case 'saturday': return 88;
      case 'sunday': return 98;
      default: return 90;
    }
  };

  // Get different carb values based on the day
  const getCarbsForDay = () => {
    const day = getDayName(currentDate);
    const today = new Date().toDateString();
    const selectedDay = currentDate.toDateString();
    
    // Future dates have 0 carbs
    if (new Date(selectedDay) > new Date(today)) {
      return 0;
    }
    
    // Past days have different values
    switch(day) {
      case 'monday': return 155;
      case 'tuesday': return 120;
      case 'wednesday': return 160;
      case 'thursday': return 142;
      case 'friday': return 130;
      case 'saturday': return 170;
      case 'sunday': return 110;
      default: return 142;
    }
  };

  const getEnergyTip = () => {
    const batteryLevel = getBodyBatteryForDay();
    const carbsLevel = getCarbsForDay();
    const isPast = currentDate < new Date();
    const isFuture = currentDate > new Date();
    
    if (isFuture) {
      return `This is a future workout. Plan ahead to ensure you have good energy levels for this ${workoutName === "Rest Day" ? "rest day" : "workout"}.`;
    }
    
    if (batteryLevel >= 80) {
      return `You're feeling great today (${batteryLevel}% body battery)! You've had ${carbsLevel}g carbs - perfect energy for a strong workout. Consider pushing your limits today.`;
    } else if (batteryLevel >= 60) {
      return `You're feeling decent today (${batteryLevel}% body battery). With ${carbsLevel}g carbs consumed, you should have good energy. Maybe adjust intensity based on how you feel during warm-up.`;
    } else {
      return `Your body battery is low (${batteryLevel}%). You've only had ${carbsLevel}g carbs today - consider having a banana 30 minutes before your workout for extra energy.`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col pb-20">
      <MobileHeader title="Workouts" />

      <div className="flex-1 px-4 py-4 space-y-6">
        {/* Date Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousDay}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          
          <h1 className="text-xl font-bold text-blue-800">
            {currentDate.toLocaleDateString(undefined, { 
              weekday: 'short',
              month: 'short', 
              day: 'numeric'
            })}
          </h1>
          
          <button
            onClick={handleNextDay}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>

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

        {/* Energy Status - Moved Higher */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={20} className="text-blue-600" />
            <h2 className="text-xl font-semibold text-blue-800">Energy Status</h2>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-700">{getEnergyTip()}</div>
          </div>
        </Card>

        {/* Today's Workout */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-blue-800">{workoutName}</h2>
            {!isRestDay && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Start Workout
              </button>
            )}
          </div>
          
          {isRestDay ? (
            <div className="p-8 bg-blue-50 rounded-lg text-center">
              <h3 className="text-xl font-medium text-blue-800 mb-2">Rest Day</h3>
              <p className="text-blue-600">
                Take time to recover today. Focus on stretching, mobility, and adequate nutrition.
              </p>
            </div>
          ) : (
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
          )}
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
      
      <BottomNavigation />
    </div>
  );
}
