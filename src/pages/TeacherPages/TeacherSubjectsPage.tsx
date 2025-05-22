
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Plus, Users, FileBarChart, Settings } from "lucide-react";

export function TeacherSubjectsPage() {
  const subjects = [
    {
      id: "math",
      name: "Mathematics",
      modules: 12,
      questions: 240,
      studentCount: 28,
      avgProgress: 68,
      lastUpdated: "2 days ago",
      content: [
        { id: "m1", title: "Algebra Basics", type: "module", questionCount: 25, difficulty: "Beginner" },
        { id: "m2", title: "Linear Equations", type: "module", questionCount: 20, difficulty: "Intermediate" },
        { id: "m3", title: "Quadratic Equations", type: "module", questionCount: 30, difficulty: "Advanced" },
        { id: "q1", title: "Algebra Quiz", type: "quiz", questionCount: 15, difficulty: "Mixed" },
      ]
    },
    {
      id: "science",
      name: "Science",
      modules: 10,
      questions: 180,
      studentCount: 24,
      avgProgress: 52,
      lastUpdated: "1 week ago",
      content: [
        { id: "s1", title: "Scientific Method", type: "module", questionCount: 15, difficulty: "Beginner" },
        { id: "s2", title: "Chemistry Basics", type: "module", questionCount: 22, difficulty: "Intermediate" },
        { id: "s3", title: "Physics Fundamentals", type: "module", questionCount: 28, difficulty: "Advanced" },
        { id: "sq1", title: "Science Mid-term", type: "quiz", questionCount: 20, difficulty: "Mixed" },
      ]
    },
    {
      id: "english",
      name: "English",
      modules: 8,
      questions: 160,
      studentCount: 32,
      avgProgress: 74,
      lastUpdated: "3 days ago",
      content: [
        { id: "e1", title: "Grammar Rules", type: "module", questionCount: 18, difficulty: "Beginner" },
        { id: "e2", title: "Essay Writing", type: "module", questionCount: 15, difficulty: "Intermediate" },
        { id: "e3", title: "Literary Analysis", type: "module", questionCount: 20, difficulty: "Advanced" },
        { id: "eq1", title: "English Assessment", type: "quiz", questionCount: 25, difficulty: "Mixed" },
      ]
    },
    {
      id: "history",
      name: "History",
      modules: 6,
      questions: 120,
      studentCount: 18,
      avgProgress: 45,
      lastUpdated: "2 weeks ago",
      content: [
        { id: "h1", title: "Ancient Civilizations", type: "module", questionCount: 22, difficulty: "Beginner" },
        { id: "h2", title: "World Wars", type: "module", questionCount: 28, difficulty: "Intermediate" },
        { id: "h3", title: "Modern History", type: "module", questionCount: 20, difficulty: "Advanced" },
        { id: "hq1", title: "History Final Exam", type: "quiz", questionCount: 30, difficulty: "Mixed" },
      ]
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subjects</h1>
          <p className="text-muted-foreground">Manage your teaching subjects and content</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Subject
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {subjects.map((subject) => (
          <Card key={subject.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle>{subject.name}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{subject.modules} modules • {subject.questions} questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{subject.studentCount} students</span>
                  </div>
                  <Badge variant="outline">{subject.avgProgress}% avg progress</Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-sm flex justify-between">
                    <span>Overall completion</span>
                    <span>{subject.avgProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${subject.avgProgress}%` }}
                    />
                  </div>
                </div>
                <div className="pt-2 flex justify-between">
                  <Button size="sm" variant="outline">
                    <Book className="mr-1 h-3.5 w-3.5" />
                    Content
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileBarChart className="mr-1 h-3.5 w-3.5" />
                    Reports
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Mathematics</CardTitle>
          <CardDescription>View and manage mathematics content</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="modules">
            <TabsList className="mb-4">
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="diagnostic">Diagnostic Tests</TabsTrigger>
            </TabsList>
            <TabsContent value="modules">
              <div className="space-y-4">
                {subjects[0].content
                  .filter(item => item.type === 'module')
                  .map(module => (
                    <div key={module.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border">
                      <div>
                        <h3 className="font-medium">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {module.questionCount} questions • {module.difficulty}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Module
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="quizzes">
              <div className="space-y-4">
                {subjects[0].content
                  .filter(item => item.type === 'quiz')
                  .map(quiz => (
                    <div key={quiz.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border">
                      <div>
                        <h3 className="font-medium">{quiz.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {quiz.questionCount} questions • {quiz.difficulty}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Quiz
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="diagnostic">
              <div className="p-4 text-center border rounded-lg">
                <p className="text-muted-foreground">No diagnostic tests created yet</p>
                <Button className="mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Diagnostic Test
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
