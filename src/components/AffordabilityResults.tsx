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
    <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl p-4 text-white relative overflow-hidden h-fit">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="animate-float w-full h-full bg-gradient-to-r from-transparent via-white to-transparent" 
             style={{
               backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }}>
        </div>
      </div>

      {/* Loan Type Selection - Inline Cards */}
      <div className="flex gap-2 mb-4 justify-center relative z-10">
        {loanTypes.map((type) => (
          <button
            key={type.name}
            onClick={() => handleLoanTypeChange(type.name)}
            className={`relative px-3 py-2 rounded-full border-2 font-medium text-xs transition-all duration-300 ${
              selectedLoanType === type.name
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500 transform scale-95 shadow-lg"
                : "bg-white/10 text-white border-white/20 hover:border-blue-300 hover:bg-white/20 hover:-translate-y-1 hover:shadow-md backdrop-blur-sm"
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
      <div className="text-center mb-4 p-3 bg-white/5 rounded-2xl backdrop-blur-sm relative z-10">
        <div className="text-3xl font-bold mb-2 animate-pulse-slow bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">{formatCurrency(totalAffordable)}</div>
        <div className="text-sm opacity-90 uppercase tracking-wide">What can afford?</div>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <div className="text-xs opacity-80 mb-1 uppercase tracking-wide">Total Income</div>
          <div className="text-sm font-semibold mb-2">{formatCurrency(totalIncome)}</div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700 breakdown-fill"
              style={{ width: `${totalIncome > 0 ? Math.min((totalIncome / (totalIncome + totalExpenses || 1)) * 100, 100) : 0}%` }}
            />
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <div className="text-xs opacity-80 mb-1 uppercase tracking-wide">Total Expenses</div>
          <div className="text-sm font-semibold mb-2">{formatCurrency(totalExpenses)}</div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-700 breakdown-fill"
              style={{ width: `${totalExpenses > 0 ? Math.min((totalExpenses / (totalIncome + totalExpenses || 1)) * 100, 100) : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Monthly Payment */}
      <div className="bg-white/8 rounded-xl p-3 mb-4 relative z-10">
        <div className="flex justify-between items-center py-2">
          <span className="text-xs opacity-80 uppercase tracking-wide">Monthly Payment</span>
          <span className="font-semibold text-sm">{formatCurrency(maxMonthlyPayment)}</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="space-y-4 relative z-10">
        {/* Loan Tenure */}
        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs opacity-80 uppercase tracking-wide">Loan Tenure</span>
            <div className="flex items-center gap-2 bg-white/10 px-2 py-1 rounded-lg border border-white/20">
              <input
                type="number"
                value={Math.floor(loanTerm / 12)}
                onChange={(e) => setLoanTerm(parseInt(e.target.value) * 12 || 120)}
                className="w-10 text-center font-semibold text-white bg-transparent outline-none text-xs"
                min="1"
                max="40"
              />
              <span className="text-white/80 font-medium text-xs">years</span>
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
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between mt-1 text-xs text-white/60">
              <span>1 year</span>
              <span>40 years</span>
            </div>
          </div>
        </div>

        {/* Initial Deposit */}
        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs opacity-80 uppercase tracking-wide">Initial Deposit</span>
            <div className="flex items-center gap-2 bg-white/10 px-2 py-1 rounded-lg border border-white/20">
              <span className="text-white/80 text-xs">$</span>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(parseInt(e.target.value) || 100000)}
                className="w-16 text-center font-semibold text-white bg-transparent outline-none text-xs"
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
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between mt-1 text-xs text-white/60">
              <span>$100K</span>
              <span>$5M</span>
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs opacity-80 uppercase tracking-wide">Interest Rate</span>
            <div className="flex items-center gap-2 bg-white/10 px-2 py-1 rounded-lg border border-white/20">
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 6)}
                className="w-10 text-center font-semibold text-white bg-transparent outline-none text-xs"
                min="1"
                max="25"
                step="0.5"
              />
              <span className="text-white/80 font-medium text-xs">%</span>
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
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between mt-1 text-xs text-white/60">
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