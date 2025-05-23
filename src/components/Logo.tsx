
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary rounded-md p-1">
        <BookOpen className="h-6 w-6 text-primary-foreground" />
      </div>
      {showText && <span className="font-bold text-xl">TAi</span>}
    </div>
  );
}
