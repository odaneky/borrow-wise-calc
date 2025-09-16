import { useState } from "react";

const Header = () => {
  const [activeNav, setActiveNav] = useState("Tools");

  const navItems = ["Home", "Applications", "Loans", "Tools"];

  return (
    <header className="bg-gradient-panel p-5 lg:px-10 flex justify-between items-center flex-wrap gap-4">
      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-panel-dark-foreground font-bold text-lg cursor-pointer transition-transform duration-300 hover:rotate-360 hover:scale-110">
        $
      </div>
      
      <nav className="flex gap-2 flex-wrap">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveNav(item)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeNav === item
                ? "bg-gradient-primary text-primary-foreground"
                : "bg-white/10 text-panel-dark-foreground hover:bg-white/20 hover:-translate-y-0.5"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;