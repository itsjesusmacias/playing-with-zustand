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
  const isRunning = useTakeExamStore((state) => state.timer.isRunning);

  // TODO - Implement the state management for the answers in zustand store
  const [answers, setAnswers] = useState<AnswersState>({});

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };
  // -

  return (
    <Card key={question.id} className="bg-gray-800 border-orange-400">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4 text-orange-300">
          {question.question}
        </h2>
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
                className="border-orange-400 text-orange-400"
              />
              <Label
                htmlFor={`q${question.id}-option${index}`}
                className="text-orange-200"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export { Question };
