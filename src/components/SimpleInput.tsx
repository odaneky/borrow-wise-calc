import { useState, useEffect } from "react";

interface SimpleInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
  type?: "number" | "text";
}

const SimpleInput = ({
  label,
  value,
  onChange,
  prefix = "",
  suffix = "",
  tooltip,
  type = "number"
}: SimpleInputProps) => {
  const [displayValue, setDisplayValue] = useState(value.toString());

  useEffect(() => {
    setDisplayValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);
    
    if (type === "number") {
      const numericValue = parseFloat(inputValue.replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        onChange(numericValue);
      }
    }
  };

  const handleInputBlur = () => {
    if (type === "number") {
      const numericValue = parseFloat(displayValue.replace(/,/g, ''));
      if (isNaN(numericValue)) {
        setDisplayValue(value.toString());
      } else {
        // Format with commas for display
        setDisplayValue(numericValue.toLocaleString());
      }
    }
  };

  const handleInputFocus = () => {
    if (type === "number") {
      // Remove commas for editing
      const numericValue = parseFloat(displayValue.replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        setDisplayValue(numericValue.toString());
      }
    }
  };

  return (
    <div className="mb-6">
      <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
        {label}
        {tooltip && (
          <div className="relative ml-2">
            <div className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help group">
              ?
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
              </div>
            </div>
          </div>
        )}
      </label>
      
      <div className="relative">
        <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 focus-within:border-blue-400 focus-within:shadow-lg focus-within:shadow-blue-100">
          {prefix && (
            <span className="px-3 py-3 bg-gray-200 text-gray-600 font-semibold text-sm">
              {prefix}
            </span>
          )}
          
          <input
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            className="flex-1 px-3 py-3 bg-transparent border-none outline-none text-slate-800 text-base placeholder-gray-400"
            placeholder="Enter value"
          />
          
          {suffix && (
            <span className="px-3 py-3 bg-gray-200 text-gray-600 font-semibold text-sm">
              {suffix}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleInput;