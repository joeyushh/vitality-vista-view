import { Card } from "@/components/ui/card";
import { Weight, Plus, TrendingDown } from "lucide-react";
import { useState } from "react";
import TrackingModal from "./TrackingModal";

const recentWeights = [
  { date: "Today", weight: 78.2, change: -0.3 },
  { date: "Yesterday", weight: 78.5, change: -0.1 },
  { date: "2 days ago", weight: 78.6, change: +0.2 },
  { date: "3 days ago", weight: 78.4, change: -0.4 },
  { date: "4 days ago", weight: 78.8, change: +0.1 },
  { date: "5 days ago", weight: 78.7, change: -0.2 },
  { date: "6 days ago", weight: 78.9, change: +0.3 },
];

export default function WeightTracker() {
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  
  const maxWeight = Math.max(...recentWeights.map(w => w.weight));
  const minWeight = Math.min(...recentWeights.map(w => w.weight));
  const weightRange = maxWeight - minWeight;

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
            <div className="text-2xl font-bold text-red-800 mb-1">78.2 kg</div>
            <div className="flex items-center justify-center gap-1 text-sm text-green-600">
              <TrendingDown size={14} />
              <span>0.3 kg from yesterday</span>
            </div>
            <div className="mt-2 text-xs text-red-600">
              Keep it up! You're on track.
            </div>
          </div>
        </div>

        {/* Weight Graph - Simplified for Mobile */}
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
                  const y = 50 - ((w.weight - minWeight) / (weightRange || 1)) * 30;
                  return `${x},${y}`;
                }).join(' ')}
              />
              
              {/* Data points */}
              {recentWeights.map((w, i) => {
                const x = (i / (recentWeights.length - 1)) * 280 + 10;
                const y = 50 - ((w.weight - minWeight) / (weightRange || 1)) * 30;
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
                  const y = 50 - ((w.weight - minWeight) / (weightRange || 1)) * 30;
                  return `${x},${y}`;
                }).join(' ')} 290,50`}
              />
            </svg>
          </div>
        </div>

        {/* Recent Entries - Compact Mobile View */}
        <div className="space-y-2">
          <h3 className="font-semibold text-red-800 text-sm">Recent Entries</h3>
          {recentWeights.reverse().slice(0, 3).map((entry, i) => (
            <div key={i} className="flex justify-between items-center py-2 px-3 bg-red-50 rounded-lg">
              <span className="text-sm text-gray-600">{entry.date}</span>
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
