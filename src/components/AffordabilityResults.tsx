import { formatCurrency } from "../lib/utils";

interface AffordabilityResultsProps {
  results: {
    maxLoanAmount: number;
    maxMonthlyPayment: number;
    totalAffordablePrice: number;
    debtToIncomeRatio: number;
    availableIncome: number;
  };
}

const AffordabilityResults = ({ results }: AffordabilityResultsProps) => {
  const {
    maxLoanAmount,
    maxMonthlyPayment,
    totalAffordablePrice,
    debtToIncomeRatio,
    availableIncome
  } = results;

  const getRiskLevel = (ratio: number) => {
    if (ratio <= 28) return { level: "Low", color: "text-green-400", bg: "bg-green-500" };
    if (ratio <= 36) return { level: "Moderate", color: "text-yellow-400", bg: "bg-yellow-500" };
    return { level: "High", color: "text-red-400", bg: "bg-red-500" };
  };

  const risk = getRiskLevel(debtToIncomeRatio);

  return (
    <div className="results-panel">
      <div className="payment-amount">
        <div className="amount-value">{formatCurrency(totalAffordablePrice)}</div>
        <div className="amount-label">Total Affordable Price</div>
      </div>

      <div className="loan-summary">
        <div className="summary-row">
          <span className="summary-label">Max Loan Amount</span>
          <span className="summary-value">{formatCurrency(maxLoanAmount)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Max Monthly Payment</span>
          <span className="summary-value">{formatCurrency(maxMonthlyPayment)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Available Income</span>
          <span className="summary-value">{formatCurrency(availableIncome)}</span>
        </div>
      </div>

      <div className="breakdown">
        <div className="breakdown-item">
          <div className="breakdown-label">Debt-to-Income Ratio</div>
          <div className={`breakdown-value ${risk.color}`}>{debtToIncomeRatio.toFixed(1)}%</div>
          <div className="breakdown-bar">
            <div 
              className={`breakdown-fill ${risk.bg}`}
              style={{ width: `${Math.min(100, (debtToIncomeRatio / 50) * 100)}%` }}
            ></div>
          </div>
          <div className={`text-xs mt-2 ${risk.color}`}>Risk Level: {risk.level}</div>
        </div>
        <div className="breakdown-item">
          <div className="breakdown-label">Loan Coverage</div>
          <div className="breakdown-value">
            {totalAffordablePrice > 0 ? ((maxLoanAmount / totalAffordablePrice) * 100).toFixed(1) : 0}%
          </div>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill principal-fill"
              style={{ 
                width: totalAffordablePrice > 0 
                  ? `${(maxLoanAmount / totalAffordablePrice) * 100}%` 
                  : '0%' 
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary">
          Get Pre-Approved
        </button>
        <button className="btn btn-secondary">View Breakdown</button>
      </div>

      <div className="disclaimer">
        <strong>Disclaimer:</strong> This calculator provides estimates based on the 28% debt-to-income rule. 
        Actual affordability may vary based on credit score, employment history, and lender requirements.
      </div>
    </div>
  );
};

export default AffordabilityResults;