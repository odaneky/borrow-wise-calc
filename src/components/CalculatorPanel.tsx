import { useState } from "react";
import SimpleInput from "./SimpleInput";

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

  return (
    <div className="bg-card rounded-lg p-8 shadow-card">
      <h3 className="text-2xl font-semibold text-card-foreground mb-2">
        Loan Calculator
      </h3>
      <p className="text-muted-foreground mb-8">
        Work out your payments with precision
      </p>

      <div className="mb-8">
        <label className="block mb-3 font-medium text-card-foreground">
          Select a loan type
        </label>
        <div className="flex gap-3 flex-wrap">
          {loanTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleLoanTypeSelect(type)}
              className={`px-6 py-3 border border-border rounded-full text-sm font-medium transition-all duration-200 ${
                selectedLoanType === type.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-card-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      <SimpleInput
        label="Loan Amount"
        value={loanAmount}
        onChange={setLoanAmount}
        prefix="$"
        suffix="JMD"
        tooltip="The total amount you want to borrow"
      />

      <SimpleInput
        label="How long"
        value={loanTerm}
        onChange={setLoanTerm}
        tooltip="How long to repay the loan in months"
      />

      <SimpleInput
        label="Initial Deposit"
        value={deposit}
        onChange={setDeposit}
        prefix="$"
        suffix="JMD"
        tooltip="Upfront payment to reduce loan amount"
      />
    </div>
  );
};

export default CalculatorPanel;