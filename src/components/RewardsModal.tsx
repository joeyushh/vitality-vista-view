
import { Card } from "@/components/ui/card";
import { X, Star, Target, Calendar } from "lucide-react";

interface RewardsModalProps {
  onClose: () => void;
}

const userGoals = {
  dailyCalories: 2200,
  dailyProtein: 220,
  weeklyWorkouts: 5,
  dailySteps: 10000,
  dailySleep: 8 // hours
};

const weeklyProgress = [
  { 
    day: "Monday", 
    caloriesHit: true, 
    proteinHit: true, 
    workoutDone: true, 
    stepsHit: true, 
    sleepHit: true, 
    creditsEarned: 5 
  },
  { 
    day: "Tuesday", 
    caloriesHit: true, 
    proteinHit: false, 
    workoutDone: true, 
    stepsHit: true, 
    sleepHit: false, 
    creditsEarned: 3 
  },
  { 
    day: "Wednesday", 
    caloriesHit: true, 
    proteinHit: true, 
    workoutDone: false, 
    stepsHit: false, 
    sleepHit: true, 
    creditsEarned: 3 
  },
  { 
    day: "Thursday", 
    caloriesHit: false, 
    proteinHit: true, 
    workoutDone: true, 
    stepsHit: true, 
    sleepHit: true, 
    creditsEarned: 4 
  },
  { 
    day: "Friday", 
    caloriesHit: true, 
    proteinHit: true, 
    workoutDone: true, 
    stepsHit: true, 
    sleepHit: true, 
    creditsEarned: 5 
  },
  { 
    day: "Saturday", 
    caloriesHit: true, 
    proteinHit: false, 
    workoutDone: false, 
    stepsHit: false, 
    sleepHit: false, 
    creditsEarned: 1 
  },
  { 
    day: "Today", 
    caloriesHit: true, 
    proteinHit: true, 
    workoutDone: true, 
    stepsHit: true, 
    sleepHit: false, 
    creditsEarned: 4 
  }
];

const availableRewards = [
  { name: "Free Smoothie", location: "Local Gym", cost: 15, credits: "15 credits", available: true },
  { name: "50% Off Chipotle Bowl", location: "Chipotle", cost: 8, credits: "8 credits", available: true },
  { name: "20% Off Nike Shoes", location: "Nike Store", cost: 25, credits: "25 credits", available: true },
  { name: "Free Protein Bar", location: "Supplement Store", cost: 5, credits: "5 credits", available: true }
];

const totalCredits = weeklyProgress.reduce((sum, day) => sum + day.creditsEarned, 0);

export default function RewardsModal({ onClose }: RewardsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Star className="text-yellow-500" size={28} />
              <h2 className="text-3xl font-bold">Rewards Center</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* Credits Summary */}
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-orange-800">Your Credits</h3>
                <p className="text-orange-600">Earned by hitting your daily goals</p>
              </div>
              <div className="text-4xl font-bold text-orange-600">{totalCredits}</div>
            </div>
          </div>

          {/* Your Goals Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="text-blue-600" size={20} />
              <h3 className="text-xl font-semibold">Your Goals & Credits</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{userGoals.dailyCalories}</div>
                <div className="text-sm text-gray-600">Calories per day</div>
                <div className="text-xs text-orange-600 font-medium mt-1">+1 credit</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{userGoals.dailyProtein}g</div>
                <div className="text-sm text-gray-600">Protein per day</div>
                <div className="text-xs text-orange-600 font-medium mt-1">+1 credit</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{userGoals.weeklyWorkouts}</div>
                <div className="text-sm text-gray-600">Workouts per week</div>
                <div className="text-xs text-orange-600 font-medium mt-1">+1 credit</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{userGoals.dailySteps.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Steps per day</div>
                <div className="text-xs text-orange-600 font-medium mt-1">+1 credit</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{userGoals.dailySleep}hrs</div>
                <div className="text-sm text-gray-600">Sleep per night</div>
                <div className="text-xs text-orange-600 font-medium mt-1">+1 credit</div>
              </div>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-purple-600" size={20} />
              <h3 className="text-xl font-semibold">This Week's Progress</h3>
            </div>
            <div className="space-y-2">
              {weeklyProgress.map((day, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">{day.day}</div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <span className={`w-3 h-3 rounded-full ${day.caloriesHit ? 'bg-green-500' : 'bg-gray-300'}`} title="Calories"></span>
                      <span className={`w-3 h-3 rounded-full ${day.proteinHit ? 'bg-green-500' : 'bg-gray-300'}`} title="Protein"></span>
                      <span className={`w-3 h-3 rounded-full ${day.workoutDone ? 'bg-blue-500' : 'bg-gray-300'}`} title="Workout"></span>
                      <span className={`w-3 h-3 rounded-full ${day.stepsHit ? 'bg-blue-500' : 'bg-gray-300'}`} title="Steps"></span>
                      <span className={`w-3 h-3 rounded-full ${day.sleepHit ? 'bg-purple-500' : 'bg-gray-300'}`} title="Sleep"></span>
                    </div>
                    <div className="text-sm font-medium text-orange-600">
                      +{day.creditsEarned} credits
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Food Goals
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Activity Goals
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                Sleep Goal
              </span>
            </div>
          </div>

          {/* Available Rewards */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Available Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableRewards.map((reward, i) => (
                <div key={i} className={`p-4 rounded-lg border-2 ${
                  reward.available 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50 opacity-75'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{reward.name}</h4>
                    <span className={`text-sm px-2 py-1 rounded ${
                      reward.available 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {reward.credits}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">{reward.location}</div>
                  <button className={`w-full py-2 px-4 rounded font-medium ${
                    reward.available 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`} disabled={!reward.available}>
                    {reward.available ? 'Redeem' : 'Not Enough Credits'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
