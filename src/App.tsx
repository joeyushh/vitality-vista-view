
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMobileApp } from "@/hooks/useMobileApp";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import Index from "./pages/Index";
import Food from "./pages/Food";
import Workouts from "./pages/Workouts";
import Progress from "./pages/Progress";
import Rewards from "./pages/Rewards";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { isNative, platform } = useMobileApp();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SafeAreaWrapper className={`min-h-screen ${isNative ? 'native-app' : 'web-app'}`}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/food" element={<Food />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SafeAreaWrapper>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
