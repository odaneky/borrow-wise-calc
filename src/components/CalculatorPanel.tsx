import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

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
  const [depositPercentage, setDepositPercentage] = useState(0); // New state for percentage
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

  const handleDepositPercentageChange = (percentage: number) => {
    setDepositPercentage(percentage);
    const calculatedDeposit = (loanAmount * percentage) / 100;
    setDeposit(calculatedDeposit);
  };

  const handleLoanAmountChange = (newLoanAmount: number) => {
    setLoanAmount(newLoanAmount);
    // Recalculate deposit based on current percentage
    if (depositPercentage > 0) {
      const calculatedDeposit = (newLoanAmount * depositPercentage) / 100;
      setDeposit(calculatedDeposit);
    }
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
    <TooltipProvider>
      <div className="bg-white rounded-2xl p-4">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Loan Calculator</h3>
        <p className="text-slate-600 mb-4">Work out your payments with precision</p>

        {/* Loan Type Selection */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-sm font-semibold text-slate-700">Select a loan type</label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400 hover:text-blue-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Different loan types have different rates based on risk</p>
                </TooltipContent>
              </Tooltip>
          </div>
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
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">Loan Amount</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-gray-400 hover:text-blue-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total amount you want to borrow</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border">
              <span className="text-gray-600 text-xs">$</span>
              <input
                type="text"
                value={loanAmount === 0 ? "0" : loanAmount.toLocaleString()}
                onChange={(e) => {
                  const numericValue = parseInt(e.target.value.replace(/,/g, '')) || 0;
                  if (numericValue >= 0 && numericValue <= 50000000) {
                    handleLoanAmountChange(numericValue);
                  }
                }}
                className="w-20 text-center font-semibold text-gray-800 bg-transparent outline-none text-xs"
              />
              <span className="text-gray-600 text-xs">JMD</span>
            </div>
          </div>
          <div className="relative">
            {slidingStates.loanAmount && (
              <div 
                className="absolute -top-12 bg-slate-800 text-white px-3 py-2 rounded-xl font-semibold text-sm shadow-lg z-30 transform -translate-x-1/2 animate-scale-in whitespace-nowrap"
                style={{ left: `${((loanAmount - 100000) / (50000000 - 100000)) * 100}%` }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span>{formatCurrency(loanAmount)} JMD</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
              </div>
            )}
            <input
              type="range"
              min={100000}
              max={50000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => handleLoanAmountChange(parseInt(e.target.value))}
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
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">Loan Term</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-gray-400 hover:text-blue-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Length of time to repay. Longer = lower payments, more interest</p>
                </TooltipContent>
              </Tooltip>
            </div>
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
                className="absolute -top-12 bg-blue-600 text-white px-3 py-2 rounded-xl font-semibold text-sm shadow-lg z-30 transform -translate-x-1/2 animate-scale-in whitespace-nowrap"
                style={{ left: `${((loanTerm - 12) / (480 - 12)) * 100}%` }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span>{Math.round(loanTerm / 12)} years</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
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
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">Initial Deposit</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-gray-400 hover:text-blue-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upfront payment to reduce loan amount and monthly payments</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border">
              <span className="text-gray-600 text-xs">$</span>
              <input
                type="text"
                value={deposit === 0 ? "0" : deposit.toLocaleString()}
                onChange={(e) => {
                  const numericValue = parseInt(e.target.value.replace(/,/g, '')) || 0;
                  if (numericValue >= 0 && numericValue <= 5000000) {
                    setDeposit(numericValue);
                  }
                }}
                className="w-20 text-center font-semibold text-gray-800 bg-transparent outline-none text-xs"
              />
              <span className="text-gray-600 text-xs">JMD</span>
            </div>
          </div>
          <div className="relative">
            {slidingStates.deposit && (
              <div 
                className="absolute -top-12 bg-emerald-600 text-white px-3 py-2 rounded-xl font-semibold text-sm shadow-lg z-30 transform -translate-x-1/2 animate-scale-in whitespace-nowrap"
                style={{ left: `${depositPercentage}%` }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span>{depositPercentage}% ({formatCurrency(deposit)} JMD)</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-emerald-600"></div>
              </div>
            )}
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={depositPercentage}
              onChange={(e) => handleDepositPercentageChange(parseInt(e.target.value))}
              onMouseDown={() => handleSliderStart('deposit')}
              onMouseUp={() => handleSliderEnd('deposit')}
              onTouchStart={() => handleSliderStart('deposit')}
              onTouchEnd={() => handleSliderEnd('deposit')}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="bg-gray-50 p-3 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">Interest Rate</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-gray-400 hover:text-blue-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Annual percentage rate - the cost of borrowing money yearly</p>
                </TooltipContent>
              </Tooltip>
            </div>
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
                className="absolute -top-12 bg-purple-600 text-white px-3 py-2 rounded-xl font-semibold text-sm shadow-lg z-30 transform -translate-x-1/2 animate-scale-in whitespace-nowrap"
                style={{ left: `${(interestRate / 25) * 100}%` }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
                  <span>{interestRate}%</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-600"></div>
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
    </TooltipProvider>
  );
};

export default CalculatorPanel;