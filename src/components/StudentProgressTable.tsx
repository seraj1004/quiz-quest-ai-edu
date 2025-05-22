
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import { Link } from "react-router-dom";

export interface StudentProgress {
  id: string;
  name: string;
  image?: string | null;
  email: string;
  subjects: {
    [subjectId: string]: {
      level: string;
      progress: number;
      lastActive: string;
      alertLevel?: "none" | "warning" | "alert";
    };
  };
}

interface StudentProgressTableProps {
  students: StudentProgress[];
  subjects: { id: string; name: string }[];
  className?: string;
}

export function StudentProgressTable({ students, subjects, className }: StudentProgressTableProps) {
  return (
    <div className={className}>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Student</TableHead>
              {subjects.map((subject) => (
                <TableHead key={subject.id}>{subject.name}</TableHead>
              ))}
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <UserAvatar user={student} size="sm" />
                    <div>
                      <div>{student.name}</div>
                      <div className="text-xs text-muted-foreground">{student.email}</div>
                    </div>
                  </div>
                </TableCell>
                
                {subjects.map((subject) => {
                  const data = student.subjects[subject.id];
                  
                  if (!data) {
                    return (
                      <TableCell key={subject.id} className="text-center text-muted-foreground">
                        Not started
                      </TableCell>
                    );
                  }
                  
                  return (
                    <TableCell key={subject.id}>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Level {data.level}</span>
                          <span className="text-sm">{data.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getAlertColor(data.alertLevel)}`}
                            style={{ width: `${data.progress}%` }} 
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last active: {formatLastActive(data.lastActive)}
                        </div>
                      </div>
                      {data.alertLevel && data.alertLevel !== "none" && (
                        <Badge
                          variant={data.alertLevel === "alert" ? "destructive" : "outline"}
                          className="mt-1"
                        >
                          {data.alertLevel === "alert" ? "Needs help" : "Review"}
                        </Badge>
                      )}
                    </TableCell>
                  );
                })}
                
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/teacher/student/${student.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function formatLastActive(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    return `${diffDays} days ago`;
  }
}

function getAlertColor(alertLevel?: "none" | "warning" | "alert"): string {
  switch (alertLevel) {
    case "alert":
      return "bg-destructive";
    case "warning":
      return "bg-yellow-500";
    default:
      return "bg-primary";
  }
}
