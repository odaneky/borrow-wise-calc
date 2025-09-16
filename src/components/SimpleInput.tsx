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
      const numericValue = parseFloat(inputValue);
      if (!isNaN(numericValue)) {
        onChange(numericValue);
      }
    }
  };

  const handleInputBlur = () => {
    if (type === "number") {
      const numericValue = parseFloat(displayValue);
      if (isNaN(numericValue)) {
        setDisplayValue(value.toString());
      }
    }
  };

  return (
    <div className="mb-6">
      <label className="block mb-3 font-medium text-card-foreground flex items-center">
        {label}
        {tooltip && (
          <div className="relative ml-2 group">
            <div className="w-4 h-4 bg-primary rounded-full text-primary-foreground text-xs flex items-center justify-center cursor-help">
              ?
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-panel-dark text-panel-dark-foreground text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-10">
              {tooltip}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-panel-dark"></div>
            </div>
          </div>
        )}
      </label>
      
      <div className="flex items-center bg-muted border border-border rounded-md overflow-hidden">
        {prefix && (
          <span className="px-4 py-3 bg-border text-muted-foreground font-medium">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="flex-1 border-none px-4 py-3 text-base bg-transparent outline-none"
        />
        {suffix && (
          <span className="px-4 py-3 bg-border text-muted-foreground font-medium text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default SimpleInput;