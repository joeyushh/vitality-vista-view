
import { Card } from "@/components/ui/card";
import { Weight, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import TrackingModal from "./TrackingModal";
import { useAppData } from "@/hooks/useAppData";

export default function WeightTracker() {
  const { weightEntries } = useAppData();
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  
  const recentWeights = weightEntries.slice(0, 7);
  const currentWeight = recentWeights[0] || { weight: 0, change: 0 };
  
  const maxWeight = Math.max(...recentWeights.map(w => w.weight));
  const minWeight = Math.min(...recentWeights.map(w => w.weight));
  const weightRange = maxWeight - minWeight || 1;

  const handleAddWeightClick = () => {
    setShowTrackingModal(true);
  };

  return (
    <>
      <Card className="p-4 shadow-lg animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-full">
            <Weight size={20} className="text-red-600" />
          </div>
          <h2 className="text-lg font-bold text-red-700 flex-1">Weight Progress</h2>
          <button 
            onClick={handleAddWeightClick}
            className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 transition-colors active:scale-95">
            <Plus size={16} />
            <span className="text-sm font-medium">Log</span>
          </button>
        </div>

        {/* Current Weight Display */}
        <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-800 mb-1">{currentWeight.weight} kg</div>
            <div className="flex items-center justify-center gap-1 text-sm">
              {currentWeight.change < 0 ? (
                <>
                  <TrendingDown size={14} className="text-green-600" />
                  <span className="text-green-600">{Math.abs(currentWeight.change)} kg from yesterday</span>
                </>
              ) : currentWeight.change > 0 ? (
                <>
                  <TrendingUp size={14} className="text-red-600" />
                  <span className="text-red-600">+{currentWeight.change} kg from yesterday</span>
                </>
              ) : (
                <span className="text-gray-600">No change from yesterday</span>
              )}
            </div>
            <div className="mt-2 text-xs text-red-600">
              {currentWeight.change < 0 ? "Keep it up! You're on track." : currentWeight.change > 0 ? "Don't worry, stay consistent!" : "Steady progress!"}
            </div>
          </div>
        </div>

        {/* Weight Graph - Simplified for Mobile */}
        {recentWeights.length > 1 && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg">
            <div className="text-center mb-3">
              <div className="text-sm font-semibold text-red-800">7-Day Trend</div>
            </div>
            <div className="relative h-16">
              <svg className="w-full h-full" viewBox="0 0 300 60">
                <defs>
                  <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                
                {/* Weight line */}
                <polyline
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  points={recentWeights.reverse().map((w, i) => {
                    const x = (i / (recentWeights.length - 1)) * 280 + 10;
                    const y = 50 - ((w.weight - minWeight) / weightRange) * 30;
                    return `${x},${y}`;
                  }).join(' ')}
                />
                
                {/* Data points */}
                {recentWeights.map((w, i) => {
                  const x = (i / (recentWeights.length - 1)) * 280 + 10;
                  const y = 50 - ((w.weight - minWeight) / weightRange) * 30;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="2"
                      fill="#ef4444"
                      stroke="white"
                      strokeWidth="1"
                    />
                  );
                })}
                
                {/* Fill area under line */}
                <polygon
                  fill="url(#weightGradient)"
                  points={`10,50 ${recentWeights.map((w, i) => {
                    const x = (i / (recentWeights.length - 1)) * 280 + 10;
                    const y = 50 - ((w.weight - minWeight) / weightRange) * 30;
                    return `${x},${y}`;
                  }).join(' ')} 290,50`}
                />
              </svg>
            </div>
          </div>
        )}

        {/* Recent Entries - Compact Mobile View */}
        <div className="space-y-2">
          <h3 className="font-semibold text-red-800 text-sm">Recent Entries</h3>
          {recentWeights.slice(0, 3).map((entry, i) => (
            <div key={i} className="flex justify-between items-center py-2 px-3 bg-red-50 rounded-lg">
              <span className="text-sm text-gray-600">
                {i === 0 ? 'Today' : `${i} day${i > 1 ? 's' : ''} ago`}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{entry.weight} kg</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  entry.change > 0 
                    ? 'bg-red-100 text-red-600' 
                    : entry.change < 0 
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                }`}>
                  {entry.change > 0 ? '+' : ''}{entry.change}
                </span>
              </div>
            </div>
          ))}
          
          <button className="w-full py-2 text-sm text-red-600 hover:text-red-700 transition-colors">
            View All Entries
          </button>
        </div>

        <div className="mt-3 text-xs text-gray-500 text-center bg-gray-50 p-2 rounded">
          💡 Weigh yourself at the same time each day for best results
        </div>
      </Card>

      {showTrackingModal && (
        <TrackingModal 
          type="weight" 
          onClose={() => setShowTrackingModal(false)} 
        />
      )}
    </>
  );
}
