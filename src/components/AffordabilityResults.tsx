import { useState } from "react";
import { formatCurrency } from "../lib/utils";

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
    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 h-fit">
      {/* Loan Type Selection - Inline Cards */}
      <div className="flex gap-4 mb-8 justify-center">
        {loanTypes.map((type) => (
          <button
            key={type.name}
            onClick={() => handleLoanTypeChange(type.name)}
            className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
              selectedLoanType === type.name
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-300 bg-white text-gray-700 hover:border-blue-300"
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>

      {/* Main Affordability Display */}
      <div className="text-center mb-8">
        <div className="text-5xl font-bold text-gray-900 mb-2">{formatCurrency(totalAffordable)}</div>
        <div className="text-lg text-gray-600">What can afford?</div>
      </div>

      {/* Progress Bars */}
      <div className="mb-8 space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span className="font-medium">Income</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gray-500 h-4 rounded-full transition-all duration-500"
              style={{ width: '75%' }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span className="font-medium">Expense</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gray-400 h-4 rounded-full transition-all duration-500"
              style={{ 
                width: totalIncome > 0 ? `${Math.min(75, (totalExpenses / totalIncome) * 75)}%` : '0%' 
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Monthly Payment */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">Monthly Payment</h4>
        <div className="text-3xl font-bold text-gray-900">{formatCurrency(maxMonthlyPayment)}</div>
      </div>

      {/* Sliders with Input Boxes */}
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm text-gray-700 mb-3">
            <span className="font-medium">Loan Tenure</span>
            <div className="flex items-center gap-2">
              <span>10</span>
              <span className="mx-2">-</span>
              <span>40</span>
              <input
                type="number"
                value={Math.floor(loanTerm / 12)}
                onChange={(e) => setLoanTerm(parseInt(e.target.value) * 12 || 120)}
                className="w-12 px-2 py-1 text-center bg-gray-200 rounded text-sm font-medium"
                min="1"
                max="40"
              />
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min={12}
              max={480}
              step={12}
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="absolute left-0 top-6 text-xs text-gray-500">10</div>
            <div className="absolute right-0 top-6 text-xs text-gray-500">40</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-700 mb-3">
            <span className="font-medium">Initial Deposit</span>
            <div className="flex items-center gap-2">
              <span>10</span>
              <span className="mx-2">-</span>
              <span>40</span>
              <input
                type="number"
                value={Math.floor(downPayment / 100000)}
                onChange={(e) => setDownPayment((parseInt(e.target.value) || 1) * 100000)}
                className="w-12 px-2 py-1 text-center bg-gray-200 rounded text-sm font-medium"
                min="1"
                max="50"
              />
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min={100000}
              max={5000000}
              step={100000}
              value={downPayment}
              onChange={(e) => setDownPayment(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="absolute left-0 top-6 text-xs text-gray-500">10</div>
            <div className="absolute right-0 top-6 text-xs text-gray-500">40</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-700 mb-3">
            <span className="font-medium">Interest Rate</span>
            <div className="flex items-center gap-2">
              <span>6%</span>
              <span className="mx-2">-</span>
              <span>20%</span>
              <input
                type="number"
                value={Math.floor(interestRate)}
                onChange={(e) => setInterestRate(parseInt(e.target.value) || 6)}
                className="w-12 px-2 py-1 text-center bg-gray-200 rounded text-sm font-medium"
                min="1"
                max="25"
              />
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min={1}
              max={25}
              step={0.5}
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="absolute left-0 top-6 text-xs text-gray-500">6%</div>
            <div className="absolute right-0 top-6 text-xs text-gray-500">20%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffordabilityResults;