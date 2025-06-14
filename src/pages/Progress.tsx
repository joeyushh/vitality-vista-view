import { Card } from "@/components/ui/card";
import { TrendingUp, Camera, Calendar, Target, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Dashboard", href: "/", active: false },
  { label: "Food", href: "/food", active: false },
  { label: "Workouts", href: "/workouts", active: false },
  { label: "Progress", href: "/progress", active: true },
];

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
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"yearly" | "monthly">("yearly");

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
    }
  };

  const maxWeight = Math.max(...weightData.map(w => w.weight));
  const minWeight = Math.min(...weightData.map(w => w.weight));
  const weightRange = maxWeight - minWeight;
  const currentWeight = weightData[weightData.length - 1].weight;
  const startWeight = weightData[0].weight;
  const totalLoss = startWeight - currentWeight;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="w-full flex items-center px-10 py-4 shadow mb-8 bg-white/80 backdrop-blur-sm z-10">
        <div className="text-2xl font-extrabold tracking-tight text-black mr-10 select-none">
          Momentum
        </div>
        <ul className="flex gap-2 text-base font-medium">
          {NAV_LINKS.map((link, i) => (
            <li key={i}>
              <button
                onClick={() => handleNavClick(link.href)}
                className={`story-link px-3 py-1 rounded ${
                  link.active
                    ? "bg-blue-100 text-blue-800 shadow"
                    : "hover:bg-blue-50 text-gray-600"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="ml-auto text-sm text-gray-400 hidden md:block">
          {new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
        </div>
      </nav>

      <div className="px-6 pb-8" style={{maxWidth: 1600, width: "100%", margin: "0 auto"}}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Weight Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-purple-800 mb-4">Progress Overview</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-800">{currentWeight} kg</div>
                  <div className="text-xs text-purple-600">Current Weight</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-800">-{totalLoss.toFixed(1)} kg</div>
                  <div className="text-xs text-purple-600">Total Lost</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-800">{recentPhotos.length}</div>
                  <div className="text-xs text-purple-600">Progress Photos</div>
                </div>
              </div>
            </Card>

            {/* Weight Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-purple-800">Weight Trend</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setViewMode("monthly")}
                    className={`px-3 py-1 rounded text-sm ${viewMode === "monthly" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800"}`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setViewMode("yearly")}
                    className={`px-3 py-1 rounded text-sm ${viewMode === "yearly" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800"}`}
                  >
                    Yearly
                  </button>
                </div>
              </div>
              
              <div className="h-64 bg-purple-50 rounded-lg p-4">
                <svg className="w-full h-full" viewBox="0 0 800 200">
                  <defs>
                    <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map(i => (
                    <line key={i} x1="40" y1={40 + i * 30} x2="760" y2={40 + i * 30} stroke="#e5e7eb" strokeWidth="1" />
                  ))}
                  
                  {/* Weight line */}
                  <polyline
                    fill="none"
                    stroke="#a855f7"
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
                        fill="#a855f7"
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
          </div>

          {/* Right Column - Photos & Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-purple-800 mb-4">Track Progress</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <TrendingUp size={20} />
                  Log Weight
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-purple-100 text-purple-800 border border-purple-300 rounded-lg hover:bg-purple-200 transition-colors">
                  <Camera size={20} />
                  Take Progress Photo
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-purple-100 text-purple-800 border border-purple-300 rounded-lg hover:bg-purple-200 transition-colors">
                  <Upload size={20} />
                  Upload Photo
                </button>
              </div>
            </Card>

            {/* Recent Progress Photos */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-purple-800 mb-4">Progress Photos</h2>
              <div className="grid grid-cols-2 gap-3">
                {recentPhotos.map((photo, i) => (
                  <div key={i} className="aspect-square bg-purple-50 rounded-lg border-2 border-dashed border-purple-300 flex flex-col items-center justify-center">
                    <Camera size={24} className="text-purple-400 mb-2" />
                    <div className="text-xs text-purple-600 text-center">
                      <div className="font-medium">{photo.type}</div>
                      <div>{photo.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-purple-600 hover:text-purple-800 transition-colors">
                View All Photos
              </button>
            </Card>

            {/* Progress Tips */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target size={20} className="text-purple-600" />
                <h2 className="text-xl font-semibold text-purple-800">Progress Tips</h2>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-1">Consistent Photos</div>
                  <div>Take photos at the same time of day and in the same lighting for best comparison.</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-1">Weekly Weigh-ins</div>
                  <div>Weight fluctuates daily. Weekly averages give a better picture of progress.</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-1">Multiple Angles</div>
                  <div>Front, side, and back photos help track changes from all perspectives.</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <footer className="w-full text-center py-3 text-gray-400 text-xs mt-auto">
        &copy; {new Date().getFullYear()} Momentum. Your all-in-one fitness companion.
      </footer>
    </div>
  );
}
