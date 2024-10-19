import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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

// Sample questions
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris"],
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter"],
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"],
  },
];

export default function TakeExam() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [answers, setAnswers] = useState({});
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
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
        {questions.map((q) => (
          <Card key={q.id}>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">{q.question}</h2>
              <RadioGroup
                onValueChange={(value) => handleAnswerChange(q.id, value)}
                value={answers[q.id] || ""}
                disabled={isTestEnded}
              >
                {q.options.map((option, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem
                      value={option}
                      id={`q${q.id}-option${index}`}
                    />
                    <Label htmlFor={`q${q.id}-option${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
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
