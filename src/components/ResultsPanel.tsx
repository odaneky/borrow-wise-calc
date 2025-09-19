import { useMemo } from "react";
import { Button } from "@/components/ui/button";

interface ResultsPanelProps {
  loanAmount: number;
  loanTerm: number;
  deposit: number;
  interestRate: number;
}

const ResultsPanel = ({ loanAmount, loanTerm, deposit, interestRate }: ResultsPanelProps) => {
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

  const handleApply = () => {
    const principal = Math.max(0, loanAmount - deposit);
    alert(`Application for loan of ${formatCurrency(principal)} has been initiated. A representative will contact you shortly.`);
  };

  const handleAmortization = () => {
    alert('Amortization breakdown feature coming soon!');
  };

  return (
    <div className="bg-panel-dark rounded-lg p-8 text-panel-dark-foreground">
      {/* Monthly Payment Display */}
      <div className="text-center mb-8">
        <div className="text-5xl font-bold mb-2 text-primary">
          {formatCurrency(calculations.monthlyPayment)}
        </div>
        <div className="text-base opacity-80">Monthly Payment</div>
      </div>

      {/* Principal and Interest Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-panel-darker rounded-lg p-4">
          <div className="text-sm opacity-80 mb-2">Principal</div>
          <div className="h-2 bg-panel-dark rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${calculations.principalPercentage}%` }}
            ></div>
          </div>
          <div className="text-lg font-semibold">{formatCurrency(calculations.monthlyPrincipalPayment)}</div>
        </div>
        <div className="bg-panel-darker rounded-lg p-4">
          <div className="text-sm opacity-80 mb-2">Interest</div>
          <div className="h-2 bg-panel-dark rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-destructive rounded-full transition-all duration-500"
              style={{ width: `${calculations.interestPercentage}%` }}
            ></div>
          </div>
          <div className="text-lg font-semibold">{formatCurrency(calculations.monthlyInterestPayment)}</div>
        </div>
      </div>

      {/* Commitment Fee and Payback Date */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-panel-darker rounded-lg p-4">
          <div className="text-sm opacity-80 mb-1">Commitment Fee</div>
          <div className="text-lg font-semibold">$0</div>
        </div>
        <div className="bg-panel-darker rounded-lg p-4">
          <div className="text-sm opacity-80 mb-1">Payback Date</div>
          <div className="text-lg font-semibold">-</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-6">
        <Button 
          onClick={handleApply}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium"
        >
          Apply Now
        </Button>
        <Button 
          onClick={handleAmortization}
          variant="outline"
          className="w-full bg-transparent border border-panel-dark-foreground/20 text-panel-dark-foreground hover:bg-panel-dark-foreground/10 py-3 rounded-lg font-medium"
        >
          View Amortized Breakdown
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="text-xs opacity-70 leading-relaxed">
        <strong>Disclaimer:</strong> This calculator provides estimates only. Actual loan terms, rates, and 
        fees may vary based on your creditworthiness and the lender's policies.
      </div>
    </div>
  );
};

export default ResultsPanel;