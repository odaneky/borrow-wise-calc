import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Toolbar from "@/components/Toolbar";
import CalculatorPanel from "@/components/CalculatorPanel";
import ResultsPanel from "@/components/ResultsPanel";
import AffordabilityCalculator from "@/components/AffordabilityCalculator";
import AffordabilityResults from "@/components/AffordabilityResults";

const Index = () => {
  const [searchParams] = useSearchParams();
  const toolParam = searchParams.get('tool');
  
  // Set initial tool based on URL parameter
  const getInitialTool = () => {
    if (toolParam === 'affordability') return 'Affordability Calculator';
    return 'Loan Calculator';
  };
  
  const [activeTool, setActiveTool] = useState(getInitialTool());
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

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col p-5">
        <div className="flex-1 max-w-7xl mx-auto w-full glass-effect rounded-[20px] shadow-2xl overflow-hidden flex flex-col">
          <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
          
          <main className="flex-1 grid lg:grid-cols-2 gap-10 p-10">
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
    </div>
  );
};

export default Index;
