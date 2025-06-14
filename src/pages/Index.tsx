import FoodTracker from "@/components/FoodTracker";
import WorkoutTracker from "@/components/WorkoutTracker";
import DashboardStats from "@/components/DashboardStats";
import WeightTracker from "@/components/WeightTracker";
import BottomNavigation from "@/components/BottomNavigation";
import MobileHeader from "@/components/MobileHeader";
import PullToRefresh from "@/components/PullToRefresh";
import DateNavigation from "@/components/DateNavigation";
import OnboardingFlow, { OnboardingData } from "@/components/OnboardingFlow";
import CreditGoalsModal from "@/components/CreditGoalsModal";
import { useState } from "react";

// Available credit goals to choose from (same as in Rewards page)
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

export default function Index() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [showCreditGoalsModal, setShowCreditGoalsModal] = useState(false);
  const [userCreditGoals, setUserCreditGoals] = useState(defaultCreditGoals);

  const handleRefresh = async () => {
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log('Onboarding completed with data:', data);
    // Here you would typically save the data to your state management or backend
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('user_profile', JSON.stringify(data));
    setShowOnboarding(false);
    setIsFirstTime(false);
  };

  const handleSkipOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setShowOnboarding(false);
    setIsFirstTime(false);
  };

  // Check if user should see onboarding on mount
  useState(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    } else {
      setIsFirstTime(false);
    }

    // Load credit goals from localStorage
    const savedOnboardingData = localStorage.getItem('onboarding_data');
    if (savedOnboardingData) {
      try {
        const onboardingData = JSON.parse(savedOnboardingData);
        if (onboardingData.selectedCreditGoals && onboardingData.selectedCreditGoals.length > 0) {
          const updatedGoals = onboardingData.selectedCreditGoals.map((goal: any) => {
            if (onboardingData.manualGoals) {
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
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col pb-20">
      <MobileHeader onOpenCreditGoalsModal={() => setShowCreditGoalsModal(true)} />
      
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="flex-1 px-4 py-4 space-y-6">
          {/* Date Navigation */}
          <DateNavigation 
            currentDate={currentDate} 
            onDateChange={setCurrentDate}
          />

          {/* Dashboard Stats Overview */}
          <div className="w-full">
            <DashboardStats />
          </div>

          {/* Main Content Grid - Mobile Optimized */}
          <div className="space-y-6">
            {/* Food Tracker */}
            <div className="w-full">
              <FoodTracker />
            </div>
            
            {/* Workout Tracker */}
            <div className="w-full">
              <WorkoutTracker />
            </div>
            
            {/* Weight Tracker */}
            <div className="w-full">
              <WeightTracker />
            </div>
          </div>
        </main>
      </PullToRefresh>
      
      <BottomNavigation />

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
          onClose={handleSkipOnboarding}
        />
      )}

      {/* Credit Goals Modal */}
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
