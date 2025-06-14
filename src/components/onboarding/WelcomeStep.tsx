
import { Button } from "@/components/ui/button";
import { Coins, Target, TrendingUp } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Momentum
        </h1>
        
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Welcome to the place that makes it as easy as possible to get the results you need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="text-center p-4">
          <Target className="text-blue-500 mx-auto mb-2" size={24} />
          <h3 className="font-semibold text-sm">Personalized Goals</h3>
          <p className="text-xs text-gray-600">Custom targets based on your needs</p>
        </div>
        
        <div className="text-center p-4">
          <TrendingUp className="text-green-500 mx-auto mb-2" size={24} />
          <h3 className="font-semibold text-sm">Track Progress</h3>
          <p className="text-xs text-gray-600">Monitor your fitness journey</p>
        </div>
        
        <div className="text-center p-4">
          <Coins className="text-purple-500 mx-auto mb-2" size={24} />
          <h3 className="font-semibold text-sm">Earn Rewards</h3>
          <p className="text-xs text-gray-600">Get credits for hitting goals</p>
        </div>
      </div>

      <Button onClick={onNext} className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
        Let's Get Started
      </Button>
    </div>
  );
}
