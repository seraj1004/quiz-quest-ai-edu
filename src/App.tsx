
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { StudentLayout } from "./layouts/StudentLayout";
import { TeacherLayout } from "./layouts/TeacherLayout";
import { LoginPage } from "./pages/AuthPages/LoginPage";
import { RegisterPage } from "./pages/AuthPages/RegisterPage";
import { DashboardPage } from "./pages/StudentPages/DashboardPage";
import { DiagnosticTestPage } from "./pages/StudentPages/DiagnosticTestPage";
import { QuestionPage } from "./pages/StudentPages/QuestionPage";
import { TeacherDashboardPage } from "./pages/TeacherPages/TeacherDashboardPage";
import { ProgressPage } from "./pages/StudentPages/ProgressPage";
import { AchievementsPage } from "./pages/StudentPages/AchievementsPage";
import { ChatPage } from "./pages/StudentPages/ChatPage";
import { TeacherStudentsPage } from "./pages/TeacherPages/TeacherStudentsPage";
import { TeacherSubjectsPage } from "./pages/TeacherPages/TeacherSubjectsPage";
import { TeacherReportsPage } from "./pages/TeacherPages/TeacherReportsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Student Routes */}
          <Route path="/" element={<StudentLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/diagnostic/:subjectId" element={<DiagnosticTestPage />} />
            <Route path="/subject/:subjectId" element={<QuestionPage />} />
          </Route>
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboardPage />} />
            <Route path="/teacher/students" element={<TeacherStudentsPage />} />
            <Route path="/teacher/subjects" element={<TeacherSubjectsPage />} />
            <Route path="/teacher/reports" element={<TeacherReportsPage />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
