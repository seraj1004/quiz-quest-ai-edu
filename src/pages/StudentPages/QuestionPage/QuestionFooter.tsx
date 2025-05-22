
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuestionFooterProps {
  isAnswerSubmitted: boolean;
  selectedAnswer: string | null;
  onAskAI: () => void;
  onNext: () => void;
  onSubmit: () => void;
  currentQuestionIndex: number;
  questionsLength: number;
}

export function QuestionFooter({
  isAnswerSubmitted,
  selectedAnswer,
  onAskAI,
  onNext,
  onSubmit,
  currentQuestionIndex,
  questionsLength,
}: QuestionFooterProps) {
  return (
    <CardFooter className="flex justify-between">
      {isAnswerSubmitted ? (
        <div className="flex space-x-2 ml-auto">
          <Button variant="outline" onClick={onAskAI}>
            Ask AI Tutor
          </Button>
          <Button onClick={onNext}>
            {currentQuestionIndex < questionsLength - 1 ? "Next Question" : "Finish"}
          </Button>
        </div>
      ) : (
        <Button 
          onClick={onSubmit}
          disabled={!selectedAnswer}
          className="ml-auto"
        >
          Submit Answer
        </Button>
      )}
    </CardFooter>
  );
}
