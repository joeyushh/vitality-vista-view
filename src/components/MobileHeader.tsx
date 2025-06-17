import { Calendar, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMobileApp } from "@/hooks/useMobileApp";

interface MobileHeaderProps {
  title?: string;
  showDate?: boolean;
  onOpenCreditGoalsModal?: () => void;
}

export default function MobileHeader({ 
  title = "Momentum", 
  showDate = true,
  onOpenCreditGoalsModal 
}: MobileHeaderProps) {
  const { toast } = useToast();
  const { isNative, platform, deviceInfo } = useMobileApp();

  const handleClearData = () => {
    localStorage.clear();
    toast({
      title: "Data Cleared",
      description: "All local data has been cleared. Refresh to restart onboarding.",
    });
  };

  const handleExportData = () => {
    const data = {
      onboarding: localStorage.getItem('onboarding_data'),
      profile: localStorage.getItem('user_profile'),
      completed: localStorage.getItem('onboarding_completed'),
      platform: platform,
      deviceInfo: deviceInfo
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'momentum-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "Your data has been downloaded as a JSON file.",
    });
  };

  const handleRestartOnboarding = () => {
    localStorage.removeItem('onboarding_completed');
    localStorage.removeItem('onboarding_data');
    localStorage.removeItem('user_profile');
    window.location.reload();
  };

  const handleToggleTheme = () => {
    toast({
      title: "Theme Toggle",
      description: "Dark mode coming soon!",
    });
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "Notification settings coming soon!",
    });
  };

  const handlePrivacy = () => {
    toast({
      title: "Privacy Settings",
      description: "Privacy controls coming soon!",
    });
  };

  const handleSupport = () => {
    toast({
      title: "Support",
      description: "Support center coming soon!",
    });
  };

  return (
    <header className={`sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 z-40 ${isNative ? 'safe-area-pt' : ''}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center gap-3">
          {showDate && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} />
              <span>{new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
            </div>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 mobile-button touch-feedback">
                <Settings size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Settings {isNative && `(${platform})`}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {onOpenCreditGoalsModal && (
                <>
                  <DropdownMenuItem onClick={onOpenCreditGoalsModal}>
                    Edit Credit Goals
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              
              <DropdownMenuItem onClick={handleToggleTheme}>
                Theme Settings
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={handleNotifications}>
                Notifications
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={handlePrivacy}>
                Privacy & Security
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={handleExportData}>
                Export Data
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={handleRestartOnboarding}>
                Restart Onboarding
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={handleClearData} className="text-red-600">
                Clear All Data
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={handleSupport}>
                Help & Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
