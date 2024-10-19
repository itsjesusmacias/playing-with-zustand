import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Pause, Play } from "lucide-react";
import { questions } from "@/mocks/questions.mock";
import { formatTime } from "@/helpers/date";
import { Question } from "@/components/question/question";

export default function TakeExam() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isEndTestModalOpen, setIsEndTestModalOpen] = useState(false);
  const [isTestEnded, setIsTestEnded] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isPaused && !isTestEnded) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, isTestEnded]);

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleEndTest = () => {
    setIsPaused(true);
    setIsEndTestModalOpen(true);
  };

  const handleConfirmEndTest = () => {
    setIsTestEnded(true);
    setIsEndTestModalOpen(false);
  };

  const handleCancelEndTest = () => {
    setIsPaused(false);
    setIsEndTestModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">TakeExam 🎃</h1>
      </header>

      <div className="flex justify-between items-center mb-8">
        <Button
          onClick={handlePauseResume}
          variant="outline"
          className="w-40 flex items-center justify-between"
          disabled={isTestEnded}
        >
          {isPaused ? (
            <Play className="h-4 w-4" />
          ) : (
            <Pause className="h-4 w-4" />
          )}
          <span>{formatTime(time)}</span>
        </Button>
      </div>

      <div className="space-y-8 flex-grow">
        {questions.map((question) => (
          <Question
            key={question.id}
            question={question}
            isTestEnded={isTestEnded}
          />
        ))}
      </div>

      <footer className="mt-8 text-center">
        <Button
          onClick={handleEndTest}
          variant="destructive"
          disabled={isTestEnded}
        >
          End Test
        </Button>
      </footer>

      <AlertDialog
        open={isEndTestModalOpen}
        onOpenChange={setIsEndTestModalOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Test</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end the test?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelEndTest}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmEndTest}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
