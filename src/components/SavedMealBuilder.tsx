
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Save, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FoodItem {
  id: string;
  name: string;
  brand: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  servingSize?: string;
}

interface SelectedFood extends FoodItem {
  amount: number;
  unit: string;
}

interface SavedMealBuilderProps {
  selectedFoods: SelectedFood[];
  onSave: (mealName: string, foods: SelectedFood[]) => void;
  onClose: () => void;
  onRemoveFood: (index: number) => void;
  onUpdateAmount: (index: number, amount: number, unit: string) => void;
}

export default function SavedMealBuilder({ 
  selectedFoods, 
  onSave, 
  onClose, 
  onRemoveFood, 
  onUpdateAmount 
}: SavedMealBuilderProps) {
  const { toast } = useToast();
  const [mealName, setMealName] = useState("");

  const calculateTotalNutrition = () => {
    return selectedFoods.reduce((total, food) => {
      let multiplier = 1;
      
      if (food.unit === "g") {
        multiplier = food.amount / 100;
      } else if (food.unit === "oz") {
        multiplier = (food.amount * 28.35) / 100;
      } else if (food.unit === "serving" && food.servingSize) {
        const gramMatch = food.servingSize.match(/(\d+)g/);
        if (gramMatch) {
          multiplier = (food.amount * parseInt(gramMatch[1])) / 100;
        }
      }

      return {
        calories: total.calories + (food.caloriesPer100g * multiplier),
        protein: total.protein + (food.proteinPer100g * multiplier),
        carbs: total.carbs + (food.carbsPer100g * multiplier),
        fat: total.fat + (food.fatPer100g * multiplier),
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const totalNutrition = calculateTotalNutrition();

  const handleSave = () => {
    if (!mealName.trim()) {
      toast({
        title: "Meal Name Required",
        description: "Please enter a name for your saved meal",
        variant: "destructive",
      });
      return;
    }

    if (selectedFoods.length === 0) {
      toast({
        title: "No Foods Selected",
        description: "Please add at least one food item to save the meal",
        variant: "destructive",
      });
      return;
    }

    onSave(mealName, selectedFoods);
    toast({
      title: "Meal Saved",
      description: `"${mealName}" has been saved with ${selectedFoods.length} ingredients`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Build Saved Meal</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* Meal Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Meal Name</label>
            <Input
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="e.g., My Protein Smoothie, Chicken Salad Bowl"
              className="w-full"
            />
          </div>

          {/* Selected Foods List */}
          <div className="space-y-4 mb-6">
            <h3 className="font-medium">Ingredients ({selectedFoods.length})</h3>
            {selectedFoods.map((food, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-green-800">{food.name}</div>
                    <div className="text-sm text-green-600">{food.brand}</div>
                  </div>
                  <button
                    onClick={() => onRemoveFood(index)}
                    className="p-1 hover:bg-green-200 rounded-full text-green-700"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    step="0.1"
                    value={food.amount}
                    onChange={(e) => onUpdateAmount(index, parseFloat(e.target.value) || 0, food.unit)}
                    className="w-20"
                  />
                  <select
                    value={food.unit}
                    onChange={(e) => onUpdateAmount(index, food.amount, e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="g">g</option>
                    <option value="oz">oz</option>
                    {food.servingSize && (
                      <option value="serving">serving</option>
                    )}
                  </select>
                </div>
              </div>
            ))}
            
            {selectedFoods.length === 0 && (
              <div className="text-center p-8 text-gray-500">
                <p>No ingredients added yet</p>
                <p className="text-sm mt-2">Go back to search and select foods to build your meal</p>
              </div>
            )}
          </div>

          {/* Total Nutrition */}
          {selectedFoods.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg mb-6">
              <h4 className="font-medium text-blue-800 mb-3">Total Nutrition</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{Math.round(totalNutrition.calories)}</div>
                  <div className="text-xs text-gray-600">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">{Math.round(totalNutrition.protein * 10) / 10}g</div>
                  <div className="text-xs text-gray-600">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-orange-600">{Math.round(totalNutrition.carbs * 10) / 10}g</div>
                  <div className="text-xs text-gray-600">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">{Math.round(totalNutrition.fat * 10) / 10}g</div>
                  <div className="text-xs text-gray-600">Fat</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Back to Search
            </button>
            <button
              onClick={handleSave}
              disabled={!mealName.trim() || selectedFoods.length === 0}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Save size={16} className="inline mr-2" />
              Save Meal
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
