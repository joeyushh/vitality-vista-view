import { Card } from "@/components/ui/card";
import { Utensils, Scan, Clock, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Dashboard", href: "/", active: false },
  { label: "Food", href: "/food", active: true },
  { label: "Workouts", href: "/workouts", active: false },
  { label: "Progress", href: "#progress", active: false },
];

const todaysMeals = [
  { meal: "Breakfast", food: "Oatmeal + Banana", calories: 320, protein: 12, carbs: 58, fat: 6, time: "7:30 AM" },
  { meal: "Lunch", food: "Chicken Rice Bowl", calories: 480, protein: 35, carbs: 45, fat: 12, time: "12:45 PM" },
  { meal: "Snack", food: "Grenade Protein Bar", calories: 220, protein: 22, carbs: 1.5, fat: 11, time: "3:20 PM" },
  { meal: "Pre-workout", food: "Banana + Coffee", calories: 125, protein: 2, carbs: 28, fat: 0, time: "5:15 PM" },
];

const savedMeals = [
  { name: "Post-workout Shake", calories: 350, protein: 40, carbs: 25, fat: 8 },
  { name: "Chicken & Rice", calories: 520, protein: 42, carbs: 48, fat: 14 },
  { name: "Greek Yogurt Bowl", calories: 280, protein: 20, carbs: 32, fat: 9 },
  { name: "Salmon & Vegetables", calories: 420, protein: 38, carbs: 15, fat: 22 },
];

const todaysStats = {
  calories: { current: 1450, target: 2200 },
  protein: { current: 89, target: 165 },
  carbs: { current: 142, target: 220 },
  fat: { current: 48, target: 73 },
};

export default function Food() {
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
    }
  };

  const caloriesPercent = (todaysStats.calories.current / todaysStats.calories.target) * 100;
  const proteinPercent = (todaysStats.protein.current / todaysStats.protein.target) * 100;
  const carbsPercent = (todaysStats.carbs.current / todaysStats.carbs.target) * 100;
  const fatPercent = (todaysStats.fat.current / todaysStats.fat.target) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="w-full flex items-center px-10 py-4 shadow mb-8 bg-white/80 backdrop-blur-sm z-10">
        <div className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-800 via-blue-600 to-green-600 bg-clip-text text-transparent mr-10 select-none">
          FitTrack Pro
        </div>
        <ul className="flex gap-2 text-base font-medium">
          {NAV_LINKS.map((link, i) => (
            <li key={i}>
              <button
                onClick={() => handleNavClick(link.href)}
                className={`story-link px-3 py-1 rounded ${
                  link.active
                    ? "bg-blue-100 text-blue-800 shadow"
                    : "hover:bg-blue-50 text-gray-600"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="ml-auto text-sm text-gray-400 hidden md:block">
          {new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
        </div>
      </nav>

      <div className="px-6 pb-8" style={{maxWidth: 1600, width: "100%", margin: "0 auto"}}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Today's Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Nutrition Dashboard */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Today's Nutrition</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-800">{todaysStats.calories.current}</div>
                  <div className="text-xs text-green-600 mb-2">/ {todaysStats.calories.target} calories</div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${Math.min(caloriesPercent, 100)}%` }}></div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-800">{todaysStats.protein.current}g</div>
                  <div className="text-xs text-green-600 mb-2">/ {todaysStats.protein.target}g protein</div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${Math.min(proteinPercent, 100)}%` }}></div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-800">{todaysStats.carbs.current}g</div>
                  <div className="text-xs text-green-600 mb-2">/ {todaysStats.carbs.target}g carbs</div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${Math.min(carbsPercent, 100)}%` }}></div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-800">{todaysStats.fat.current}g</div>
                  <div className="text-xs text-green-600 mb-2">/ {todaysStats.fat.target}g fat</div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${Math.min(fatPercent, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Today's Meals */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Today's Meals</h2>
              <div className="space-y-3">
                {todaysMeals.map((meal, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-green-800">{meal.food}</span>
                        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">{meal.meal}</span>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock size={14} />
                        {meal.time}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-700">{meal.calories} cal</div>
                      <div className="text-xs text-gray-500">P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Tools & Tips */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Scan size={20} />
                  Scan Barcode
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-green-100 text-green-800 border border-green-300 rounded-lg hover:bg-green-200 transition-colors">
                  <Target size={20} />
                  Quick Add
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-green-100 text-green-800 border border-green-300 rounded-lg hover:bg-green-200 transition-colors">
                  <Utensils size={20} />
                  Food Log
                </button>
              </div>
            </Card>

            {/* Saved Meals */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Saved Meals</h2>
              <div className="space-y-2">
                {savedMeals.map((meal, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                    <div>
                      <div className="font-medium text-green-800">{meal.name}</div>
                      <div className="text-xs text-gray-500">P: {meal.protein}g | C: {meal.carbs}g</div>
                    </div>
                    <div className="text-sm font-semibold text-green-700">{meal.calories} cal</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Tracking Tips</h2>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-1">Weigh Food Raw</div>
                  <div>Always weigh meat, rice, and pasta before cooking for accurate calories.</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-1">Measure Oils & Sauces</div>
                  <div>Cooking oils and sauces add up quickly - don't forget to log them!</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-1">Stay Consistent</div>
                  <div>Track everything, even small snacks and drinks for the most accurate results.</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <footer className="w-full text-center py-3 text-gray-400 text-xs mt-auto">
        &copy; {new Date().getFullYear()} FitTrack Pro. Your all-in-one fitness companion.
      </footer>
    </div>
  );
}
