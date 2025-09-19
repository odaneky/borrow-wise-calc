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

  const isLandingPage = location.pathname === "/";

  return (
    <header className={`px-8 py-5 flex justify-between items-center flex-wrap gap-4 transition-all duration-300 ${
      isLandingPage 
        ? "bg-card/70 backdrop-blur-md border-b border-border/50 text-foreground" 
        : "bg-gradient-to-r from-slate-700 to-slate-600 text-header-foreground"
    }`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg cursor-pointer hover:rotate-360 transition-transform duration-300 ${
        isLandingPage
          ? "bg-gradient-to-br from-primary to-primary-dark text-white"
          : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
      }`}>
        $
      </div>
      
      {!isLandingPage && (
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
      )}

      <div className="flex gap-3 items-center">
        <div className={`w-8 h-8 rounded-full ${
          isLandingPage ? "bg-muted/50" : "bg-header-foreground/20"
        }`}></div>
        <div className={`w-8 h-8 rounded-full ${
          isLandingPage ? "bg-muted/50" : "bg-header-foreground/20"
        }`}></div>
        <div className="w-10 h-10 bg-gradient-to-br from-success to-success rounded-full flex items-center justify-center text-success-foreground font-semibold text-sm shadow-lg">
          C
        </div>
      </div>
    </header>
  );
};

export default Header;