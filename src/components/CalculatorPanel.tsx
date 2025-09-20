import { useState } from "react";

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
  const [slidingStates, setSlidingStates] = useState({
    loanAmount: false,
    loanTerm: false,
    deposit: false,
    interestRate: false
  });

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

  const handleSliderStart = (sliderType: string) => {
    setSlidingStates(prev => ({ ...prev, [sliderType]: true }));
  };

  const handleSliderEnd = (sliderType: string) => {
    setSlidingStates(prev => ({ ...prev, [sliderType]: false }));
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg">
      <h3 className="text-lg font-bold text-slate-800 mb-1">Loan Calculator</h3>
      <p className="text-slate-600 mb-4">Work out your payments with precision</p>

      {/* Loan Type Selection */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Select a loan type</label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {loanTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleLoanTypeSelect(type)}
              className={`relative py-2 px-3 rounded-full border-2 text-xs font-medium transition-all duration-300 ${
                selectedLoanType === type.id
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500 transform scale-95 shadow-lg"
                  : "bg-white text-slate-700 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:-translate-y-1 hover:shadow-md"
              }`}
            >
              {type.name}
              {selectedLoanType === type.id && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* Loan Amount */}
        <div className="bg-gray-50 p-3 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-800">Loan Amount</span>
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border">
              <span className="text-gray-600 text-xs">$</span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseInt(e.target.value) || 0)}
                className="w-20 text-center font-semibold text-gray-800 bg-transparent outline-none text-xs"
                min="100000"
                max="50000000"
                step="100000"
              />
              <span className="text-gray-600 text-xs">JMD</span>
            </div>
          </div>
          <div className="relative">
            {slidingStates.loanAmount && (
              <div 
                className="absolute -top-16 bg-background border-2 border-primary text-foreground px-4 py-3 rounded-2xl font-bold text-lg shadow-xl z-30 transform -translate-x-1/2 animate-scale-in min-w-max"
                style={{ left: `${((loanAmount - 100000) / (50000000 - 100000)) * 100}%` }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-primary">{formatCurrency(loanAmount)} JMD</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary"></div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-2px] w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-background"></div>
              </div>
            )}
            <input
              type="range"
              min={100000}
              max={50000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              onMouseDown={() => handleSliderStart('loanAmount')}
              onMouseUp={() => handleSliderEnd('loanAmount')}
              onTouchStart={() => handleSliderStart('loanAmount')}
              onTouchEnd={() => handleSliderEnd('loanAmount')}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>$100K</span>
              <span>$50M</span>
            </div>
          </div>
        </div>

        {/* Loan Term */}
        <div className="bg-gray-50 p-3 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-800">Loan Term</span>
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border">
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value) || 12)}
                className="w-12 text-center font-semibold text-gray-800 bg-transparent outline-none text-xs"
                min="12"
                max="480"
              />
              <span className="text-gray-600 font-medium text-xs">months</span>
            </div>
          </div>
          <div className="relative">
            {slidingStates.loanTerm && (
              <div 
                className="absolute -top-16 bg-background border-2 border-primary text-foreground px-4 py-3 rounded-2xl font-bold text-lg shadow-xl z-30 transform -translate-x-1/2 animate-scale-in min-w-max"
                style={{ left: `${((loanTerm - 12) / (480 - 12)) * 100}%` }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-primary">{Math.round(loanTerm / 12)} years</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary"></div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-2px] w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-background"></div>
              </div>
            )}
            <input
              type="range"
              min={12}
              max={480}
              step={12}
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseInt(e.target.value))}
              onMouseDown={() => handleSliderStart('loanTerm')}
              onMouseUp={() => handleSliderEnd('loanTerm')}
              onTouchStart={() => handleSliderStart('loanTerm')}
              onTouchEnd={() => handleSliderEnd('loanTerm')}
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
                value={deposit}
                onChange={(e) => setDeposit(parseInt(e.target.value) || 0)}
                className="w-20 text-center font-semibold text-gray-800 bg-transparent outline-none text-xs"
                min="0"
                max="5000000"
                step="50000"
              />
              <span className="text-gray-600 text-xs">JMD</span>
            </div>
          </div>
          <div className="relative">
            {slidingStates.deposit && (
              <div 
                className="absolute -top-16 bg-background border-2 border-primary text-foreground px-4 py-3 rounded-2xl font-bold text-lg shadow-xl z-30 transform -translate-x-1/2 animate-scale-in min-w-max"
                style={{ left: `${(deposit / 5000000) * 100}%` }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-primary">{formatCurrency(deposit)} JMD</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary"></div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-2px] w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-background"></div>
              </div>
            )}
            <input
              type="range"
              min={0}
              max={5000000}
              step={50000}
              value={deposit}
              onChange={(e) => setDeposit(parseInt(e.target.value))}
              onMouseDown={() => handleSliderStart('deposit')}
              onMouseUp={() => handleSliderEnd('deposit')}
              onTouchStart={() => handleSliderStart('deposit')}
              onTouchEnd={() => handleSliderEnd('deposit')}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>$0</span>
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
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                className="w-12 text-center font-semibold text-gray-800 bg-transparent outline-none text-xs"
                min="0"
                max="25"
                step="0.5"
              />
              <span className="text-gray-600 font-medium text-xs">%</span>
            </div>
          </div>
          <div className="relative">
            {slidingStates.interestRate && (
              <div 
                className="absolute -top-16 bg-background border-2 border-primary text-foreground px-4 py-3 rounded-2xl font-bold text-lg shadow-xl z-30 transform -translate-x-1/2 animate-scale-in min-w-max"
                style={{ left: `${(interestRate / 25) * 100}%` }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-primary">{interestRate}%</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary"></div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-2px] w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-background"></div>
              </div>
            )}
            <input
              type="range"
              min={0}
              max={25}
              step={0.5}
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              onMouseDown={() => handleSliderStart('interestRate')}
              onMouseUp={() => handleSliderEnd('interestRate')}
              onTouchStart={() => handleSliderStart('interestRate')}
              onTouchEnd={() => handleSliderEnd('interestRate')}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0%</span>
              <span>25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPanel;