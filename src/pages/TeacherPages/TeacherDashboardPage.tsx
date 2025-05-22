
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentProgressTable, StudentProgress } from "@/components/StudentProgressTable";
import { ProgressChart } from "@/components/ProgressChart";

export function TeacherDashboardPage() {
  // Mock data for a teacher dashboard
  const [subjects] = useState([
    { id: "math", name: "Mathematics" },
    { id: "science", name: "Science" },
    { id: "english", name: "English" },
    { id: "history", name: "History" }
  ]);
  
  const [students] = useState<StudentProgress[]>([
    {
      id: "1",
      name: "Emma Smith",
      email: "emma.s@school.edu",
      subjects: {
        math: { level: "4", progress: 85, lastActive: "2023-05-14" },
        science: { level: "3", progress: 72, lastActive: "2023-05-16" },
        english: { level: "4", progress: 90, lastActive: "2023-05-15" },
        history: { level: "3", progress: 65, lastActive: "2023-05-10" }
      }
    },
    {
      id: "2",
      name: "Michael Taylor",
      email: "michael.t@school.edu",
      subjects: {
        math: { level: "3", progress: 60, lastActive: "2023-05-16" },
        science: { level: "4", progress: 88, lastActive: "2023-05-16" },
        english: { level: "3", progress: 75, lastActive: "2023-05-14" },
        history: { level: "2", progress: 45, lastActive: "2023-05-13" }
      }
    },
    {
      id: "3",
      name: "Olivia Johnson",
      email: "olivia.j@school.edu",
      subjects: {
        math: { level: "2", progress: 35, lastActive: "2023-05-15", alertLevel: "alert" },
        science: { level: "3", progress: 65, lastActive: "2023-05-16" },
        english: { level: "3", progress: 70, lastActive: "2023-05-14" },
        history: { level: "2", progress: 50, lastActive: "2023-05-12", alertLevel: "warning" }
      }
    },
    {
      id: "4",
      name: "William Brown",
      email: "william.b@school.edu",
      subjects: {
        math: { level: "4", progress: 90, lastActive: "2023-05-16" },
        science: { level: "3", progress: 78, lastActive: "2023-05-15" },
        english: { level: "2", progress: 40, lastActive: "2023-05-10", alertLevel: "alert" },
        history: { level: "3", progress: 72, lastActive: "2023-05-13" }
      }
    },
    {
      id: "5",
      name: "Sophia Davis",
      email: "sophia.d@school.edu",
      subjects: {
        math: { level: "3", progress: 68, lastActive: "2023-05-14" },
        science: { level: "2", progress: 55, lastActive: "2023-05-11", alertLevel: "warning" },
        english: { level: "3", progress: 75, lastActive: "2023-05-16" },
        history: { level: "3", progress: 62, lastActive: "2023-05-15" }
      }
    }
  ]);
  
  // Calculate overall class performance
  const classPerformance = subjects.map(subject => {
    let totalProgress = 0;
    let studentCount = 0;
    
    students.forEach(student => {
      if (student.subjects[subject.id]) {
        totalProgress += student.subjects[subject.id].progress;
        studentCount++;
      }
    });
    
    const averageProgress = studentCount > 0 ? totalProgress / studentCount : 0;
    
    return {
      subject: subject.name,
      progress: averageProgress
    };
  });
  
  // Weekly progress data for chart
  const weeklyProgressData = [
    { name: "Mon", value: 65 },
    { name: "Tue", value: 72 },
    { name: "Wed", value: 68 },
    { name: "Thu", value: 75 },
    { name: "Fri", value: 80 },
    { name: "Sat", value: 45 },
    { name: "Sun", value: 30 }
  ];
  
  // Flag students who need attention
  const studentsNeedingHelp = students.filter(student => {
    return Object.values(student.subjects).some(subject => 
      subject.alertLevel === "alert" || subject.alertLevel === "warning"
    );
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Monitor student progress and identify learning gaps.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {classPerformance.map((item, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{item.subject}</CardTitle>
              <CardDescription>Class Average: {Math.round(item.progress)}%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2">
                <Progress value={item.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Engagement</CardTitle>
            <CardDescription>Average student interactions per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart 
              title="" 
              data={weeklyProgressData}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Students Needing Attention</CardTitle>
            <CardDescription>Flagged based on performance alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentsNeedingHelp.length > 0 ? (
                studentsNeedingHelp.map(student => {
                  // Find subjects with alerts
                  const alertSubjects = Object.entries(student.subjects)
                    .filter(([_, data]) => data.alertLevel === "alert" || data.alertLevel === "warning")
                    .map(([subjectId, data]) => {
                      const subjectName = subjects.find(s => s.id === subjectId)?.name || subjectId;
                      return { 
                        name: subjectName, 
                        level: data.alertLevel, 
                        progress: data.progress 
                      };
                    });
                  
                  return (
                    <div key={student.id} className="flex items-center justify-between pb-4 last:pb-0 last:mb-0 last:border-0 border-b">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {alertSubjects.map((subject, idx) => (
                            <span key={subject.name}>
                              {subject.name} ({subject.progress}%)
                              {idx < alertSubjects.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        alertSubjects.some(s => s.level === "alert") 
                          ? "bg-destructive text-destructive-foreground" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {alertSubjects.some(s => s.level === "alert") 
                          ? "Needs Help" 
                          : "Review Progress"}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No students currently flagged
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Class Overview</CardTitle>
          <CardDescription>View student progress by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all-students">
            <TabsList className="mb-4">
              <TabsTrigger value="all-students">All Students</TabsTrigger>
              {subjects.map(subject => (
                <TabsTrigger key={subject.id} value={subject.id}>{subject.name}</TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all-students">
              <StudentProgressTable
                students={students}
                subjects={subjects}
              />
            </TabsContent>
            
            {subjects.map(subject => (
              <TabsContent key={subject.id} value={subject.id}>
                <StudentProgressTable
                  students={students.filter(student => student.subjects[subject.id])}
                  subjects={[subject]}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
