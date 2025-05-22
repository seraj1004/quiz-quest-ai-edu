
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type AchievementBadge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "bronze" | "silver" | "gold" | "diamond";
  earnedAt?: string;
  progress?: number;
};

export function AchievementsPage() {
  // Mock badges data
  const [earnedBadges] = useState<AchievementBadge[]>([
    { id: "1", name: "First Step", description: "Complete your first diagnostic test", icon: "🎯", type: "bronze", earnedAt: "2023-04-15" },
    { id: "2", name: "Math Star", description: "Score 90% on a math test", icon: "🧮", type: "silver", earnedAt: "2023-04-20" },
    { id: "3", name: "Streak Master", description: "Maintain a 7-day streak", icon: "🔥", type: "bronze", earnedAt: "2023-04-28" },
    { id: "4", name: "Quick Thinker", description: "Complete 10 questions in under 5 minutes", icon: "⚡", type: "silver", earnedAt: "2023-05-10" },
    { id: "5", name: "Perfect Score", description: "Get 100% on any quiz", icon: "🏆", type: "gold", earnedAt: "2023-05-15" },
  ]);

  const [inProgressBadges] = useState<AchievementBadge[]>([
    { id: "6", name: "Science Whiz", description: "Complete all science modules", icon: "🔬", type: "gold", progress: 75 },
    { id: "7", name: "Consistent Learner", description: "Study for 30 days in a row", icon: "📚", type: "gold", progress: 60 },
    { id: "8", name: "Speed Demon", description: "Answer 50 questions correctly in under 1 minute each", icon: "🚀", type: "silver", progress: 32 },
    { id: "9", name: "Knowledge Master", description: "Complete advanced level in all subjects", icon: "🧠", type: "diamond", progress: 15 },
  ]);

  const getBadgeColorClass = (type: string) => {
    switch(type) {
      case "bronze": return "bg-amber-600 text-white";
      case "silver": return "bg-gray-400 text-white";
      case "gold": return "bg-yellow-400 text-black";
      case "diamond": return "bg-blue-400 text-white";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Achievements</h1>
        <p className="text-muted-foreground">Track your badges and accomplishments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Statistics</CardTitle>
          <CardDescription>Your achievements at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-3xl font-bold">{earnedBadges.length}</p>
              <p className="text-sm text-muted-foreground">Badges Earned</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">{inProgressBadges.length}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Subjects Mastered</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">Level 4</p>
              <p className="text-sm text-muted-foreground">Current Rank</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="earned" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="earned">Earned Badges</TabsTrigger>
          <TabsTrigger value="progress">In Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="earned" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {earnedBadges.map((badge) => (
              <Card key={badge.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <span className="text-3xl">{badge.icon}</span>
                    </div>
                    <Badge className={getBadgeColorClass(badge.type)}>
                      {badge.type.charAt(0).toUpperCase() + badge.type.slice(1)}
                    </Badge>
                    <h3 className="font-medium">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                    {badge.earnedAt && (
                      <p className="text-xs text-muted-foreground">
                        Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="progress" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {inProgressBadges.map((badge) => (
              <Card key={badge.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <span className="text-3xl">{badge.icon}</span>
                    </div>
                    <Badge className={getBadgeColorClass(badge.type)}>
                      {badge.type.charAt(0).toUpperCase() + badge.type.slice(1)}
                    </Badge>
                    <h3 className="font-medium">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                    {badge.progress !== undefined && (
                      <div className="w-full space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{badge.progress}%</span>
                        </div>
                        <Progress value={badge.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
