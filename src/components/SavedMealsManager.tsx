
import { Card } from "@/components/ui/card";
import { X, Plus, Utensils, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SavedMeal {
  id: string;
  name: string;
  foods: Array<{
    id: string;
    name: string;
    brand: string;
    amount: number;
    unit: string;
    caloriesPer100g: number;
    proteinPer100g: number;
    carbsPer100g: number;
    fatPer100g: number;
  }>;
  totalNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface SavedMealsManagerProps {
  onClose: () => void;
  onLogMeal: (meal: SavedMeal, mealCategory: string) => void;
}

const defaultSavedMeals: SavedMeal[] = [
  {
    id: "1",
    name: "Protein Smoothie",
    foods: [
      { id: "1", name: "Protein Powder", brand: "Optimum", amount: 30, unit: "g", caloriesPer100g: 400, proteinPer100g: 80, carbsPer100g: 5, fatPer100g: 5 },
      { id: "2", name: "Banana", brand: "Fresh", amount: 118, unit: "g", caloriesPer100g: 89, proteinPer100g: 1.1, carbsPer100g: 23, fatPer100g: 0.3 }
    ],
    totalNutrition: { calories: 225, protein: 25.3, carbs: 32.1, fat: 1.9 }
  },
  {
    id: "2", 
    name: "Chicken Rice Bowl",
    foods: [
      { id: "1", name: "Chicken Breast", brand: "Generic", amount: 150, unit: "g", caloriesPer100g: 165, proteinPer100g: 31, carbsPer100g: 0, fatPer100g: 3.6 },
      { id: "4", name: "Brown Rice", brand: "Generic", amount: 80, unit: "g", caloriesPer100g: 370, proteinPer100g: 7.9, carbsPer100g: 77, fatPer100g: 2.9 }
    ],
    totalNutrition: { calories: 544, protein: 52.8, carbs: 61.6, fat: 7.7 }
  }
];

const mealCategories = ["Breakfast", "Lunch", "Dinner", "Snack"];

export default function SavedMealsManager({ onClose, onLogMeal }: SavedMealsManagerProps) {
  const { toast } = useToast();
  const [savedMeals] = useState<SavedMeal[]>(defaultSavedMeals);
  const [selectedMeal, setSelectedMeal] = useState<SavedMeal | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");

  const handleLogMeal = () => {
    if (!selectedMeal) return;
    
    onLogMeal(selectedMeal, selectedCategory);
    toast({
      title: "Meal Logged",
      description: `${selectedMeal.name} added to ${selectedCategory}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Saved Meals</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {!selectedMeal ? (
            // Meal Selection View
            <div className="space-y-4">
              {savedMeals.map((meal) => (
                <button
                  key={meal.id}
                  onClick={() => setSelectedMeal(meal)}
                  className="w-full p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-green-800 mb-1">{meal.name}</div>
                      <div className="text-sm text-green-600 mb-2">
                        {meal.foods.length} ingredient{meal.foods.length !== 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-gray-500">
                        {meal.foods.map(food => food.name).join(', ')}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="font-semibold">{Math.round(meal.totalNutrition.calories)} cal</div>
                      <div className="text-xs">
                        P: {Math.round(meal.totalNutrition.protein)}g | 
                        C: {Math.round(meal.totalNutrition.carbs)}g | 
                        F: {Math.round(meal.totalNutrition.fat)}g
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              
              {savedMeals.length === 0 && (
                <div className="text-center p-8 text-gray-500">
                  <Utensils size={48} className="mx-auto text-gray-400 mb-4" />
                  <p>No saved meals yet</p>
                  <p className="text-sm mt-2">Create meals while searching for food</p>
                </div>
              )}
            </div>
          ) : (
            // Meal Details & Logging View
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedMeal(null)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  ← Back to meals
                </button>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800 text-lg">{selectedMeal.name}</h3>
                <p className="text-sm text-green-600">{selectedMeal.foods.length} ingredients</p>
              </div>

              {/* Ingredients List */}
              <div>
                <h4 className="font-medium mb-3">Ingredients</h4>
                <div className="space-y-2">
                  {selectedMeal.foods.map((food, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{food.name}</div>
                          <div className="text-sm text-gray-600">{food.brand}</div>
                        </div>
                        <div className="text-sm text-gray-700">
                          {food.amount}{food.unit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meal Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Log to Meal Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {mealCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Total Nutrition */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">Total Nutrition</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{Math.round(selectedMeal.totalNutrition.calories)}</div>
                    <div className="text-xs text-gray-600">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{Math.round(selectedMeal.totalNutrition.protein * 10) / 10}g</div>
                    <div className="text-xs text-gray-600">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-orange-600">{Math.round(selectedMeal.totalNutrition.carbs * 10) / 10}g</div>
                    <div className="text-xs text-gray-600">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">{Math.round(selectedMeal.totalNutrition.fat * 10) / 10}g</div>
                    <div className="text-xs text-gray-600">Fat</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogMeal}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Plus size={16} className="inline mr-2" />
                Log {selectedMeal.name} to {selectedCategory}
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
