import { useState } from "react";
import Header from "@/components/Header";
import Toolbar from "@/components/Toolbar";
import CalculatorPanel from "@/components/CalculatorPanel";
import ResultsPanel from "@/components/ResultsPanel";

const Index = () => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [deposit, setDeposit] = useState(0);
  const [interestRate, setInterestRate] = useState(8.5);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Toolbar />
      
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
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
        </div>
      </main>
    </div>
  );
};

export default Index;
