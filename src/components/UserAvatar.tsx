
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({ user, className, size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16"
  };

  const getInitials = () => {
    if (user?.name) {
      return user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return user?.email?.charAt(0).toUpperCase() || '?';
  };

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={user.image || undefined} alt={user.name || "User Avatar"} />
      <AvatarFallback className="bg-primary text-primary-foreground">
        {getInitials()}
      </AvatarFallback>
    </Avatar>
  );
}
