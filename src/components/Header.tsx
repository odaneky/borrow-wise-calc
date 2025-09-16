import { useState } from "react";

const Header = () => {
  const [activeNav, setActiveNav] = useState("Tools");

  const navItems = ["Home", "Applications", "Loans", "Tools"];

  return (
    <header className="bg-header text-header-foreground px-8 py-4 flex justify-between items-center">
      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl">
        $
      </div>
      
      <nav className="flex gap-2">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveNav(item)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeNav === item
                ? "bg-primary text-primary-foreground"
                : "bg-header-foreground/10 text-header-foreground hover:bg-header-foreground/20"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex gap-2">
        <div className="w-8 h-8 bg-header-foreground/20 rounded"></div>
        <div className="w-8 h-8 bg-header-foreground/20 rounded"></div>
        <div className="px-3 py-1 bg-header-foreground/20 rounded text-sm">Claude</div>
      </div>
    </header>
  );
};

export default Header;