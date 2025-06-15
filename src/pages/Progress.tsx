import { Card } from "@/components/ui/card";
import { TrendingUp, Camera, Calendar, Target, Upload, MessageCircle, Edit } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import MobileHeader from "@/components/MobileHeader";
import StrengthProgressChart from "@/components/StrengthProgressChart";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const weightData = [
  { date: "2024-01-01", weight: 82.1, photos: 2 },
  { date: "2024-02-01", weight: 81.8, photos: 2 },
  { date: "2024-03-01", weight: 80.9, photos: 2 },
  { date: "2024-04-01", weight: 80.2, photos: 2 },
  { date: "2024-05-01", weight: 79.8, photos: 2 },
  { date: "2024-06-01", weight: 79.1, photos: 2 },
  { date: "2024-07-01", weight: 78.7, photos: 1 },
  { date: "2024-08-01", weight: 78.4, photos: 2 },
  { date: "2024-09-01", weight: 78.1, photos: 2 },
  { date: "2024-10-01", weight: 78.0, photos: 1 },
  { date: "2024-11-01", weight: 78.3, photos: 2 },
  { date: "2024-12-01", weight: 78.2, photos: 2 },
];

const recentPhotos = [
  { date: "Today", type: "Front", url: null },
  { date: "Today", type: "Side", url: null },
  { date: "Last Week", type: "Front", url: null },
  { date: "Last Week", type: "Side", url: null },
];

export default function Progress() {
  const [viewMode, setViewMode] = useState<"yearly" | "monthly">("yearly");
  const [goalWeight, setGoalWeight] = useState(75);
  const [editingGoalWeight, setEditingGoalWeight] = useState(false);
  const [tempGoalWeight, setTempGoalWeight] = useState(goalWeight);
  const { toast } = useToast();

  const maxWeight = Math.max(...weightData.map(w => w.weight));
  const minWeight = Math.min(...weightData.map(w => w.weight));
  const weightRange = maxWeight - minWeight;
  const currentWeight = weightData[weightData.length - 1].weight;
  const startWeight = weightData[0].weight;
  const totalLoss = startWeight - currentWeight;
  const remainingToGoal = currentWeight - goalWeight;

  const handleAITipsClick = () => {
    toast({
      title: "AI Progress Assistant",
      description: "AI chatbot for progress tips would open here",
    });
    console.log("Opening AI chatbot for progress tips...");
  };

  const handleGoalWeightEdit = () => {
    setTempGoalWeight(goalWeight);
    setEditingGoalWeight(true);
  };

  const handleGoalWeightSave = () => {
    setGoalWeight(tempGoalWeight);
    setEditingGoalWeight(false);
    toast({
      title: "Goal Updated",
      description: `Your goal weight has been updated to ${tempGoalWeight} kg`,
    });
  };

  const handleGoalWeightCancel = () => {
    setTempGoalWeight(goalWeight);
    setEditingGoalWeight(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col pb-20">
      <MobileHeader title="Progress" />

      <div className="flex-1 px-4 py-4 space-y-6">
        {/* Progress Overview */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-red-800 mb-4">Progress Overview</h2>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-red-800">{currentWeight} kg</div>
              <div className="text-xs text-red-600">Current</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center relative">
              {editingGoalWeight ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    value={tempGoalWeight}
                    onChange={(e) => setTempGoalWeight(Number(e.target.value))}
                    className="text-xl font-bold text-red-800 bg-transparent text-center w-full border-b border-red-300 outline-none"
                    step="0.1"
                  />
                  <div className="flex gap-1 justify-center">
                    <button
                      onClick={handleGoalWeightSave}
                      className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleGoalWeightCancel}
                      className="text-xs bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-xl font-bold text-red-800">{goalWeight} kg</div>
                  <button
                    onClick={handleGoalWeightEdit}
                    className="absolute top-1 right-1 p-1 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Edit size={12} />
                  </button>
                </>
              )}
              <div className="text-xs text-red-600">Goal</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-red-800">-{totalLoss.toFixed(1)} kg</div>
              <div className="text-xs text-red-600">Lost</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-red-800">{remainingToGoal.toFixed(1)} kg</div>
              <div className="text-xs text-red-600">To Goal</div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-red-800 mb-4">Track Progress</h2>
          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center gap-3 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors active:scale-98">
              <TrendingUp size={20} />
              <span className="font-medium">Log Weight</span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-2 p-3 bg-red-100 text-red-800 border border-red-300 rounded-lg hover:bg-red-200 transition-colors active:scale-98">
                <Camera size={18} />
                <span className="text-sm font-medium">Take Photo</span>
              </button>
              <button className="flex items-center gap-2 p-3 bg-red-100 text-red-800 border border-red-300 rounded-lg hover:bg-red-200 transition-colors active:scale-98">
                <Upload size={18} />
                <span className="text-sm font-medium">Upload</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Weight Chart - Mobile Optimized */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-red-800">Weight Trend</h2>
            <div className="flex gap-1">
              <button 
                onClick={() => setViewMode("monthly")}
                className={`px-3 py-1 rounded text-xs ${viewMode === "monthly" ? "bg-red-600 text-white" : "bg-red-100 text-red-800"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setViewMode("yearly")}
                className={`px-3 py-1 rounded text-xs ${viewMode === "yearly" ? "bg-red-600 text-white" : "bg-red-100 text-red-800"}`}
              >
                Yearly
              </button>
            </div>
          </div>
          
          <div className="h-48 bg-red-50 rounded-lg p-3">
            <svg className="w-full h-full" viewBox="0 0 800 200">
              <defs>
                <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="40" y1={40 + i * 30} x2="760" y2={40 + i * 30} stroke="#e5e7eb" strokeWidth="1" />
              ))}
              
              {/* Weight line */}
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                points={weightData.map((w, i) => {
                  const x = 40 + (i / (weightData.length - 1)) * 720;
                  const y = 160 - ((w.weight - minWeight) / (weightRange || 1)) * 120;
                  return `${x},${y}`;
                }).join(' ')}
              />
              
              {/* Data points */}
              {weightData.map((w, i) => {
                const x = 40 + (i / (weightData.length - 1)) * 720;
                const y = 160 - ((w.weight - minWeight) / (weightRange || 1)) * 120;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}
              
              {/* Fill area under line */}
              <polygon
                fill="url(#weightGradient)"
                points={`40,160 ${weightData.map((w, i) => {
                  const x = 40 + (i / (weightData.length - 1)) * 720;
                  const y = 160 - ((w.weight - minWeight) / (weightRange || 1)) * 120;
                  return `${x},${y}`;
                }).join(' ')} 760,160`}
              />
              
              {/* Y-axis labels */}
              {[minWeight, (minWeight + maxWeight) / 2, maxWeight].map((weight, i) => (
                <text key={i} x="30" y={165 - i * 60} fontSize="12" fill="#6b7280" textAnchor="end">
                  {weight.toFixed(1)}kg
                </text>
              ))}
              
              {/* X-axis labels */}
              {weightData.map((w, i) => {
                if (i % 3 === 0) {
                  const x = 40 + (i / (weightData.length - 1)) * 720;
                  const month = new Date(w.date).toLocaleDateString(undefined, { month: "short" });
                  return (
                    <text key={i} x={x} y="185" fontSize="12" fill="#6b7280" textAnchor="middle">
                      {month}
                    </text>
                  );
                }
                return null;
              })}
            </svg>
          </div>
        </Card>

        {/* Strength Progression Chart */}
        <StrengthProgressChart />

        {/* Progress Photos */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-red-800 mb-4">Progress Photos</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {recentPhotos.map((photo, i) => (
              <div key={i} className="aspect-square bg-red-50 rounded-lg border-2 border-dashed border-red-300 flex flex-col items-center justify-center">
                <Camera size={20} className="text-red-400 mb-1" />
                <div className="text-xs text-red-600 text-center">
                  <div className="font-medium">{photo.type}</div>
                  <div>{photo.date}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2 text-sm text-red-600 hover:text-red-800 transition-colors">
            View All Photos
          </button>
        </Card>

        {/* Progress Tips */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} className="text-red-600" />
            <h2 className="text-lg font-semibold text-red-800">Tracking Tips</h2>
          </div>
          <div className="space-y-3 text-sm mb-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-800 mb-1">📸 Consistent Photos</div>
              <div className="text-yellow-700">Same time, same lighting, same pose</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-800 mb-1">⚖️ Weekly Weigh-ins</div>
              <div className="text-yellow-700">Weekly averages show true progress</div>
            </div>
          </div>
          <button 
            onClick={handleAITipsClick}
            className="w-full flex items-center justify-center gap-2 p-3 bg-red-100 text-red-800 border border-red-300 rounded-lg hover:bg-red-200 transition-colors"
          >
            <MessageCircle size={18} />
            Do you need more tips?
          </button>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
}
