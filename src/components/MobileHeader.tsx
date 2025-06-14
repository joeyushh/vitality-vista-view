
import { Calendar } from "lucide-react";

interface MobileHeaderProps {
  title?: string;
  showDate?: boolean;
}

export default function MobileHeader({ title = "Momentum", showDate = true }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 z-40">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {showDate && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={16} />
            <span>{new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
          </div>
        )}
      </div>
    </header>
  );
}
