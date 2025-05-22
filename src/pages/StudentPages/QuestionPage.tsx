
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
import { CheckCircle, XCircle, Award, Trophy, Star } from "lucide-react";
import confetti from 'canvas-confetti';
import { motion } from "framer-motion";

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
  const [showReward, setShowReward] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  
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
    
    // Load student's points from localStorage (in real app, this would come from a database)
    const savedTotalPoints = localStorage.getItem('studentTotalPoints');
    if (savedTotalPoints) {
      setTotalPoints(parseInt(savedTotalPoints));
    }
    
    const savedStreak = localStorage.getItem('answerStreak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
  }, [subjectId, navigate, toast]);
  
  useEffect(() => {
    // Reset state when moving to a new question
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowExplanation(false);
    setShowReward(false);
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
      // Calculate points based on speed and streak
      const basePoints = 10;
      const streakBonus = Math.min(streak, 5); // Max 5x streak bonus
      const pointsEarned = basePoints + (streakBonus * 2);
      
      setStreak(prev => prev + 1);
      setEarnedPoints(pointsEarned);
      setTotalPoints(prev => prev + pointsEarned);
      
      // Save to localStorage (in a real app, this would be sent to a database)
      localStorage.setItem('answerStreak', (streak + 1).toString());
      localStorage.setItem('studentTotalPoints', (totalPoints + pointsEarned).toString());
      
      // Show reward animation after a slight delay
      setTimeout(() => {
        setShowReward(true);
        
        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 500);
      
      toast({
        title: "Correct!",
        description: "Great job, you got it right!",
      });
    } else {
      // Reset streak on wrong answer
      setStreak(0);
      localStorage.setItem('answerStreak', '0');
      
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
      // Completed all questions - show a celebration animation
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 }
      });
      
      // Completed all questions
      toast({
        title: "Module Complete! 🎉",
        description: `You've completed all questions and earned ${totalPoints} total points!`,
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
      {/* Points display */}
      <motion.div 
        className="flex justify-between items-center bg-muted/50 rounded-lg p-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          <span className="font-bold">{totalPoints} Points</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Streak:</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i} 
                initial={{ scale: 1 }}
                animate={{ scale: i < streak ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Trophy 
                  className={`h-5 w-5 ${i < streak ? 'text-amber-500' : 'text-gray-300'}`} 
                  fill={i < streak ? '#f59e0b' : 'none'} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
                onValueChange={handleAnswerSelect}
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
                    <Button 
                      variant="link" 
                      onClick={() => setShowExplanation(true)}
                      className={isAnswerCorrect ? "text-green-700 p-0" : "text-red-700 p-0"}
                    >
                      Show explanation
                    </Button>
                  )}
                </motion.div>
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
      </motion.div>
      
      {/* Reward Dialog */}
      <Dialog open={showReward} onOpenChange={setShowReward}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="flex justify-center"
              >
                <Award className="h-12 w-12 text-yellow-500" />
              </motion.div>
              Great job!
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xl font-bold mb-2">
                +{earnedPoints} Points
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm text-muted-foreground mb-4">
                {streak > 1 ? `You're on a ${streak} question streak!` : "Keep going for a streak bonus!"}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-2 my-4"
            >
              {[...Array(Math.min(streak, 5))].map((_, idx) => (
                <Trophy key={idx} className="h-6 w-6 text-amber-500" fill="#f59e0b" />
              ))}
            </motion.div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowReward(false)} className="w-full">
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
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
