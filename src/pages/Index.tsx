
import FoodTracker from "@/components/FoodTracker";
import WorkoutTracker from "@/components/WorkoutTracker";
import DashboardStats from "@/components/DashboardStats";
import WeightTracker from "@/components/WeightTracker";
import { useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Dashboard", href: "/", active: true },
  { label: "Food", href: "/food", active: false },
  { label: "Workouts", href: "/workouts", active: false },
  { label: "Progress", href: "/progress", active: false },
  { label: "Rewards", href: "/rewards", active: false },
];

export default function Index() {
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      {/* Mobile-optimized Top Navigation */}
      <nav className="w-full flex items-center px-4 md:px-10 py-3 md:py-4 shadow mb-4 md:mb-8 bg-white/80 backdrop-blur-sm z-10">
        <div className="text-xl md:text-2xl font-extrabold tracking-tight text-black mr-4 md:mr-10 select-none">
          Momentum
        </div>
        
        {/* Mobile navigation - horizontal scroll */}
        <div className="flex-1 overflow-x-auto">
          <ul className="flex gap-1 md:gap-2 text-sm md:text-base font-medium whitespace-nowrap">
            {NAV_LINKS.map((link, i) => (
              <li key={i}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`story-link px-2 md:px-3 py-1.5 md:py-1 rounded min-w-max ${
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
        </div>

        <div className="ml-2 text-xs md:text-sm text-gray-400 hidden sm:block">
          {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </div>
      </nav>

      {/* Dashboard Stats Overview */}
      <div className="px-4 md:px-6 mb-4 md:mb-8 max-w-7xl w-full mx-auto">
        <DashboardStats />
      </div>

      <main className="flex flex-col gap-4 md:gap-8 px-4 md:px-6 pb-8 max-w-7xl w-full mx-auto">
        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Food Tracker */}
          <div className="w-full lg:w-1/2">
            <FoodTracker />
          </div>
          
          {/* Workout Tracker */}
          <div className="w-full lg:w-1/2">
            <WorkoutTracker />
          </div>
        </div>
        
        {/* Weight Tracker (Full Width) */}
        <div className="w-full">
          <WeightTracker />
        </div>
      </main>
      
      <footer className="w-full text-center py-3 text-gray-400 text-xs mt-auto">
        &copy; {new Date().getFullYear()} Momentum. Your all-in-one fitness companion.
      </footer>
    </div>
  );
}
