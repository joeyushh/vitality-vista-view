
import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

const dummyFoods = [
  { meal: "Breakfast", food: "Oatmeal", calories: 250, protein: 8, carbs: 40, fat: 4 },
  { meal: "Lunch", food: "Grilled Chicken Salad", calories: 400, protein: 35, carbs: 20, fat: 13 },
  { meal: "Snack", food: "Greek Yogurt", calories: 140, protein: 11, carbs: 18, fat: 0 },
];

export default function FoodTracker() {
  return (
    <Card className="p-6 shadow-lg animate-fade-in flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center rounded-full bg-blue-50 p-2">
          <Activity size={22} className="text-blue-600" />
        </span>
        <h2 className="text-2xl font-bold tracking-tight">Food Tracker</h2>
        <button className="ml-auto px-3 py-1 bg-blue-600 text-white rounded shadow hover:scale-105 transition-transform">Add Food</button>
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-blue-50 text-gray-600">
            <tr>
              <th className="px-3 py-2 text-left">Meal</th>
              <th className="px-3 py-2 text-left">Food</th>
              <th className="px-3 py-2 text-right">Calories</th>
              <th className="px-3 py-2 text-right">Protein (g)</th>
              <th className="px-3 py-2 text-right">Carbs (g)</th>
              <th className="px-3 py-2 text-right">Fat (g)</th>
            </tr>
          </thead>
          <tbody>
            {dummyFoods.map((item, i) => (
              <tr key={i} className="border-t border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="px-3 py-2">{item.meal}</td>
                <td className="px-3 py-2">{item.food}</td>
                <td className="px-3 py-2 text-right">{item.calories}</td>
                <td className="px-3 py-2 text-right">{item.protein}</td>
                <td className="px-3 py-2 text-right">{item.carbs}</td>
                <td className="px-3 py-2 text-right">{item.fat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 bg-blue-50 rounded p-3 flex justify-between items-center text-sm font-medium">
        <div>Total Calories: <span className="font-semibold">790</span></div>
        <div>Total Protein: <span className="font-semibold">54g</span></div>
        <div>Total Carbs: <span className="font-semibold">78g</span></div>
        <div>Total Fat: <span className="font-semibold">17g</span></div>
      </div>
    </Card>
  );
}
