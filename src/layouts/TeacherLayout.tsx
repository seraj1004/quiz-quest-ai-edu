
import { Outlet } from "react-router-dom";
import { TeacherSidebar } from "@/components/TeacherSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TeacherLayout() {
  return (
    <div className="flex h-screen">
      <TeacherSidebar className="hidden md:block" />
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          <ScrollArea className="h-full">
            <div className="container py-6">
              <Outlet />
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
