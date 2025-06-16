import { Card } from "@/components/ui/card";
import { Activity, Target, Calendar, Zap, ChevronLeft, ChevronRight, Edit3, Save, X, Edit, HelpCircle, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import MobileHeader from "@/components/MobileHeader";
import TrackingModal from "@/components/TrackingModal";
import ExerciseManager from "@/components/ExerciseManager";
import { useAppData } from "@/hooks/useAppData";

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
  { 
    day: "Monday", 
    workout: "Push Day - Chest & Triceps", 
    completed: true, 
    exercises: 4,
    exerciseList: ["Bench Press", "Incline DB Press", "Cable Flyes", "Tricep Pushdowns"]
  },
  { 
    day: "Tuesday", 
    workout: "Rest Day", 
    completed: true, 
    exercises: 0,
    exerciseList: []
  },
  { 
    day: "Wednesday", 
    workout: "Pull Day - Back & Biceps", 
    completed: true, 
    exercises: 5,
    exerciseList: ["Pull-ups", "Bent Over Rows", "Lat Pulldowns", "Face Pulls", "Bicep Curls"]
  },
  { 
    day: "Thursday", 
    workout: "Legs & Glutes", 
    completed: false, 
    exercises: 6,
    exerciseList: ["Squats", "Romanian Deadlifts", "Bulgarian Split Squats", "Leg Press", "Calf Raises", "Leg Curls"]
  },
  { 
    day: "Friday", 
    workout: "Rest Day", 
    completed: false, 
    exercises: 0,
    exerciseList: []
  },
  { 
    day: "Saturday", 
    workout: "Push Day - Shoulders", 
    completed: false, 
    exercises: 4,
    exerciseList: ["Overhead Press", "Lateral Raises", "Face Pulls", "Tricep Extensions"]
  },
  { 
    day: "Sunday", 
    workout: "Rest Day", 
    completed: false, 
    exercises: 0,
    exerciseList: []
  },
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

const goalOptions = [
  "Weight Loss",
  "Muscle Gain", 
  "Strength",
  "Endurance",
  "General Fitness",
  "Toning",
  "Athletic Performance"
];

export default function Workouts() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentWorkout, workoutStartTime, startWorkout, getDailyStats } = useAppData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [editingProgram, setEditingProgram] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [primaryGoal, setPrimaryGoal] = useState("Weight Loss");
  const [secondaryGoal, setSecondaryGoal] = useState("Strength");
  const [editingGoals, setEditingGoals] = useState(false);
  
  // Enhanced state for managing exercises with cleaner suggestions
  const [dayExercises, setDayExercises] = useState({
    monday: [
      { name: "Bench Press", sets: 4, restTime: "2-3min", lastWeight: "80kg/6", suggestedWeight: "82.5kg/6-8", suggestedExplanation: "80kg → 82.5kg (+5% for strength)" },
      { name: "Incline DB Press", sets: 3, restTime: "90s", lastWeight: "30kg/8", suggestedWeight: "31kg/8-10", suggestedExplanation: "30kg → 31kg (+2.5% for hypertrophy)" },
      { name: "Cable Flyes", sets: 3, restTime: "60s", lastWeight: "25kg/10", suggestedWeight: "25.5kg/8-10", suggestedExplanation: "25kg → 25.5kg (+2.5% for hypertrophy)" },
      { name: "Tricep Pushdowns", sets: 3, restTime: "60s", lastWeight: "40kg/12", suggestedWeight: "41kg/8-10", suggestedExplanation: "40kg → 41kg (+2.5% for hypertrophy)" },
    ],
    wednesday: [
      { name: "Pull-ups", sets: 4, restTime: "2min", lastWeight: "BW/8", suggestedWeight: "BW/7-9", suggestedExplanation: "Try for 1-2 extra reps" },
      { name: "Bent Over Rows", sets: 3, restTime: "2min", lastWeight: "70kg/8", suggestedWeight: "71.5kg/8-10", suggestedExplanation: "70kg → 71.5kg (+2.5% for hypertrophy)" },
      { name: "Lat Pulldowns", sets: 3, restTime: "90s", lastWeight: "65kg/10", suggestedWeight: "66.5kg/8-10", suggestedExplanation: "65kg → 66.5kg (+2.5% for hypertrophy)" },
      { name: "Face Pulls", sets: 3, restTime: "60s", lastWeight: "35kg/15", suggestedWeight: "36kg/8-10", suggestedExplanation: "35kg → 36kg (+2.5% for hypertrophy)" },
      { name: "Bicep Curls", sets: 3, restTime: "60s", lastWeight: "17.5kg/10", suggestedWeight: "18kg/8-10", suggestedExplanation: "17.5kg → 18kg (+2.5% for hypertrophy)" },
    ],
    thursday: [
      { name: "Squats", sets: 4, restTime: "3min", lastWeight: "100kg/6", suggestedWeight: "105kg/6-8", suggestedExplanation: "100kg → 105kg (+5% for strength)" },
      { name: "Romanian Deadlifts", sets: 3, restTime: "2min", lastWeight: "80kg/8", suggestedWeight: "82kg/8-10", suggestedExplanation: "80kg → 82kg (+2.5% for hypertrophy)" },
      { name: "Bulgarian Split Squats", sets: 3, restTime: "90s", lastWeight: "25kg/10", suggestedWeight: "25.5kg/8-10", suggestedExplanation: "25kg → 25.5kg (+2.5% for hypertrophy)" },
      { name: "Leg Press", sets: 3, restTime: "90s", lastWeight: "180kg/12", suggestedWeight: "184.5kg/8-10", suggestedExplanation: "180kg → 184.5kg (+2.5% for hypertrophy)" },
      { name: "Calf Raises", sets: 4, restTime: "60s", lastWeight: "60kg/15", suggestedWeight: "61.5kg/12-15", suggestedExplanation: "60kg → 61.5kg (+2.5% for hypertrophy)" },
      { name: "Leg Curls", sets: 3, restTime: "60s", lastWeight: "45kg/12", suggestedWeight: "46kg/8-10", suggestedExplanation: "45kg → 46kg (+2.5% for hypertrophy)" },
    ],
    saturday: [
      { name: "Overhead Press", sets: 4, restTime: "2-3min", lastWeight: "50kg/6", suggestedWeight: "52.5kg/6-8", suggestedExplanation: "50kg → 52.5kg (+5% for strength)" },
      { name: "Lateral Raises", sets: 3, restTime: "90s", lastWeight: "12.5kg/12", suggestedWeight: "13kg/8-10", suggestedExplanation: "12.5kg → 13kg (+2.5% for hypertrophy)" },
      { name: "Face Pulls", sets: 3, restTime: "60s", lastWeight: "35kg/15", suggestedWeight: "36kg/8-10", suggestedExplanation: "35kg → 36kg (+2.5% for hypertrophy)" },
      { name: "Tricep Extensions", sets: 3, restTime: "60s", lastWeight: "30kg/12", suggestedWeight: "31kg/8-10", suggestedExplanation: "30kg → 31kg (+2.5% for hypertrophy)" },
    ]
  });
  
  // Get day name for current date (e.g., "monday", "tuesday")
  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  };

  // Updated to use new exercise data structure
  const getWorkoutForDay = (day) => {
    const dayName = getDayName(day);
    return dayExercises[dayName] || [];
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

  const handleStartWorkoutClick = () => {
    if (currentWorkout) {
      setShowTrackingModal(true);
    } else {
      startWorkout(workoutName, todaysWorkout);
      setShowTrackingModal(true);
    }
  };

  // Convert today's workout to the format expected by TrackingModal
  const getPrefilledWorkout = () => {
    return todaysWorkout.map(exercise => ({
      name: exercise.name,
      sets: exercise.sets,
      suggestedWeight: exercise.suggestedWeight,
      restTime: exercise.restTime
    }));
  };

  // Get different body battery values based on the day
  const getBodyBatteryForDay = () => {
    return getDailyStats(currentDate.toISOString().split('T')[0]).bodyBattery;
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

  const handleEditProgram = () => {
    setEditingProgram(true);
    toast({
      title: "Edit Mode",
      description: "You can now edit your weekly program and exercises",
    });
  };

  const handleSaveProgram = () => {
    setEditingProgram(false);
    toast({
      title: "Program Saved",
      description: "Your weekly program and exercises have been updated",
    });
  };

  const handleCancelEdit = () => {
    setProgramData(weeklyProgram);
    setEditingProgram(false);
    toast({
      title: "Changes Cancelled",
      description: "Your program remains unchanged",
    });
  };

  const handleWorkoutChange = (index: number, newWorkout: string) => {
    const updatedProgram = [...programData];
    updatedProgram[index] = { ...updatedProgram[index], workout: newWorkout };
    setProgramData(updatedProgram);
  };

  const handleEditGoals = () => {
    setEditingGoals(true);
  };

  const handleSaveGoals = () => {
    setEditingGoals(false);
    toast({
      title: "Goals Updated",
      description: "Your fitness goals have been updated",
    });
  };

  const handleCancelGoalsEdit = () => {
    setEditingGoals(false);
  };

  // New function to handle exercise changes for specific days
  const handleDayExercisesChange = (dayKey: string, exercises: any[]) => {
    setDayExercises(prev => ({
      ...prev,
      [dayKey]: exercises
    }));
  };

  return (
    <>
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-800">Fitness Goals</h2>
              <div className="flex gap-2">
                {!editingGoals && (
                  <button
                    onClick={handleEditGoals}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                )}
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                  <HelpCircle size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-800">3/4</div>
                <div className="text-xs text-blue-600">Weekly Workouts</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                {editingGoals ? (
                  <select
                    value={primaryGoal}
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                    className="text-lg font-bold text-blue-800 bg-transparent text-center w-full outline-none"
                  >
                    {goalOptions.map(goal => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                ) : (
                  <div className="text-lg font-bold text-blue-800">{primaryGoal}</div>
                )}
                <div className="text-xs text-blue-600">Primary Goal</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                {editingGoals ? (
                  <select
                    value={secondaryGoal}
                    onChange={(e) => setSecondaryGoal(e.target.value)}
                    className="text-lg font-bold text-blue-800 bg-transparent text-center w-full outline-none"
                  >
                    {goalOptions.map(goal => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                ) : (
                  <div className="text-lg font-bold text-blue-800">{secondaryGoal}</div>
                )}
                <div className="text-xs text-blue-600">Secondary Goal</div>
              </div>
            </div>
            {editingGoals && (
              <div className="flex gap-2 mt-4 justify-center">
                <button
                  onClick={handleSaveGoals}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={handleCancelGoalsEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
          </Card>

          {/* Energy Status */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">Energy Status</h2>
              </div>
              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                <HelpCircle size={16} />
              </button>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-700">{getEnergyTip()}</div>
            </div>
          </Card>

          {/* Today's Workout */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-800">{workoutName}</h2>
              <div className="flex gap-2">
                {!isRestDay && (
                  <button 
                    onClick={handleStartWorkoutClick}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg shadow-sm transition-colors active:scale-95 ${
                      currentWorkout 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Play size={16} />
                    <span className="text-sm font-medium">
                      {currentWorkout ? 'Continue Workout' : 'Start Workout'}
                    </span>
                  </button>
                )}
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                  <HelpCircle size={16} />
                </button>
              </div>
            </div>
            
            {isRestDay ? (
              <div className="p-8 bg-blue-50 rounded-lg text-center">
                <h3 className="text-xl font-medium text-blue-800 mb-2">Rest Day</h3>
                <p className="text-blue-600">
                  Take time to recover today. Focus on stretching, mobility, and adequate nutrition.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-lg">
                  <table className="min-w-full bg-white border border-gray-200 text-sm">
                    <thead className="bg-blue-50 text-gray-600">
                      <tr>
                        <th className="px-4 py-3 text-left">Exercise</th>
                        <th className="px-4 py-3 text-center">Sets</th>
                        <th className="px-4 py-3 text-center">Last → Target</th>
                        <th className="px-4 py-3 text-center">Rest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todaysWorkout.map((item, i) => (
                        <tr key={i} className="border-t border-gray-200 hover:bg-blue-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="font-medium text-blue-800">{item.name}</div>
                          </td>
                          <td className="px-4 py-3 text-center text-blue-700">{item.sets}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="text-xs font-mono">
                              <span className="text-gray-600">{item.lastWeight}</span>
                              <span className="text-gray-400 mx-1">→</span>
                              <span className="text-green-700 font-medium">{item.suggestedWeight}</span>
                            </div>
                            <div className="text-xs text-green-600 mt-1">{item.suggestedExplanation}</div>
                          </td>
                          <td className="px-4 py-3 text-center text-xs text-gray-500">{item.restTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Show workout progress if active */}
                {currentWorkout && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-green-800">Workout in Progress</h3>
                      <span className="text-sm text-green-600">
                        {workoutStartTime && `${Math.floor((new Date().getTime() - workoutStartTime.getTime()) / 60000)} min`}
                      </span>
                    </div>
                    <div className="text-sm text-green-700">
                      Continue your workout by clicking "Continue Workout" above
                    </div>
                  </div>
                )}
                
                {editingProgram && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-800 mb-2">Manage Today's Exercises</h3>
                    <ExerciseManager
                      dayName={workoutName}
                      exercises={todaysWorkout}
                      onExercisesChange={(exercises) => handleDayExercisesChange(getDayName(currentDate), exercises)}
                      bodyBattery={getBodyBatteryForDay()}
                      isEditing={editingProgram}
                    />
                  </div>
                )}
              </>
            )}
          </Card>

          {/* Weekly Program */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">Weekly Program</h2>
              </div>
              <div className="flex gap-2">
                {!editingProgram ? (
                  <>
                    <button
                      onClick={handleEditProgram}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                      <HelpCircle size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSaveProgram}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              {programData.map((day, i) => {
                const dayKey = day.day.toLowerCase();
                const dayExerciseList = dayExercises[dayKey] || [];
                
                return (
                  <div key={i} className={`p-4 rounded-lg border-2 ${
                    day.completed ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{day.day}</div>
                        {editingProgram ? (
                          <input
                            type="text"
                            value={day.workout}
                            onChange={(e) => handleWorkoutChange(i, e.target.value)}
                            className="text-sm text-gray-600 bg-white border border-gray-300 rounded px-2 py-1 mt-1 w-full"
                          />
                        ) : (
                          <div className="text-sm text-gray-600">{day.workout}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {dayExerciseList.length > 0 && (
                          <span className="text-xs text-gray-500">{dayExerciseList.length} exercises</span>
                        )}
                        {day.completed && (
                          <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {dayExerciseList.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs text-gray-500 mb-2">Planned Exercises:</div>
                        <div className="flex flex-wrap gap-2">
                          {dayExerciseList.map((exercise, exerciseIndex) => (
                            <span
                              key={exerciseIndex}
                              className={`text-xs px-2 py-1 rounded-full ${
                                day.completed 
                                  ? 'bg-green-100 text-green-700 border border-green-200' 
                                  : 'bg-blue-100 text-blue-700 border border-blue-200'
                              }`}
                            >
                              {exercise.name} ({exercise.sets} sets)
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {editingProgram && dayExerciseList.length >= 0 && day.workout !== "Rest Day" && (
                      <ExerciseManager
                        dayName={day.workout}
                        exercises={dayExerciseList}
                        onExercisesChange={(exercises) => handleDayExercisesChange(dayKey, exercises)}
                        bodyBattery={85}
                        isEditing={editingProgram}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Workout Tips */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">Workout Tips</h2>
              </div>
              <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                <HelpCircle size={16} />
                Need more tips?
              </button>
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

      {showTrackingModal && (
        <TrackingModal 
          type="workout" 
          onClose={() => setShowTrackingModal(false)}
          prefilledWorkout={getPrefilledWorkout()}
        />
      )}
    </>
  );
}
