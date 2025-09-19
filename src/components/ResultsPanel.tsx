import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

interface ResultsPanelProps {
  loanAmount: number;
  loanTerm: number;
  deposit: number;
  interestRate: number;
}

const ResultsPanel = ({ loanAmount, loanTerm, deposit, interestRate }: ResultsPanelProps) => {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculations = useMemo(() => {
    const principal = Math.max(0, loanAmount - deposit);
    
    if (principal <= 0 || loanTerm <= 0 || interestRate <= 0) {
      return {
        monthlyPayment: 0,
        monthlyPrincipalPayment: 0,
        monthlyInterestPayment: 0,
        totalLoan: 0,
        totalInterest: 0,
        totalPayment: 0,
        principalPercentage: 0,
        interestPercentage: 0,
        effectiveRate: 0,
        paybackDate: new Date()
      };
    }
    
    const monthlyRate = (interestRate / 100) / 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                          (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    const totalPayments = monthlyPayment * loanTerm;
    const totalInterest = totalPayments - principal;
    const effectiveRate = (totalInterest / principal) * 100;
    
    // Calculate first month's principal and interest breakdown
    const monthlyInterestPayment = principal * monthlyRate;
    const monthlyPrincipalPayment = monthlyPayment - monthlyInterestPayment;
    const principalPercentage = (monthlyPrincipalPayment / monthlyPayment) * 100;
    const interestPercentage = (monthlyInterestPayment / monthlyPayment) * 100;
    
    const paybackDate = new Date();
    paybackDate.setMonth(paybackDate.getMonth() + loanTerm);
    
    return {
      monthlyPayment,
      monthlyPrincipalPayment,
      monthlyInterestPayment,
      totalLoan: principal,
      totalInterest,
      totalPayment: totalPayments,
      principalPercentage,
      interestPercentage,
      effectiveRate,
      paybackDate
    };
  }, [loanAmount, loanTerm, deposit, interestRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-JM', {
      style: 'currency',
      currency: 'JMD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleApply = async () => {
    setIsLoading(true);
    const principal = Math.max(0, loanAmount - deposit);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showMessage('success', `Application submitted successfully! Reference #LN${Date.now()}`);
    } catch {
      showMessage('error', 'Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmortization = () => {
    const principal = calculations.totalLoan;
    const rate = interestRate / 100 / 12;
    const months = loanTerm;
    
    if (principal <= 0 || months <= 0 || rate <= 0) {
      showMessage('error', 'Please enter valid loan details first.');
      return;
    }
    
    // Create a simple alert for now
    alert(`Amortization schedule for ${formatCurrency(principal)} loan over ${months} months at ${interestRate}% APR would be displayed here.`);
  };

  return (
    <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl p-4 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="animate-float w-full h-full bg-gradient-to-r from-transparent via-white to-transparent" 
             style={{
               backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }}>
        </div>
      </div>

      {/* Message display */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg animate-slide-in ${
          message.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/50 text-green-100' 
            : 'bg-red-500/20 border border-red-500/50 text-red-100'
        }`}>
          {message.text}
        </div>
      )}

      {/* Monthly Payment Display */}
      <div className="text-center mb-4 p-3 bg-white/5 rounded-2xl backdrop-blur-sm relative z-10">
        <div className="text-3xl font-bold mb-2 animate-pulse-slow bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          {formatCurrency(calculations.monthlyPayment)}
        </div>
        <div className="text-sm opacity-90 uppercase tracking-wide">Monthly Payment</div>
      </div>

      {/* Loan Summary */}
      <div className="bg-white/8 rounded-xl p-3 mb-4 relative z-10">
        <div className="flex justify-between items-center py-2 border-b border-white/10">
          <span className="text-xs opacity-80">Total Loan Amount</span>
          <span className="font-semibold text-sm">{formatCurrency(calculations.totalLoan)}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/10">
          <span className="text-xs opacity-80">Total Interest</span>
          <span className="font-semibold text-sm">{formatCurrency(calculations.totalInterest)}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-xs opacity-80">Total Amount to Pay</span>
          <span className="font-semibold text-sm">{formatCurrency(calculations.totalPayment)}</span>
        </div>
      </div>

      {/* Principal and Interest Breakdown */}
      <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <div className="text-xs opacity-80 mb-1 uppercase tracking-wide">Total Principal</div>
          <div className="text-sm font-semibold mb-2">{formatCurrency(calculations.totalLoan)}</div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700 breakdown-fill"
              style={{ width: `${(calculations.totalLoan / calculations.totalPayment) * 100}%` }}
            />
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <div className="text-xs opacity-80 mb-1 uppercase tracking-wide">Total Interest</div>
          <div className="text-sm font-semibold mb-2">{formatCurrency(calculations.totalInterest)}</div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-700 breakdown-fill"
              style={{ width: `${(calculations.totalInterest / calculations.totalPayment) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <div className="text-xs opacity-80 mb-1 uppercase tracking-wide">Effective Rate</div>
          <div className="text-sm font-semibold">{calculations.effectiveRate.toFixed(2)}%</div>
        </div>
        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <div className="text-xs opacity-80 mb-1 uppercase tracking-wide">Payback Date</div>
          <div className="text-sm font-semibold">
            {calculations.paybackDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-4 relative z-10">
        <Button 
          onClick={handleApply}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {isLoading ? (
            <>
              Applying...
              <span className="loading-spinner"></span>
            </>
          ) : (
            'Apply Now'
          )}
        </Button>
        <Button 
          onClick={handleAmortization}
          variant="outline"
          className="flex-1 bg-white/10 border border-white/20 text-white hover:bg-white/20 py-3 rounded-xl font-semibold text-sm backdrop-blur-sm"
        >
          View Amortization
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="bg-white/10 rounded-xl p-3 text-xs opacity-80 leading-relaxed relative z-10 backdrop-blur-sm">
        <strong>Disclaimer:</strong> This calculator provides estimates only. Actual loan terms may vary based on your credit profile and lender requirements.
      </div>
    </div>
  );
};

export default ResultsPanel;