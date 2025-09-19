import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Applications", path: "/applications" },
    { name: "Loans", path: "/loans" },
    { name: "Tools", path: "/tools" }
  ];

  const getActiveNav = () => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    return activeItem ? activeItem.name : "Tools";
  };

  const handleNavClick = (item: { name: string; path: string }) => {
    navigate(item.path);
  };

  return (
    <header className="bg-gradient-to-r from-slate-700 to-slate-600 text-header-foreground px-8 py-5 flex justify-between items-center flex-wrap gap-4">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:rotate-360 transition-transform duration-300">
        $
      </div>
      
      <nav className="flex gap-2 flex-wrap">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavClick(item)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              getActiveNav() === item.name
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20 hover:-translate-y-0.5"
            }`}
          >
            {item.name}
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