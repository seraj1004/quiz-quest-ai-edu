
import { SidebarNav } from "@/components/SidebarNav";
import { Book, CheckCircle, Trophy, MessageCircle, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const studentRoutes = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Book className="h-4 w-4" />
  },
  {
    title: "My Progress",
    href: "/progress",
    icon: <CheckCircle className="h-4 w-4" />
  },
  {
    title: "Achievements",
    href: "/achievements",
    icon: <Trophy className="h-4 w-4" />
  },
  {
    title: "Chat",
    href: "/chat",
    icon: <MessageCircle className="h-4 w-4" />
  }
];

interface StudentSidebarProps {
  className?: string;
}

export function StudentSidebar({ className }: StudentSidebarProps) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // TODO: Add actual logout logic here
    navigate("/");
  };
  
  return (
    <div className={`h-screen border-r bg-card px-4 py-6 flex flex-col ${className}`}>
      <div className="px-2 mb-6">
        <Logo />
      </div>
      <div className="flex-1">
        <SidebarNav items={studentRoutes} />
      </div>
      <Separator className="my-4" />
      <Button 
        variant="ghost" 
        onClick={handleLogout}
        className="justify-start"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}
