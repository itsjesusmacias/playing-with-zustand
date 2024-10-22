import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTakeExamStore } from "@/provider/take-exam/take-exam-store";

interface QuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
  };
}

type AnswersState = {
  [key: number]: string;
};

const Question = ({ question }: QuestionProps) => {
  // TODO Zustand
  const [answers, setAnswers] = useState<AnswersState>({});
  const isRunning = useTakeExamStore((state) => state.timer.isRunning);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  return (
    <Card key={question.id}>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
        <RadioGroup
          onValueChange={(value) => handleAnswerChange(question.id, value)}
          value={answers[question.id] || ""}
          disabled={!isRunning}
        >
          {question.options.map((option, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <RadioGroupItem
                value={option}
                id={`q${question.id}-option${index}`}
              />
              <Label htmlFor={`q${question.id}-option${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export { Question };
