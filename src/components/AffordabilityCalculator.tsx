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
    { id: '1', type: 'Salary', amount: 0 }
  ]);
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([]);
  const [newExpenseType, setNewExpenseType] = useState('Grocery');
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);
  const [newCustomName, setNewCustomName] = useState('');

  const incomeTypes = ['Salary', 'Business Income', 'Rental Income', 'Investment Income', 'Other'];
  const expenseTypes = [
    'Grocery', 'Car Loan', 'Utilities', 'Insurance', 'Credit Card', 
    'Rent/Mortgage', 'Phone Bill', 'Internet', 'Gas/Fuel', 'Medical', 
    'Entertainment', 'Dining Out', 'Subscriptions', 'Childcare', 
    'Student Loan', 'Personal Loan', 'Transportation', 'Clothing', 
    'Home Maintenance', 'Savings', 'Other'
  ];

  const addIncomeItem = () => {
    const newId = (incomeItems.length + 1).toString();
    setIncomeItems([...incomeItems, { id: newId, type: 'Salary', amount: 0 }]);
  };

  const addExpenseItem = () => {
    if (newExpenseAmount > 0) {
      // Check for duplicates (excluding custom named "Other" items)
      const isDuplicate = expenseItems.some(item => 
        item.type === newExpenseType && 
        (newExpenseType !== 'Other' || item.customName === newCustomName)
      );
      
      if (!isDuplicate) {
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
      'Rent/Mortgage': '🏠',
      'Phone Bill': '📱',
      'Internet': '🌐',
      'Gas/Fuel': '⛽',
      'Medical': '🏥',
      'Entertainment': '🎬',
      'Dining Out': '🍽️',
      'Subscriptions': '📺',
      'Childcare': '👶',
      'Student Loan': '🎓',
      'Personal Loan': '💰',
      'Transportation': '🚌',
      'Clothing': '👕',
      'Home Maintenance': '🔧',
      'Savings': '💎',
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
      'Rent/Mortgage': '#dc2626',
      'Phone Bill': '#06b6d4',
      'Internet': '#8b5cf6',
      'Gas/Fuel': '#f97316',
      'Medical': '#ec4899',
      'Entertainment': '#a855f7',
      'Dining Out': '#84cc16',
      'Subscriptions': '#6366f1',
      'Childcare': '#f472b6',
      'Student Loan': '#0ea5e9',
      'Personal Loan': '#eab308',
      'Transportation': '#22c55e',
      'Clothing': '#d946ef',
      'Home Maintenance': '#fb7185',
      'Savings': '#14b8a6',
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
      'Rent/Mortgage': '#b91c1c',
      'Phone Bill': '#0891b2',
      'Internet': '#7c3aed',
      'Gas/Fuel': '#ea580c',
      'Medical': '#db2777',
      'Entertainment': '#9333ea',
      'Dining Out': '#65a30d',
      'Subscriptions': '#4f46e5',
      'Childcare': '#ec4899',
      'Student Loan': '#0284c7',
      'Personal Loan': '#ca8a04',
      'Transportation': '#16a34a',
      'Clothing': '#c026d3',
      'Home Maintenance': '#f43f5e',
      'Savings': '#0f766e',
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
      <div className="mb-6">
        <h3 className="calculator-title">Affordability Calculator</h3>
        <p className="calculator-subtitle">Complete the form below and see what you can afford</p>
      </div>

      {/* Income Details Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-lg font-semibold text-slate-700">Income Details</h4>
          <div className="text-xl font-bold text-blue-600">${totalIncome.toLocaleString()}</div>
        </div>

        {incomeItems.map((item) => (
          <div key={item.id} className="flex gap-3 mb-2 items-center">
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
              className="w-32 px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none"
            />
            <button
              onClick={() => removeIncomeItem(item.id)}
              className="w-8 h-8 text-red-500 hover:text-red-700 font-bold text-lg"
              disabled={incomeItems.length === 1}
            >
              ×
            </button>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            onClick={addIncomeItem}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            Add
          </button>
        </div>
      </div>

      {/* Expense Details Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-lg font-semibold text-slate-700">Expense Details</h4>
          <div className="text-xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
        </div>

        {/* Expense Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
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
        <div className="space-y-2">
          <div className="flex gap-3">
            <select
              value={newExpenseType}
              onChange={(e) => setNewExpenseType(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none"
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
              className="w-32 px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none"
            />
            <button
              onClick={addExpenseItem}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105"
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
              className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AffordabilityCalculator;