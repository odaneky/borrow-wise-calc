import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, LogIn } from "lucide-react";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import Loans from "./pages/Loans";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProfileIcon = ({ isLoggedIn, setIsLoggedIn, showLoginModal, setShowLoginModal }: {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  showLoginModal: boolean;
  setShowLoginModal: (value: boolean) => void;
}) => {
  const location = useLocation();
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Determine position based on route and login status
  const getPositionClasses = () => {
    const isLandingPage = location.pathname === "/";
    const isToolsPage = location.pathname === "/tools";
    
    if (isLandingPage) {
      return "top-6 right-6"; // Higher position for landing page with transparent header
    } else if (isToolsPage && !isLoggedIn) {
      return "top-6 right-6"; // Higher position when no header is shown
    } else {
      return "top-20 right-6"; // Lower position when header is present
    }
  };

  return (
    <div className={`fixed z-50 ${getPositionClasses()}`}>
      <div 
        className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white/20"
        onClick={() => isLoggedIn ? handleLogout() : setShowLoginModal(!showLoginModal)}
      >
        <User size={20} />
      </div>
      
      {/* Login Modal */}
      {showLoginModal && !isLoggedIn && (
        <div className="absolute top-16 right-0 z-40">
          <Card className="w-80 shadow-2xl border-2 border-border/50 bg-card/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogIn className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Welcome Back</h3>
                <p className="text-muted-foreground text-sm mt-1">Sign in to access your financial tools</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background text-foreground placeholder:text-muted-foreground"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background text-foreground placeholder:text-muted-foreground"
                    placeholder="Enter your password"
                  />
                </div>
                
                <Button 
                  onClick={handleLogin}
                  className="w-full py-3 mt-6 font-semibold"
                  size="lg"
                >
                  Sign In
                </Button>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                  <button className="text-sm text-primary hover:underline font-medium">
                    Forgot password?
                  </button>
                  <button 
                    onClick={() => setShowLoginModal(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        <BrowserRouter>
          <ProfileIcon 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Index isLoggedIn={isLoggedIn} />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/loans" element={<Loans />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
