
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useMobileApp } from "@/hooks/useMobileApp";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import Index from "./pages/Index";
import Food from "./pages/Food";
import Workouts from "./pages/Workouts";
import Progress from "./pages/Progress";
import Rewards from "./pages/Rewards";
import NotFound from "./pages/NotFound";
import { useEffect } from 'react';

const queryClient = new QueryClient();

const App = () => {
  const { isNative, platform, isIOS } = useMobileApp();

  useEffect(() => {
    // iOS-specific viewport and app configurations
    if (isIOS && isNative) {
      // Prevent zoom on input focus
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover'
        );
      }

      // Add iOS-specific body classes
      document.body.classList.add('ios-native-app');
      
      // Disable text selection for better native feel - using proper typing
      const bodyStyle = document.body.style as any;
      bodyStyle.webkitUserSelect = 'none';
      bodyStyle.webkitTouchCallout = 'none';
    }
  }, [isIOS, isNative]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SafeAreaWrapper className={`min-h-screen ${isNative ? 'native-app' : 'web-app'} ${isIOS ? 'ios-app' : ''}`}>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/food" element={<Food />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </SafeAreaWrapper>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
