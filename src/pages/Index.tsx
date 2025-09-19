import { useState } from "react";
import Header from "@/components/Header";
import Toolbar from "@/components/Toolbar";
import CalculatorPanel from "@/components/CalculatorPanel";
import ResultsPanel from "@/components/ResultsPanel";
import AffordabilityCalculator from "@/components/AffordabilityCalculator";
import AffordabilityResults from "@/components/AffordabilityResults";

const Index = () => {
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

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-7xl mx-auto glass-effect rounded-[20px] shadow-2xl overflow-hidden">
        <Header />
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
