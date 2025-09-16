import { useState } from "react";
import SliderInput from "./SliderInput";

interface LoanType {
  id: string;
  name: string;
  rate: number;
}

interface CalculatorPanelProps {
  loanAmount: number;
  setLoanAmount: (value: number) => void;
  loanTerm: number;
  setLoanTerm: (value: number) => void;
  deposit: number;
  setDeposit: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
}

const CalculatorPanel = ({
  loanAmount,
  setLoanAmount,
  loanTerm,
  setLoanTerm,
  deposit,
  setDeposit,
  interestRate,
  setInterestRate
}: CalculatorPanelProps) => {
  const [selectedLoanType, setSelectedLoanType] = useState("auto");

  const loanTypes: LoanType[] = [
    { id: "unsecured", name: "Unsecured", rate: 12 },
    { id: "auto", name: "Auto Loan", rate: 8.5 },
    { id: "mortgage", name: "Mortgage", rate: 6.5 },
    { id: "payday", name: "Pay Day", rate: 36 }
  ];

  const handleLoanTypeSelect = (type: LoanType) => {
    setSelectedLoanType(type.id);
    setInterestRate(type.rate);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-JM', {
      style: 'currency',
      currency: 'JMD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTerm = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${months} months`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    } else {
      return `${years}y ${remainingMonths}m`;
    }
  };

  return (
    <div className="bg-card rounded-2xl p-8 shadow-card">
      <h3 className="text-2xl font-bold text-card-foreground mb-2">
        Loan Calculator
      </h3>
      <p className="text-muted-foreground mb-8">
        Work out your payments with precision
      </p>

      <div className="mb-8">
        <label className="block mb-2 font-semibold text-card-foreground">
          Select a loan type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {loanTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleLoanTypeSelect(type)}
              className={`p-3 border-2 rounded-full text-center cursor-pointer text-sm font-medium transition-all duration-300 ${
                selectedLoanType === type.id
                  ? "border-primary bg-gradient-primary text-primary-foreground"
                  : "border-border bg-card text-card-foreground hover:border-primary hover:-translate-y-0.5 hover:shadow-elegant"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      <SliderInput
        label="Loan Amount"
        value={loanAmount}
        onChange={setLoanAmount}
        min={10000}
        max={10000000}
        step={10000}
        prefix="$"
        suffix="JMD"
        tooltip="The total amount you want to borrow"
        formatValue={formatCurrency}
      />

      <SliderInput
        label="Loan Term"
        value={loanTerm}
        onChange={setLoanTerm}
        min={6}
        max={360}
        step={6}
        suffix="months"
        tooltip="How long to repay the loan"
        formatValue={formatTerm}
      />

      <SliderInput
        label="Initial Deposit"
        value={deposit}
        onChange={setDeposit}
        min={0}
        max={2000000}
        step={10000}
        prefix="$"
        suffix="JMD"
        tooltip="Upfront payment to reduce loan amount"
        formatValue={formatCurrency}
      />

      <SliderInput
        label="Interest Rate"
        value={interestRate}
        onChange={setInterestRate}
        min={1}
        max={40}
        step={0.5}
        suffix="%"
        tooltip="Annual percentage rate (APR)"
        formatValue={(value) => `${value.toFixed(1)}%`}
      />
    </div>
  );
};

export default CalculatorPanel;