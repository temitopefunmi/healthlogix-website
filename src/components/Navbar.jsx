import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { Button } from "./ui/Button";

function Navbar({ role, setRole, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { label: "Home", tab: "home" },
    { label: "About Us", tab: "about" },
    { label: "Services", tab: "home", hasDropdown: true },
    { label: "Solutions", tab: "cold-chain", hasDropdown: true },
    { label: "ESG", tab: "home" },
    { label: "Resources", tab: "marketplace", hasDropdown: true },
    { label: "Contact Us", tab: "contact" },
  ];

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-[#031021]/95 backdrop-blur-md border-b border-white/5 z-50 shadow-2xl shadow-slate-950/20">
      <div className="h-20 flex items-stretch justify-between">
        <button
          onClick={() => handleNavClick("home")}
          className="relative hidden lg:flex items-center bg-white pl-8 pr-16 min-w-[360px] text-left overflow-hidden"
          aria-label="Go to homepage"
        >
          <BrandLogo />
          <span className="absolute -right-10 top-0 h-full w-20 bg-[#031021] -skew-x-12" />
        </button>

        <button
          onClick={() => handleNavClick("home")}
          className="lg:hidden flex items-center px-4 text-left"
          aria-label="Go to homepage"
        >
          <BrandLogo variant="dark" compact />
        </button>

        <div className="hidden lg:flex flex-1 items-center justify-end gap-8 px-6 xl:px-10">
          {navigation.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.tab)}
              className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                item.label === "Home" ? "text-emerald-400 border-b border-emerald-400 pb-2" : "text-white/85 hover:text-emerald-300"
              }`}
            >
              {item.label}
              {item.hasDropdown && <ChevronDown size={14} />}
            </button>
          ))}

          {role ? (
            <div className="flex items-center gap-4">
              <span className="text-xs bg-emerald-500/15 text-emerald-300 px-2 py-1 rounded-full font-bold uppercase tracking-wider">{role}</span>
              <Button onClick={() => setRole(null)} variant="outline" className="text-sm py-2 px-4 border-white/20 text-white hover:bg-white/10">Logout</Button>
            </div>
          ) : (
            <Button onClick={() => handleNavClick("login")} className="text-sm py-3 px-6 rounded-lg bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-950/30">
              Request Demo
            </Button>
          )}
        </div>

        <button className="lg:hidden text-white px-5" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#06172d] border-t border-white/10 p-4 flex flex-col gap-4">
          {navigation.map((item) => (
            <button key={item.label} onClick={() => handleNavClick(item.tab)} className="text-left text-sm font-medium text-white/85 flex items-center justify-between">
              {item.label}
              {item.hasDropdown && <ChevronDown size={14} />}
            </button>
          ))}
          <Button onClick={() => handleNavClick("login")} className="w-full bg-emerald-500 hover:bg-emerald-400">Request Demo</Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
