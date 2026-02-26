import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldCheck, 
  Truck, 
  Activity, 
  Database, 
  Users, 
  LogIn, 
  Store, 
  LineChart, 
  MapPin, 
  Clock, 
  CheckCircle,
  ChevronRight,
  Package,
  AlertCircle,
  Menu,
  X,
  CreditCard,
  Search,
  LayoutDashboard,
  TrendingUp,
  Globe,
  Briefcase,
  Layers,
  BarChart3,
  Bot,
  Send,
  Sparkles,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// -----------------------------
// SHADCN-LIKE MINI COMPONENTS
// -----------------------------
const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-100 rounded-2xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, className = "", variant = "primary", disabled = false }) => {
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-white text-emerald-700 border border-emerald-100 hover:bg-emerald-50",
    outline: "bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100"
  };
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// -----------------------------
// MAIN WEBSITE COMPONENT
// -----------------------------
export default function HealthLogixWebsite() {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar setRole={setRole} role={role} setActiveTab={setActiveTab} />
      
      <main className="pt-16">
        {activeTab === "home" && (
          <>
            <HeroSection setActiveTab={setActiveTab} />
            <ServicesSection />
            <PlatformCapabilities />
            <MarketplacePreview />
            <InvestorSection />
            <CTASection />
          </>
        )}

        {activeTab === "marketplace" && <MarketplacePreview fullView={true} />}
        {activeTab === "tracking" && <LogisticsTracking />}
        {activeTab === "ceo-dashboard" && <CEODashboard />}
        {activeTab === "login" && <LoginSection setRole={(r) => { setRole(r); setActiveTab("home"); }} />}
      </main>

      <AIChatBot />
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

// -----------------------------
// AI CHAT BOT COMPONENT
// -----------------------------
function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your HealthLogix AI. I can analyze your procurement trends, shipment health, or vendor compliance. How can I help today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const apiKey = ""; // Set by environment
      const systemPrompt = "You are the HealthLogix AI Assistant. You help healthcare administrators and vendors in Nigeria. You provide insights on logistics, cold-chain stability, and B2B procurement. Use medical logistics terminology. Keep responses concise and professional.";
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      const result = await response.json();
      const aiResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble analyzing that data right now. Please try again.";
      
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "System connection error. Please verify your network." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">HealthLogix AI</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-100">
                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                    Insight Engine Active
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg">
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    m.role === "user" 
                    ? "bg-emerald-600 text-white rounded-tr-none" 
                    : "bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about MTD revenue..."
                  className="bg-transparent border-none outline-none flex-grow px-2 text-sm text-slate-700 placeholder:text-slate-400"
                />
                <button 
                  onClick={handleSend}
                  className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 rounded-full shadow-xl flex items-center justify-center text-white relative group"
      >
        {isOpen ? <X /> : <MessageSquare />}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full" />
        <div className="absolute right-16 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ask AI Insights
        </div>
      </motion.button>
    </div>
  );
}

// -----------------------------
// NAVIGATION
// -----------------------------
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

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <button onClick={() => { setActiveTab("home"); setIsOpen(false); }} className="text-left text-sm font-medium">Home</button>
              <button onClick={() => { setActiveTab("marketplace"); setIsOpen(false); }} className="text-left text-sm font-medium">Marketplace</button>
              <button onClick={() => { setActiveTab("tracking"); setIsOpen(false); }} className="text-left text-sm font-medium">Track Package</button>
              <button onClick={() => { setActiveTab("ceo-dashboard"); setIsOpen(false); }} className="text-left text-sm font-bold text-emerald-600">CEO Dashboard</button>
              <Button onClick={() => { setActiveTab("login"); setIsOpen(false); }} className="w-full">Institutional Login</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// -----------------------------
// CEO DASHBOARD COMPONENT
// -----------------------------
function CEODashboard() {
  const stats = [
    { label: "Active Nodes", value: "142", sub: "Hospitals & Labs", icon: <Globe className="text-blue-500" />, trend: "+12%" },
    { label: "Throughput (MTD)", value: "₦84.2M", sub: "Platform GTV", icon: <TrendingUp className="text-emerald-500" />, trend: "+24%" },
    { label: "Cold-Chain Integrity", value: "99.8%", sub: "SLA Adherence", icon: <Activity className="text-orange-500" />, trend: "Stable" },
    { label: "Verified Vendors", value: "28", sub: "Licensed Partners", icon: <ShieldCheck className="text-purple-500" />, trend: "+3 New" },
  ];

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Executive Control</h1>
          <p className="text-slate-500 font-medium">Global Infrastructure Health & Transactional Overview</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          <Button variant="ghost" className="text-xs py-1.5 px-3 bg-slate-50">Real-time</Button>
          <Button variant="ghost" className="text-xs py-1.5 px-3 text-slate-400">Past 24h</Button>
          <Button variant="ghost" className="text-xs py-1.5 px-3 text-slate-400">Weekly</Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="group hover:border-emerald-200 transition-all cursor-default">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                  {stat.icon}
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.trend}</span>
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">{stat.value}</div>
              <div className="text-sm font-bold text-slate-800">{stat.label}</div>
              <div className="text-xs text-slate-400 font-medium">{stat.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <Card className="lg:col-span-2 shadow-sm border-none bg-emerald-950 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Layers className="text-emerald-400" /> System Live Ops
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                SYSTEM_UPTIME_99.99
              </div>
            </div>
            
            <div className="space-y-6">
              <ActivityRow 
                title="Lagos General Hospital - Ikeja" 
                detail="Escrow Locked: ₦2.4M for MRI Helium Refill" 
                time="2m ago" 
                status="Pending Delivery"
              />
              <ActivityRow 
                title="Suleja Medical Hub (Regional)" 
                detail="Critical Breach Alert: Temperature at +8.2°C (Reagents)" 
                time="14m ago" 
                status="Intervention Active"
                alert
              />
              <ActivityRow 
                title="Vendor: MedGlobal Supply" 
                detail="ISO Recertification uploaded to Compliance Vault" 
                time="1h ago" 
                status="Verified"
              />
              <ActivityRow 
                title="Abuja Federal Clinic" 
                detail="Calibration Cycle Completed: 12 Analysers" 
                time="3h ago" 
                status="Completed"
              />
            </div>
          </CardContent>
        </Card>

        {/* Market Share / Revenue Composition */}
        <Card className="shadow-sm">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BarChart3 className="text-emerald-600" /> Revenue Verticals
            </h3>
            <div className="space-y-8">
              <RevenueBar label="B2B Marketplace" value="65%" amount="₦54.7M" color="bg-emerald-500" />
              <RevenueBar label="Subscription SaaS" value="20%" amount="₦16.8M" color="bg-blue-500" />
              <RevenueBar label="Logistics Orchestration" value="10%" amount="₦8.4M" color="bg-orange-500" />
              <RevenueBar label="Compliance Audits" value="5%" amount="₦4.2M" color="bg-purple-500" />
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-50">
               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                 <div>
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Run Rate (Est)</div>
                   <div className="text-xl font-black text-slate-800">₦1.01B <span className="text-xs text-emerald-600 font-bold">/YR</span></div>
                 </div>
                 <Briefcase className="text-slate-300" />
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ActivityRow({ title, detail, time, status, alert = false }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
      <div className={`mt-1.5 w-3 h-3 rounded-full shrink-0 ${alert ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-sm text-emerald-50 group-hover:text-white transition-colors">{title}</h4>
          <span className="text-[10px] text-emerald-400/60 font-mono">{time}</span>
        </div>
        <p className="text-xs text-emerald-100/60 line-clamp-1">{detail}</p>
        <div className={`mt-2 text-[10px] font-bold uppercase tracking-widest ${alert ? 'text-red-400' : 'text-emerald-400'}`}>
          {status}
        </div>
      </div>
    </div>
  );
}

function RevenueBar({ label, value, amount, color }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <div className="text-sm font-bold text-slate-700">{label}</div>
        <div className="text-xs font-mono text-slate-400">{amount}</div>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: value }} />
      </div>
    </div>
  );
}

// -----------------------------
// HERO SECTION
// -----------------------------
function HeroSection({ setActiveTab }) {
  const [trackId, setTrackId] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackId.trim()) setActiveTab("tracking");
  };

  return (
    <section className="relative overflow-hidden bg-emerald-950 text-white py-24 px-6">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-900/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-800 px-3 py-1 rounded-full text-emerald-400 text-sm mb-8"
        >
          <ShieldCheck size={14} />
          <span>Nigeria's Verified Healthcare Infrastructure Exchange</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Securing the Vitals of <span className="text-emerald-400">Healthcare Logistics</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-emerald-100/80 mb-10 max-w-2xl mx-auto"
        >
          A secure B2B digital ecosystem connecting verified hospitals with certified vendors for procurement and real-time cold-chain tracking.
        </motion.p>

        {/* Quick Tracking Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-md mx-auto mb-10"
        >
          <form onSubmit={handleTrack} className="flex p-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
            <input 
              type="text" 
              placeholder="Enter Tracking ID (e.g. HLX-2901)"
              className="bg-transparent border-none outline-none flex-grow px-4 text-white placeholder:text-emerald-200/50 text-sm"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
            />
            <Button className="rounded-xl px-4 py-2 flex items-center gap-2">
              <Search size={16} /> Track
            </Button>
          </form>
          <p className="text-[10px] text-emerald-300/60 mt-2 uppercase tracking-widest font-bold">Trace your medical shipment in real-time</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button onClick={() => setActiveTab("login")} className="px-8 py-4 text-lg rounded-2xl shadow-xl shadow-emerald-900/20">Get Started</Button>
          <Button variant="secondary" onClick={() => setActiveTab("ceo-dashboard")} className="px-8 py-4 text-lg rounded-2xl">CEO Overview</Button>
        </motion.div>
      </div>
    </section>
  );
}

// -----------------------------
// EXISTING SECTIONS (RETAINED)
// -----------------------------
function ServicesSection() {
  const services = [
    { icon: <Truck size={32} />, title: "Logistics Coordination", desc: "End-to-end management of medical consumables with active IoT temperature monitoring." },
    { icon: <Activity size={32} />, title: "Calibration & Maintenance", desc: "Digital scheduling for equipment servicing with verified certificate storage." },
    { icon: <ShieldCheck size={32} />, title: "Compliance Intelligence", desc: "Real-time regulatory readiness scores and digital audit trails for inspections." }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <Card className="h-full hover:shadow-2xl transition-shadow border-none shadow-lg shadow-slate-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PlatformCapabilities() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-950 mb-4">Core Ecosystem Capabilities</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Our platform bridges the gap between operational efficiency and regulatory compliance.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <CapabilityItem 
              icon={<Database className="text-emerald-600" />} 
              title="Closed B2B Marketplace" 
              desc="Exclusive access for pre-vetted medical vendors. Every listing is audited for quality certification before going live."
            />
            <CapabilityItem 
              icon={<Users className="text-emerald-600" />} 
              title="Institutional Role Management" 
              desc="Granular permissions for HMOs, Lab Managers, and Procurement Officers to ensure secure internal workflows."
            />
            <CapabilityItem 
              icon={<AlertCircle className="text-emerald-600" />} 
              title="Escrow-Protected Payments" 
              desc="Funds are only released to vendors once the hospital confirms receipt and quality verification on the platform."
            />
          </div>
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
             <div className="aspect-video bg-emerald-950 rounded-2xl relative overflow-hidden flex items-center justify-center text-emerald-400 p-8">
                <div className="text-center">
                  <Activity size={48} className="mx-auto mb-4 animate-pulse" />
                  <p className="font-mono text-sm opacity-60">ENCRYPTED DATA STREAM_001</p>
                  <p className="text-xl font-bold text-white mt-2">Active Infrastructure Health Monitoring</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-950/80 to-transparent" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityItem({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-lg mb-1 text-slate-800">{title}</h4>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function MarketplacePreview({ fullView = false }) {
  const items = [
    { category: 'Reagents & Consumables', vendor: 'GlobalBio Ltd', price: '₦450,000', stock: 'Verified' },
    { category: 'Calibration Services', vendor: 'StandardMetrics', price: '₦120,000', stock: 'Licensed' },
    { category: 'Cold-Chain Logistics', vendor: 'FrozenRoute', price: 'Varies', stock: 'Certified' },
    { category: 'Imaging Spares', vendor: 'MedRad Systems', price: '₦2,100,000', stock: 'Verified' },
  ];

  const displayedItems = fullView ? items : items.slice(0, 3);

  return (
    <section className={`py-20 px-6 ${fullView ? '' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-950 mb-2">Verified Marketplace</h2>
            <p className="text-slate-500">Only ISO-certified partners and pre-vetted stock.</p>
          </div>
          {!fullView && <Button variant="ghost" className="text-emerald-600">Browse All <ChevronRight size={16} /></Button>}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {displayedItems.map((item, i) => (
            <Card key={i} className="hover:border-emerald-200 transition-colors shadow-sm">
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Store size={20} /></div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{item.stock}</span>
                </div>
                <h3 className="font-bold text-lg text-slate-800">{item.category}</h3>
                <p className="text-sm text-slate-500 mb-4">By {item.vendor}</p>
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="font-bold text-emerald-700">{item.price}</span>
                  <Button variant="outline" className="py-1 px-3 text-xs">View Listings</Button>
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
    <section className="bg-emerald-900 text-white py-24 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Built for Scale, Built for Trust</h2>
            <p className="text-emerald-100/80 text-lg mb-8 leading-relaxed">
              Health Logix operates a proprietary marketplace model with four distinct revenue streams: 
              B2B transactions, recurring compliance subscriptions, analytics as a service, and logistics orchestration fees.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-800/50 p-6 rounded-2xl border border-emerald-700">
                <LineChart className="text-emerald-400 mb-2" />
                <div className="text-2xl font-bold">15%</div>
                <div className="text-sm text-emerald-200">Avg. OpEx Savings</div>
              </div>
              <div className="bg-emerald-800/50 p-6 rounded-2xl border border-emerald-700">
                <ShieldCheck className="text-emerald-400 mb-2" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-emerald-200">Audit Compliance</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <MetricCard title="Total Addressable Market" value="$1.2B (Nigeria Infrastructure)" />
            <MetricCard title="Primary Model" value="Subscription + Escrow Commission" />
            <MetricCard title="Strategic Roadmap" value="West African Hub Expansion (2026)" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ title, value }) {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white p-6 hover:bg-white/10 transition-colors">
      <h3 className="text-emerald-300 font-semibold mb-1 uppercase text-xs tracking-wider">{title}</h3>
      <p className="text-xl font-medium">{value}</p>
    </Card>
  );
}

function LogisticsTracking() {
  const [currentTemp, setCurrentTemp] = useState(4.2);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemp(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const trackingData = {
    id: "HLX-2901-NG",
    item: "Siemens Reagents (Box A-4)",
    status: "In Transit",
    location: "Lagos Mainland - Ikeja Hub",
    eta: "45 mins",
    timeline: [
      { stage: "Order Processed", time: "09:00 AM", done: true },
      { stage: "Cold-Chain Loaded", time: "10:15 AM", done: true },
      { stage: "Transit Initiated", time: "10:30 AM", done: true },
      { stage: "Quality Handover", time: "--:--", done: false },
    ]
  };

  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div className="mb-10 flex flex-wrap gap-4 items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-950">Traceable Logistics</h2>
          <p className="text-slate-500">Real-time IoT Monitoring Dashboard</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="flex items-center gap-2"> <MapPin size={16}/> Map View</Button>
           <Button className="bg-slate-900">View SLA Logs</Button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-8 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">LIVE SHIPMENT</span>
                <h3 className="text-2xl font-bold mt-2 text-slate-800">{trackingData.id}</h3>
                <p className="text-slate-500">{trackingData.item}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-600 tracking-tighter">{currentTemp}°C</div>
                <div className="text-xs text-emerald-600 font-medium">STABLE COLD-CHAIN</div>
              </div>
            </div>
            <div className="relative pt-8">
              <div className="absolute top-10 left-0 w-full h-1 bg-slate-100 rounded-full" />
              <div className="absolute top-10 left-0 w-2/3 h-1 bg-emerald-500 rounded-full" />
              <div className="grid grid-cols-4 relative z-10 text-center">
                {trackingData.timeline.map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full border-4 border-white mb-2 ${step.done ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{step.time}</div>
                    <div className={`text-xs font-semibold ${step.done ? 'text-slate-800' : 'text-slate-400'}`}>{step.stage}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-4">
             <Card className="p-6 bg-slate-900 text-white">
                <Clock className="text-emerald-400 mb-2" size={24} />
                <div className="text-sm text-slate-400">Estimated Delivery</div>
                <div className="text-xl font-bold">{trackingData.eta}</div>
             </Card>
             <Card className="p-6 bg-emerald-600 text-white">
                <MapPin className="text-emerald-100 mb-2" size={24} />
                <div className="text-sm text-emerald-100">Current Location</div>
                <div className="text-lg font-bold truncate">{trackingData.location}</div>
             </Card>
          </div>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-600"/> Escrow Status
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center"><span className="text-slate-500">Payment Held</span><span className="font-bold text-slate-800">₦1,250,000</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-500">Security Check</span><span className="text-emerald-600 font-semibold">Passed</span></div>
              <Button className="w-full mt-4 bg-slate-100 text-slate-600 hover:bg-slate-200" variant="ghost">Release on Arrival</Button>
            </div>
          </Card>
          <Card className="p-6 border-dashed border-2 bg-transparent">
            <h4 className="font-bold text-slate-800 mb-2">Issue with shipment?</h4>
            <p className="text-xs text-slate-500 mb-4">Our automated dispute resolution team is active 24/7 for cold-chain breaches.</p>
            <Button variant="outline" className="w-full text-red-600 border-red-100 hover:bg-red-50 py-2">Flag Anomaly</Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

function LoginSection({ setRole }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = (e) => { e.preventDefault(); setLoading(true); setTimeout(() => { setRole(email.includes("vendor") ? "Vendor" : "Hospital"); setLoading(false); }, 800); };
  return (
    <section className="py-24 px-6 max-lg mx-auto">
      <Card className="p-10 shadow-2xl border-none">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200"><LogIn className="text-white" size={32} /></div>
          <h2 className="text-3xl font-bold text-slate-900">Institutional Access</h2>
          <p className="text-slate-500 mt-2">Log in to your workspace</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2"><label className="text-sm font-bold text-slate-700">Email</label><input required type="email" placeholder="e.g. procurement@cityhospital.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="space-y-2"><label className="text-sm font-bold text-slate-700">Password</label><input required type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" /></div>
          <Button disabled={loading} className="w-full py-4 text-lg font-bold">{loading ? "Verifying..." : "Access Dashboard"}</Button>
        </form>
      </Card>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto bg-emerald-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-emerald-200">
        <h2 className="text-4xl font-bold mb-4">Modernizing Nigeria's Healthcare Rails</h2>
        <p className="text-emerald-50 mb-10 text-lg opacity-90">Eliminate stock-outs, ensure equipment accuracy, and gain real-time visibility.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-white text-emerald-700 hover:bg-emerald-50 px-10 py-4 font-bold text-lg rounded-2xl">Partner With Us</Button>
          <Button variant="ghost" className="text-white hover:bg-emerald-700 px-10 py-4 font-bold text-lg rounded-2xl">Watch Demo</Button>
        </div>
      </div>
    </section>
  );
}

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
