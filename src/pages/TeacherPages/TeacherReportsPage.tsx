
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressChart } from "@/components/ProgressChart";
import { Badge } from "@/components/ui/badge";

export function TeacherReportsPage() {
  // Mock data for weekly class activity
  const weeklyActivityData = [
    { name: "Mon", value: 68 },
    { name: "Tue", value: 42 },
    { name: "Wed", value: 85 },
    { name: "Thu", value: 73 },
    { name: "Fri", value: 52 },
    { name: "Sat", value: 15 },
    { name: "Sun", value: 9 }
  ];
  
  // Mock data for monthly progress
  const monthlyProgressData = [
    { name: "Jan", value: 45 },
    { name: "Feb", value: 52 },
    { name: "Mar", value: 61 },
    { name: "Apr", value: 58 },
    { name: "May", value: 72 }
  ];
  
  // Mock data for subject performance
  const subjectPerformanceData = [
    { subject: "Mathematics", avgScore: 76, improvement: 8, status: "improving" },
    { subject: "Science", avgScore: 68, improvement: -3, status: "declining" },
    { subject: "English", avgScore: 82, improvement: 5, status: "improving" },
    { subject: "History", avgScore: 71, improvement: 0, status: "stable" }
  ];
  
  // Mock struggling students data
  const strugglingStudents = [
    { id: "1", name: "Ryan Smith", subject: "Mathematics", score: 42, lastActive: "3 days ago" },
    { id: "2", name: "Olivia Brown", subject: "Science", score: 38, lastActive: "1 week ago" },
    { id: "3", name: "David Wilson", subject: "History", score: 45, lastActive: "2 days ago" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Reports</h1>
        <p className="text-muted-foreground">Analytics and insights for your classroom</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Students</CardTitle>
            <CardDescription>Active students in your class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32</div>
            <p className="text-sm text-muted-foreground mt-1">+2 since last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Score</CardTitle>
            <CardDescription>Across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">74%</div>
            <p className="text-sm text-green-600 mt-1">↑ 3% from previous term</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Completion Rate</CardTitle>
            <CardDescription>Assignments completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">82%</div>
            <p className="text-sm text-amber-600 mt-1">↓ 4% this week</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="activity">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Class Activity</TabsTrigger>
          <TabsTrigger value="performance">Subject Performance</TabsTrigger>
          <TabsTrigger value="students">Student Focus</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Class Activity</CardTitle>
              <CardDescription>Number of questions answered daily</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressChart title="" data={weeklyActivityData} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Average Progress</CardTitle>
              <CardDescription>Class average score by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressChart title="" data={monthlyProgressData} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>How students are performing in each subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectPerformanceData.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subject.subject}</span>
                      <div className="space-x-2">
                        <Badge>Avg: {subject.avgScore}%</Badge>
                        <Badge 
                          variant={subject.status === "improving" ? "default" : 
                                  subject.status === "declining" ? "destructive" : "outline"}
                        >
                          {subject.improvement > 0 ? `↑ ${subject.improvement}%` : 
                           subject.improvement < 0 ? `↓ ${Math.abs(subject.improvement)}%` : 
                           "No change"}
                        </Badge>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          subject.avgScore < 60 ? "bg-red-500" : 
                          subject.avgScore < 75 ? "bg-amber-500" : 
                          "bg-green-500"
                        }`}
                        style={{ width: `${subject.avgScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Students Needing Attention</CardTitle>
              <CardDescription>Students scoring below 50% in subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strugglingStudents.map((student) => (
                  <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h3 className="font-medium">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {student.subject} • Last active: {student.lastActive}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center gap-2">
                      <Badge variant="destructive" className="whitespace-nowrap">Score: {student.score}%</Badge>
                      <button className="text-sm text-primary hover:underline">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
