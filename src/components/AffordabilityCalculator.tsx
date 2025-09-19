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
  const expenseTypes = ['Grocery', 'Car Loan', 'Utilities', 'Insurance', 'Credit Card', 'Other'];

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

      <div className="mb-6 relative z-10">
        <h3 className="text-lg font-bold text-white mb-1">Affordability Calculator</h3>
        <p className="text-white/80 mb-4">Complete the form below and see what you can afford</p>
      </div>

      {/* Income Details Section */}
      <div className="mb-6 relative z-10">
        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm mb-3">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs opacity-80 uppercase tracking-wide">Total Income</div>
            <div className="text-xl font-bold text-white">${totalIncome.toLocaleString()}</div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700"
              style={{ width: `${totalIncome > 0 ? Math.min((totalIncome / (totalIncome + totalExpenses || 1)) * 100, 100) : 0}%` }}
            />
          </div>
        </div>

        {incomeItems.map((item) => (
          <div key={item.id} className="flex gap-3 mb-2 items-center">
            <select
              value={item.type}
              onChange={(e) => updateIncomeItem(item.id, 'type', e.target.value)}
              className="flex-1 px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:border-blue-400 focus:outline-none backdrop-blur-sm"
            >
              {incomeTypes.map(type => (
                <option key={type} value={type} className="text-slate-700">{type}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={item.amount || ''}
              onChange={(e) => updateIncomeItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
              className="w-32 px-3 py-2 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/60 focus:border-blue-400 focus:outline-none backdrop-blur-sm"
            />
            <button
              onClick={() => removeIncomeItem(item.id)}
              className="w-8 h-8 text-red-400 hover:text-red-300 font-bold text-lg"
              disabled={incomeItems.length === 1}
            >
              ×
            </button>
          </div>
        ))}

        <button
          onClick={addIncomeItem}
          className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors backdrop-blur-sm"
        >
          Add
        </button>
      </div>

      {/* Expense Details Section */}
      <div className="mb-6 relative z-10">
        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm mb-3">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs opacity-80 uppercase tracking-wide">Total Expenses</div>
            <div className="text-xl font-bold text-white">${totalExpenses.toLocaleString()}</div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-700"
              style={{ width: `${totalExpenses > 0 ? Math.min((totalExpenses / (totalIncome + totalExpenses || 1)) * 100, 100) : 0}%` }}
            />
          </div>
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
              className="flex-1 px-3 py-2 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:border-red-400 focus:outline-none backdrop-blur-sm"
            >
              {expenseTypes.map(type => (
                <option key={type} value={type} className="text-slate-700">{type}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={newExpenseAmount || ''}
              onChange={(e) => setNewExpenseAmount(parseFloat(e.target.value) || 0)}
              className="w-32 px-3 py-2 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/60 focus:border-red-400 focus:outline-none backdrop-blur-sm"
            />
            <button
              onClick={addExpenseItem}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105"
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
              className="w-full px-3 py-2 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/60 focus:border-red-400 focus:outline-none backdrop-blur-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AffordabilityCalculator;