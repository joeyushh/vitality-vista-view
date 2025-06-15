
import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Clock, CheckCircle, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Exercise {
  name: string;
  sets: number;
  lastWeight: string;
  suggestedWeight: string;
  restTime: string;
  completed: number;
}

interface TrackingModalProps {
  type: 'food' | 'workout';
  onClose: () => void;
  prefilledWorkout?: Exercise[];
}

export default function TrackingModal({ type, onClose, prefilledWorkout }: TrackingModalProps) {
  const { toast } = useToast();
  const [workoutData, setWorkoutData] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [workoutStartTime] = useState(new Date());

  // Initialize with prefilled workout data
  useEffect(() => {
    if (prefilledWorkout && prefilledWorkout.length > 0) {
      setWorkoutData(prefilledWorkout.map(exercise => ({
        ...exercise,
        completed: 0
      })));
    }
  }, [prefilledWorkout]);

  // Rest timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsResting(false);
            toast({
              title: "Rest Complete!",
              description: "Time for your next set",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRestTimeInSeconds = (restTime: string) => {
    if (restTime.includes('min')) {
      const mins = parseInt(restTime.match(/(\d+)/)?.[1] || '2');
      return mins * 60;
    }
    return parseInt(restTime.match(/(\d+)/)?.[1] || '90');
  };

  const completeSet = () => {
    const currentExercise = workoutData[currentExerciseIndex];
    
    // Update completed sets
    const updatedWorkout = [...workoutData];
    updatedWorkout[currentExerciseIndex] = {
      ...currentExercise,
      completed: Math.min(currentExercise.completed + 1, currentExercise.sets)
    };
    setWorkoutData(updatedWorkout);

    // Check if exercise is complete
    if (currentSet >= currentExercise.sets) {
      // Move to next exercise
      if (currentExerciseIndex < workoutData.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        toast({
          title: "Exercise Complete!",
          description: `${currentExercise.name} finished. Moving to next exercise.`,
        });
      } else {
        // Workout complete
        toast({
          title: "Workout Complete!",
          description: "Great job! All exercises finished.",
        });
      }
    } else {
      // Start rest timer for next set
      const restSeconds = getRestTimeInSeconds(currentExercise.restTime);
      setRestTimer(restSeconds);
      setIsResting(true);
      setCurrentSet(currentSet + 1);
      
      toast({
        title: "Set Complete!",
        description: `Rest for ${currentExercise.restTime}, then continue.`,
      });
    }
  };

  const skipRest = () => {
    setIsResting(false);
    setRestTimer(0);
  };

  const totalSets = workoutData.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSets = workoutData.reduce((sum, ex) => sum + ex.completed, 0);
  const workoutProgress = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

  const currentExercise = workoutData[currentExerciseIndex];

  if (type === 'food') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-white rounded-lg shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Log Food</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600">Food tracking functionality coming soon...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-800">Workout Session</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* Progress Overview */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Overall Progress</span>
              <span className="text-sm text-blue-600">{completedSets}/{totalSets} sets</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${workoutProgress}%` }}
              />
            </div>
          </div>

          {/* Current Exercise */}
          {currentExercise && (
            <div className="mb-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-blue-800">{currentExercise.name}</h3>
                <p className="text-sm text-gray-600">
                  Set {currentSet} of {currentExercise.sets}
                </p>
              </div>

              {/* Weight Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="text-sm text-green-800">
                  <div className="font-medium mb-1">Target Weight</div>
                  <div className="font-mono text-lg">{currentExercise.suggestedWeight}</div>
                  <div className="text-xs text-green-600 mt-1">
                    Last session: {currentExercise.lastWeight}
                  </div>
                </div>
              </div>

              {/* Rest Timer */}
              {isResting && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock size={20} className="text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Rest Time</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    {formatTime(restTimer)}
                  </div>
                  <button
                    onClick={skipRest}
                    className="text-sm text-orange-600 hover:text-orange-800 underline"
                  >
                    Skip Rest
                  </button>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={completeSet}
                disabled={isResting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  isResting 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
                }`}
              >
                {isResting ? 'Resting...' : 
                 currentSet > currentExercise.sets ? 'Exercise Complete' : 
                 'Complete Set'}
              </button>
            </div>
          )}

          {/* Exercise List */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Today's Exercises</h4>
            {workoutData.map((exercise, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border-2 transition-colors ${
                  index === currentExerciseIndex 
                    ? 'border-blue-300 bg-blue-50' 
                    : exercise.completed >= exercise.sets
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-800">{exercise.name}</div>
                    <div className="text-xs text-gray-500">
                      {exercise.completed}/{exercise.sets} sets • {exercise.restTime}
                    </div>
                  </div>
                  {exercise.completed >= exercise.sets && (
                    <CheckCircle size={16} className="text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Workout Summary */}
          <div className="mt-6 pt-4 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600">{completedSets}</div>
                <div className="text-xs text-gray-600">Sets Done</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">
                  {Math.round((Date.now() - workoutStartTime.getTime()) / 60000)}m
                </div>
                <div className="text-xs text-gray-600">Duration</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">
                  {Math.round(workoutProgress)}%
                </div>
                <div className="text-xs text-gray-600">Complete</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
