
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const strengthData = [
  { session: "Week 1", push: 100, pull: 90, legs: 110 },
  { session: "Week 2", push: 102, pull: 92, legs: 112 },
  { session: "Week 3", push: 105, pull: 95, legs: 115 },
  { session: "Week 4", push: 107, pull: 97, legs: 118 },
  { session: "Week 5", push: 110, pull: 100, legs: 120 },
  { session: "Week 6", push: 112, pull: 102, legs: 123 },
];

export default function StrengthProgressChart() {
  const calculateGrowth = (data: any[], key: string) => {
    const first = data[0][key];
    const last = data[data.length - 1][key];
    return Math.round(((last - first) / first) * 100);
  };

  const pushGrowth = calculateGrowth(strengthData, 'push');
  const pullGrowth = calculateGrowth(strengthData, 'pull');
  const legsGrowth = calculateGrowth(strengthData, 'legs');

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-blue-600" size={18} />
        <h3 className="text-lg font-semibold text-blue-800">Strength Progression</h3>
      </div>
      
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={strengthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="session" />
            <YAxis label={{ value: 'Weight (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="push" stroke="#ef4444" strokeWidth={2} name="Push" />
            <Line type="monotone" dataKey="pull" stroke="#3b82f6" strokeWidth={2} name="Pull" />
            <Line type="monotone" dataKey="legs" stroke="#10b981" strokeWidth={2} name="Legs" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-lg font-bold text-red-600">+{pushGrowth}%</div>
          <div className="text-xs text-gray-600">Push Growth</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold text-blue-600">+{pullGrowth}%</div>
          <div className="text-xs text-gray-600">Pull Growth</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-600">+{legsGrowth}%</div>
          <div className="text-xs text-gray-600">Legs Growth</div>
        </div>
      </div>
    </Card>
  );
}
