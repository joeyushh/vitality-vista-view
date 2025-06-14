
import { Card } from "@/components/ui/card";
import { Weight } from "lucide-react";

const recentWeights = [
  { date: "Today", weight: 78.2, change: -0.3 },
  { date: "Yesterday", weight: 78.5, change: -0.1 },
  { date: "2 days ago", weight: 78.6, change: +0.2 },
  { date: "3 days ago", weight: 78.4, change: -0.4 },
];

export default function WeightTracker() {
  return (
    <Card className="p-6 shadow-lg animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center rounded-full bg-purple-50 p-2">
          <Weight size={22} className="text-purple-600" />
        </span>
        <h2 className="text-2xl font-bold tracking-tight">Weight Progress</h2>
        <button className="ml-auto px-3 py-1 bg-purple-600 text-white rounded shadow hover:scale-105 transition-transform">
          Add Weight
        </button>
      </div>

      <div className="mb-4 p-4 bg-purple-50 rounded-lg">
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-800">78.2 kg</div>
          <div className="text-sm text-purple-600 flex items-center justify-center gap-1">
            <span className="text-green-600">↓ 0.3 kg</span> from yesterday
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {recentWeights.map((entry, i) => (
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
