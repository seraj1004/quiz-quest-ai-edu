
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

const MOCK_QUESTIONS: Record<string, Question[]> = {
  math: [
    {
      id: "m1",
      text: "Solve for x: 2x + 5 = 15",
      options: [
        { id: "a", text: "x = 5" },
        { id: "b", text: "x = 10" },
        { id: "c", text: "x = 7" },
        { id: "d", text: "x = 3" }
      ],
      correctAnswer: "a"
    },
    {
      id: "m2",
      text: "What is the area of a circle with radius 4?",
      options: [
        { id: "a", text: "8π" },
        { id: "b", text: "16π" },
        { id: "c", text: "4π" },
        { id: "d", text: "12π" }
      ],
      correctAnswer: "b"
    },
    {
      id: "m3",
      text: "Simplify: 3(2x - 4) + 5",
      options: [
        { id: "a", text: "6x - 12 + 5" },
        { id: "b", text: "6x - 7" },
        { id: "c", text: "6x - 12" },
        { id: "d", text: "6x - 7 + 5" }
      ],
      correctAnswer: "b"
    },
    {
      id: "m4",
      text: "Factor: x² - 9",
      options: [
        { id: "a", text: "(x+3)(x-3)" },
        { id: "b", text: "(x+9)(x-9)" },
        { id: "c", text: "(x+3)²" },
        { id: "d", text: "(x-3)²" }
      ],
      correctAnswer: "a"
    },
    {
      id: "m5",
      text: "If f(x) = 2x² + 3x - 4, find f(2).",
      options: [
        { id: "a", text: "6" },
        { id: "b", text: "10" },
        { id: "c", text: "8" },
        { id: "d", text: "2" }
      ],
      correctAnswer: "b"
    }
  ],
  science: [
    {
      id: "s1",
      text: "What is the chemical symbol for water?",
      options: [
        { id: "a", text: "O₂" },
        { id: "b", text: "CO₂" },
        { id: "c", text: "H₂O" },
        { id: "d", text: "H₂O₂" }
      ],
      correctAnswer: "c"
    },
    {
      id: "s2",
      text: "Which of these is not a state of matter?",
      options: [
        { id: "a", text: "Solid" },
        { id: "b", text: "Liquid" },
        { id: "c", text: "Gas" },
        { id: "d", text: "Energy" }
      ],
      correctAnswer: "d"
    },
    {
      id: "s3",
      text: "What is the function of mitochondria in a cell?",
      options: [
        { id: "a", text: "Protein synthesis" },
        { id: "b", text: "Energy production" },
        { id: "c", text: "Storage" },
        { id: "d", text: "Cell division" }
      ],
      correctAnswer: "b"
    },
    {
      id: "s4",
      text: "Which of the following is a greenhouse gas?",
      options: [
        { id: "a", text: "Oxygen" },
        { id: "b", text: "Nitrogen" },
        { id: "c", text: "Carbon dioxide" },
        { id: "d", text: "Hydrogen" }
      ],
      correctAnswer: "c"
    },
    {
      id: "s5",
      text: "What is Newton's First Law of Motion?",
      options: [
        { id: "a", text: "Force equals mass times acceleration" },
        { id: "b", text: "Energy cannot be created or destroyed" },
        { id: "c", text: "For every action, there is an equal and opposite reaction" },
        { id: "d", text: "An object at rest stays at rest unless acted upon by an external force" }
      ],
      correctAnswer: "d"
    }
  ],
  english: [
    {
      id: "e1",
      text: "Which of the following is a correct sentence?",
      options: [
        { id: "a", text: "The dog barks loudly when it's owners come home." },
        { id: "b", text: "The dog barks loudly when its owners come home." },
        { id: "c", text: "The dog bark loudly when its owners come home." },
        { id: "d", text: "The dog barks loudly when its owner's come home." }
      ],
      correctAnswer: "b"
    },
    // ...more English questions
    {
      id: "e2",
      text: "What is the past tense of 'swim'?",
      options: [
        { id: "a", text: "Swam" },
        { id: "b", text: "Swum" },
        { id: "c", text: "Swimmed" },
        { id: "d", text: "Swimming" }
      ],
      correctAnswer: "a"
    },
    {
      id: "e3",
      text: "Choose the correct word: 'I ___ going to the store later.'",
      options: [
        { id: "a", text: "am" },
        { id: "b", text: "is" },
        { id: "c", text: "are" },
        { id: "d", text: "be" }
      ],
      correctAnswer: "a"
    },
    {
      id: "e4",
      text: "What is a synonym for 'happy'?",
      options: [
        { id: "a", text: "Sad" },
        { id: "b", text: "Angry" },
        { id: "c", text: "Joyful" },
        { id: "d", text: "Tired" }
      ],
      correctAnswer: "c"
    },
    {
      id: "e5",
      text: "Which word is spelled correctly?",
      options: [
        { id: "a", text: "Recieve" },
        { id: "b", text: "Receive" },
        { id: "c", text: "Receve" },
        { id: "d", text: "Recieve" }
      ],
      correctAnswer: "b"
    }
  ],
  history: [
    {
      id: "h1",
      text: "In what year did World War II end?",
      options: [
        { id: "a", text: "1939" },
        { id: "b", text: "1942" },
        { id: "c", text: "1945" },
        { id: "d", text: "1950" }
      ],
      correctAnswer: "c"
    },
    // ...more History questions
    {
      id: "h2",
      text: "Who was the first President of the United States?",
      options: [
        { id: "a", text: "Thomas Jefferson" },
        { id: "b", text: "George Washington" },
        { id: "c", text: "John Adams" },
        { id: "d", text: "Abraham Lincoln" }
      ],
      correctAnswer: "b"
    },
    {
      id: "h3",
      text: "The Renaissance began in which country?",
      options: [
        { id: "a", text: "France" },
        { id: "b", text: "England" },
        { id: "c", text: "Italy" },
        { id: "d", text: "Spain" }
      ],
      correctAnswer: "c"
    },
    {
      id: "h4",
      text: "Which event marked the beginning of World War I?",
      options: [
        { id: "a", text: "Bombing of Pearl Harbor" },
        { id: "b", text: "Assassination of Archduke Franz Ferdinand" },
        { id: "c", text: "The Great Depression" },
        { id: "d", text: "Russian Revolution" }
      ],
      correctAnswer: "b"
    },
    {
      id: "h5",
      text: "The Industrial Revolution began in which country?",
      options: [
        { id: "a", text: "United States" },
        { id: "b", text: "France" },
        { id: "c", text: "Germany" },
        { id: "d", text: "Great Britain" }
      ],
      correctAnswer: "d"
    }
  ]
};

const SUBJECT_NAMES: Record<string, string> = {
  math: "Mathematics",
  science: "Science",
  english: "English",
  history: "History"
};

export function DiagnosticTestPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    if (!subjectId || !MOCK_QUESTIONS[subjectId]) {
      toast({
        title: "Subject not found",
        description: "The requested subject doesn't exist.",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }
    
    setQuestions(MOCK_QUESTIONS[subjectId]);
  }, [subjectId, navigate, toast]);
  
  if (!subjectId || questions.length === 0) {
    return <div>Loading...</div>;
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = async () => {
    // Check if all questions are answered
    if (Object.keys(answers).length < questions.length) {
      toast({
        title: "Incomplete Test",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Calculate score
    let correctAnswers = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Diagnostic Test Completed",
        description: `Your score: ${score}%. Customizing your learning path.`,
      });
      
      navigate(`/subject/${subjectId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit test. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-2xl font-bold">{SUBJECT_NAMES[subjectId]} Diagnostic Test</h1>
        <p className="text-muted-foreground">
          Complete this test to help us determine your current knowledge level.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
            <div className="text-sm text-muted-foreground">Progress: {Math.round(progress)}%</div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-lg font-medium mb-4">{currentQuestion.text}</div>
            
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={handleAnswer}
            >
              {currentQuestion.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="cursor-pointer flex-1">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {currentQuestionIndex === questions.length - 1 ? (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Test"}
              </Button>
            ) : (
              <Button 
                onClick={handleNext} 
                disabled={!answers[currentQuestion.id]}
              >
                Next
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
