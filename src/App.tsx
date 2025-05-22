
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
            <Route path="/diagnostic/:subjectId" element={<DiagnosticTestPage />} />
            <Route path="/subject/:subjectId" element={<QuestionPage />} />
            {/* Add other student routes here */}
          </Route>
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboardPage />} />
            {/* Add other teacher routes here */}
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
