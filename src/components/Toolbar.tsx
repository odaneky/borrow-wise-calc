import { useState } from "react";

interface ToolbarProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
}

const Toolbar = ({ activeTool, setActiveTool }: ToolbarProps) => {

  const toolOptions = [
    "Loan Calculator",
    "Affordability Calculator"
  ];

  return (
    <div className="bg-gray-50 px-8 py-5 border-b border-gray-200">
      <h2 className="text-slate-800 text-2xl font-bold mb-1">Tools</h2>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-slate-600 text-sm">Understand your financial options with our comprehensive calculators</p>
        <div className="flex gap-3">
          {toolOptions.map((tool) => (
            <button
              key={tool}
              onClick={() => setActiveTool(tool)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border-2 ${
                activeTool === tool
                  ? "bg-white border-blue-500 text-blue-600 shadow-md transform -translate-y-0.5"
                  : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-500 hover:-translate-y-0.5"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;