import React, { useState } from "react";
import { Activity, Truck, LayoutDashboard, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";

function Navbar({ role, setRole, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Activity className="text-white" size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight text-emerald-950">HealthLogix</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => setActiveTab("home")} className="text-sm font-medium hover:text-emerald-600 text-slate-600">Home</button>
          <button onClick={() => setActiveTab("marketplace")} className="text-sm font-medium hover:text-emerald-600 text-slate-600">Marketplace</button>
          <button onClick={() => setActiveTab("hospitals")} className="text-sm font-medium hover:text-emerald-600 text-slate-600">Hospitals</button>
          <button onClick={() => setActiveTab("cold-chain")} className="text-sm font-medium hover:text-emerald-600 text-slate-600">Cold Chain</button>
          <button onClick={() => setActiveTab("tracking")} className="text-sm font-medium hover:text-emerald-600 text-slate-600 flex items-center gap-1.5">
            <Truck size={16} /> Track
          </button>
          <button onClick={() => setActiveTab("ceo-dashboard")} className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-100">
            <LayoutDashboard size={16} /> CEO Dash
          </button>
          {role ? (
            <div className="flex items-center gap-4">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold uppercase tracking-wider">{role}</span>
              <Button onClick={() => setRole(null)} variant="outline" className="text-sm py-1.5 px-4">Logout</Button>
            </div>
          ) : (
            <Button onClick={() => setActiveTab("login")} className="text-sm py-1.5 px-4">Institutional Login</Button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-4 flex flex-col gap-4">
          <button onClick={() => { setActiveTab("home"); setIsOpen(false); }} className="text-left text-sm font-medium">Home</button>
          <button onClick={() => { setActiveTab("marketplace"); setIsOpen(false); }} className="text-left text-sm font-medium">Marketplace</button>
          <button onClick={() => { setActiveTab("hospitals"); setIsOpen(false); }} className="text-left text-sm font-medium">Hospitals</button>
          <button onClick={() => { setActiveTab("cold-chain"); setIsOpen(false); }} className="text-left text-sm font-medium">Cold Chain</button>
          <button onClick={() => { setActiveTab("tracking"); setIsOpen(false); }} className="text-left text-sm font-medium">Track Package</button>
          <button onClick={() => { setActiveTab("ceo-dashboard"); setIsOpen(false); }} className="text-left text-sm font-bold text-emerald-600">CEO Dashboard</button>
          <Button onClick={() => { setActiveTab("login"); setIsOpen(false); }} className="w-full">Institutional Login</Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;