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
    <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-200 h-fit">
      {/* Loan Type Selection - Inline Cards */}
      <div className="flex gap-2 mb-4 justify-center">
        {loanTypes.map((type) => (
          <button
            key={type.name}
            onClick={() => handleLoanTypeChange(type.name)}
            className={`relative px-3 py-2 rounded-full border-2 font-medium text-xs transition-all duration-300 ${
              selectedLoanType === type.name
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500 transform scale-95 shadow-lg"
                : "bg-white text-slate-700 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:-translate-y-1 hover:shadow-md"
            }`}
          >
            {type.name}
            {selectedLoanType === type.name && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main Affordability Display */}
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">{formatCurrency(totalAffordable)}</div>
        <div className="text-base text-gray-600">What can afford?</div>
      </div>

      {/* Progress Bars */}
      <div className="mb-4 space-y-2">
        <div>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span className="font-medium">Income</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gray-500 h-3 rounded-full transition-all duration-500"
              style={{ width: '75%' }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-gray-700 mb-1">
            <span className="font-medium">Expense</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gray-400 h-3 rounded-full transition-all duration-500"
              style={{ 
                width: totalIncome > 0 ? `${Math.min(75, (totalExpenses / totalIncome) * 75)}%` : '0%' 
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Monthly Payment */}
      <div className="mb-4">
        <h4 className="text-base font-semibold text-gray-900 mb-1">Monthly Payment</h4>
        <div className="text-xl font-bold text-gray-900">{formatCurrency(maxMonthlyPayment)}</div>
      </div>

      {/* Interactive Controls */}
      <div className="space-y-4">
        {/* Loan Tenure */}
        <div className="bg-gray-50 p-3 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-800">Loan Tenure</span>
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border">
              <input
                type="number"
                value={Math.floor(loanTerm / 12)}
                onChange={(e) => setLoanTerm(parseInt(e.target.value) * 12 || 120)}
                className="w-10 text-center font-semibold text-gray-800 bg-transparent outline-none text-xs"
                min="1"
                max="40"
              />
              <span className="text-gray-600 font-medium text-xs">years</span>
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
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>1 year</span>
              <span>40 years</span>
            </div>
          </div>
        </div>

        {/* Initial Deposit */}
        <div className="bg-gray-50 p-3 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-800">Initial Deposit</span>
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border">
              <span className="text-gray-600 text-xs">$</span>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(parseInt(e.target.value) || 100000)}
                className="w-16 text-center font-semibold text-gray-800 bg-transparent outline-none text-xs"
                min="100000"
                max="5000000"
                step="100000"
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
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>$100K</span>
              <span>$5M</span>
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="bg-gray-50 p-3 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-800">Interest Rate</span>
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border">
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 6)}
                className="w-10 text-center font-semibold text-gray-800 bg-transparent outline-none text-xs"
                min="1"
                max="25"
                step="0.5"
              />
              <span className="text-gray-600 font-medium text-xs">%</span>
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
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>1%</span>
              <span>25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffordabilityResults;