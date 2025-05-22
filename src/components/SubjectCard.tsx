
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    icon: React.ReactNode;
    progress: number;
    questionCount: number;
    completedCount: number;
    hasDiagnostic: boolean;
    level?: string;
  };
  className?: string;
}

export function SubjectCard({ subject, className }: SubjectCardProps) {
  const { id, name, icon, progress, questionCount, completedCount, hasDiagnostic, level } = subject;
  
  return (
    <Card className={cn(`border-l-4 subject-${id.toLowerCase()}`, className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-muted p-2">{icon}</div>
          <h3 className="font-bold">{name}</h3>
        </div>
        {level && (
          <Badge variant="outline">Level: {level}</Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <p className="text-sm text-muted-foreground pt-2">
            {completedCount} of {questionCount} questions completed
          </p>
        </div>
      </CardContent>
      <CardFooter>
        {!hasDiagnostic ? (
          <Button asChild className="w-full">
            <Link to={`/diagnostic/${id}`}>Take Diagnostic Test</Link>
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link to={`/subject/${id}`}>Continue Learning</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
