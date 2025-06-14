
import { Utensils, Plus, List, Camera, Mic } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import EnhancedFoodModal from "./EnhancedFoodModal";

const dummyFoods = [
  { meal: "Breakfast", food: "Oatmeal + Banana", calories: 320, protein: 12, carbs: 58, fat: 6, barcode: true },
  { meal: "Lunch", food: "Chicken Rice Bowl", calories: 480, protein: 35, carbs: 45, fat: 12, saved: true },
  { meal: "Snack", food: "Grenade Protein Bar", calories: 220, protein: 22, carbs: 1.5, fat: 11, barcode: true },
  { meal: "Pre-workout", food: "Banana + Coffee", calories: 125, protein: 2, carbs: 28, fat: 0, quick: true },
];

export default function FoodTracker() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  
  const handleFoodLogClick = () => {
    navigate("/food");
  };

  const handleTrackFoodClick = () => {
    setShowTrackingModal(true);
  };

  const handleBarcodeClick = () => {
    toast({
      title: "Barcode Scanner",
      description: "Camera access would be requested here",
    });
    // Simulate immediate camera access
    console.log("Opening camera for barcode scanning...");
  };

  const handleVoiceClick = () => {
    toast({
      title: "Voice Recording",
      description: "Microphone access would be requested here",
    });
    // Simulate immediate microphone access
    console.log("Opening microphone for voice recording...");
  };

  return (
    <>
      <Card className="p-4 shadow-lg animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-full">
            <Utensils size={20} className="text-green-600" />
          </div>
          <h2 className="text-lg font-bold text-green-700 flex-1">Today's Food</h2>
          <div className="flex gap-2">
            <button 
              onClick={handleTrackFoodClick}
              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition-colors active:scale-95">
              <Plus size={16} />
              <span className="text-sm font-medium">Add</span>
            </button>
            <button 
              onClick={handleBarcodeClick}
              className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 border border-green-300 rounded-lg shadow-sm hover:bg-green-200 transition-colors active:scale-95">
              <Camera size={16} />
              <span className="text-sm font-medium">Scan</span>
            </button>
            <button 
              onClick={handleVoiceClick}
              className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 border border-green-300 rounded-lg shadow-sm hover:bg-green-200 transition-colors active:scale-95">
              <Mic size={16} />
              <span className="text-sm font-medium">Voice</span>
            </button>
            <button 
              onClick={handleFoodLogClick}
              className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 border border-green-300 rounded-lg shadow-sm hover:bg-green-200 transition-colors active:scale-95">
              <List size={16} />
              <span className="text-sm font-medium">Log</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          {dummyFoods.map((item, i) => (
            <Popover key={i}>
              <PopoverTrigger asChild>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer active:scale-98">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-green-800 text-sm truncate">{item.food}</span>
                      {item.barcode && <span className="text-xs bg-green-200 text-green-700 px-2 py-0.5 rounded-full">Scanned</span>}
                      {item.saved && <span className="text-xs bg-green-300 text-green-800 px-2 py-0.5 rounded-full">Saved</span>}
                      {item.quick && <span className="text-xs bg-green-400 text-green-900 px-2 py-0.5 rounded-full">Quick</span>}
                    </div>
                    <div className="text-xs text-gray-600">{item.meal}</div>
                  </div>
                  <div className="text-right ml-3">
                    <div className="font-semibold text-green-700 text-sm">{item.calories} cal</div>
                    <div className="text-xs text-gray-500">P: {item.protein}g</div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-green-800 text-lg">{item.food}</h3>
                    <p className="text-sm text-gray-600">{item.meal}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-700">{item.calories}</div>
                      <div className="text-xs text-gray-600">Calories</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-700">{item.protein}g</div>
                      <div className="text-xs text-gray-600">Protein</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-700">{item.carbs}g</div>
                      <div className="text-xs text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-700">{item.fat}g</div>
                      <div className="text-xs text-gray-600">Fat</div>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium active:scale-98">
                    Log Again
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>

        {/* Daily Summary */}
        <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-700 font-medium">Today's Total</span>
            <span className="text-green-800 font-bold">1,145 cal</span>
          </div>
          <div className="mt-1 text-xs text-green-600">
            Protein: 71g • Carbs: 132.5g • Fat: 29g
          </div>
        </div>
      </Card>

      {showTrackingModal && (
        <EnhancedFoodModal onClose={() => setShowTrackingModal(false)} />
      )}
    </>
  );
}
