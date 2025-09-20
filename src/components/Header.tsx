import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";

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
    return activeItem ? activeItem.name : "Home";
  };

  const handleNavClick = (item: { name: string; path: string }) => {
    navigate(item.path);
  };

  return (
    <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center text-white font-bold text-lg">
          C
        </div>
        <span className="text-xl font-bold text-foreground">Credeer</span>
      </div>
      
      {/* Navigation Pills */}
      <nav className="flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavClick(item)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              getActiveNav() === item.name
                ? "bg-foreground text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {item.name}
          </button>
        ))}
      </nav>

      {/* Right Icons */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center text-white font-semibold text-sm">
          JD
        </div>
      </div>
    </header>
  );
};

export default Header;