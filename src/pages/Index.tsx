
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { BookOpen, MessageCircle, BarChart, Trophy, ChevronRight } from "lucide-react";

export default function Index() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              For Students
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              For Teachers
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
            <Button asChild variant="outline">
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <button 
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={isNavOpen ? "hidden" : "block"}
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={isNavOpen ? "block" : "hidden"}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isNavOpen ? "block" : "hidden"}`}>
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-2 hover:bg-gray-50 rounded-md"
              onClick={() => setIsNavOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="#" 
              className="block px-4 py-2 hover:bg-gray-50 rounded-md"
              onClick={() => setIsNavOpen(false)}
            >
              For Students
            </Link>
            <Link 
              to="#" 
              className="block px-4 py-2 hover:bg-gray-50 rounded-md"
              onClick={() => setIsNavOpen(false)}
            >
              For Teachers
            </Link>
            <Link 
              to="#" 
              className="block px-4 py-2 hover:bg-gray-50 rounded-md"
              onClick={() => setIsNavOpen(false)}
            >
              About
            </Link>
            <Link 
              to="#" 
              className="block px-4 py-2 hover:bg-gray-50 rounded-md"
              onClick={() => setIsNavOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/login" 
              className="block px-4 py-2 hover:bg-gray-50 rounded-md"
              onClick={() => setIsNavOpen(false)}
            >
              Log In
            </Link>
            <Link 
              to="/register" 
              className="block px-4 py-2 bg-primary text-primary-foreground rounded-md"
              onClick={() => setIsNavOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Personalized Learning for Every Student,
              <span className="text-primary block">Powered by AI</span>
            </h1>
            <p className="text-xl text-gray-600">
              TAi helps students learn smarter and teachers track progress faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="#">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur-xl opacity-30 animate-pulse-slow" />
              <div className="relative bg-white p-8 rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" 
                  alt="Student using TAi" 
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How TAi Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform creates a personalized learning experience in just three simple steps.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 mx-auto">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Take a Quick Test</h3>
              <p className="text-gray-600 text-center">
                Students begin with a brief diagnostic assessment to identify their current knowledge and skill levels.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 mx-auto">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Get Personalized Questions</h3>
              <p className="text-gray-600 text-center">
                TAi analyzes results and provides custom questions at the right difficulty level for optimal learning.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4 mx-auto">
                <BarChart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Track Progress</h3>
              <p className="text-gray-600 text-center">
                Teachers receive real-time insights on student performance, while students earn points and badges.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/register" className="inline-flex items-center">
                Start Learning Now <ChevronRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how TAi is transforming education with advanced technology and innovative features.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-sm h-full">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Adaptive Learning</h3>
              <p className="text-gray-600">
                Questions automatically adjust to match each student's unique learning pace and style.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm h-full">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Chatbot Tutor</h3>
              <p className="text-gray-600">
                Students receive instant, personalized explanations when they get answers wrong.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm h-full">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                <BarChart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Teacher Dashboard</h3>
              <p className="text-gray-600">
                Comprehensive analytics help teachers identify struggling students and learning gaps.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm h-full">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mb-4">
                <Trophy size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Gamified Scoring</h3>
              <p className="text-gray-600">
                Points, ranks, and badges keep students motivated and engaged with their learning.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                  JS
                </div>
                <div>
                  <h3 className="font-bold">Jamie Smith</h3>
                  <p className="text-sm text-gray-500">11th Grade Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "TAi helped me improve my math grade from a C to an A- in just one semester! The personalized questions and AI tutor make learning so much easier."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600">
                  MB
                </div>
                <div>
                  <h3 className="font-bold">Ms. Brown</h3>
                  <p className="text-sm text-gray-500">High School Science Teacher</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The teacher dashboard has transformed my classroom. I can quickly identify which students need help and with which concepts, making my teaching much more effective."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform learning with AI?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students and teachers already improving educational outcomes with TAi.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/register">Get Started Now</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Logo className="text-white" />
              <p className="mt-4 text-sm">
                Revolutionizing education through AI-powered personalized learning experiences.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">For Students</a></li>
                <li><a href="#" className="hover:text-white">For Teachers</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Data Protection</a></li>
                <li><a href="#" className="hover:text-white">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2023 TAi Education. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
