import { useState } from "react";
import { formatCurrency } from "../lib/utils";
import SliderInput from "./SliderInput";

interface AffordabilityResultsProps {
  results: {
    totalIncome: number;
    totalExpenses: number;
    availableIncome: number;
    maxMonthlyPayment: number;
    debtToIncomeRatio: number;
  };
}

const AffordabilityResults = ({ results }: AffordabilityResultsProps) => {
  const [selectedLoanType, setSelectedLoanType] = useState("Mortgage");
  const [loanTerm, setLoanTerm] = useState(240); // 20 years in months
  const [downPayment, setDownPayment] = useState(500000);
  const [interestRate, setInterestRate] = useState(6.0);

  const {
    totalIncome,
    totalExpenses,
    availableIncome,
    maxMonthlyPayment
  } = results;

  // Calculate loan amount based on payment capacity
  const calculateLoanAmount = () => {
    if (maxMonthlyPayment <= 0 || interestRate <= 0 || loanTerm <= 0) return 0;
    const monthlyRate = (interestRate / 100) / 12;
    return (maxMonthlyPayment * (Math.pow(1 + monthlyRate, loanTerm) - 1)) / 
           (monthlyRate * Math.pow(1 + monthlyRate, loanTerm));
  };

  const maxLoanAmount = calculateLoanAmount();
  const totalAffordable = maxLoanAmount + downPayment;
  
  const loanTypes = [
    { name: "Mortgage", rate: 6.0 },
    { name: "Unsecured", rate: 12.0 },
    { name: "Auto", rate: 8.5 }
  ];

  const handleLoanTypeChange = (type: string) => {
    setSelectedLoanType(type);
    const selectedType = loanTypes.find(t => t.name === type);
    if (selectedType) {
      setInterestRate(selectedType.rate);
    }
  };

  return (
    <div className="calculator-panel">
      {/* Loan Type Selection */}
      <div className="loan-types mb-8">
        {loanTypes.map((type) => (
          <div
            key={type.name}
            onClick={() => handleLoanTypeChange(type.name)}
            className={`loan-type ${selectedLoanType === type.name ? 'selected' : ''}`}
          >
            {type.name}
          </div>
        ))}
      </div>

      {/* Main Affordability Display */}
      <div className="payment-amount mb-8">
        <div className="amount-value">{formatCurrency(totalAffordable)}</div>
        <div className="amount-label">What can you afford?</div>
      </div>

      {/* Progress Bars */}
      <div className="mb-8">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Income</span>
            <span>{formatCurrency(totalIncome)}</span>
          </div>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill principal-fill"
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Expense</span>
            <span>{formatCurrency(totalExpenses)}</span>
          </div>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill interest-fill"
              style={{ 
                width: totalIncome > 0 ? `${(totalExpenses / totalIncome) * 100}%` : '0%' 
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Monthly Payment */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-slate-700 mb-2">Monthly Payment</h4>
        <div className="text-2xl font-bold text-slate-800">{formatCurrency(maxMonthlyPayment)}</div>
      </div>

      {/* Sliders */}
      <SliderInput
        label="Loan Tenure"
        value={loanTerm}
        onChange={setLoanTerm}
        min={12}
        max={480}
        step={12}
        formatValue={(val) => {
          const months = val;
          const years = Math.floor(months / 12);
          return years > 0 ? `${years} years` : `${months} months`;
        }}
        tooltip="Duration of the loan in years"
      />

      <SliderInput
        label="Initial Deposit"
        value={downPayment}
        onChange={setDownPayment}
        min={0}
        max={5000000}
        step={50000}
        formatValue={(val) => formatCurrency(val)}
        tooltip="Amount you can pay upfront"
      />

      <SliderInput
        label="Interest Rate"
        value={interestRate}
        onChange={setInterestRate}
        min={1}
        max={25}
        step={0.5}
        formatValue={(val) => `${val.toFixed(1)}%`}
        tooltip="Annual interest rate"
      />
    </div>
  );
};

export default AffordabilityResults;