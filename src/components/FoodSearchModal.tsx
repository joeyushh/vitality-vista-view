import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Plus, Search, ShoppingCart, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SavedMealBuilder from "./SavedMealBuilder";

interface FoodSearchModalProps {
  onClose: () => void;
}

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

const foodDatabase: FoodItem[] = [
  { 
    id: "1", 
    name: "Chicken Breast", 
    brand: "Generic", 
    caloriesPer100g: 165, 
    proteinPer100g: 31, 
    carbsPer100g: 0, 
    fatPer100g: 3.6,
    servingSize: "100g"
  },
  { 
    id: "2", 
    name: "Banana", 
    brand: "Fresh", 
    caloriesPer100g: 89, 
    proteinPer100g: 1.1, 
    carbsPer100g: 23, 
    fatPer100g: 0.3,
    servingSize: "1 medium (118g)"
  },
  { 
    id: "3", 
    name: "Greek Yogurt", 
    brand: "Fage", 
    caloriesPer100g: 59, 
    proteinPer100g: 10, 
    carbsPer100g: 3.6, 
    fatPer100g: 0.4,
    servingSize: "170g container"
  },
  { 
    id: "4", 
    name: "Oatmeal", 
    brand: "Quaker", 
    caloriesPer100g: 389, 
    proteinPer100g: 16.9, 
    carbsPer100g: 66, 
    fatPer100g: 6.9,
    servingSize: "40g dry"
  },
  { 
    id: "5", 
    name: "Almonds", 
    brand: "Generic", 
    caloriesPer100g: 579, 
    proteinPer100g: 21, 
    carbsPer100g: 22, 
    fatPer100g: 50,
    servingSize: "28g (23 almonds)"
  },
];

const mealCategories = ["Breakfast", "Lunch", "Dinner", "Snack"];

export default function FoodSearchModal({ onClose }: FoodSearchModalProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servingAmount, setServingAmount] = useState("100");
  const [servingUnit, setServingUnit] = useState("g");
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");
  const [mealBuilder, setMealBuilder] = useState<SelectedFood[]>([]);
  const [showMealBuilder, setShowMealBuilder] = useState(false);

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    food.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateNutrition = (food: FoodItem, amount: number, unit: string) => {
    let multiplier = 1;
    
    // Convert different units to grams for calculation
    if (unit === "g") {
      multiplier = amount / 100;
    } else if (unit === "oz") {
      multiplier = (amount * 28.35) / 100;
    } else if (unit === "serving" && food.servingSize) {
      // Extract grams from serving size string
      const gramMatch = food.servingSize.match(/(\d+)g/);
      if (gramMatch) {
        multiplier = (amount * parseInt(gramMatch[1])) / 100;
      }
    }

    return {
      calories: Math.round(food.caloriesPer100g * multiplier),
      protein: Math.round(food.proteinPer100g * multiplier * 10) / 10,
      carbs: Math.round(food.carbsPer100g * multiplier * 10) / 10,
      fat: Math.round(food.fatPer100g * multiplier * 10) / 10,
    };
  };

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    // Set default serving amount based on food's serving size
    if (food.servingSize) {
      const gramMatch = food.servingSize.match(/(\d+)g/);
      if (gramMatch) {
        setServingAmount(gramMatch[1]);
        setServingUnit("g");
      }
    }
  };

  const handleAddToMealBuilder = () => {
    if (!selectedFood) return;

    const foodWithServing: SelectedFood = {
      ...selectedFood,
      amount: parseFloat(servingAmount) || 0,
      unit: servingUnit,
    };

    setMealBuilder(prev => [...prev, foodWithServing]);
    setSelectedFood(null);
    setServingAmount("100");
    setServingUnit("g");
    
    toast({
      title: "Added to Meal Builder",
      description: `${selectedFood.name} added. Total items: ${mealBuilder.length + 1}`,
    });
  };

  const handleAddFood = () => {
    if (!selectedFood) return;

    const nutrition = calculateNutrition(selectedFood, parseFloat(servingAmount), servingUnit);
    
    toast({
      title: "Food Added",
      description: `${selectedFood.name} (${servingAmount}${servingUnit}) added to ${selectedMeal}: ${nutrition.calories} cal, ${nutrition.protein}g protein`,
    });
    
    onClose();
  };

  const handleOpenMealBuilder = () => {
    setShowMealBuilder(true);
  };

  const handleSaveMeal = (mealName: string, foods: SelectedFood[]) => {
    // In a real app, this would save to a database or state management
    console.log("Saving meal:", mealName, foods);
    setMealBuilder([]);
    setShowMealBuilder(false);
    onClose();
  };

  const handleRemoveFromMealBuilder = (index: number) => {
    setMealBuilder(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateMealBuilderAmount = (index: number, amount: number, unit: string) => {
    setMealBuilder(prev => prev.map((food, i) => 
      i === index ? { ...food, amount, unit } : food
    ));
  };

  const nutrition = selectedFood ? calculateNutrition(selectedFood, parseFloat(servingAmount) || 0, servingUnit) : null;

  if (showMealBuilder) {
    return (
      <SavedMealBuilder
        selectedFoods={mealBuilder}
        onSave={handleSaveMeal}
        onClose={() => setShowMealBuilder(false)}
        onRemoveFood={handleRemoveFromMealBuilder}
        onUpdateAmount={handleUpdateMealBuilderAmount}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Add Food</h2>
            <div className="flex items-center gap-2">
              {mealBuilder.length > 0 && (
                <button
                  onClick={handleOpenMealBuilder}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <ShoppingCart size={16} />
                  <span className="text-sm">{mealBuilder.length}</span>
                </button>
              )}
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {!selectedFood ? (
            // Search Phase
            <div className="space-y-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for food..."
                  className="pl-10"
                />
              </div>
              
              {/* Meal Builder Status */}
              {mealBuilder.length > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700">
                      Building meal: {mealBuilder.length} item{mealBuilder.length !== 1 ? 's' : ''} selected
                    </span>
                    <button
                      onClick={handleOpenMealBuilder}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      View & Save →
                    </button>
                  </div>
                </div>
              )}
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredFoods.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => handleFoodSelect(food)}
                    className="w-full p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-green-800">{food.name}</div>
                        <div className="text-sm text-green-600">{food.brand}</div>
                        {food.servingSize && (
                          <div className="text-xs text-gray-500">Serving: {food.servingSize}</div>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>{food.caloriesPer100g} cal/100g</div>
                        <div className="text-xs">P: {food.proteinPer100g}g | C: {food.carbsPer100g}g | F: {food.fatPer100g}g</div>
                      </div>
                    </div>
                  </button>
                ))}
                
                {searchQuery && filteredFoods.length === 0 && (
                  <div className="text-center p-8 text-gray-500">
                    <p>No foods found for "{searchQuery}"</p>
                    <p className="text-sm mt-2">Try a different search term</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Serving Size & Details Phase
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedFood(null)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  ← Back to search
                </button>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800">{selectedFood.name}</h3>
                <p className="text-sm text-green-600">{selectedFood.brand}</p>
              </div>

              {/* Meal Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Meal Category</label>
                <select
                  value={selectedMeal}
                  onChange={(e) => setSelectedMeal(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {mealCategories.map(meal => (
                    <option key={meal} value={meal}>{meal}</option>
                  ))}
                </select>
              </div>

              {/* Serving Size */}
              <div>
                <label className="block text-sm font-medium mb-2">Serving Size</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    value={servingAmount}
                    onChange={(e) => setServingAmount(e.target.value)}
                    placeholder="100"
                    className="flex-1"
                  />
                  <select
                    value={servingUnit}
                    onChange={(e) => setServingUnit(e.target.value)}
                    className="w-24 p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="g">g</option>
                    <option value="oz">oz</option>
                    {selectedFood.servingSize && (
                      <option value="serving">serving</option>
                    )}
                  </select>
                </div>
                {selectedFood.servingSize && (
                  <p className="text-xs text-gray-500 mt-1">
                    1 serving = {selectedFood.servingSize}
                  </p>
                )}
              </div>

              {/* Nutrition Breakdown */}
              {nutrition && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3">Nutrition Facts</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{nutrition.calories}</div>
                      <div className="text-xs text-gray-600">Calories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">{nutrition.protein}g</div>
                      <div className="text-xs text-gray-600">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">{nutrition.carbs}g</div>
                      <div className="text-xs text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-purple-600">{nutrition.fat}g</div>
                      <div className="text-xs text-gray-600">Fat</div>
                    </div>
                  </div>
                  
                  {/* Macronutrient Percentages */}
                  <div className="mt-4 pt-3 border-t border-blue-200">
                    <div className="text-xs text-gray-600 mb-2">Macronutrient Split</div>
                    <div className="flex gap-4 text-xs">
                      <span className="text-green-600">
                        Protein: {Math.round((nutrition.protein * 4 / nutrition.calories) * 100)}%
                      </span>
                      <span className="text-orange-600">
                        Carbs: {Math.round((nutrition.carbs * 4 / nutrition.calories) * 100)}%
                      </span>
                      <span className="text-purple-600">
                        Fat: {Math.round((nutrition.fat * 9 / nutrition.calories) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToMealBuilder}
                  className="flex-1 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                >
                  <Plus size={16} className="inline mr-2" />
                  Add to Meal Builder
                </button>
                <button
                  onClick={handleAddFood}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Plus size={16} className="inline mr-2" />
                  Log to {selectedMeal}
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
