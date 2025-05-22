
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Question } from "./types";

interface QuestionContentProps {
  currentQuestion: Question;
  currentQuestionIndex: number;
  questions: Question[];
  progress: number;
  isAnswerSubmitted: boolean;
  isAnswerCorrect: boolean;
  selectedAnswer: string | null;
  showExplanation: boolean;
  onAnswerSelect: (value: string) => void;
  onShowExplanation: () => void;
}

export function QuestionContent({
  currentQuestion,
  currentQuestionIndex,
  questions,
  progress,
  isAnswerSubmitted,
  isAnswerCorrect,
  selectedAnswer,
  showExplanation,
  onAnswerSelect,
  onShowExplanation
}: QuestionContentProps) {
  return (
    <>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
          <div className="text-sm text-muted-foreground">Progress: {Math.round(progress)}%</div>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <motion.div 
            className="text-lg font-medium" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {currentQuestion.text}
          </motion.div>
          
          <RadioGroup 
            value={selectedAnswer || ""} 
            onValueChange={onAnswerSelect}
            disabled={isAnswerSubmitted}
          >
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.id === currentQuestion.correctAnswer;
              let optionClassName = "flex items-center space-x-2 py-2 px-3 rounded-md";
              
              if (isAnswerSubmitted) {
                if (isSelected && isCorrect) {
                  optionClassName += " bg-green-50 border border-green-500";
                } else if (isSelected && !isCorrect) {
                  optionClassName += " bg-red-50 border border-red-500";
                } else if (isCorrect) {
                  optionClassName += " bg-green-50 border border-green-500";
                }
              } else if (isSelected) {
                optionClassName += " bg-blue-50 border border-blue-500";
              } else {
                optionClassName += " hover:bg-gray-50";
              }
              
              return (
                <motion.div 
                  key={option.id}
                  className={optionClassName}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="cursor-pointer flex-1">
                    {option.text}
                  </Label>
                  {isAnswerSubmitted && isCorrect && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </motion.div>
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <XCircle className="h-5 w-5 text-red-500" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </RadioGroup>
          
          {isAnswerSubmitted && (
            <motion.div 
              className={`p-4 rounded-md ${isAnswerCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <h3 className={`font-semibold ${isAnswerCorrect ? "text-green-700" : "text-red-700"}`}>
                {isAnswerCorrect ? "Correct!" : "Incorrect"}
              </h3>
              
              {showExplanation ? (
                <div className="mt-2 text-sm whitespace-pre-line">
                  {currentQuestion.explanation}
                </div>
              ) : (
                <button 
                  onClick={onShowExplanation}
                  className={`text-sm font-medium ${isAnswerCorrect ? "text-green-700" : "text-red-700"} hover:underline`}
                >
                  Show explanation
                </button>
              )}
            </motion.div>
          )}
        </div>
      </CardContent>
    </>
  );
}
