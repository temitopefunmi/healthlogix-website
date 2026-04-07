import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Search, 
  Truck, 
  Activity, 
  Database, 
  Users, 
  AlertCircle, 
  ChevronRight, 
  Store 
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export default function Home({ setActiveTab }) {
  return (
    <>
      <HeroSection setActiveTab={setActiveTab} />
      <ServicesSection />
      <PlatformCapabilities />
      <MarketplacePreview setActiveTab={setActiveTab} />
      <InvestorSection />
      <CTASection />
    </>
  );
}

// -----------------------------
// SUB-COMPONENTS
// -----------------------------

function HeroSection({ setActiveTab }) {
  const [trackId, setTrackId] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackId.trim()) setActiveTab("tracking");
  };

  return (
    <section className="relative overflow-hidden bg-emerald-950 text-white py-24 px-6">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-800 px-3 py-1 rounded-full text-emerald-400 text-sm mb-8"
        >
          <ShieldCheck size={14} /> 
          <span>Nigeria's Verified Healthcare Infrastructure Exchange</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Securing the Vitals of <span className="text-emerald-400">Healthcare Logistics</span>
        </h1>
        
        <form onSubmit={handleTrack} className="max-w-md mx-auto mb-10 flex p-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
          <input 
            type="text" 
            placeholder="Enter Tracking ID (e.g. HLX-2901)" 
            className="bg-transparent border-none outline-none flex-grow px-4 text-white text-sm placeholder:text-emerald-200/50" 
            value={trackId} 
            onChange={(e) => setTrackId(e.target.value)} 
          />
          <Button type="submit" className="rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg">
            <Search size={16} /> Track
          </Button>
        </form>

        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={() => setActiveTab("login")} className="px-8 py-4 text-lg rounded-2xl shadow-xl shadow-emerald-900/40">Get Started</Button>
          <Button variant="secondary" onClick={() => setActiveTab("ceo-dashboard")} className="px-8 py-4 text-lg rounded-2xl">CEO Overview</Button>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    { icon: <Activity />, title: "Inventory Integrity", desc: "Real-time monitoring of reagents and consumables via IoT-enabled storage." },
    { icon: <Truck />, title: "Cold-Chain Logistics", desc: "Verified temperature-controlled transit for vaccines and sensitive samples." },
    { icon: <ShieldCheck />, title: "Compliance Hub", desc: "Automated NAFDAC and ISO documentation for every batch handled." }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12">
        {services.map((s, i) => (
          <div key={i} className="group">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
              {s.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">{s.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// -----------------------------
// Updated PlatformCapabilities with live metrics
// -----------------------------

function PlatformCapabilities() {
  const [metrics, setMetrics] = useState({
    trackingId: "HLX-2901",
    escrowStatus: "LOCKED",
    tempVariation: 0,
    complianceAlert: ""
  });

  React.useEffect(() => {
    const baseTemp = 2.5; // baseline temperature variation in °C
    const interval = setInterval(() => {
      const randomTemp = (baseTemp + (Math.random() * 2 - 1)).toFixed(1); // ±1°C fluctuation
      const showAlert = Math.random() < 0.2; // 20% chance of showing alert
      setMetrics((prev) => ({
        ...prev,
        tempVariation: randomTemp,
        complianceAlert: showAlert ? "Compliance breach detected" : ""
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-8 leading-tight">
            Infrastructure for the <span className="text-emerald-400">Next Decade</span>
          </h2>
          <div className="space-y-6 text-sm">
            {[
              { icon: <Database className="text-emerald-400" />, t: "Unified Registry", d: "A single source of truth for all healthcare facilities in the network." },
              { icon: <Users className="text-emerald-400" />, t: "Vendor Verification", d: "Strict vetting process ensuring only licensed suppliers can trade." },
              { icon: <AlertCircle className="text-emerald-400" />, t: "Risk Mitigation", d: "AI-driven alerts for potential supply chain disruptions." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{item.t}</h4>
                  <p className="text-slate-400">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#0b1120] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-8 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs font-mono">Tracking ID:</span>
              <span className="text-emerald-400 font-mono font-bold">{metrics.trackingId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs font-mono">Escrow Status:</span>
              <span className="text-emerald-400 font-mono font-bold">{metrics.escrowStatus}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs font-mono">Temp Variation:</span>
              <span className="text-emerald-400 font-mono font-bold">{metrics.tempVariation}°C</span>
            </div>
            {metrics.complianceAlert && (
              <div className="mt-2 text-red-400 font-bold text-sm">{metrics.complianceAlert}</div>
            )}
          </div>
          <div className="absolute -inset-4 bg-emerald-500/5 blur-3xl -z-10 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function MarketplacePreview({ setActiveTab }) {
  const items = [
    { category: 'Reagents', vendor: 'GlobalBio Ltd', price: '₦450,000', stock: 'Verified' },
    { category: 'Calibration', vendor: 'StandardMetrics', price: '₦120,000', stock: 'Licensed' },
    { category: 'Cold-Chain', vendor: 'FrozenRoute', price: 'Varies', stock: 'Certified' },
  ];

  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Verified Marketplace</h2>
            <p className="text-slate-500 mt-2 text-sm">Certified procurement for modern facilities.</p>
          </div>
          <Button variant="ghost" onClick={() => setActiveTab("marketplace")} className="text-emerald-600 font-bold">
            Browse All <ChevronRight size={16} />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <Card key={i} className="hover:shadow-xl transition-all duration-300 border-none shadow-sm shadow-slate-200">
              <CardContent className="p-8">
                <div className="p-3 bg-emerald-50 w-fit rounded-xl text-emerald-600 mb-6">
                  <Store size={24} />
                </div>
                <h3 className="font-bold text-xl mb-1">{item.category}</h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">Vendor: {item.vendor}</p>
                <div className="pt-6 border-t flex justify-between items-center">
                  <span className="font-black text-emerald-700">{item.price}</span>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full uppercase">
                    {item.stock}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function InvestorSection() {
  return (
    <section className="py-24 px-6 border-y border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Building a Scalable Health Economy</h2>
          <p className="text-slate-500 italic leading-relaxed text-sm">
            "HealthLogix isn't just a logistics tool; it's the financial and operational bedrock for high-integrity healthcare delivery in emerging markets."
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 text-center">
          <div>
            <div className="text-4xl font-black text-emerald-600 tracking-tighter">₦2.4B</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Addressable Market</div>
          </div>
          <div>
            <div className="text-4xl font-black text-emerald-600 tracking-tighter">85%</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Retention Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-6 bg-emerald-600 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to secure your supply chain?</h2>
        <p className="text-emerald-100 mb-10 text-lg opacity-90 font-medium">
          Join 140+ hospitals and vendors already optimized by HealthLogix.
        </p>
        <Button variant="secondary" className="px-10 py-5 text-lg rounded-2xl shadow-2xl shadow-emerald-900/20 font-bold">
          Contact Sales Engineering
        </Button>
      </div>
    </section>
  );
}