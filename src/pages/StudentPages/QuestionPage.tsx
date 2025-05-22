
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChatMessage, Message } from "@/components/ChatMessage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

// Mock data
const MOCK_QUESTIONS: Record<string, Question[]> = {
  math: [
    {
      id: "1",
      text: "If f(x) = 3x² - 2x + 5, what is f(2)?",
      options: [
        { id: "a", text: "9" },
        { id: "b", text: "13" },
        { id: "c", text: "15" },
        { id: "d", text: "17" }
      ],
      correctAnswer: "d",
      explanation: "To find f(2), substitute x = 2 into the function.\nf(2) = 3(2)² - 2(2) + 5\nf(2) = 3(4) - 4 + 5\nf(2) = 12 - 4 + 5\nf(2) = 17"
    },
    {
      id: "2",
      text: "Simplify: (2x³y²)(3xy⁴)",
      options: [
        { id: "a", text: "6x⁴y⁶" },
        { id: "b", text: "6x³y⁶" },
        { id: "c", text: "5x⁴y⁶" },
        { id: "d", text: "5x³y⁶" }
      ],
      correctAnswer: "a",
      explanation: "When multiplying expressions with the same base, add the exponents:\n(2x³y²)(3xy⁴) = 2·3 · x³·x · y²·y⁴ = 6x⁴y⁶"
    },
    {
      id: "3",
      text: "What is the slope of a line perpendicular to y = 2x + 3?",
      options: [
        { id: "a", text: "-2" },
        { id: "b", text: "-1/2" },
        { id: "c", text: "1/2" },
        { id: "d", text: "2" }
      ],
      correctAnswer: "b",
      explanation: "For a line y = mx + b, the slope is m. For y = 2x + 3, the slope is 2.\nPerpendicular lines have slopes that are negative reciprocals of each other.\nSo the slope of a perpendicular line would be -1/2."
    }
  ],
  science: [
    // ...science questions
    {
      id: "1",
      text: "Which of the following is NOT a type of chemical bond?",
      options: [
        { id: "a", text: "Ionic bond" },
        { id: "b", text: "Covalent bond" },
        { id: "c", text: "Magnetic bond" },
        { id: "d", text: "Hydrogen bond" }
      ],
      correctAnswer: "c",
      explanation: "The main types of chemical bonds are ionic, covalent, hydrogen, and metallic bonds. 'Magnetic bond' is not a recognized type of chemical bond in chemistry."
    }
  ]
};

export function QuestionPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');

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
    
    // In a real app, we would fetch questions based on student's level
    setQuestions(MOCK_QUESTIONS[subjectId]);
  }, [subjectId, navigate, toast]);
  
  useEffect(() => {
    // Reset state when moving to a new question
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowExplanation(false);
  }, [currentQuestionIndex]);
  
  if (!subjectId || questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isAnswerCorrect = selectedAnswer === currentQuestion.correctAnswer;
  
  const handleAnswerSelect = (value: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(value);
    }
  };
  
  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;
    
    setIsAnswerSubmitted(true);
    
    if (isAnswerCorrect) {
      toast({
        title: "Correct!",
        description: "Great job, you got it right!",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Don't worry, learning comes from mistakes.",
        variant: "destructive",
      });
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Completed all questions
      toast({
        title: "Module Complete",
        description: "You've completed all the questions in this set!",
      });
      navigate("/dashboard");
    }
  };
  
  const handleAskAI = () => {
    setChatOpen(true);
    
    if (chatMessages.length === 0) {
      // Add an initial greeting
      setChatMessages([{
        id: "1",
        role: "assistant",
        content: "Hi there! I'm your AI tutor. How can I help you understand this question better?",
        createdAt: new Date()
      }]);
    }
  };
  
  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageInput,
      createdAt: new Date()
    };
    
    setChatMessages([...chatMessages, userMessage]);
    setMessageInput('');
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "I'll help explain this concept. ";
      
      if (!isAnswerCorrect && isAnswerSubmitted) {
        aiResponse += `The correct answer is ${currentQuestion.correctAnswer}. ${currentQuestion.explanation}`;
      } else {
        aiResponse += "What specific part of the question are you struggling with?";
      }
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: aiResponse,
        createdAt: new Date()
      };
      
      setChatMessages(messages => [...messages, aiMessage]);
    }, 1000);
  };
  
  return (
    <div className="max-w-3xl mx-auto space-y-6">
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
            <div className="text-lg font-medium">{currentQuestion.text}</div>
            
            <RadioGroup 
              value={selectedAnswer || ""} 
              onValueChange={handleAnswerSelect}
              disabled={isAnswerSubmitted}
            >
              {currentQuestion.options.map((option) => {
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
                  <div key={option.id} className={optionClassName}>
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="cursor-pointer flex-1">
                      {option.text}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
            
            {isAnswerSubmitted && (
              <div className={`p-4 rounded-md ${isAnswerCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <h3 className={`font-semibold ${isAnswerCorrect ? "text-green-700" : "text-red-700"}`}>
                  {isAnswerCorrect ? "Correct!" : "Incorrect"}
                </h3>
                
                {showExplanation ? (
                  <div className="mt-2 text-sm whitespace-pre-line">
                    {currentQuestion.explanation}
                  </div>
                ) : (
                  <Button 
                    variant="link" 
                    onClick={() => setShowExplanation(true)}
                    className={isAnswerCorrect ? "text-green-700 p-0" : "text-red-700 p-0"}
                  >
                    Show explanation
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {isAnswerSubmitted ? (
            <div className="flex space-x-2 ml-auto">
              <Button variant="outline" onClick={handleAskAI}>
                Ask AI Tutor
              </Button>
              <Button onClick={handleNext}>
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish"}
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="ml-auto"
            >
              Submit Answer
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>AI Tutor Chat</DialogTitle>
            <DialogDescription>
              Ask questions about this problem to help you understand.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4 max-h-[60vh] overflow-y-auto p-4 -mx-6">
            {chatMessages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message}
              />
            ))}
          </div>
          
          <DialogFooter className="flex items-center gap-2">
            <Textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
