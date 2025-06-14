
import { Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const dummyFoods = [
  { meal: "Breakfast", food: "Oatmeal + Banana", calories: 320, protein: 12, carbs: 58, fat: 6, barcode: true },
  { meal: "Lunch", food: "Chicken Rice Bowl", calories: 480, protein: 35, carbs: 45, fat: 12, saved: true },
  { meal: "Snack", food: "Grenade Protein Bar", calories: 220, protein: 22, carbs: 1.5, fat: 11, barcode: true },
  { meal: "Pre-workout", food: "Banana + Coffee", calories: 125, protein: 2, carbs: 28, fat: 0, quick: true },
];

export default function FoodTracker() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFood, setSelectedFood] = useState(null);

  const handleFoodLogClick = () => {
    navigate("/food");
  };

  const handleTrackFoodClick = () => {
    toast({
      title: "Track Food",
      description: "Ready to log your next meal! Scan barcode or search food database.",
    });
  };

  return (
    <Card className="p-6 shadow-lg animate-fade-in flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center rounded-full bg-green-50 p-2">
          <Utensils size={22} className="text-green-600" />
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-green-700">Food Tracker</h2>
        <div className="ml-auto flex gap-2">
          <button 
            onClick={handleTrackFoodClick}
            className="px-3 py-1 bg-green-600 text-white rounded shadow hover:scale-105 transition-transform">
            Track Food
          </button>
          <button 
            onClick={handleFoodLogClick}
            className="px-3 py-1 bg-green-100 text-green-700 border border-green-300 rounded shadow hover:scale-105 transition-transform">
            Food Log
          </button>
        </div>
      </div>
      
      <div className="space-y-3 mb-4 flex-1">
        {dummyFoods.map((item, i) => (
          <Popover key={i}>
            <PopoverTrigger asChild>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-green-800">{item.food}</span>
                    {item.barcode && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Scanned</span>}
                    {item.saved && <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Saved</span>}
                    {item.quick && <span className="text-xs bg-green-300 text-green-900 px-2 py-1 rounded">Quick</span>}
                  </div>
                  <div className="text-sm text-gray-600">{item.meal}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-700">{item.calories} cal</div>
                  <div className="text-xs text-gray-500">P: {item.protein}g</div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-800 text-lg">{item.food}</h3>
                  <p className="text-sm text-gray-600">{item.meal}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-700">{item.calories}</div>
                    <div className="text-sm text-gray-600">Calories</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-700">{item.protein}g</div>
                    <div className="text-sm text-gray-600">Protein</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-700">{item.carbs}g</div>
                    <div className="text-sm text-gray-600">Carbs</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-700">{item.fat}g</div>
                    <div className="text-sm text-gray-600">Fat</div>
                  </div>
                </div>
                
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  Log Again
                </button>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </Card>
  );
}
