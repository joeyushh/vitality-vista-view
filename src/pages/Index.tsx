
import FoodTracker from "@/components/FoodTracker";
import WorkoutTracker from "@/components/WorkoutTracker";
import DashboardStats from "@/components/DashboardStats";
import WeightTracker from "@/components/WeightTracker";
import BottomNavigation from "@/components/BottomNavigation";
import MobileHeader from "@/components/MobileHeader";
import PullToRefresh from "@/components/PullToRefresh";
import { useState } from "react";

export default function Index() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col pb-20">
      <MobileHeader />
      
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="flex-1 px-4 py-4 space-y-6">
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
    </div>
  );
}
