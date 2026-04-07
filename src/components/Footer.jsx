import React from "react";
import { Activity, ChevronRight } from "lucide-react";

function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => setActiveTab("home")}>
            <Activity className="text-emerald-500" size={24} />
            <span className="font-bold text-xl text-white">HealthLogix</span>
          </div>
          <p className="max-w-sm mb-6 text-slate-500 leading-relaxed">Infrastructure exchange for healthcare in Nigeria. Verified quality, traceable logistics, and absolute compliance.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Platform</h4>
          <ul className="space-y-4 text-sm">
            <li onClick={() => setActiveTab("marketplace")} className="hover:text-emerald-400 cursor-pointer">Marketplace</li>
            <li onClick={() => setActiveTab("tracking")} className="hover:text-emerald-400 cursor-pointer flex items-center gap-2 font-bold text-emerald-500">Track Our Package <ChevronRight size={14} /></li>
            <li onClick={() => setActiveTab("ceo-dashboard")} className="hover:text-emerald-400 cursor-pointer">CEO Metrics</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm">
            <li className="hover:text-emerald-400 cursor-pointer">Investor Relations</li>
            <li className="hover:text-emerald-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;