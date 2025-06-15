import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Exercise {
  name: string;
  sets: number;
  restTime: string;
  lastWeight: string;
  suggestedWeight: string;
  suggestedExplanation?: string;
}

interface ExerciseManagerProps {
  dayName: string;
  exercises: Exercise[];
  onExercisesChange: (exercises: Exercise[]) => void;
  bodyBattery: number;
  isEditing: boolean;
}

const commonExercises = {
  push: [
    'Bench Press', 'Incline DB Press', 'Overhead Press', 'Dips', 'Push-ups',
    'Cable Flyes', 'Tricep Pushdowns', 'Lateral Raises', 'Tricep Extensions'
  ],
  pull: [
    'Pull-ups', 'Bent Over Rows', 'Lat Pulldowns', 'Face Pulls', 'Bicep Curls',
    'Cable Rows', 'Shrugs', 'Hammer Curls', 'Reverse Flyes'
  ],
  legs: [
    'Squats', 'Romanian Deadlifts', 'Bulgarian Split Squats', 'Leg Press',
    'Calf Raises', 'Leg Curls', 'Lunges', 'Hip Thrusts', 'Leg Extensions'
  ]
};

const defaultRestTimes = {
  compound: '2-3min',
  isolation: '60-90s',
  cardio: '30-60s'
};

export default function ExerciseManager({ 
  dayName, 
  exercises, 
  onExercisesChange, 
  bodyBattery,
  isEditing 
}: ExerciseManagerProps) {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: '',
    sets: 3,
    restTime: '90s',
    lastWeight: '',
    suggestedWeight: '',
    suggestedExplanation: ''
  });

  const getWorkoutType = (dayName: string) => {
    const day = dayName.toLowerCase();
    if (day.includes('push') || day.includes('chest') || day.includes('tricep') || day.includes('shoulder')) return 'push';
    if (day.includes('pull') || day.includes('back') || day.includes('bicep')) return 'pull';
    if (day.includes('leg') || day.includes('glute')) return 'legs';
    return 'push';
  };

  const calculateSuggestedWeight = (lastWeight: string, bodyBattery: number) => {
    if (!lastWeight) return { weight: '', explanation: '' };
    
    // Parse different weight formats
    const kgMatch = lastWeight.match(/(\d+(?:\.\d+)?)kg(?:\/(\d+))?/);
    const lbMatch = lastWeight.match(/(\d+(?:\.\d+)?)lb(?:\/(\d+))?/);
    const bwMatch = lastWeight.match(/BW(?:\/(\d+))?/);
    
    let weight = 0;
    let reps = 0;
    let unit = 'kg';
    
    if (kgMatch) {
      weight = parseFloat(kgMatch[1]);
      reps = parseInt(kgMatch[2]) || 10;
      unit = 'kg';
    } else if (lbMatch) {
      weight = parseFloat(lbMatch[1]);
      reps = parseInt(lbMatch[2]) || 10;
      unit = 'lb';
    } else if (bwMatch) {
      reps = parseInt(bwMatch[1]) || 8;
      return { 
        weight: `BW/${Math.max(reps - 1, 6)}-${reps + 1}`, 
        explanation: `Body battery: ${bodyBattery}%. ${bodyBattery >= 80 ? 'Try for 1-2 extra reps' : bodyBattery >= 70 ? 'Maintain rep range' : 'Focus on form, slightly fewer reps'}.`
      };
    } else {
      return { weight: lastWeight, explanation: 'Enter weight in format: 60kg/10 or 60lb/10' };
    }
    
    let percentageIncrease = 0;
    let repAdjustment = '';
    let explanation = '';
    
    if (bodyBattery >= 90) {
      percentageIncrease = 0.05; // 5% increase
      repAdjustment = '6-8';
      explanation = `Body battery: ${bodyBattery}% (Excellent). 5% weight increase for strength focus.`;
    } else if (bodyBattery >= 80) {
      percentageIncrease = 0.025; // 2.5% increase
      repAdjustment = '8-10';
      explanation = `Body battery: ${bodyBattery}% (Good). 2.5% weight increase for hypertrophy.`;
    } else if (bodyBattery >= 70) {
      percentageIncrease = 0; // No increase
      repAdjustment = '8-12';
      explanation = `Body battery: ${bodyBattery}% (Moderate). Maintain weight, focus on rep quality.`;
    } else {
      percentageIncrease = -0.025; // 2.5% decrease
      repAdjustment = '10-12';
      explanation = `Body battery: ${bodyBattery}% (Low). 2.5% weight decrease, higher reps for recovery.`;
    }
    
    const newWeight = weight * (1 + percentageIncrease);
    const roundedWeight = unit === 'kg' ? Math.round(newWeight * 2) / 2 : Math.round(newWeight * 4) / 4; // Round to nearest 0.5kg or 0.25lb
    
    const weightChange = percentageIncrease !== 0 ? 
      `${percentageIncrease > 0 ? '+' : ''}${(percentageIncrease * 100).toFixed(1)}%` : 
      'No change';
    
    return {
      weight: `${roundedWeight}${unit}/${repAdjustment}`,
      explanation: `${explanation} Weight change: ${weightChange} (${weight}${unit} → ${roundedWeight}${unit}).`
    };
  };

  const addExercise = () => {
    if (!newExercise.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter an exercise name",
        variant: "destructive"
      });
      return;
    }

    const { weight: suggestedWeight, explanation } = calculateSuggestedWeight(newExercise.lastWeight, bodyBattery);
    
    const exerciseToAdd = {
      ...newExercise,
      suggestedWeight,
      suggestedExplanation: explanation
    };

    onExercisesChange([...exercises, exerciseToAdd]);
    
    setNewExercise({
      name: '',
      sets: 3,
      restTime: '90s',
      lastWeight: '',
      suggestedWeight: '',
      suggestedExplanation: ''
    });
    
    setShowAddForm(false);
    
    toast({
      title: "Exercise Added",
      description: `${exerciseToAdd.name} has been added to your workout`,
    });
  };

  const removeExercise = (index: number) => {
    const exerciseName = exercises[index].name;
    onExercisesChange(exercises.filter((_, i) => i !== index));
    
    toast({
      title: "Exercise Removed",
      description: `${exerciseName} has been removed from your workout`,
    });
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string | number) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    
    // Recalculate suggested weight if last weight changes
    if (field === 'lastWeight') {
      const { weight, explanation } = calculateSuggestedWeight(value as string, bodyBattery);
      updatedExercises[index].suggestedWeight = weight;
      updatedExercises[index].suggestedExplanation = explanation;
    }
    
    onExercisesChange(updatedExercises);
  };

  const workoutType = getWorkoutType(dayName);
  const suggestedExercises = commonExercises[workoutType] || commonExercises.push;

  if (!isEditing) {
    return null;
  }

  return (
    <div className="mt-4 space-y-3">
      {exercises.map((exercise, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <input
              type="text"
              value={exercise.name}
              onChange={(e) => updateExercise(index, 'name', e.target.value)}
              className="font-medium text-blue-800 bg-transparent border-b border-transparent hover:border-blue-300 focus:border-blue-500 outline-none flex-1"
            />
            <button
              onClick={() => removeExercise(index)}
              className="p-1 text-red-500 hover:bg-red-50 rounded"
            >
              <Trash2 size={14} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="text-xs text-gray-500">Sets</label>
              <input
                type="number"
                value={exercise.sets}
                onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 1)}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                min="1"
                max="10"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Rest Time</label>
              <select
                value={exercise.restTime}
                onChange={(e) => updateExercise(index, 'restTime', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="30s">30 seconds</option>
                <option value="60s">1 minute</option>
                <option value="90s">90 seconds</option>
                <option value="2min">2 minutes</option>
                <option value="2-3min">2-3 minutes</option>
                <option value="3min">3 minutes</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2 mb-2">
            <div>
              <label className="text-xs text-gray-500">Last Performance</label>
              <input
                type="text"
                value={exercise.lastWeight}
                onChange={(e) => updateExercise(index, 'lastWeight', e.target.value)}
                placeholder="e.g., 60kg/10, 130lb/8, BW/12"
                className="w-full text-sm border border-gray-300 rounded px-2 py-1 font-mono"
              />
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded p-2">
            <div className="text-xs text-gray-500 mb-1">Suggested This Session</div>
            <div className="text-sm font-mono text-green-700 font-medium mb-1">
              {exercise.suggestedWeight || 'Enter last weight for suggestion'}
            </div>
            {exercise.suggestedExplanation && (
              <div className="text-xs text-green-600">
                {exercise.suggestedExplanation}
              </div>
            )}
          </div>
        </div>
      ))}

      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 w-full p-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Plus size={16} />
          Add Exercise
        </button>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Exercise Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newExercise.name}
                onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                placeholder="Enter exercise name"
                className="flex-1 text-sm border border-gray-300 rounded px-2 py-1"
              />
              <select
                value={newExercise.name}
                onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="">Quick Select</option>
                {suggestedExercises.map(ex => (
                  <option key={ex} value={ex}>{ex}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div>
              <label className="text-xs text-gray-500">Sets</label>
              <input
                type="number"
                value={newExercise.sets}
                onChange={(e) => setNewExercise({...newExercise, sets: parseInt(e.target.value) || 1})}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                min="1"
                max="10"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Rest Time</label>
              <select
                value={newExercise.restTime}
                onChange={(e) => setNewExercise({...newExercise, restTime: e.target.value})}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="30s">30s</option>
                <option value="60s">1min</option>
                <option value="90s">90s</option>
                <option value="2min">2min</option>
                <option value="2-3min">2-3min</option>
                <option value="3min">3min</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500">Last Weight</label>
              <input
                type="text"
                value={newExercise.lastWeight}
                onChange={(e) => setNewExercise({...newExercise, lastWeight: e.target.value})}
                placeholder="60kg/10"
                className="w-full text-sm border border-gray-300 rounded px-2 py-1 font-mono"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={addExercise}
              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save size={14} />
              Add
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
