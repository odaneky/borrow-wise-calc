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
    const principalPercentage = (principal / totalPayments) * 100;
    const interestPercentage = (totalInterest / totalPayments) * 100;
    
    const paybackDate = new Date();
    paybackDate.setMonth(paybackDate.getMonth() + loanTerm);
    
    return {
      monthlyPayment,
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
    const principal = Math.max(0, loanAmount - deposit);
    const rate = (interestRate / 100) / 12;
    const months = loanTerm;
    
    if (principal <= 0 || months <= 0 || rate <= 0) {
      alert('Please enter valid loan details first.');
      return;
    }
    
    const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / 
                          (Math.pow(1 + rate, months) - 1);
    
    // Create and show amortization schedule modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
      padding: 20px;
      overflow: auto;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      border-radius: 15px;
      padding: 30px;
      max-width: 800px;
      max-height: 80vh;
      overflow-y: auto;
      width: 100%;
    `;
    
    let balance = principal;
    let totalInterestPaid = 0;
    let schedule = `
      <h2 style="color: hsl(var(--foreground)); margin-bottom: 20px; font-size: 24px; font-weight: bold;">Amortization Schedule</h2>
      <p style="color: hsl(var(--muted-foreground)); margin-bottom: 20px;">
        Loan Amount: ${formatCurrency(principal)} | 
        Rate: ${interestRate.toFixed(1)}% | 
        Term: ${months} months
      </p>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; min-width: 500px;">
          <thead>
            <tr style="background: hsl(var(--secondary));">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid hsl(var(--border)); font-weight: 600;">Payment #</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid hsl(var(--border)); font-weight: 600;">Payment</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid hsl(var(--border)); font-weight: 600;">Principal</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid hsl(var(--border)); font-weight: 600;">Interest</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid hsl(var(--border)); font-weight: 600;">Balance</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    // Show first 12 and last 3 payments
    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * rate;
      const principalPayment = monthlyPayment - interestPayment;
      balance = Math.max(0, balance - principalPayment);
      totalInterestPaid += interestPayment;
      
      if (i <= 12 || i > months - 3) {
        schedule += `
          <tr style="border-bottom: 1px solid hsl(var(--border));">
            <td style="padding: 12px;">${i}</td>
            <td style="padding: 12px; text-align: right;">${formatCurrency(monthlyPayment)}</td>
            <td style="padding: 12px; text-align: right;">${formatCurrency(principalPayment)}</td>
            <td style="padding: 12px; text-align: right;">${formatCurrency(interestPayment)}</td>
            <td style="padding: 12px; text-align: right;">${formatCurrency(balance)}</td>
          </tr>
        `;
      } else if (i === 13 && months > 15) {
        schedule += `
          <tr>
            <td colspan="5" style="padding: 12px; text-align: center; color: hsl(var(--muted-foreground));">
              ... ${months - 15} payments hidden ...
            </td>
          </tr>
        `;
      }
    }
    
    schedule += `
          </tbody>
        </table>
      </div>
      <div style="margin-top: 20px; padding: 20px; background: hsl(var(--secondary)); border-radius: 12px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-weight: 600;">
          <span>Total Payments:</span>
          <span>${formatCurrency(monthlyPayment * months)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-weight: 600;">
          <span>Total Principal:</span>
          <span>${formatCurrency(principal)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: 600;">
          <span>Total Interest:</span>
          <span style="color: hsl(var(--destructive));">${formatCurrency(totalInterestPaid)}</span>
        </div>
      </div>
      <button onclick="this.closest('div[style*=fixed]').remove()" style="
        margin-top: 20px;
        padding: 12px 24px;
        background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)));
        color: hsl(var(--primary-foreground));
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        width: 100%;
        font-size: 16px;
      ">Close</button>
    `;
    
    content.innerHTML = schedule;
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  };

  return (
    <div className="bg-gradient-panel rounded-2xl p-8 text-panel-dark-foreground relative overflow-hidden">
      <div className="text-center mb-8 relative z-10">
        <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
          {formatCurrency(calculations.monthlyPayment)}
        </div>
        <div className="text-base opacity-80">Monthly Payment</div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 mb-5">
        <div className="flex justify-between mb-2.5 pb-2.5 border-b border-white/10">
          <span>Total Loan Amount</span>
          <span>{formatCurrency(calculations.totalLoan)}</span>
        </div>
        <div className="flex justify-between mb-2.5 pb-2.5 border-b border-white/10">
          <span>Total Interest</span>
          <span>{formatCurrency(calculations.totalInterest)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Amount to Pay</span>
          <span>{formatCurrency(calculations.totalPayment)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <div className="mb-2">Principal</div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-primary rounded-full transition-all duration-500"
              style={{ width: `${calculations.principalPercentage}%` }}
            ></div>
          </div>
          <div>{formatCurrency(calculations.totalLoan)}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <div className="mb-2">Interest</div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-destructive rounded-full transition-all duration-500"
              style={{ width: `${calculations.interestPercentage}%` }}
            ></div>
          </div>
          <div>{formatCurrency(calculations.totalInterest)}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="text-left">
          <div className="text-sm opacity-80 mb-1">Commitment Fee</div>
          <div className="text-lg font-semibold">
            {formatCurrency(calculations.totalLoan * 0.015)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm opacity-80 mb-1">Payback Date</div>
          <div className="text-lg font-semibold">
            {calculations.paybackDate.toLocaleDateString('en-US', { 
              month: 'short', 
              year: 'numeric' 
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-5">
        <Button 
          onClick={handleApply}
          className="flex-1 bg-gradient-primary hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
        >
          Apply Now
        </Button>
        <Button 
          onClick={handleAmortization}
          variant="secondary"
          className="flex-1 bg-white/10 hover:bg-white/20 text-panel-dark-foreground border border-white/20 hover:-translate-y-0.5 transition-all duration-300"
        >
          View Amortization
        </Button>
      </div>

      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-xs opacity-80 leading-relaxed">
        <strong>Disclaimer:</strong> This calculator provides estimates only. Actual loan terms may vary.
      </div>
    </div>
  );
};

export default ResultsPanel;