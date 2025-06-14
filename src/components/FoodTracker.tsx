import { Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TrackingModal from "./TrackingModal";

const dummyFoods = [
  { meal: "Breakfast", food: "Oatmeal + Banana", calories: 320, protein: 12, carbs: 58, fat: 6, barcode: true },
  { meal: "Lunch", food: "Chicken Rice Bowl", calories: 480, protein: 35, carbs: 45, fat: 12, saved: true },
  { meal: "Snack", food: "Grenade Protein Bar", calories: 220, protein: 22, carbs: 1.5, fat: 11, barcode: true },
  { meal: "Pre-workout", food: "Banana + Coffee", calories: 125, protein: 2, carbs: 28, fat: 0, quick: true },
];

export default function FoodTracker() {
  const navigate = useNavigate();
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  
  const handleFoodLogClick = () => {
    navigate("/food");
  };

  const handleTrackFoodClick = () => {
    setShowTrackingModal(true);
  };

  return (
    <>
      <Card className="p-4 md:p-6 shadow-lg animate-fade-in flex flex-col h-full">
        <div className="flex items-center gap-2 md:gap-3 mb-4">
          <span className="inline-flex items-center justify-center rounded-full bg-green-50 p-1.5 md:p-2">
            <Utensils size={18} className="text-green-600 md:w-5 md:h-5" />
          </span>
          <h2 className="text-lg md:text-2xl font-bold tracking-tight text-green-700 flex-1">Food Tracker</h2>
          <div className="flex gap-1 md:gap-2">
            <button 
              onClick={handleTrackFoodClick}
              className="px-2 md:px-3 py-1 md:py-1 text-xs md:text-sm bg-green-600 text-white rounded shadow hover:scale-105 transition-transform min-h-[32px] md:min-h-[36px]">
              Track Food
            </button>
            <button 
              onClick={handleFoodLogClick}
              className="px-2 md:px-3 py-1 md:py-1 text-xs md:text-sm bg-green-100 text-green-700 border border-green-300 rounded shadow hover:scale-105 transition-transform min-h-[32px] md:min-h-[36px]">
              Food Log
            </button>
          </div>
        </div>
        
        <div className="space-y-2 md:space-y-3 mb-4 flex-1">
          {dummyFoods.map((item, i) => (
            <Popover key={i}>
              <PopoverTrigger asChild>
                <div className="flex justify-between items-center p-2 md:p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer min-h-[56px] md:min-h-[64px]">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 md:gap-2 mb-1">
                      <span className="font-medium text-green-800 text-sm md:text-base truncate">{item.food}</span>
                      {item.barcode && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded flex-shrink-0">Scanned</span>}
                      {item.saved && <span className="text-xs bg-green-200 text-green-800 px-1.5 py-0.5 rounded flex-shrink-0">Saved</span>}
                      {item.quick && <span className="text-xs bg-green-300 text-green-900 px-1.5 py-0.5 rounded flex-shrink-0">Quick</span>}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">{item.meal}</div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="font-semibold text-green-700 text-sm md:text-base">{item.calories} cal</div>
                    <div className="text-xs text-gray-500">P: {item.protein}g</div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-72 md:w-80">
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

      {showTrackingModal && (
        <TrackingModal 
          type="food" 
          onClose={() => setShowTrackingModal(false)} 
        />
      )}
    </>
  );
}
