
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SubjectCard } from "@/components/SubjectCard";
import { UserAvatar } from "@/components/UserAvatar";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { ProgressChart } from "@/components/ProgressChart";
import { Check, Book, BookOpen, History, FileText } from "lucide-react";

// Define the UserBadge type to match what BadgeDisplay expects
type UserBadge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "bronze" | "silver" | "gold" | "diamond";
  earnedAt?: string;
};

export function DashboardPage() {
  // Mock student data - in a real app this would come from a database
  const [student] = useState({
    id: "123",
    name: "Alex Johnson",
    email: "alex@example.com",
    image: null,
    points: 2450,
    level: 3,
    streak: 4
  });
  
  // Mock subjects data
  const [subjects] = useState([
    {
      id: "math",
      name: "Mathematics",
      icon: <Book className="h-4 w-4" />,
      progress: 65,
      questionCount: 40,
      completedCount: 26,
      hasDiagnostic: true,
      level: "Intermediate"
    },
    {
      id: "science",
      name: "Science",
      icon: <BookOpen className="h-4 w-4" />,
      progress: 42,
      questionCount: 35,
      completedCount: 15,
      hasDiagnostic: true,
      level: "Beginner"
    },
    {
      id: "english",
      name: "English",
      icon: <FileText className="h-4 w-4" />,
      progress: 28,
      questionCount: 50,
      completedCount: 14,
      hasDiagnostic: true,
      level: "Intermediate"
    },
    {
      id: "history",
      name: "History",
      icon: <History className="h-4 w-4" />,
      progress: 0,
      questionCount: 30,
      completedCount: 0,
      hasDiagnostic: false
    }
  ]);
  
  // Mock leaderboard data
  const [leaderboard] = useState([
    { id: "1", name: "Emma S.", image: null, points: 3200, rank: 1 },
    { id: "2", name: "Michael T.", image: null, points: 2800, rank: 2 },
    { id: "123", name: "Alex Johnson", image: null, points: 2450, rank: 3 },
    { id: "4", name: "Sarah P.", image: null, points: 2100, rank: 4 },
    { id: "5", name: "James L.", image: null, points: 1900, rank: 5 }
  ]);
  
  // Mock badges with proper type
  const [badges] = useState<UserBadge[]>([
    { id: "1", name: "First Step", description: "Complete your first diagnostic test", icon: "🎯", type: "bronze", earnedAt: "2023-04-15" },
    { id: "2", name: "Math Star", description: "Score 90% on a math test", icon: "🧮", type: "silver", earnedAt: "2023-04-20" },
    { id: "3", name: "Streak Master", description: "Maintain a 7-day streak", icon: "🔥", type: "bronze", earnedAt: "2023-04-28" },
    { id: "4", name: "Science Whiz", description: "Complete all science modules", icon: "🔬", type: "gold" }
  ]);
  
  // Mock progress data
  const progressData = [
    { name: "Mon", value: 240 },
    { name: "Tue", value: 300 },
    { name: "Wed", value: 200 },
    { name: "Thu", value: 450 },
    { name: "Fri", value: 280 },
    { name: "Sat", value: 200 },
    { name: "Sun", value: 350 }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex items-center gap-4">
          <UserAvatar user={student} size="lg" />
          <div>
            <h1 className="text-2xl font-bold">Welcome, {student.name}</h1>
            <p className="text-muted-foreground">
              Level {student.level} • {student.points} Points
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
          <div className="flex items-center text-amber-500">
            <Check className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{student.streak} day streak</span>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {subjects.map(subject => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Points earned this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart 
              title="" 
              data={progressData} 
            />
          </CardContent>
        </Card>
        
        <LeaderboardCard title="Top Students" leaderboard={leaderboard} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Achievements</CardTitle>
          <CardDescription>Badges and awards you've earned</CardDescription>
        </CardHeader>
        <CardContent>
          <BadgeDisplay badges={badges} />
        </CardContent>
      </Card>
    </div>
  );
}
