
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { QuestionContent } from "./QuestionContent";
import { QuestionFooter } from "./QuestionFooter";
import { RewardDialog } from "./RewardDialog";
import { AITutorChat } from "./AITutorChat";
import { motion } from "framer-motion";
import { Star, Trophy } from "lucide-react";
import confetti from 'canvas-confetti';

// Types
import { Question } from "./types";

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
    
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user" as const,
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
      
      const aiMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant" as const,
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
          <QuestionContent 
            currentQuestion={currentQuestion} 
            currentQuestionIndex={currentQuestionIndex} 
            questions={questions}
            progress={progress}
            isAnswerSubmitted={isAnswerSubmitted}
            isAnswerCorrect={isAnswerCorrect}
            selectedAnswer={selectedAnswer}
            showExplanation={showExplanation}
            onAnswerSelect={handleAnswerSelect}
            onShowExplanation={() => setShowExplanation(true)}
          />
          
          <QuestionFooter 
            isAnswerSubmitted={isAnswerSubmitted}
            selectedAnswer={selectedAnswer}
            onAskAI={handleAskAI}
            onNext={handleNext}
            onSubmit={handleAnswerSubmit}
            currentQuestionIndex={currentQuestionIndex}
            questionsLength={questions.length}
          />
        </Card>
      </motion.div>
      
      <RewardDialog 
        open={showReward} 
        onOpenChange={setShowReward}
        earnedPoints={earnedPoints}
        streak={streak}
      />
      
      <AITutorChat 
        open={chatOpen}
        onOpenChange={setChatOpen}
        messages={chatMessages}
        inputValue={messageInput}
        onInputChange={(e) => setMessageInput(e.target.value)}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

// Re-export for convenience
export type { Question, Message } from "./types";
