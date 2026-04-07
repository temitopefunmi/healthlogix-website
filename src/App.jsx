import React, { useState } from "react";
// Import your decoupled pages
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Dashboard from "./pages/Dashboard";
import Hospitals from "./pages/Hospitals"; // Your new page
// Import your persistent/layout components
// (Ensure these are also moved to a /components folder for cleanliness)
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";
import AIChatBot from "./components/AIChatBot";
import LogisticsTracking from "./components/Tracking";
import LoginSection from "./components/Login";

export default function HealthLogixWebsite() {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100">
      {/* Persists on every page */}
      <Navbar setRole={setRole} role={role} setActiveTab={setActiveTab} />
      
      <main className="pt-16">
        {/* Page Routing Logic */}
        {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
        {activeTab === "marketplace" && <Marketplace />}
        {activeTab === "ceo-dashboard" && <Dashboard />}
        {activeTab === "hospitals" && <Hospitals />}
        
        {/* These can stay here if you prefer them as "tabs" rather than full pages */}
        {activeTab === "tracking" && <LogisticsTracking />}
        {activeTab === "login" && (
          <LoginSection setRole={(r) => { setRole(r); setActiveTab("home"); }} />
        )}
      </main>

      {/* Global Utilities */}
      <AIChatBot />
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}