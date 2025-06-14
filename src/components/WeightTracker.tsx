
import { Card } from "@/components/ui/card";
import { Weight } from "lucide-react";

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
  const maxWeight = Math.max(...recentWeights.map(w => w.weight));
  const minWeight = Math.min(...recentWeights.map(w => w.weight));
  const weightRange = maxWeight - minWeight;

  return (
    <Card className="p-6 shadow-lg animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center justify-center rounded-full bg-purple-50 p-2">
          <Weight size={22} className="text-purple-600" />
        </span>
        <h2 className="text-2xl font-bold tracking-tight">Weight Progress</h2>
        <button className="ml-auto px-3 py-1 bg-purple-600 text-white rounded shadow hover:scale-105 transition-transform">
          Add Weight
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Weight Display */}
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-800">78.2 kg</div>
            <div className="text-sm text-purple-600 flex items-center justify-center gap-1">
              <span className="text-green-600">↓ 0.3 kg</span> from yesterday
            </div>
          </div>
        </div>

        {/* Weight Graph */}
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-purple-800">7-Day Trend</div>
          </div>
          <div className="relative h-20">
            <svg className="w-full h-full" viewBox="0 0 300 80">
              <defs>
                <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="0" y1="40" x2="300" y2="40" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Weight line */}
              <polyline
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                points={recentWeights.reverse().map((w, i) => {
                  const x = (i / (recentWeights.length - 1)) * 280 + 10;
                  const y = 70 - ((w.weight - minWeight) / (weightRange || 1)) * 50;
                  return `${x},${y}`;
                }).join(' ')}
              />
              
              {/* Data points */}
              {recentWeights.map((w, i) => {
                const x = (i / (recentWeights.length - 1)) * 280 + 10;
                const y = 70 - ((w.weight - minWeight) / (weightRange || 1)) * 50;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#a855f7"
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}
              
              {/* Fill area under line */}
              <polygon
                fill="url(#weightGradient)"
                points={`10,70 ${recentWeights.map((w, i) => {
                  const x = (i / (recentWeights.length - 1)) * 280 + 10;
                  const y = 70 - ((w.weight - minWeight) / (weightRange || 1)) * 50;
                  return `${x},${y}`;
                }).join(' ')} 290,70`}
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <h3 className="font-semibold text-purple-800 mb-3">Recent Entries</h3>
        {recentWeights.reverse().slice(0, 4).map((entry, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-sm text-gray-600">{entry.date}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{entry.weight} kg</span>
              <span className={`text-xs px-2 py-1 rounded ${
                entry.change > 0 
                  ? 'bg-red-50 text-red-600' 
                  : entry.change < 0 
                    ? 'bg-green-50 text-green-600'
                    : 'bg-gray-50 text-gray-600'
              }`}>
                {entry.change > 0 ? '+' : ''}{entry.change} kg
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Weigh yourself at the same time each day for consistency
      </div>
    </Card>
  );
}
