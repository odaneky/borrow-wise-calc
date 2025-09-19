import { useState, useEffect } from "react";
import SimpleInput from "./SimpleInput";

interface AffordabilityProps {
  onCalculate?: (result: any) => void;
}

const AffordabilityCalculator = ({ onCalculate }: AffordabilityProps) => {
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(80000);
  const [existingDebt, setExistingDebt] = useState(25000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(60);

  // Calculate affordability
  useEffect(() => {
    const availableIncome = monthlyIncome - monthlyExpenses - existingDebt;
    const maxMonthlyPayment = Math.max(0, availableIncome * 0.28); // 28% debt-to-income ratio
    
    if (maxMonthlyPayment <= 0 || interestRate <= 0 || loanTerm <= 0) {
      onCalculate?.({
        maxLoanAmount: 0,
        maxMonthlyPayment: 0,
        totalAffordablePrice: downPayment,
        debtToIncomeRatio: 0,
        availableIncome: availableIncome
      });
      return;
    }

    // Calculate max loan amount using payment formula
    const monthlyRate = (interestRate / 100) / 12;
    const maxLoanAmount = (maxMonthlyPayment * (Math.pow(1 + monthlyRate, loanTerm) - 1)) / 
                         (monthlyRate * Math.pow(1 + monthlyRate, loanTerm));
    
    const totalAffordablePrice = maxLoanAmount + downPayment;
    const debtToIncomeRatio = ((maxMonthlyPayment + existingDebt) / monthlyIncome) * 100;

    onCalculate?.({
      maxLoanAmount,
      maxMonthlyPayment,
      totalAffordablePrice,
      debtToIncomeRatio,
      availableIncome
    });
  }, [monthlyIncome, monthlyExpenses, existingDebt, downPayment, interestRate, loanTerm, onCalculate]);

  return (
    <div className="calculator-panel">
      <h3 className="calculator-title">Affordability Calculator</h3>
      <p className="calculator-subtitle">Discover what you can afford based on your income</p>

      <SimpleInput
        label="Monthly Income"
        value={monthlyIncome}
        onChange={setMonthlyIncome}
        prefix="$"
        suffix="JMD"
        tooltip="Your total monthly income before taxes"
      />

      <SimpleInput
        label="Monthly Expenses"
        value={monthlyExpenses}
        onChange={setMonthlyExpenses}
        prefix="$"
        suffix="JMD"
        tooltip="Your total monthly expenses (utilities, food, insurance, etc.)"
      />

      <SimpleInput
        label="Existing Monthly Debt"
        value={existingDebt}
        onChange={setExistingDebt}
        prefix="$"
        suffix="JMD"
        tooltip="Current monthly debt payments (credit cards, other loans, etc.)"
      />

      <SimpleInput
        label="Available Down Payment"
        value={downPayment}
        onChange={setDownPayment}
        prefix="$"
        suffix="JMD"
        tooltip="Amount you can put down upfront"
      />

      <SimpleInput
        label="Interest Rate"
        value={interestRate}
        onChange={setInterestRate}
        suffix="%"
        tooltip="Expected annual interest rate"
      />

      <SimpleInput
        label="Loan Term"
        value={loanTerm}
        onChange={setLoanTerm}
        suffix="months"
        tooltip="How long to repay the loan"
      />
    </div>
  );
};

export default AffordabilityCalculator;