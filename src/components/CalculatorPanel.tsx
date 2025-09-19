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
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Loan Calculator</h3>
      <p className="text-slate-600 mb-8">Work out your payments with precision</p>

      {/* Loan Type Selection */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Select a loan type</label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {loanTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleLoanTypeSelect(type)}
              className={`relative p-3 rounded-full border-2 text-sm font-medium transition-all duration-300 ${
                selectedLoanType === type.id
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500 transform scale-95 shadow-lg"
                  : "bg-white text-slate-700 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:-translate-y-1 hover:shadow-md"
              }`}
            >
              {type.name}
              {selectedLoanType === type.id && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <SimpleInput
          label="Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          prefix="$"
          suffix="JMD"
          tooltip="The total amount you want to borrow"
        />
        
        <SimpleInput
          label="Loan Term"
          value={loanTerm}
          onChange={setLoanTerm}
          suffix="months"
          type="number"
          tooltip="How long to repay the loan"
        />
        
        <SimpleInput
          label="Initial Deposit"
          value={deposit}
          onChange={setDeposit}
          prefix="$"
          suffix="JMD"
          tooltip="Upfront payment to reduce loan amount"
        />
        
        <SimpleInput
          label="Interest Rate"
          value={interestRate}
          onChange={setInterestRate}
          suffix="%"
          type="number"
          tooltip="Annual percentage rate (APR)"
        />
      </div>
    </div>
  );
};

export default CalculatorPanel;