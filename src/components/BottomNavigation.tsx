
import { Home, Utensils, Activity, TrendingUp, Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMobileApp } from "@/hooks/useMobileApp";

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
  const { isIOS, isNative } = useMobileApp();

  const handleNavClick = async (href: string) => {
    // Add haptic feedback for iOS
    if (isIOS && isNative) {
      try {
        const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch (error) {
        console.warn('Haptic feedback failed:', error);
      }
    }
    navigate(href);
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-4 py-2 z-50 ${
      isIOS ? 'ios-safe-area' : 'safe-area-pb'
    } ${isNative ? 'native-tab-bar' : ''}`}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 min-w-[60px] min-h-[44px] ios-button mobile-button touch-feedback ${
                isActive
                  ? "bg-blue-100 text-blue-600 scale-105"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              } ${isIOS ? 'ios-optimized' : ''}`}
            >
              <Icon 
                size={isIOS ? 22 : 20} 
                className={`${isActive ? "text-blue-600" : "text-gray-600"} transition-colors`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs font-medium transition-colors ${
                isActive ? "text-blue-600" : "text-gray-600"
              } ${isIOS ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
