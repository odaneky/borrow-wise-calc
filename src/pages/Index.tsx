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
    <div className="min-h-screen p-5">
      <div className="max-w-7xl mx-auto glass-effect rounded-[20px] shadow-2xl overflow-hidden relative">
        {/* Profile Icon */}
        <div className="absolute top-4 right-4 z-10">
          <div 
            className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg"
            onClick={() => isLoggedIn ? handleLogout() : setShowLoginModal(!showLoginModal)}
          >
            <User size={20} />
          </div>
          
          {/* Login Modal */}
          {showLoginModal && !isLoggedIn && (
            <Card className="absolute top-14 right-0 w-80 shadow-xl border-2">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <LogIn className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <h3 className="text-lg font-semibold">Welcome Back</h3>
                  <p className="text-muted-foreground text-sm">Sign in to access your account</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleLogin}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  
                  <div className="text-center">
                    <button 
                      onClick={() => setShowLoginModal(false)}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

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
