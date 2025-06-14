
import { Home, Utensils, Activity, TrendingUp, Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Food", href: "/food", icon: Utensils },
  { label: "Workouts", href: "/workouts", icon: Activity },
  { label: "Progress", href: "/progress", icon: TrendingUp },
  { label: "Rewards", href: "/rewards", icon: Star },
];

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (href: string) => {
    navigate(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px] ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <Icon size={20} className={isActive ? "text-blue-600" : "text-gray-600"} />
              <span className={`text-xs font-medium ${isActive ? "text-blue-600" : "text-gray-600"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
