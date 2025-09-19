import { useState, useEffect } from "react";

interface IncomeItem {
  id: string;
  type: string;
  amount: number;
  frequency: 'annual' | 'monthly' | 'biweekly' | 'weekly';
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
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([]);
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([]);
  const [newExpenseType, setNewExpenseType] = useState('Grocery');
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);
  const [newCustomName, setNewCustomName] = useState('');
  const [newIncomeType, setNewIncomeType] = useState('Salary');
  const [newIncomeAmount, setNewIncomeAmount] = useState(0);
  const [newIncomeFrequency, setNewIncomeFrequency] = useState<'annual' | 'monthly' | 'biweekly' | 'weekly'>('monthly');

  const incomeTypes = ['Salary', 'Business Income', 'Rental Income', 'Investment Income', 'Freelancing', 'Pension', 'Benefits', 'Other'];
  const expenseTypes = [
    'Grocery', 'Car Loan', 'Utilities', 'Insurance', 'Credit Card', 
    'Rent/Mortgage', 'Phone Bill', 'Internet', 'Gas/Fuel', 'Medical', 
    'Entertainment', 'Dining Out', 'Subscriptions', 'Childcare', 
    'Student Loan', 'Personal Loan', 'Transportation', 'Clothing', 
    'Home Maintenance', 'Savings', 'Other'
  ];

  const addIncomeItem = () => {
    if (newIncomeAmount > 0) {
      const newId = (incomeItems.length + 1).toString();
      const newItem: IncomeItem = {
        id: newId,
        type: newIncomeType,
        amount: newIncomeAmount,
        frequency: newIncomeFrequency
      };
      setIncomeItems([...incomeItems, newItem]);
      setNewIncomeAmount(0);
    }
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

  const updateIncomeItem = (id: string, field: 'type' | 'amount' | 'frequency', value: string | number) => {
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
    setIncomeItems(items => items.filter(item => item.id !== id));
  };

  const removeExpenseItem = (id: string) => {
    if (expenseItems.length > 1) {
      setExpenseItems(items => items.filter(item => item.id !== id));
    }
  };

  // Convert income to monthly amounts
  const convertToMonthly = (amount: number, frequency: string) => {
    switch (frequency) {
      case 'annual': return amount / 12;
      case 'biweekly': return (amount * 26) / 12; // 26 biweekly periods per year
      case 'weekly': return (amount * 52) / 12; // 52 weeks per year
      case 'monthly': 
      default: return amount;
    }
  };

  const totalIncome = incomeItems.reduce((sum, item) => sum + convertToMonthly(item.amount, item.frequency), 0);
  const totalExpenses = expenseItems.reduce((sum, item) => sum + item.amount, 0);

  // Helper functions for income tags
  const getIncomeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      'Salary': '💼',
      'Business Income': '🏢',
      'Rental Income': '🏠',
      'Investment Income': '📈',
      'Freelancing': '💻',
      'Pension': '🏛️',
      'Benefits': '🎁',
      'Other': '💰'
    };
    return icons[type] || '💰';
  };

  const getIncomeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Salary': '#3b82f6',
      'Business Income': '#10b981',
      'Rental Income': '#8b5cf6',
      'Investment Income': '#f59e0b',
      'Freelancing': '#06b6d4',
      'Pension': '#84cc16',
      'Benefits': '#ec4899',
      'Other': '#6366f1'
    };
    return colors[type] || '#6366f1';
  };

  const getIncomeColorDark = (type: string) => {
    const colors: { [key: string]: string } = {
      'Salary': '#2563eb',
      'Business Income': '#059669',
      'Rental Income': '#7c3aed',
      'Investment Income': '#d97706',
      'Freelancing': '#0891b2',
      'Pension': '#65a30d',
      'Benefits': '#db2777',
      'Other': '#4f46e5'
    };
    return colors[type] || '#4f46e5';
  };

  const getFrequencyLabel = (frequency: string) => {
    const labels: { [key: string]: string } = {
      'annual': 'Annual',
      'monthly': 'Monthly', 
      'biweekly': 'Bi-weekly',
      'weekly': 'Weekly'
    };
    return labels[frequency] || 'Monthly';
  };
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

        {/* Income Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {incomeItems.map((item, index) => (
            <div
              key={item.id}
              className="expense-tag animate-bounce-in hover:animate-pulse"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                background: `linear-gradient(135deg, ${getIncomeColor(item.type)}, ${getIncomeColorDark(item.type)})`
              }}
            >
              <div className="flex items-center gap-2">
                <span className="expense-icon text-sm">{getIncomeIcon(item.type)}</span>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-medium">
                    {item.type}
                  </span>
                  <span className="text-white/90 text-xs">
                    ${item.amount.toLocaleString()} ({getFrequencyLabel(item.frequency)})
                  </span>
                </div>
                <button
                  onClick={() => removeIncomeItem(item.id)}
                  className="text-white/80 hover:text-white ml-1 font-bold text-sm leading-none"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Income */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <select
              value={newIncomeType}
              onChange={(e) => setNewIncomeType(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none text-sm"
            >
              {incomeTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={newIncomeFrequency}
              onChange={(e) => setNewIncomeFrequency(e.target.value as 'annual' | 'monthly' | 'biweekly' | 'weekly')}
              className="w-28 px-2 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none text-xs"
            >
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="weekly">Weekly</option>
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={newIncomeAmount || ''}
              onChange={(e) => setNewIncomeAmount(parseFloat(e.target.value) || 0)}
              className="w-28 px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none text-sm"
            />
            <button
              onClick={addIncomeItem}
              className="w-20 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 text-sm"
            >
              Add
            </button>
          </div>
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
          <div className="flex gap-2">
            <select
              value={newExpenseType}
              onChange={(e) => setNewExpenseType(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none text-sm"
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
              className="w-28 px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none text-sm"
            />
            <button
              onClick={addExpenseItem}
              className="w-20 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 text-sm"
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