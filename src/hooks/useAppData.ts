
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

interface WorkoutEntry {
  id: string;
  date: string;
  name: string;
  exercises: Array<{
    name: string;
    sets: Array<{
      weight: number;
      reps: number;
      completed: boolean;
    }>;
  }>;
  duration: number; // in minutes
  completed: boolean;
}

interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  change: number;
}

interface DailyStats {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  steps: number;
  workoutsCompleted: number;
  sleep: number;
  bodyBattery: number;
}

const DAILY_TARGETS = {
  calories: 2200,
  protein: 150,
  carbs: 250,
  fats: 80,
  steps: 10000,
  workouts: 1,
  sleep: 8
};

export const useAppData = () => {
  const { toast } = useToast();
  
  // Initialize with some sample data
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([
    {
      id: '1',
      name: 'Chicken Breast',
      calories: 231,
      protein: 43.5,
      carbs: 0,
      fats: 5,
      date: new Date().toISOString().split('T')[0],
      meal: 'lunch'
    },
    {
      id: '2',
      name: 'Greek Yogurt',
      calories: 130,
      protein: 20,
      carbs: 9,
      fats: 0,
      date: new Date().toISOString().split('T')[0],
      meal: 'breakfast'
    }
  ]);

  const [workoutEntries, setWorkoutEntries] = useState<WorkoutEntry[]>([
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      name: 'Push Day - Chest & Triceps',
      exercises: [
        {
          name: 'Bench Press',
          sets: [
            { weight: 80, reps: 6, completed: true },
            { weight: 75, reps: 7, completed: true },
            { weight: 70, reps: 8, completed: false },
            { weight: 65, reps: 9, completed: false }
          ]
        }
      ],
      duration: 0,
      completed: false
    }
  ]);

  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([
    { id: '1', date: new Date().toISOString().split('T')[0], weight: 78.2, change: -0.3 },
    { id: '2', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], weight: 78.5, change: -0.1 },
    { id: '3', date: new Date(Date.now() - 172800000).toISOString().split('T')[0], weight: 78.6, change: 0.2 },
  ]);

  const [currentWorkout, setCurrentWorkout] = useState<WorkoutEntry | null>(null);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);

  // Calculate daily stats for any given date
  const getDailyStats = (date: string): DailyStats => {
    const dayFoodEntries = foodEntries.filter(entry => entry.date === date);
    const dayWorkouts = workoutEntries.filter(entry => entry.date === date);
    
    const calories = dayFoodEntries.reduce((sum, entry) => sum + entry.calories, 0);
    const protein = dayFoodEntries.reduce((sum, entry) => sum + entry.protein, 0);
    const carbs = dayFoodEntries.reduce((sum, entry) => sum + entry.carbs, 0);
    const fats = dayFoodEntries.reduce((sum, entry) => sum + entry.fats, 0);
    const workoutsCompleted = dayWorkouts.filter(w => w.completed).length;

    // For demo purposes, simulate other metrics
    const isToday = date === new Date().toISOString().split('T')[0];
    const steps = isToday ? 8420 : 0;
    const sleep = isToday ? 6.5 : 0;
    const bodyBattery = isToday ? 75 : 100;

    return {
      date,
      calories,
      protein,
      carbs,
      fats,
      steps,
      workoutsCompleted,
      sleep,
      bodyBattery
    };
  };

  // Check if goals are met for credit system
  const getGoalStatus = (date: string) => {
    const stats = getDailyStats(date);
    return {
      calories: { hit: stats.calories >= DAILY_TARGETS.calories, credits: stats.calories >= DAILY_TARGETS.calories ? 1 : 0 },
      protein: { hit: stats.protein >= DAILY_TARGETS.protein, credits: stats.protein >= DAILY_TARGETS.protein ? 1 : 0 },
      workout: { hit: stats.workoutsCompleted >= DAILY_TARGETS.workouts, credits: stats.workoutsCompleted >= DAILY_TARGETS.workouts ? 1 : 0 },
      steps: { hit: stats.steps >= DAILY_TARGETS.steps, credits: stats.steps >= DAILY_TARGETS.steps ? 1 : 0 },
      sleep: { hit: stats.sleep >= DAILY_TARGETS.sleep, credits: stats.sleep >= DAILY_TARGETS.sleep ? 1 : 0 }
    };
  };

  // Food logging functions
  const logFood = (food: Omit<FoodEntry, 'id'>) => {
    const newEntry = { ...food, id: Date.now().toString() };
    setFoodEntries(prev => [...prev, newEntry]);
    toast({
      title: "Food Logged",
      description: `${food.name} added to ${food.meal}`,
    });
  };

  // Workout functions
  const startWorkout = (workoutName: string, exercises: any[]) => {
    const newWorkout: WorkoutEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      name: workoutName,
      exercises: exercises.map(ex => ({
        name: ex.name,
        sets: Array(ex.sets).fill(null).map(() => ({ weight: 0, reps: 0, completed: false }))
      })),
      duration: 0,
      completed: false
    };
    
    setCurrentWorkout(newWorkout);
    setWorkoutStartTime(new Date());
    toast({
      title: "Workout Started",
      description: workoutName,
    });
  };

  const completeWorkout = () => {
    if (currentWorkout && workoutStartTime) {
      const duration = Math.round((new Date().getTime() - workoutStartTime.getTime()) / 60000);
      const completedWorkout = { ...currentWorkout, duration, completed: true };
      
      setWorkoutEntries(prev => [...prev, completedWorkout]);
      setCurrentWorkout(null);
      setWorkoutStartTime(null);
      
      toast({
        title: "Workout Completed",
        description: `${completedWorkout.name} - ${duration} minutes`,
      });
    }
  };

  const logWeight = (weight: number) => {
    const today = new Date().toISOString().split('T')[0];
    const lastWeight = weightEntries.find(entry => entry.date !== today)?.weight || weight;
    const change = Number((weight - lastWeight).toFixed(1));
    
    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      date: today,
      weight,
      change
    };
    
    setWeightEntries(prev => [newEntry, ...prev.filter(entry => entry.date !== today)]);
    toast({
      title: "Weight Logged",
      description: `${weight} kg recorded`,
    });
  };

  return {
    // Data
    foodEntries,
    workoutEntries,
    weightEntries,
    currentWorkout,
    workoutStartTime,
    
    // Computed values
    getDailyStats,
    getGoalStatus,
    targets: DAILY_TARGETS,
    
    // Actions
    logFood,
    startWorkout,
    completeWorkout,
    logWeight,
    
    // Workout state
    setCurrentWorkout,
    setWorkoutStartTime
  };
};
