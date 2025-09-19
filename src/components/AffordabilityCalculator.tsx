import { useState, useEffect } from "react";

interface IncomeItem {
  id: string;
  type: string;
  amount: number;
}

interface ExpenseItem {
  id: string;
  type: string;
  amount: number;
  customName?: string;
}

interface AffordabilityProps {
  onCalculate?: (result: any) => void;
}

const AffordabilityCalculator = ({ onCalculate }: AffordabilityProps) => {
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([
    { id: '1', type: 'Salary', amount: 520000 }
  ]);
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([
    { id: '1', type: 'Grocery', amount: 150000 },
    { id: '2', type: 'Car Loan', amount: 80000 },
    { id: '3', type: 'Utilities', amount: 40000 }
  ]);
  const [newExpenseType, setNewExpenseType] = useState('Grocery');
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);
  const [newCustomName, setNewCustomName] = useState('');

  const incomeTypes = ['Salary', 'Business Income', 'Rental Income', 'Investment Income', 'Other'];
  const expenseTypes = ['Grocery', 'Car Loan', 'Utilities', 'Insurance', 'Credit Card', 'Other'];

  const addIncomeItem = () => {
    const newId = (incomeItems.length + 1).toString();
    setIncomeItems([...incomeItems, { id: newId, type: 'Salary', amount: 0 }]);
  };

  const addExpenseItem = () => {
    if (newExpenseAmount > 0) {
      const newId = (expenseItems.length + 1).toString();
      const newItem: ExpenseItem = {
        id: newId,
        type: newExpenseType,
        amount: newExpenseAmount,
        customName: newExpenseType === 'Other' ? newCustomName : undefined
      };
      setExpenseItems([...expenseItems, newItem]);
      setNewExpenseAmount(0);
      setNewCustomName('');
    }
  };

  const updateIncomeItem = (id: string, field: 'type' | 'amount', value: string | number) => {
    setIncomeItems(items => items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const updateExpenseItem = (id: string, field: 'type' | 'amount', value: string | number) => {
    setExpenseItems(items => items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeIncomeItem = (id: string) => {
    if (incomeItems.length > 1) {
      setIncomeItems(items => items.filter(item => item.id !== id));
    }
  };

  const removeExpenseItem = (id: string) => {
    if (expenseItems.length > 1) {
      setExpenseItems(items => items.filter(item => item.id !== id));
    }
  };

  const totalIncome = incomeItems.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenseItems.reduce((sum, item) => sum + item.amount, 0);

  // Helper functions for expense tags
  const getExpenseIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      'Grocery': '🛒',
      'Car Loan': '🚗',
      'Utilities': '⚡',
      'Insurance': '🛡️',
      'Credit Card': '💳',
      'Other': '📝'
    };
    return icons[type] || '📝';
  };

  const getExpenseColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Grocery': '#10b981',
      'Car Loan': '#3b82f6',
      'Utilities': '#f59e0b',
      'Insurance': '#8b5cf6',
      'Credit Card': '#ef4444',
      'Other': '#6b7280'
    };
    return colors[type] || '#6b7280';
  };

  const getExpenseColorDark = (type: string) => {
    const colors: { [key: string]: string } = {
      'Grocery': '#059669',
      'Car Loan': '#2563eb',
      'Utilities': '#d97706',
      'Insurance': '#7c3aed',
      'Credit Card': '#dc2626',
      'Other': '#4b5563'
    };
    return colors[type] || '#4b5563';
  };

  // Calculate affordability and pass to parent
  useEffect(() => {
    const availableIncome = totalIncome - totalExpenses;
    const maxMonthlyPayment = Math.max(0, availableIncome * 0.28); // 28% debt-to-income ratio
    
    onCalculate?.({
      totalIncome,
      totalExpenses,
      availableIncome,
      maxMonthlyPayment,
      debtToIncomeRatio: totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0
    });
  }, [totalIncome, totalExpenses, onCalculate]);

  return (
    <div className="calculator-panel">
      <h3 className="calculator-title">Affordability Calculator</h3>
      <p className="calculator-subtitle">Complete the form below and see what you can afford</p>

      {/* Income Details Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-slate-700">Income Details</h4>
          <div className="text-xl font-bold text-slate-800">${totalIncome.toLocaleString()}</div>
        </div>

        {incomeItems.map((item) => (
          <div key={item.id} className="flex gap-3 mb-3 items-center">
            <select
              value={item.type}
              onChange={(e) => updateIncomeItem(item.id, 'type', e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none"
            >
              {incomeTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={item.amount || ''}
              onChange={(e) => updateIncomeItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
              className="w-32 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none"
            />
            <button
              onClick={() => removeIncomeItem(item.id)}
              className="w-10 h-10 text-red-500 hover:text-red-700 font-bold text-xl"
              disabled={incomeItems.length === 1}
            >
              ×
            </button>
          </div>
        ))}

        <button
          onClick={addIncomeItem}
          className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-colors"
        >
          Add
        </button>
      </div>

      {/* Expense Details Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-slate-700">Expense Details</h4>
          <div className="text-xl font-bold text-slate-800">${totalExpenses.toLocaleString()}</div>
        </div>

        {/* Expense Tags */}
        <div className="flex flex-wrap gap-3 mb-4">
          {expenseItems.map((item, index) => (
            <div
              key={item.id}
              className="expense-tag animate-bounce-in hover:animate-pulse"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                background: `linear-gradient(135deg, ${getExpenseColor(item.type)}, ${getExpenseColorDark(item.type)})`
              }}
            >
              <div className="flex items-center gap-2">
                <span className="expense-icon text-sm">{getExpenseIcon(item.type)}</span>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-medium">
                    {item.customName || item.type}
                  </span>
                  <span className="text-white/90 text-xs">${item.amount.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => removeExpenseItem(item.id)}
                  className="text-white/80 hover:text-white ml-1 font-bold text-sm leading-none"
                  disabled={expenseItems.length === 1}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Expense */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <select
              value={newExpenseType}
              onChange={(e) => setNewExpenseType(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none"
            >
              {expenseTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={newExpenseAmount || ''}
              onChange={(e) => setNewExpenseAmount(parseFloat(e.target.value) || 0)}
              className="w-32 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none"
            />
            <button
              onClick={addExpenseItem}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105"
            >
              Add
            </button>
          </div>
          
          {/* Custom name input for Other */}
          {newExpenseType === 'Other' && (
            <input
              type="text"
              placeholder="Enter expense name"
              value={newCustomName}
              onChange={(e) => setNewCustomName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AffordabilityCalculator;