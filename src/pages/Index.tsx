import { useState } from "react";
import Header from "@/components/Header";
import Toolbar from "@/components/Toolbar";
import CalculatorPanel from "@/components/CalculatorPanel";
import ResultsPanel from "@/components/ResultsPanel";
import AffordabilityCalculator from "@/components/AffordabilityCalculator";
import AffordabilityResults from "@/components/AffordabilityResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, LogIn } from "lucide-react";

const Index = () => {
  // Temporary flag for testing - set to false to hide header
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const [activeTool, setActiveTool] = useState("Loan Calculator");
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [deposit, setDeposit] = useState(0);
  const [interestRate, setInterestRate] = useState(8.5);
  const [affordabilityResults, setAffordabilityResults] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    availableIncome: 0,
    maxMonthlyPayment: 0,
    debtToIncomeRatio: 0
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen p-5 relative">
      {/* Profile Icon - Fixed positioning */}
      <div className="fixed top-6 right-6 z-50">
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

      <div className="max-w-7xl mx-auto glass-effect rounded-[20px] shadow-2xl overflow-hidden">
        {isLoggedIn && <Header />}
        <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
        
        <main className="grid lg:grid-cols-2 gap-10 p-10">
          {activeTool === "Loan Calculator" ? (
            <>
              <CalculatorPanel
                loanAmount={loanAmount}
                setLoanAmount={setLoanAmount}
                loanTerm={loanTerm}
                setLoanTerm={setLoanTerm}
                deposit={deposit}
                setDeposit={setDeposit}
                interestRate={interestRate}
                setInterestRate={setInterestRate}
              />
              
              <ResultsPanel
                loanAmount={loanAmount}
                loanTerm={loanTerm}
                deposit={deposit}
                interestRate={interestRate}
              />
            </>
          ) : (
            <>
              <AffordabilityCalculator onCalculate={setAffordabilityResults} />
              <AffordabilityResults results={affordabilityResults} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
