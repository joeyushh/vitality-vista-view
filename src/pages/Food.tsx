import { Card } from "@/components/ui/card";
import { Utensils, Scan, Clock, Target, ChevronLeft, ChevronRight, Mic, Search, Camera, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import MobileHeader from "@/components/MobileHeader";
import DateNavigation from "@/components/DateNavigation";
import EnhancedFoodModal from "@/components/EnhancedFoodModal";
import SavedMealsManager from "@/components/SavedMealsManager";

// Base meals data
const baseMeals = [
  { meal: "Breakfast", food: "Oatmeal + Banana", calories: 320, protein: 12, carbs: 58, fat: 6, time: "7:30 AM" },
  { meal: "Lunch", food: "Chicken Rice Bowl", calories: 480, protein: 35, carbs: 45, fat: 12, time: "12:45 PM" },
  { meal: "Snack", food: "Grenade Protein Bar", calories: 220, protein: 22, carbs: 1.5, fat: 11, time: "3:20 PM" },
  { meal: "Pre-workout", food: "Banana + Coffee", calories: 125, protein: 2, carbs: 28, fat: 0, time: "5:15 PM" },
];

// Different meal variations for different days
const mealVariations = {
  monday: [
    { meal: "Breakfast", food: "Protein Pancakes", calories: 350, protein: 28, carbs: 42, fat: 8, time: "7:15 AM" },
    { meal: "Lunch", food: "Tuna Salad Wrap", calories: 420, protein: 32, carbs: 35, fat: 15, time: "12:30 PM" },
    { meal: "Snack", food: "Greek Yogurt + Berries", calories: 180, protein: 18, carbs: 20, fat: 2, time: "3:00 PM" },
    { meal: "Dinner", food: "Salmon + Quinoa", calories: 520, protein: 38, carbs: 45, fat: 18, time: "7:00 PM" },
  ],
  tuesday: [
    { meal: "Breakfast", food: "Egg White Omelette", calories: 280, protein: 24, carbs: 15, fat: 12, time: "7:45 AM" },
    { meal: "Lunch", food: "Turkey & Avocado Sandwich", calories: 450, protein: 30, carbs: 40, fat: 18, time: "1:00 PM" },
    { meal: "Snack", food: "Protein Shake", calories: 160, protein: 30, carbs: 5, fat: 2, time: "4:15 PM" },
    { meal: "Dinner", food: "Grilled Chicken & Veggies", calories: 380, protein: 40, carbs: 20, fat: 12, time: "7:30 PM" },
  ],
  wednesday: [
    { meal: "Breakfast", food: "Overnight Oats", calories: 310, protein: 15, carbs: 50, fat: 7, time: "7:20 AM" },
    { meal: "Lunch", food: "Beef Stir Fry", calories: 520, protein: 38, carbs: 40, fat: 20, time: "12:15 PM" },
    { meal: "Snack", food: "Apple & Peanut Butter", calories: 200, protein: 7, carbs: 25, fat: 8, time: "3:30 PM" },
    { meal: "Pre-workout", food: "Rice Cakes + Jam", calories: 150, protein: 2, carbs: 35, fat: 0, time: "5:00 PM" },
  ],
  thursday: baseMeals,
  friday: [
    { meal: "Breakfast", food: "Breakfast Burrito", calories: 420, protein: 25, carbs: 45, fat: 15, time: "8:00 AM" },
    { meal: "Lunch", food: "Chicken Caesar Salad", calories: 380, protein: 35, carbs: 10, fat: 22, time: "1:15 PM" },
    { meal: "Snack", food: "Protein Bar", calories: 210, protein: 20, carbs: 20, fat: 7, time: "4:00 PM" },
    { meal: "Dinner", food: "Pasta with Turkey Meatballs", calories: 550, protein: 30, carbs: 65, fat: 15, time: "7:45 PM" },
  ],
  saturday: [
    { meal: "Breakfast", food: "Bagel with Cream Cheese", calories: 450, protein: 15, carbs: 65, fat: 12, time: "9:30 AM" },
    { meal: "Lunch", food: "Grilled Cheese & Soup", calories: 520, protein: 18, carbs: 60, fat: 22, time: "1:30 PM" },
    { meal: "Snack", food: "Trail Mix", calories: 250, protein: 8, carbs: 20, fat: 15, time: "4:30 PM" },
    { meal: "Dinner", food: "Pizza (2 slices)", calories: 580, protein: 24, carbs: 70, fat: 20, time: "7:30 PM" },
  ],
  sunday: [
    { meal: "Breakfast", food: "French Toast", calories: 420, protein: 15, carbs: 60, fat: 12, time: "9:00 AM" },
    { meal: "Lunch", food: "Burger & Sweet Potato Fries", calories: 750, protein: 35, carbs: 80, fat: 30, time: "1:00 PM" },
    { meal: "Snack", food: "Protein Smoothie", calories: 280, protein: 25, carbs: 30, fat: 5, time: "4:00 PM" },
    { meal: "Dinner", food: "Steak & Roasted Vegetables", calories: 550, protein: 45, carbs: 25, fat: 28, time: "7:30 PM" },
  ]
};

// Same saved meals as before
const savedMeals = [
  { id: "1", name: "Post-workout Shake", calories: 350, protein: 40, carbs: 25, fat: 8, ingredients: 3 },
  { id: "2", name: "Chicken & Rice", calories: 520, protein: 42, carbs: 48, fat: 14, ingredients: 4 },
  { id: "3", name: "Greek Yogurt Bowl", calories: 280, protein: 20, carbs: 32, fat: 9, ingredients: 5 },
  { id: "4", name: "Salmon & Vegetables", calories: 420, protein: 38, carbs: 15, fat: 22, ingredients: 3 },
];

export default function Food() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showSavedMealsModal, setShowSavedMealsModal] = useState(false);
  const [showMealBuilderModal, setShowMealBuilderModal] = useState(false);

  // Get the day name for the current date
  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  };

  // Get meals for the selected day
  const getMealsForDay = (date) => {
    const dayName = getDayName(date);
    const today = new Date().toDateString();
    const selectedDay = date.toDateString();
    
    // Future days have no meals logged yet
    if (new Date(selectedDay) > new Date(today)) {
      return [];
    }
    
    return mealVariations[dayName] || baseMeals;
  };

  // Calculate nutrition stats based on the meals for the day
  const calculateNutritionStats = (meals) => {
    if (meals.length === 0) {
      return {
        calories: { current: 0, target: 2200 },
        protein: { current: 0, target: 165 },
        carbs: { current: 0, target: 220 },
        fat: { current: 0, target: 73 },
      };
    }
    
    return {
      calories: { 
        current: meals.reduce((sum, meal) => sum + meal.calories, 0), 
        target: 2200 
      },
      protein: { 
        current: Math.round(meals.reduce((sum, meal) => sum + meal.protein, 0)), 
        target: 165 
      },
      carbs: { 
        current: Math.round(meals.reduce((sum, meal) => sum + meal.carbs, 0)), 
        target: 220 
      },
      fat: { 
        current: Math.round(meals.reduce((sum, meal) => sum + meal.fat, 0)), 
        target: 73 
      },
    };
  };

  const todaysMeals = getMealsForDay(currentDate);
  const todaysStats = calculateNutritionStats(todaysMeals);
  const isFutureDate = currentDate > new Date();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
    }
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setCurrentDate(previousDay);
    toast({
      title: "Day Changed",
      description: `Viewing data for ${previousDay.toLocaleDateString()}`,
    });
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
    toast({
      title: "Day Changed",
      description: `Viewing data for ${nextDay.toLocaleDateString()}`,
    });
  };

  const handleBarcodeClick = () => {
    toast({
      title: "Barcode Scanner",
      description: "Camera access would be requested here",
    });
    console.log("Opening camera for barcode scanning...");
  };

  const handleVoiceClick = () => {
    toast({
      title: "Voice Recording",
      description: "Microphone access would be requested here",
    });
    console.log("Opening microphone for voice recording...");
  };

  const handleAITipsClick = () => {
    toast({
      title: "AI Nutrition Assistant",
      description: "AI chatbot for nutrition tips would open here",
    });
    console.log("Opening AI chatbot for nutrition tips...");
  };

  const handleSavedMealClick = (meal: any) => {
    toast({
      title: "Saved Meal Selected",
      description: `${meal.name} - ${meal.calories} calories`,
    });
    setShowSavedMealsModal(true);
  };

  const handleLogSavedMeal = (meal: any, category: string) => {
    toast({
      title: "Meal Logged",
      description: `${meal.name} added to ${category}`,
    });
  };

  const handleCreateSavedMeal = () => {
    setShowMealBuilderModal(true);
  };

  const caloriesPercent = (todaysStats.calories.current / todaysStats.calories.target) * 100;
  const proteinPercent = (todaysStats.protein.current / todaysStats.protein.target) * 100;
  const carbsPercent = (todaysStats.carbs.current / todaysStats.carbs.target) * 100;
  const fatPercent = (todaysStats.fat.current / todaysStats.fat.target) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col pb-20">
      <MobileHeader title="Food Tracking" />

      <div className="flex-1 px-4 py-4 space-y-6">
        {/* Date Navigation */}
        <DateNavigation 
          currentDate={currentDate} 
          onDateChange={setCurrentDate}
        />

        {/* Nutrition Dashboard */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            {isFutureDate ? "Future Day - No Data Yet" : "Today's Nutrition"}
          </h2>
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

        {/* Quick Actions - Moved Higher */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-green-800 mb-4">Quick Log Food</h2>
          <div className="space-y-3">
            <button 
              onClick={() => setShowTrackingModal(true)}
              className="w-full flex items-center gap-3 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Search size={20} />
              Search & Add Food
            </button>
            <button 
              onClick={handleCreateSavedMeal}
              className="w-full flex items-center gap-3 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Utensils size={20} />
              Create Saved Meal
            </button>
            <button 
              onClick={handleBarcodeClick}
              className="w-full flex items-center gap-3 p-3 bg-green-100 text-green-800 border border-green-300 rounded-lg hover:bg-green-200 transition-colors">
              <Camera size={20} />
              Scan Barcode
            </button>
            <button 
              onClick={handleVoiceClick}
              className="w-full flex items-center gap-3 p-3 bg-green-100 text-green-800 border border-green-300 rounded-lg hover:bg-green-200 transition-colors">
              <Mic size={20} />
              Voice Log
            </button>
          </div>
        </Card>

        {/* Saved Meals */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-800">Saved Meals</h2>
            <button 
              onClick={() => setShowSavedMealsModal(true)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View All →
            </button>
          </div>
          <div className="space-y-2">
            {savedMeals.slice(0, 3).map((meal, i) => (
              <button
                key={i}
                onClick={() => handleSavedMealClick(meal)}
                className="w-full flex justify-between items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <div className="text-left">
                  <div className="font-medium text-green-800">{meal.name}</div>
                  <div className="text-xs text-gray-500">
                    {meal.ingredients} ingredients • P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                  </div>
                </div>
                <div className="text-sm font-semibold text-green-700">{meal.calories} cal</div>
              </button>
            ))}
            {savedMeals.length > 3 && (
              <div className="text-center text-xs text-gray-500 pt-2">
                +{savedMeals.length - 3} more saved meals
              </div>
            )}
          </div>
        </Card>

        {/* Tracking Tips */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target size={20} className="text-green-600" />
            <h2 className="text-xl font-semibold text-green-800">Tracking Tips</h2>
          </div>
          <div className="space-y-3 text-sm mb-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-800 mb-1">Weigh Food Raw</div>
              <div className="text-yellow-700">Always weigh meat, rice, and pasta before cooking for accurate calories.</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-800 mb-1">Measure Oils & Sauces</div>
              <div className="text-yellow-700">Cooking oils and sauces add up quickly - don't forget to log them!</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-800 mb-1">Stay Consistent</div>
              <div className="text-yellow-700">Track everything, even small snacks and drinks for the most accurate results.</div>
            </div>
          </div>
          <button 
            onClick={handleAITipsClick}
            className="w-full flex items-center justify-center gap-2 p-3 bg-green-100 text-green-800 border border-green-300 rounded-lg hover:bg-green-200 transition-colors"
          >
            <MessageCircle size={18} />
            Do you need more tips?
          </button>
        </Card>
      </div>

      {showTrackingModal && (
        <EnhancedFoodModal onClose={() => setShowTrackingModal(false)} />
      )}
      
      {showMealBuilderModal && (
        <EnhancedFoodModal 
          onClose={() => setShowMealBuilderModal(false)} 
          initialMode="mealBuilder"
        />
      )}
      
      {showSavedMealsModal && (
        <SavedMealsManager 
          onClose={() => setShowSavedMealsModal(false)}
          onLogMeal={handleLogSavedMeal}
        />
      )}
      
      <BottomNavigation />
    </div>
  );
}
