import { useState } from "react";

const Toolbar = () => {
  const [activeTool, setActiveTool] = useState("Loan Calculator");

  const tools = [
    "Loan Calculator",
    "Affordability Calculator"
  ];

  return (
    <div className="px-8 py-6">
      <h2 className="text-foreground text-2xl font-semibold mb-1">Tools</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Understand your financial options with our comprehensive calculators
      </p>
      
      <div className="flex gap-4">
        {tools.map((tool) => (
          <button
            key={tool}
            onClick={() => setActiveTool(tool)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTool === tool
                ? "border-2 border-primary text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tool}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;