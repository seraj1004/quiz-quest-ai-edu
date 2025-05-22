
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressChart } from "@/components/ProgressChart";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, BookOpen, TrendingUp, Award } from "lucide-react";

export function ProgressPage() {
  // Mock progress data
  const weeklyProgressData = [
    { name: "Mon", value: 240 },
    { name: "Tue", value: 300 },
    { name: "Wed", value: 200 },
    { name: "Thu", value: 450 },
    { name: "Fri", value: 280 },
    { name: "Sat", value: 200 },
    { name: "Sun", value: 350 }
  ];

  const monthlyProgressData = [
    { name: "Week 1", value: 1570 },
    { name: "Week 2", value: 1890 },
    { name: "Week 3", value: 2100 },
    { name: "Week 4", value: 2450 }
  ];

  const subjectProgress = [
    { id: "math", name: "Mathematics", progress: 65, level: "Intermediate" },
    { id: "science", name: "Science", progress: 42, level: "Beginner" },
    { id: "english", name: "English", progress: 28, level: "Intermediate" },
    { id: "history", name: "History", progress: 12, level: "Beginner" }
  ];

  const recentAchievements = [
    { id: "1", name: "Completed 5 math modules", date: "May 20, 2025" },
    { id: "2", name: "Achieved 80% in science quiz", date: "May 18, 2025" },
    { id: "3", name: "Maintained 7-day streak", date: "May 15, 2025" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">My Progress</h1>
        <p className="text-muted-foreground">Track your learning journey and achievements</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Points earned this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart title="" data={weeklyProgressData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
            <CardDescription>Progress over the past 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart title="" data={monthlyProgressData} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subject Progress</CardTitle>
          <CardDescription>Your progress across different subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectProgress.map((subject) => (
              <div key={subject.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{subject.name}</h4>
                    <p className="text-sm text-muted-foreground">{subject.level}</p>
                  </div>
                  <Badge variant="outline">{subject.progress}%</Badge>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
          <CardDescription>Your latest milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentAchievements.map((achievement) => (
              <li key={achievement.id} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
