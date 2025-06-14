
import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

const dummyFoods = [
  { meal: "Breakfast", food: "Oatmeal + Banana", calories: 320, protein: 12, carbs: 58, fat: 6, barcode: true },
  { meal: "Lunch", food: "Chicken Rice Bowl", calories: 480, protein: 35, carbs: 45, fat: 12, saved: true },
  { meal: "Snack", food: "Greek Yogurt", calories: 140, protein: 15, carbs: 18, fat: 0, barcode: true },
  { meal: "Pre-workout", food: "Banana + Coffee", calories: 125, protein: 2, carbs: 28, fat: 0, quick: true },
];

export default function FoodTracker() {
  const totalCalories = dummyFoods.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = dummyFoods.reduce((sum, food) => sum + food.protein, 0);

  return (
    <Card className="p-6 shadow-lg animate-fade-in flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center rounded-full bg-blue-50 p-2">
          <Activity size={22} className="text-blue-600" />
        </span>
        <h2 className="text-2xl font-bold tracking-tight">Food Tracker</h2>
        <button className="ml-auto px-3 py-1 bg-blue-600 text-white rounded shadow hover:scale-105 transition-transform">
          Scan Barcode
        </button>
      </div>
      
      <div className="space-y-3 mb-4">
        {dummyFoods.map((item, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.food}</span>
                {item.barcode && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">📱</span>}
                {item.saved && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">⭐</span>}
                {item.quick && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">⚡</span>}
              </div>
              <div className="text-sm text-gray-600">{item.meal}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">{item.calories} cal</div>
              <div className="text-xs text-gray-500">P: {item.protein}g</div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-blue-50 rounded p-3">
            <div className="text-2xl font-bold text-blue-600">{totalCalories}</div>
            <div className="text-sm text-gray-600">Calories Today</div>
          </div>
          <div className="bg-green-50 rounded p-3">
            <div className="text-2xl font-bold text-green-600">{totalProtein}g</div>
            <div className="text-sm text-gray-600">Protein Today</div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded text-sm">
        <div className="font-medium mb-1">💡 Tracking Tip</div>
        <div className="text-gray-600">Don't forget to log cooking oils and sauces - they add up quickly!</div>
      </div>
    </Card>
  );
}
