import FoodTracker from "@/components/FoodTracker";
import WorkoutTracker from "@/components/WorkoutTracker";
import DashboardStats from "@/components/DashboardStats";
import WeightTracker from "@/components/WeightTracker";
import RewardsModal from "@/components/RewardsModal";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Food", href: "#food" },
  { label: "Workouts", href: "#workouts" },
  { label: "Progress", href: "#progress" },
];

export default function Index() {
  const [showRewards, setShowRewards] = useState(false);

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
              <a
                href={link.href}
                className={`story-link px-3 py-1 rounded ${
                  link.active
                    ? "bg-blue-100 text-blue-800 shadow"
                    : "hover:bg-blue-50 text-gray-600"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Rewards Section */}
        <div className="ml-4">
          <button 
            onClick={() => setShowRewards(true)}
            className="relative px-3 py-1 rounded hover:bg-blue-50 text-gray-600 flex items-center gap-2"
          >
            Rewards
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </div>
          </button>
        </div>

        <div className="ml-auto text-sm text-gray-400 hidden md:block">
          {new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
        </div>
      </nav>

      {/* Rewards Modal */}
      {showRewards && <RewardsModal onClose={() => setShowRewards(false)} />}

      {/* Dashboard Stats Overview */}
      <div className="px-6 mb-8" style={{maxWidth: 1600, width: "100%", margin: "0 auto"}}>
        <DashboardStats />
      </div>

      <main className="flex flex-col gap-8 px-6 pb-8" style={{maxWidth: 1600, width: "100%", margin: "0 auto"}}>
        {/* Top row - Food & Workouts */}
        <div className="flex flex-1 gap-8">
          {/* Left column - Food */}
          <div className="w-full md:w-1/2">
            <FoodTracker />
          </div>
          
          {/* Right column - Workouts */}
          <div className="w-full md:w-1/2">
            <WorkoutTracker />
          </div>
        </div>
        
        {/* Bottom row - Weight Tracker (Full Width) */}
        <div className="w-full">
          <WeightTracker />
        </div>
      </main>
      
      <footer className="w-full text-center py-3 text-gray-400 text-xs mt-auto">
        &copy; {new Date().getFullYear()} FitTrack Pro. Your all-in-one fitness companion.
      </footer>
    </div>
  );
}
