import { Button } from "@/components/ui/button";
import { formatTime } from "@/helpers/date";
import { useCountdown } from "@/hooks/use-countdown";
import { Pause, Play } from "lucide-react";

const CountdownTimer = () => {
  // TODO Pendiente poder iniciar el initialTime para hacer funcionar el countdown
  const { displayTime, isRunning, startTimer, pauseTimer } = useCountdown();

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

export { CountdownTimer };
