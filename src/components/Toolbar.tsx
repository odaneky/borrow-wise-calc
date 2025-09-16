import { useState } from "react";

const Toolbar = () => {
  const [activeTool, setActiveTool] = useState("Loan Calculator");

  const tools = [
    "Loan Calculator",
    "Affordability Calculator", 
    "Refinance Calculator"
  ];

  return (
    <div className="bg-secondary p-5 lg:px-10 border-b border-border">
      <h2 className="text-foreground text-2xl font-semibold mb-1">Tools</h2>
      <p className="text-muted-foreground text-sm mb-4">
        Understand your financial options with our comprehensive calculators
      </p>
      
      <div className="flex gap-4 flex-wrap">
        {tools.map((tool) => (
          <button
            key={tool}
            onClick={() => setActiveTool(tool)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTool === tool
                ? "border-2 border-primary text-primary transform -translate-y-0.5 shadow-elegant"
                : "bg-card border-2 border-border text-muted-foreground hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:shadow-elegant"
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