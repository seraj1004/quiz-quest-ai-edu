
import { SidebarNav } from "@/components/SidebarNav";
import { Users, BarChart, Book, LogOut, Search } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const teacherRoutes = [
  {
    title: "Overview",
    href: "/teacher",
    icon: <BarChart className="h-4 w-4" />
  },
  {
    title: "Students",
    href: "/teacher/students",
    icon: <Users className="h-4 w-4" />
  },
  {
    title: "Subjects",
    href: "/teacher/subjects",
    icon: <Book className="h-4 w-4" />
  },
  {
    title: "Reports",
    href: "/teacher/reports",
    icon: <Search className="h-4 w-4" />
  }
];

interface TeacherSidebarProps {
  className?: string;
}

export function TeacherSidebar({ className }: TeacherSidebarProps) {
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
        <SidebarNav items={teacherRoutes} />
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
