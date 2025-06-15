
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TrackingModalProps {
  type: "food" | "workout" | "weight";
  onClose: () => void;
}

export default function TrackingModal({ type, onClose }: TrackingModalProps) {
  const { toast } = useToast();
  const [weight, setWeight] = useState("");
  const [foodItems, setFoodItems] = useState([{ name: "", calories: "", protein: "" }]);
  const [workoutExercises, setWorkoutExercises] = useState([{ 
    name: "", 
    sets: [{ weight: "", reps: "" }] 
  }]);

  const handleWeightSubmit = () => {
    if (!weight) return;
    toast({
      title: "Weight Logged",
      description: `${weight} kg recorded for today`,
    });
    onClose();
  };

  const handleFoodSubmit = () => {
    const validItems = foodItems.filter(item => item.name && item.calories);
    if (validItems.length === 0) return;
    
    const totalCalories = validItems.reduce((sum, item) => sum + parseInt(item.calories || "0"), 0);
    const totalProtein = validItems.reduce((sum, item) => sum + parseInt(item.protein || "0"), 0);
    
    toast({
      title: "Food Logged",
      description: `${validItems.length} items logged: ${totalCalories} calories, ${totalProtein}g protein`,
    });
    onClose();
  };

  const handleWorkoutSubmit = () => {
    const validExercises = workoutExercises.filter(ex => ex.name && ex.sets.some(set => set.reps));
    if (validExercises.length === 0) return;
    
    const totalSets = validExercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    
    toast({
      title: "Workout Logged",
      description: `${validExercises.length} exercises, ${totalSets} sets completed`,
    });
    onClose();
  };

  const addFoodItem = () => {
    setFoodItems([...foodItems, { name: "", calories: "", protein: "" }]);
  };

  const removeFoodItem = (index: number) => {
    setFoodItems(foodItems.filter((_, i) => i !== index));
  };

  const updateFoodItem = (index: number, field: string, value: string) => {
    const updated = foodItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFoodItems(updated);
  };

  const addExercise = () => {
    setWorkoutExercises([...workoutExercises, { name: "", sets: [{ weight: "", reps: "" }] }]);
  };

  const removeExercise = (index: number) => {
    setWorkoutExercises(workoutExercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: string, value: string) => {
    const updated = workoutExercises.map((ex, i) => 
      i === index ? { ...ex, [field]: value } : ex
    );
    setWorkoutExercises(updated);
  };

  const addSet = (exerciseIndex: number) => {
    const updated = workoutExercises.map((ex, i) => 
      i === exerciseIndex ? { ...ex, sets: [...ex.sets, { weight: "", reps: "" }] } : ex
    );
    setWorkoutExercises(updated);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updated = workoutExercises.map((ex, i) => 
      i === exerciseIndex ? { 
        ...ex, 
        sets: ex.sets.filter((_, si) => si !== setIndex) 
      } : ex
    );
    setWorkoutExercises(updated);
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: string, value: string) => {
    const updated = workoutExercises.map((ex, i) => 
      i === exerciseIndex ? {
        ...ex,
        sets: ex.sets.map((set, si) => 
          si === setIndex ? { ...set, [field]: value } : set
        )
      } : ex
    );
    setWorkoutExercises(updated);
  };

  const getTitle = () => {
    switch (type) {
      case "food": return "Track Food";
      case "workout": return "Log Workout";
      case "weight": return "Log Weight";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{getTitle()}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {type === "weight" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="78.5"
                  className="w-full"
                />
              </div>
              <button
                onClick={handleWeightSubmit}
                className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Log Weight
              </button>
            </div>
          )}

          {type === "food" && (
            <div className="space-y-4">
              {foodItems.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Food Item {index + 1}</h3>
                    {foodItems.length > 1 && (
                      <button
                        onClick={() => removeFoodItem(index)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Minus size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Food Name</label>
                      <Input
                        value={item.name}
                        onChange={(e) => updateFoodItem(index, "name", e.target.value)}
                        placeholder="Chicken Breast"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Calories</label>
                      <Input
                        type="number"
                        value={item.calories}
                        onChange={(e) => updateFoodItem(index, "calories", e.target.value)}
                        placeholder="250"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Protein (g)</label>
                      <Input
                        type="number"
                        value={item.protein}
                        onChange={(e) => updateFoodItem(index, "protein", e.target.value)}
                        placeholder="25"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addFoodItem}
                className="w-full py-2 border-2 border-dashed border-green-300 text-green-600 rounded-lg hover:bg-green-50"
              >
                <Plus size={16} className="inline mr-2" />
                Add Food Item
              </button>
              <button
                onClick={handleFoodSubmit}
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Log Food
              </button>
            </div>
          )}

          {type === "workout" && (
            <div className="space-y-4">
              {workoutExercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Exercise {exerciseIndex + 1}</h3>
                    {workoutExercises.length > 1 && (
                      <button
                        onClick={() => removeExercise(exerciseIndex)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Minus size={16} />
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Exercise Name</label>
                    <Input
                      value={exercise.name}
                      onChange={(e) => updateExercise(exerciseIndex, "name", e.target.value)}
                      placeholder="Bench Press"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-medium">Sets</label>
                    {exercise.sets.map((set, setIndex) => (
                      <div key={setIndex} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-8">#{setIndex + 1}</span>
                        <Input
                          placeholder="Weight (kg)"
                          value={set.weight}
                          onChange={(e) => updateSet(exerciseIndex, setIndex, "weight", e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          placeholder="Reps"
                          value={set.reps}
                          onChange={(e) => updateSet(exerciseIndex, setIndex, "reps", e.target.value)}
                          className="flex-1"
                        />
                        {exercise.sets.length > 1 && (
                          <button
                            onClick={() => removeSet(exerciseIndex, setIndex)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Minus size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addSet(exerciseIndex)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Set
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addExercise}
                className="w-full py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                <Plus size={16} className="inline mr-2" />
                Add Exercise
              </button>
              <button
                onClick={handleWorkoutSubmit}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Log Workout
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
