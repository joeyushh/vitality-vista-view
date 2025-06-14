import { Card } from "@/components/ui/card";
import { Star, Target, Calendar } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import MobileHeader from "@/components/MobileHeader";

const NAV_LINKS = [
  { label: "Dashboard", href: "/", active: false },
  { label: "Food", href: "/food", active: false },
  { label: "Workouts", href: "/workouts", active: false },
  { label: "Progress", href: "/progress", active: false },
  { label: "Rewards", href: "/rewards", active: true },
];

const userGoals = {
  dailyCalories: 2200,
  dailyProtein: 220,
  weeklyWorkouts: 5,
  dailySteps: 10000,
  dailySleep: 8
};

const weeklyProgress = [
  { day: "Monday", caloriesHit: true, proteinHit: true, workoutDone: true, stepsHit: true, sleepHit: true, creditsEarned: 5 },
  { day: "Tuesday", caloriesHit: true, proteinHit: false, workoutDone: true, stepsHit: true, sleepHit: false, creditsEarned: 3 },
  { day: "Wednesday", caloriesHit: true, proteinHit: true, workoutDone: false, stepsHit: false, sleepHit: true, creditsEarned: 3 },
  { day: "Thursday", caloriesHit: false, proteinHit: true, workoutDone: true, stepsHit: true, sleepHit: true, creditsEarned: 4 },
  { day: "Friday", caloriesHit: true, proteinHit: true, workoutDone: true, stepsHit: true, sleepHit: true, creditsEarned: 5 },
  { day: "Saturday", caloriesHit: true, proteinHit: false, workoutDone: false, stepsHit: false, sleepHit: false, creditsEarned: 1 },
  { day: "Today", caloriesHit: true, proteinHit: true, workoutDone: true, stepsHit: true, sleepHit: false, creditsEarned: 4 }
];

const availableRewards = [
  { name: "Free Smoothie", location: "Local Gym", cost: 15, credits: "15 credits", available: true },
  { name: "50% Off Chipotle Bowl", location: "Chipotle", cost: 8, credits: "8 credits", available: true },
  { name: "20% Off Nike Shoes", location: "Nike Store", cost: 25, credits: "25 credits", available: true },
  { name: "Free Protein Bar", location: "Supplement Store", cost: 5, credits: "5 credits", available: true }
];

const totalCredits = weeklyProgress.reduce((sum, day) => sum + day.creditsEarned, 0);

export default function Rewards() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col pb-20">
      <MobileHeader title="Rewards" />

      <div className="flex-1 px-4 py-4 space-y-6">
        {/* Credits Summary */}
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="text-yellow-500" size={24} />
              <div>
                <h2 className="text-xl font-bold text-orange-800">Your Credits</h2>
                <p className="text-sm text-orange-600">Earned by hitting daily goals</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-600">{totalCredits}</div>
          </div>
        </div>

        {/* Your Goals Section - Mobile Optimized */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-blue-600" size={18} />
            <h3 className="text-lg font-semibold">Daily Goals & Credits</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-green-600">{userGoals.dailyCalories}</div>
              <div className="text-xs text-gray-600">Calories</div>
              <div className="text-xs text-orange-600 font-medium">+1 credit</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-green-600">{userGoals.dailyProtein}g</div>
              <div className="text-xs text-gray-600">Protein</div>
              <div className="text-xs text-orange-600 font-medium">+1 credit</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-600">{userGoals.weeklyWorkouts}</div>
              <div className="text-xs text-gray-600">Workouts</div>
              <div className="text-xs text-orange-600 font-medium">+1 credit</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-600">{userGoals.dailySteps.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Steps</div>
              <div className="text-xs text-orange-600 font-medium">+1 credit</div>
            </div>
          </div>
        </Card>

        {/* Weekly Progress - Simplified for Mobile */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-purple-600" size={18} />
            <h3 className="text-lg font-semibold">This Week</h3>
          </div>
          <div className="space-y-2">
            {weeklyProgress.slice(-4).map((day, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-sm">{day.day}</div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className={`w-2 h-2 rounded-full ${day.caloriesHit ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <span className={`w-2 h-2 rounded-full ${day.proteinHit ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <span className={`w-2 h-2 rounded-full ${day.workoutDone ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                    <span className={`w-2 h-2 rounded-full ${day.stepsHit ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                    <span className={`w-2 h-2 rounded-full ${day.sleepHit ? 'bg-purple-500' : 'bg-gray-300'}`}></span>
                  </div>
                  <div className="text-sm font-medium text-orange-600">
                    +{day.creditsEarned}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Available Rewards */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Available Rewards</h3>
          <div className="space-y-3">
            {availableRewards.map((reward, i) => (
              <div key={i} className={`p-3 rounded-lg border-2 ${
                reward.available 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50 opacity-75'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm">{reward.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    reward.available 
                      ? 'bg-green-200 text-green-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {reward.credits}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mb-3">{reward.location}</div>
                <button className={`w-full py-2 px-3 rounded font-medium text-sm ${
                  reward.available 
                    ? 'bg-green-600 text-white hover:bg-green-700 active:scale-98' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`} disabled={!reward.available}>
                  {reward.available ? 'Redeem' : 'Not Enough Credits'}
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
}
