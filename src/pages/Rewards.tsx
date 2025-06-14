import { Card } from "@/components/ui/card";
import { Star, Target, Calendar, Settings } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import MobileHeader from "@/components/MobileHeader";
import { useState, useEffect } from "react";
import CreditGoalsModal from "@/components/CreditGoalsModal";

const NAV_LINKS = [
  { label: "Dashboard", href: "/", active: false },
  { label: "Food", href: "/food", active: false },
  { label: "Workouts", href: "/workouts", active: false },
  { label: "Progress", href: "/progress", active: false },
  { label: "Rewards", href: "/rewards", active: true },
];

// Available credit goals to choose from
const availableCreditGoals = [
  { id: 'calories', name: 'Calories', value: 2200, unit: '', color: 'green' },
  { id: 'carbs', name: 'Carbs', value: 275, unit: 'g', color: 'green' },
  { id: 'fats', name: 'Fats', value: 73, unit: 'g', color: 'green' },
  { id: 'protein', name: 'Protein', value: 220, unit: 'g', color: 'green' },
  { id: 'sleep', name: 'Sleep', value: 8, unit: 'hrs', color: 'purple' },
  { id: 'steps', name: 'Steps', value: 10000, unit: '', color: 'blue' },
  { id: 'workouts', name: 'Workouts', value: 1, unit: 'scheduled', color: 'blue' }
];

// Default credit goals (fallback)
const defaultCreditGoals = [
  { id: 'calories', name: 'Calories', value: 2200, unit: '', color: 'green' },
  { id: 'protein', name: 'Protein', value: 220, unit: 'g', color: 'green' },
  { id: 'workouts', name: 'Workouts', value: 1, unit: 'scheduled', color: 'blue' },
  { id: 'steps', name: 'Steps', value: 10000, unit: '', color: 'blue' },
  { id: 'sleep', name: 'Sleep', value: 8, unit: 'hrs', color: 'purple' }
];

const weeklyProgress = [
  { day: "Monday", caloriesHit: true, proteinHit: true, workoutComplete: true, stepsHit: true, sleepHit: true, creditsEarned: 5 },
  { day: "Tuesday", caloriesHit: true, proteinHit: false, workoutComplete: false, stepsHit: true, sleepHit: false, creditsEarned: 2 },
  { day: "Wednesday", caloriesHit: true, proteinHit: true, workoutComplete: true, stepsHit: false, sleepHit: true, creditsEarned: 4 },
  { day: "Thursday", caloriesHit: false, proteinHit: true, workoutComplete: true, stepsHit: true, sleepHit: true, creditsEarned: 4 },
  { day: "Friday", caloriesHit: true, proteinHit: true, workoutComplete: true, stepsHit: true, sleepHit: true, creditsEarned: 5 },
  { day: "Saturday", caloriesHit: true, proteinHit: false, workoutComplete: false, stepsHit: false, sleepHit: false, creditsEarned: 1 },
  { day: "Today", caloriesHit: true, proteinHit: true, workoutComplete: true, stepsHit: true, sleepHit: false, creditsEarned: 4 }
];

const availableRewards = [
  { name: "Free Smoothie", location: "Local Gym", cost: 15, credits: "15 credits", available: false },
  { name: "50% Off Chipotle Bowl", location: "Chipotle", cost: 8, credits: "8 credits", available: true },
  { name: "20% Off Nike Shoes", location: "Nike Store", cost: 25, credits: "25 credits", available: false },
  { name: "Free Protein Bar", location: "Supplement Store", cost: 5, credits: "5 credits", available: true }
];

export default function Rewards() {
  const [showCreditGoalsModal, setShowCreditGoalsModal] = useState(false);
  const [userCreditGoals, setUserCreditGoals] = useState(defaultCreditGoals);

  // Load credit goals from localStorage on component mount
  useEffect(() => {
    const savedOnboardingData = localStorage.getItem('onboarding_data');
    if (savedOnboardingData) {
      try {
        const onboardingData = JSON.parse(savedOnboardingData);
        if (onboardingData.selectedCreditGoals && onboardingData.selectedCreditGoals.length > 0) {
          // Update goals with values from manual goals or use defaults
          const updatedGoals = onboardingData.selectedCreditGoals.map((goal: any) => {
            if (onboardingData.manualGoals) {
              // Use manual goals values if available
              const manualValue = onboardingData.manualGoals[goal.id];
              if (manualValue !== undefined) {
                return { ...goal, value: manualValue };
              }
            }
            return goal;
          });
          setUserCreditGoals(updatedGoals);
        }
      } catch (error) {
        console.error('Error loading onboarding data:', error);
      }
    }
  }, []);

  const totalCredits = weeklyProgress.reduce((sum, day) => sum + day.creditsEarned, 0);

  // Get workout status for today - binary based on scheduled workouts
  const getTodayWorkoutStatus = () => {
    const today = weeklyProgress.find(day => day.day === "Today");
    return today?.workoutComplete ? "1/1" : "0/1";
  };

  const getStatusIndicator = (dayData: any, goalId: string) => {
    switch(goalId) {
      case 'calories': return dayData.caloriesHit;
      case 'protein': return dayData.proteinHit;
      case 'workouts': return dayData.workoutComplete;
      case 'steps': return dayData.stepsHit;
      case 'sleep': return dayData.sleepHit;
      case 'carbs': return dayData.caloriesHit; // Assuming carbs follows calories
      case 'fats': return dayData.caloriesHit; // Assuming fats follows calories
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col pb-20">
      <MobileHeader 
        title="Rewards" 
        onOpenCreditGoalsModal={() => setShowCreditGoalsModal(true)}
      />

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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="text-blue-600" size={18} />
              <h3 className="text-lg font-semibold">Daily Credit Goals</h3>
            </div>
            <button 
              onClick={() => setShowCreditGoalsModal(true)}
              className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100"
            >
              <Settings size={14} />
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {userCreditGoals.slice(0, 4).map((goal, index) => (
              <div key={goal.id} className={`bg-${goal.color}-50 p-3 rounded-lg text-center`}>
                <div className={`text-lg font-bold text-${goal.color}-600`}>
                  {goal.id === 'workouts' ? getTodayWorkoutStatus() : 
                   `${goal.value.toLocaleString()}${goal.unit}`}
                </div>
                <div className="text-xs text-gray-600">
                  {goal.id === 'workouts' ? 'Workouts Complete' : goal.name}
                </div>
                <div className="text-xs text-orange-600 font-medium">+1 credit</div>
              </div>
            ))}
          </div>
          {userCreditGoals[4] && (
            <div className={`bg-${userCreditGoals[4].color}-50 p-3 rounded-lg text-center w-full`}>
              <div className={`text-lg font-bold text-${userCreditGoals[4].color}-600`}>
                {userCreditGoals[4].id === 'workouts' ? getTodayWorkoutStatus() : 
                 `${userCreditGoals[4].value.toLocaleString()}${userCreditGoals[4].unit}`}
              </div>
              <div className="text-xs text-gray-600">
                {userCreditGoals[4].id === 'workouts' ? 'Workouts Complete' : userCreditGoals[4].name}
              </div>
              <div className="text-xs text-orange-600 font-medium">+1 credit</div>
            </div>
          )}
          <div className="mt-3 text-xs text-gray-500 text-center">
            Max 5 credits per day • Complete goals to earn credits
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
                    {userCreditGoals.map((goal) => {
                      const isHit = getStatusIndicator(day, goal.id);
                      return (
                        <span 
                          key={goal.id}
                          className={`w-2 h-2 rounded-full ${isHit ? `bg-${goal.color}-500` : 'bg-gray-300'}`}
                        ></span>
                      );
                    })}
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
                  ? 'border-yellow-200 bg-yellow-50' 
                  : 'border-gray-200 bg-gray-50 opacity-75'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm">{reward.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    reward.available 
                      ? 'bg-yellow-200 text-yellow-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {reward.credits}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mb-3">{reward.location}</div>
                <button className={`w-full py-2 px-3 rounded font-medium text-sm ${
                  reward.available 
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600 active:scale-98' 
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

      {showCreditGoalsModal && (
        <CreditGoalsModal 
          onClose={() => setShowCreditGoalsModal(false)}
          availableGoals={availableCreditGoals}
          currentGoals={userCreditGoals}
        />
      )}
    </div>
  );
}
