
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export function RegisterPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"student" | "teacher">("student");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    try {
      // This would be replaced with actual registration logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      
      // Redirect based on user type
      if (userType === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an Account"
      description="Register to start learning with us"
      footer={
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline text-primary hover:text-primary/80">
            Login
          </Link>
        </div>
      }
    >
      <Tabs defaultValue="student" value={userType} onValueChange={(v) => setUserType(v as "student" | "teacher")}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="teacher">Teacher</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            
            <TabsContent value="student" className="space-y-4 mt-0">
              <div className="grid gap-2">
                <Label htmlFor="grade">Grade Level</Label>
                <select
                  id="grade"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select your grade</option>
                  <option value="9">9th Grade</option>
                  <option value="10">10th Grade</option>
                  <option value="11">11th Grade</option>
                  <option value="12">12th Grade</option>
                </select>
              </div>
            </TabsContent>
            
            <TabsContent value="teacher" className="space-y-4 mt-0">
              <div className="grid gap-2">
                <Label htmlFor="school">School Name</Label>
                <Input
                  id="school"
                  placeholder="School name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Primary Subject</Label>
                <select
                  id="subject"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select primary subject</option>
                  <option value="math">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                </select>
              </div>
            </TabsContent>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Register"}
          </Button>
        </form>
      </Tabs>
    </AuthLayout>
  );
}
