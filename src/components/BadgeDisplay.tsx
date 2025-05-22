
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "bronze" | "silver" | "gold" | "diamond";
  earnedAt?: string;
}

interface BadgeDisplayProps {
  badges: UserBadge[];
  className?: string;
}

export function BadgeDisplay({ badges, className }: BadgeDisplayProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <TooltipProvider>
        {badges.map((badge) => (
          <Tooltip key={badge.id}>
            <TooltipTrigger>
              <Badge className={cn(
                "text-xs px-2 py-1 h-auto",
                badge.earnedAt ? `badge-${badge.type}` : "bg-gray-200 text-gray-500 opacity-40"
              )}>
                <span className="mr-1">{badge.icon}</span>
                <span>{badge.name}</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                <p className="font-semibold">{badge.name}</p>
                <p className="text-xs">{badge.description}</p>
                {badge.earnedAt && (
                  <p className="text-xs mt-1 text-muted-foreground">
                    Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
