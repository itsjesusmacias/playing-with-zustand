import { Button } from "@/components/ui/button";
import { formatTime } from "@/helpers/date";
import { useStopwatch } from "@/hooks/use-stopwatch";
import { Pause, Play } from "lucide-react";

const Stopwatch = () => {
  const { displayTime, isRunning, startTimer, pauseTimer } = useStopwatch();

  return (
    <div className="flex justify-between items-center mb-8">
      <Button
        onClick={isRunning ? pauseTimer : startTimer}
        variant="outline"
        className="w-40 flex items-center justify-between"
      >
        {isRunning ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
        <span>{formatTime(displayTime)}</span>
      </Button>
    </div>
  );
};

export { Stopwatch };
