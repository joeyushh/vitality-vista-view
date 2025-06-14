
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DateNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DateNavigation({ currentDate, onDateChange }: DateNavigationProps) {
  const { toast } = useToast();

  const handlePreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    onDateChange(previousDay);
    toast({
      title: "Day Changed",
      description: `Viewing data for ${previousDay.toLocaleDateString()}`,
    });
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    onDateChange(nextDay);
    toast({
      title: "Day Changed",
      description: `Viewing data for ${nextDay.toLocaleDateString()}`,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={handlePreviousDay}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <ChevronLeft size={20} />
        Previous
      </button>
      
      <h1 className="text-xl font-bold text-gray-800">
        {currentDate.toLocaleDateString(undefined, { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric'
        })}
      </h1>
      
      <button
        onClick={handleNextDay}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
      >
        Next
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
