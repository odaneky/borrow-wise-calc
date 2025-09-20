import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface ResultsPanelProps {
  loanAmount: number;
  loanTerm: number;
  deposit: number;
  interestRate: number;
}

const ResultsPanel = ({ loanAmount, loanTerm, deposit, interestRate }: ResultsPanelProps) => {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);

  const calculations = useMemo(() => {
    const principal = Math.max(0, loanAmount - deposit);
    
    if (principal <= 0 || loanTerm <= 0 || interestRate < 0) {
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
        paybackDate: new Date(),
        amortizationSchedule: []
      };
    }
    
    // Handle zero interest rate case
    if (interestRate === 0) {
      const monthlyPayment = principal / loanTerm;
      const paybackDate = new Date();
      paybackDate.setMonth(paybackDate.getMonth() + loanTerm);
      
      // Calculate amortization schedule for zero interest
      const amortizationSchedule = [];
      let remainingBalance = principal;
      
      for (let month = 1; month <= loanTerm; month++) {
        const principalPayment = monthlyPayment;
        remainingBalance = Math.max(0, remainingBalance - principalPayment);
        
        const paymentDate = new Date();
        paymentDate.setMonth(paymentDate.getMonth() + month);
        
        amortizationSchedule.push({
          month,
          date: paymentDate,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: 0,
          balance: remainingBalance
        });
      }
      
      return {
        monthlyPayment,
        monthlyPrincipalPayment: monthlyPayment,
        monthlyInterestPayment: 0,
        totalLoan: principal,
        totalInterest: 0,
        totalPayment: principal,
        principalPercentage: 100,
        interestPercentage: 0,
        effectiveRate: 0,
        paybackDate,
        amortizationSchedule
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
    
    // Calculate amortization schedule
    const amortizationSchedule = [];
    let remainingBalance = principal;
    
    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance = Math.max(0, remainingBalance - principalPayment);
      
      const paymentDate = new Date();
      paymentDate.setMonth(paymentDate.getMonth() + month);
      
      amortizationSchedule.push({
        month,
        date: paymentDate,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance
      });
    }
    
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
      paybackDate,
      amortizationSchedule
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
    if (calculations.totalLoan <= 0 || loanTerm <= 0 || interestRate <= 0) {
      showMessage('error', 'Please enter valid loan details first.');
      return;
    }
    setShowAmortization(true);
  };

  return (
    <TooltipProvider>
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
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-80">Total Loan Amount</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-white/60 hover:text-white" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Loan amount minus your deposit</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="font-semibold text-sm">{formatCurrency(calculations.totalLoan)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-80">Total Amount to Pay</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-white/60 hover:text-white" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Principal + total interest over loan term</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="font-semibold text-sm">{formatCurrency(calculations.totalPayment)}</span>
          </div>
        </div>

        {/* Principal and Interest Breakdown */}
        <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-xs opacity-80 uppercase tracking-wide">Total Principal</div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-white/60 hover:text-white" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Original loan amount borrowed</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-sm font-semibold mb-2">{formatCurrency(calculations.totalLoan)}</div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700 breakdown-fill"
                style={{ width: `${(calculations.totalLoan / calculations.totalPayment) * 100}%` }}
              />
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-xs opacity-80 uppercase tracking-wide">Total Interest</div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-white/60 hover:text-white" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Extra cost for borrowing money</p>
                </TooltipContent>
              </Tooltip>
            </div>
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
            <div className="flex items-center gap-2 mb-1">
              <div className="text-xs opacity-80 uppercase tracking-wide">Effective Rate</div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-white/60 hover:text-white" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total interest as % of principal</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-sm font-semibold">{calculations.effectiveRate.toFixed(2)}%</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-xs opacity-80 uppercase tracking-wide">Payback Date</div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-white/60 hover:text-white" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>When loan will be fully paid</p>
                </TooltipContent>
              </Tooltip>
            </div>
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
        <Dialog open={showAmortization} onOpenChange={setShowAmortization}>
          <DialogTrigger asChild>
            <Button 
              onClick={handleAmortization}
              variant="outline"
              className="flex-1 bg-white/10 border border-white/20 text-white hover:bg-white/20 py-3 rounded-xl font-semibold text-sm backdrop-blur-sm"
            >
              View Amortization
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-800">Amortization Schedule</DialogTitle>
              <DialogDescription className="text-slate-600">
                Payment breakdown for {formatCurrency(calculations.totalLoan)} over {loanTerm} months at {interestRate}% APR
                <br />
                <span className="text-xs mt-2 block bg-slate-50 p-2 rounded border-l-4 border-blue-500">
                  <strong>Formula:</strong> Monthly Payment = P × [r(1+r)ⁿ] / [(1+r)ⁿ - 1]
                  <br />
                  Where P = Principal, r = Monthly Rate ({(interestRate/12).toFixed(4)}%), n = Number of Payments ({loanTerm})
                  {interestRate === 0 && <span><br /><strong>Zero Interest:</strong> Monthly Payment = Principal ÷ Loan Term</span>}
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 overflow-y-auto max-h-96">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(calculations.monthlyPayment)}</div>
                    <div className="text-sm text-slate-600">Monthly Payment</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(calculations.totalLoan)}</div>
                    <div className="text-sm text-slate-600">Total Principal</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{formatCurrency(calculations.totalInterest)}</div>
                    <div className="text-sm text-slate-600">Total Interest</div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-slate-100 grid grid-cols-6 gap-2 p-3 text-xs font-semibold text-slate-700 border-b">
                  <div>Month</div>
                  <div>Date</div>
                  <div>Payment</div>
                  <div>Principal</div>
                  <div>Interest</div>
                  <div>Balance</div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {calculations.amortizationSchedule.map((payment, index) => (
                    <div 
                      key={payment.month} 
                      className={`grid grid-cols-6 gap-2 p-3 text-xs border-b hover:bg-slate-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                      }`}
                    >
                      <div className="font-semibold text-slate-700">{payment.month}</div>
                      <div className="text-slate-600">
                        {payment.date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                      </div>
                      <div className="font-medium text-blue-600">{formatCurrency(payment.payment)}</div>
                      <div className="font-medium text-green-600">{formatCurrency(payment.principal)}</div>
                      <div className="font-medium text-red-600">{formatCurrency(payment.interest)}</div>
                      <div className="font-medium text-slate-700">{formatCurrency(payment.balance)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Disclaimer */}
      <div className="bg-white/10 rounded-xl p-3 text-xs opacity-80 leading-relaxed relative z-10 backdrop-blur-sm">
        <strong>Disclaimer:</strong> This calculator provides estimates only. Actual loan terms may vary based on your credit profile and lender requirements.
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ResultsPanel;