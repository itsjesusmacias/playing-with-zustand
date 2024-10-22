import { questions } from "@/mocks/questions.mock";

import { Hero } from "@/components/hero";
import { Stopwatch } from "@/components/timer/stopwatch";
import { Question } from "@/components/question/question";
import { DialogEndTest } from "@/components/dialog-end-test";

export default function TakeExam() {
  return (
    <div className="min-h-screen bg-gray-900 text-orange-100 p-4 flex flex-col relative overflow-hidden">
      <div className="container mx-auto max-w-[600px]">
        <Hero />
        <Stopwatch />
        <div className="space-y-8 flex-grow">
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </div>
        <DialogEndTest />
      </div>
    </div>
  );
}
