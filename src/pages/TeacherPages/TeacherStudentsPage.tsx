
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, AlertCircle } from "lucide-react";
import { StudentProgressTable } from "@/components/StudentProgressTable";

export function TeacherStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock student data
  const students = [
    { 
      id: "1", 
      name: "Alex Johnson", 
      email: "alex@example.com", 
      grade: "10th", 
      subjects: ["Math", "Science", "English"], 
      overallProgress: 78,
      lastActive: "2 hours ago",
      hasAlert: false 
    },
    { 
      id: "2", 
      name: "Emma Wilson", 
      email: "emma@example.com", 
      grade: "9th", 
      subjects: ["Math", "History", "English"], 
      overallProgress: 92,
      lastActive: "1 day ago",
      hasAlert: false 
    },
    { 
      id: "3", 
      name: "Ryan Smith", 
      email: "ryan@example.com", 
      grade: "11th", 
      subjects: ["Math", "Science", "History"], 
      overallProgress: 45,
      lastActive: "3 hours ago",
      hasAlert: true 
    },
    { 
      id: "4", 
      name: "Olivia Brown", 
      email: "olivia@example.com", 
      grade: "10th", 
      subjects: ["Science", "English", "Art"], 
      overallProgress: 67,
      lastActive: "4 days ago",
      hasAlert: true 
    },
    { 
      id: "5", 
      name: "Michael Lee", 
      email: "michael@example.com", 
      grade: "9th", 
      subjects: ["Math", "Science", "PE"], 
      overallProgress: 85,
      lastActive: "1 hour ago",
      hasAlert: false 
    },
  ];
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Progress data for the first student (for demonstration)
  const progressData = [
    { subject: "Math", completed: 78, total: 100 },
    { subject: "Science", completed: 45, total: 100 },
    { subject: "English", completed: 92, total: 100 },
    { subject: "History", completed: 60, total: 100 },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Students</h1>
        <p className="text-muted-foreground">View and manage your students' progress</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="flex-shrink-0">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Students ({filteredStudents.length})</CardTitle>
          <CardDescription>Manage your classroom students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border">
                <div className="space-y-1 mb-2 sm:mb-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{student.name}</h3>
                    {student.hasAlert && (
                      <Badge variant="destructive" className="h-5 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>Needs Help</span>
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{student.email} • {student.grade}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {student.subjects.map((subject) => (
                      <Badge key={subject} variant="outline" className="text-xs">{subject}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Overall Progress:</span>
                    <span className="font-medium">{student.overallProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full">
                    <div 
                      className={`h-full rounded-full ${
                        student.overallProgress < 50 ? "bg-red-500" : 
                        student.overallProgress < 75 ? "bg-amber-500" : 
                        "bg-green-500"
                      }`}
                      style={{ width: `${student.overallProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">Last active: {student.lastActive}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Detailed Progress</CardTitle>
          <CardDescription>Student performance by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <StudentProgressTable data={progressData} />
        </CardContent>
      </Card>
    </div>
  );
}
