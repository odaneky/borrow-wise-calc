import { useState, useEffect } from "react";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
  formatValue?: (value: number) => string;
}

const SliderInput = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
  tooltip,
  formatValue
}: SliderInputProps) => {
  const [displayValue, setDisplayValue] = useState(value.toString());
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    setDisplayValue(value.toString());
  }, [value]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  const handleSliderStart = () => {
    console.log('Slider start - setting isSliding to true');
    setIsSliding(true);
  };

  const handleSliderEnd = () => {
    console.log('Slider end - setting isSliding to false');
    setIsSliding(false);
  };

  const handleSliderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Slider input - setting isSliding to true, value:', e.target.value);
    setIsSliding(true);
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);
    
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
      onChange(numericValue);
    }
  };

  const handleInputBlur = () => {
    const numericValue = parseFloat(displayValue);
    if (isNaN(numericValue) || numericValue < min || numericValue > max) {
      setDisplayValue(value.toString());
    }
  };

  const percentage = ((value - min) / (max - min)) * 100;

  console.log('SliderInput render - isSliding:', isSliding, 'value:', value, 'percentage:', percentage);

  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-foreground flex items-center">
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
      
      <div className={`flex items-center bg-secondary border-2 border-border rounded-lg transition-all duration-300 focus-within:border-primary focus-within:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)] overflow-hidden ${isSliding ? 'ring-2 ring-primary/20 scale-105' : ''}`}>
        {prefix && (
          <span className="px-4 py-4 bg-muted text-muted-foreground font-semibold">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={`flex-1 border-none px-4 py-4 bg-transparent outline-none transition-all duration-300 font-bold ${isSliding ? 'text-2xl text-primary' : 'text-base'}`}
          min={min}
          max={max}
          step={step}
        />
        {suffix && (
          <span className="px-4 py-4 bg-muted text-muted-foreground font-semibold text-sm">
            {suffix}
          </span>
        )}
      </div>
      
      <div className="mt-2.5 relative">
        {isSliding && (
          <div 
            className="absolute -top-16 bg-background border-2 border-primary text-foreground px-4 py-3 rounded-2xl font-bold text-lg shadow-xl z-30 transform -translate-x-1/2 animate-scale-in min-w-max"
            style={{ left: `${percentage}%` }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary">
                {formatValue ? formatValue(value) : `${prefix}${value}${suffix}`}
              </span>
            </div>
            {/* Speech bubble tail */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary"></div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-2px] w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-background"></div>
          </div>
        )}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderInput}
          onMouseDown={handleSliderStart}
          onMouseUp={handleSliderEnd}
          onTouchStart={handleSliderStart}
          onTouchEnd={handleSliderEnd}
          className="w-full h-1.5 rounded-full bg-border outline-none cursor-pointer appearance-none slider-thumb"
          style={{
            background: `linear-gradient(90deg, hsl(var(--primary)) ${percentage}%, hsl(var(--border)) ${percentage}%)`
          }}
        />
        <div className="text-right text-primary font-semibold text-sm mt-1">
          {formatValue ? formatValue(value) : `${value}${suffix}`}
        </div>
      </div>
    </div>
  );
};

export default SliderInput;