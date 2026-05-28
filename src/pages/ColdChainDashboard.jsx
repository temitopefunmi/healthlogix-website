import React, { useState, useEffect, useMemo } from 'react';

// User Role Definition Matrix
const USER_ROLES = {
  SUPER_ADMIN: { name: 'Super Admin', badge: 'bg-purple-500/10 text-purple-400', permissions: ['All Actions', 'Database Write', 'SLA Override', 'ESG Approve'] },
  NATIONAL_ADMIN: { name: 'National Admin', badge: 'bg-blue-500/10 text-blue-400', permissions: ['All Actions', 'SLA Override'] },
  STATE_ADMIN: { name: 'State Admin (Kano)', badge: 'bg-indigo-500/10 text-indigo-400', permissions: ['State View', 'Assign Engineer'] },
  LGA_OFFICER: { name: 'LGA Officer', badge: 'bg-teal-500/10 text-teal-400', permissions: ['Local View', 'Log Excursion'] },
  BIOMED_ENGINEER: { name: 'Biomedical Engineer', badge: 'bg-amber-500/10 text-amber-400', permissions: ['Resolve Tickets', 'Upload Calibration'] },
  AUDITOR: { name: 'Auditor', badge: 'bg-rose-500/10 text-rose-400', permissions: ['Read All Logs', 'ISO Traceability Check'] },
  ESG_ANALYST: { name: 'ESG Analyst', badge: 'bg-emerald-500/10 text-emerald-400', permissions: ['Read ESG Data', 'Generate Report'] },
};

// Core National Statistics Seed
const INITIAL_STATS = [
  { title: 'Total Devices', value: '18,450', change: '+12% MoM', trend: 'up' },
  { title: 'Online Devices', value: '17,920', change: '97.1% Uptime', trend: 'up' },
  { title: 'Critical Alerts', value: '42', change: '-8 unresolved', trend: 'down' },
  { title: 'Temperature Excursions', value: '128', change: '0.7% of total', trend: 'up' },
  { title: 'Calibration Due', value: '304', change: 'Action Required', trend: 'neutral' },
];

// Initial Core Assets Directory
const INITIAL_ASSETS = [
  { id: 'ABJ-FCT-0023', type: 'Vaccine Refrigerator', temp: 3.8, humidity: 48, power: 'Solar', door: 'CLOSED', calibration: 'Valid', uncertainty: '±0.12°C', facility: 'Asokoro District Hospital', state: 'FCT Abuja', lga: 'Municipal', lastSeen: 'Just Now', reliability: 98.4 },
  { id: 'KAN-0045', type: 'Pharmaceutical Cold Room', temp: 9.4, humidity: 67, power: 'Mains', door: 'CLOSED', calibration: 'Due Soon', uncertainty: '±0.25°C', facility: 'Kano Primary Health Centre', state: 'Kano', lga: 'Municipal LGA', lastSeen: '2 mins ago', reliability: 89.1 },
  { id: 'LAG-1120', type: 'Blood Bank Freezer', temp: -18.2, humidity: 39, power: 'Battery', door: 'CLOSED', calibration: 'Valid', uncertainty: '±0.08°C', facility: 'Lagos Univ Teaching Hosp', state: 'Lagos', lga: 'Mainland LGA', lastSeen: 'Just Now', reliability: 99.2 },
  { id: 'OYO-0741', type: 'Laboratory Cold Chain', temp: 5.1, humidity: 44, power: 'Solar', door: 'CLOSED', calibration: 'Expired', uncertainty: '±0.30°C', facility: 'Ring Road State Hospital', state: 'Oyo', lga: 'Ibadan Southwest', lastSeen: '5 mins ago', reliability: 72.5 },
  { id: 'RIV-3022', type: 'Walk-In Cold Room', temp: 4.5, humidity: 55, power: 'Mains', door: 'OPEN', calibration: 'Valid', uncertainty: '±0.15°C', facility: 'Port Harcourt General Hosp', state: 'Rivers', lga: 'Port Harcourt', lastSeen: 'Just Now', reliability: 95.6 },
];

// Initial Maintenance Logs
const INITIAL_MAINTENANCE_TICKETS = [
  { id: 'WO-2026-8891', asset: 'KAN-0045', activity: 'Compressor Circuit Overhaul', engineer: 'Engr. Musa Bello', due: '12-Jun-2026', priority: 'Critical', status: 'Pending' },
  { id: 'WO-2026-8892', asset: 'OYO-0741', activity: 'NIST Traceable Sensor Re-Cal', engineer: 'Engr. Esther Okon', due: '15-Jun-2026', priority: 'Medium', status: 'Scheduled' },
  { id: 'WO-2026-8893', asset: 'RIV-3022', activity: 'Lithium Backup Battery Swap', engineer: 'Engr. Ibrahim Kalu', due: '18-Jun-2026', priority: 'High', status: 'In Progress' },
];

export default function ColdChainDashboard() {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeRole, setActiveRole] = useState('SUPER_ADMIN');
  
  // Real-time State stores
  const [stats, setStats] = useState(INITIAL_STATS);
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [maintenance, setMaintenance] = useState(INITIAL_MAINTENANCE_TICKETS);
  const [alerts, setAlerts] = useState([
    { id: 101, assetId: 'OYO-0741', metric: 'Calibration Expiration Trigger', severity: 'Critical', message: 'NIST Standard Calibration expired on Oyo Lab Unit OYO-0741', time: '10 mins ago' },
    { id: 102, assetId: 'RIV-3022', metric: 'Door Left Open Warning', severity: 'Warning', message: 'Rivers Cold Room RIV-3022 door open exceeding 15 min limit', time: '15 mins ago' }
  ]);

  // Notifications toggles state
  const [alertSettings, setAlertSettings] = useState({
    sms: true,
    email: true,
    whatsapp: true,
    push: false
  });

  // UI helpers & filters
  const [selectedStateFilter, setSelectedStateFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  
  // Create New Work Order State
  const [newWo, setNewWo] = useState({ asset: 'ABJ-FCT-0023', activity: '', engineer: '', due: '', priority: 'Medium' });

  // Field Engineer Mock Mobile State
  const [mobileOfflineMode, setMobileOfflineMode] = useState(false);
  const [scannedAssetTag, setScannedAssetTag] = useState('');
  const [uploadedCert, setUploadedCert] = useState(null);

  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      // Simulate real-time fluctuations
      setAssets(prevAssets => 
        prevAssets.map(asset => {
          let tempShift = (Math.random() - 0.5) * 0.4;
          let newTemp = parseFloat((asset.temp + tempShift).toFixed(1));
          
          // Randomly trigger door or power fluctuations
          let doorState = asset.door;
          if (Math.random() > 0.95) {
            doorState = asset.door === 'CLOSED' ? 'OPEN' : 'CLOSED';
          }
          
          // Generate real-time alerts automatically if threshold is crossed
          if (newTemp > 8.0 && asset.type !== 'Blood Bank Freezer' && !alerts.some(a => a.assetId === asset.id && a.metric === 'Temp Excursion')) {
            triggerLiveAlert(asset.id, 'Temp Excursion', 'Critical', `Temperature excursion alert: ${newTemp}°C detected on ${asset.id}`);
          }

          return {
            ...asset,
            temp: newTemp,
            humidity: Math.min(100, Math.max(0, Math.floor(asset.humidity + (Math.random() - 0.5) * 2))),
            door: doorState,
            lastSeen: 'Just Now'
          };
        })
      );
    }, 3500);

    return () => clearInterval(telemetryInterval);
  }, [alerts]);

  const triggerLiveAlert = (assetId, metric, severity, message) => {
    const newAlert = {
      id: Date.now(),
      assetId,
      metric,
      severity,
      message,
      time: 'Just Now'
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleCreateWorkOrder = (e) => {
    e.preventDefault();
    if (!newWo.activity || !newWo.engineer) return;
    const order = {
      id: `WO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      asset: newWo.asset,
      activity: newWo.activity,
      engineer: newWo.engineer,
      due: newWo.due || '20-Jun-2026',
      priority: newWo.priority,
      status: 'Pending'
    };
    setMaintenance(prev => [order, ...prev]);
    setNewWo({ asset: 'ABJ-FCT-0023', activity: '', engineer: '', due: '', priority: 'Medium' });
  };

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesState = selectedStateFilter === 'All' || asset.state === selectedStateFilter;
      const matchesSearch = asset.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            asset.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            asset.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesState && matchesSearch;
    });
  }, [assets, selectedStateFilter, searchQuery]);

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-200 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Platform Layout Wrap */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Module Sidebar */}
        <aside className={`w-full lg:w-80 border-b lg:border-b-0 lg:border-r shrink-0 transition-colors duration-200 ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="p-6 border-b border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                HLA
              </div>
              <div>
                <h2 className="font-extrabold tracking-tight text-lg">Health Logix</h2>
                <p className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest">Assurance National Portal</p>
              </div>
            </div>
          </div>

          {/* User Role Switcher */}
          <div className="px-6 py-4 border-b border-slate-800/50 bg-slate-800/20">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Active User Role</label>
            <select 
              value={activeRole} 
              onChange={(e) => setActiveRole(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-900/50 dark:bg-slate-950/60 border border-slate-700/60 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 outline-none text-blue-400"
            >
              {Object.keys(USER_ROLES).map(roleKey => (
                <option key={roleKey} value={roleKey}>{USER_ROLES[roleKey].name}</option>
              ))}
            </select>
            <div className="mt-2 flex flex-wrap gap-1">
              {USER_ROLES[activeRole].permissions.slice(0, 2).map((p, idx) => (
                <span key={idx} className="text-[9px] px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">{p}</span>
              ))}
            </div>
          </div>
          
          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'National Dashboard', icon: '📊' },
              { id: 'gis', label: 'Interactive GIS Map', icon: '🗺️' },
              { id: 'telemetry', label: 'Telemetry Monitoring', icon: '📡' },
              { id: 'alerts', label: 'Live Alerts Center', icon: '🔔' },
              { id: 'maintenance', label: 'Maintenance Workflows', icon: '🛠️' },
              { id: 'calibration', label: 'Calibration Ledger', icon: '📐' },
              { id: 'esg', label: 'Strategic ESG Framework', icon: '🌱' },
              { id: 'executive', label: 'AI Executive Insights', icon: '🧠' },
              { id: 'field', label: 'Mobile Engineer Mode', icon: '📱' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentModule(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-150 ${
                  currentModule === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]' 
                    : 'hover:bg-slate-800/30 dark:hover:bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.id === 'alerts' && alerts.length > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                    {alerts.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Workspace Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Platform Topbar */}
          <header className={`h-20 border-b flex items-center justify-between px-6 lg:px-8 shrink-0 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Federal Ministry of Health</span>
                <h1 className="text-xl font-extrabold tracking-tight">Nigeria Cold Chain Assurance</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setNotificationDrawerOpen(!notificationDrawerOpen)}
                className="relative p-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 transition-colors"
              >
                <span>🔔</span>
                {alerts.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                )}
              </button>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 transition-colors text-sm"
              >
                {isDarkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
              <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Azure IoT Relay Connected
              </div>
            </div>
          </header>

          {/* Notification Drawer overlay */}
          {notificationDrawerOpen && (
            <div className="bg-slate-900 border-b border-slate-800 p-6 absolute w-full z-50 shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-base flex items-center gap-2">
                  <span>🔔</span> Active Incident Streams
                </h3>
                <button onClick={() => setNotificationDrawerOpen(false)} className="text-xs text-slate-400 hover:text-white">✕ Close</button>
              </div>
              <div className="space-y-3">
                {alerts.map(a => (
                  <div key={a.id} className="p-3 bg-slate-950/80 rounded-xl border border-red-500/20 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-red-400 tracking-wider uppercase">{a.severity} // {a.metric}</span>
                      <p className="text-sm font-semibold mt-0.5">{a.message}</p>
                    </div>
                    <span className="text-xs text-slate-500">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Module Content Switcher */}
          <main className="p-6 lg:p-8 space-y-8 flex-1 overflow-y-auto">
            
            {/* MODULE 1: NATIONAL OVERVIEW DASHBOARD */}
            {currentModule === 'dashboard' && (
              <>
                {/* Dashboard Banner Card */}
                <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-950 rounded-3xl p-6 lg:p-8 border border-blue-500/20 text-white shadow-2xl">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold text-blue-400">National Overview</span>
                      <h2 className="text-2xl lg:text-3xl font-black tracking-tight mt-3">Active Monitoring Workspace</h2>
                      <p className="text-slate-300 mt-2 max-w-xl text-sm leading-relaxed">System logs, alarms, ESG criteria tracking, and real-time operations overview mapping for primary health facilities across 774 Local Government Areas.</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setCurrentModule('telemetry')} className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold transition-all text-sm shadow-lg shadow-blue-500/20">All Assets Ledger</button>
                      <button onClick={() => setCurrentModule('executive')} className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold transition-all text-sm border border-slate-700">Predictive Modeling</button>
                    </div>
                  </div>
                </div>

                {/* Dashboard Core Grid KPI cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {stats.map((stat, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl border transition-all duration-200 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.title}</p>
                      <h3 className="text-2xl font-black mt-2 tracking-tight">{stat.value}</h3>
                      <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                        <span className="text-blue-500 dark:text-blue-400">{stat.change}</span>
                        <span className="text-base">{stat.trend === 'up' ? '📈' : stat.trend === 'down' ? '📉' : '↔️'}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Split Map View and Realtime Events Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* GIS Interactive map placeholder in Main dashboard */}
                  <div className={`lg:col-span-2 rounded-2xl border p-6 flex flex-col justify-between ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-extrabold text-base">National Infrastructure Grid (GIS State Matrix)</h3>
                      <button onClick={() => setCurrentModule('gis')} className="text-xs text-blue-400 font-bold hover:underline">Interactive GIS Module →</button>
                    </div>
                    
                    {/* SVG Map of Nigeria Regions Wrapper */}
                    <div className="h-80 bg-slate-950/40 rounded-xl border border-slate-800 flex items-center justify-center p-4 relative">
                      <svg viewBox="0 0 800 500" className="w-full h-full max-h-80 opacity-90">
                        {/* Interactive North West Region */}
                        <path d="M 150 50 L 350 50 L 300 180 L 100 180 Z" fill="#22c55e" fillOpacity="0.25" stroke="#22c55e" strokeWidth="2" className="cursor-pointer hover:fill-opacity-40 transition-all" onClick={() => setSelectedStateFilter('All')} />
                        <text x="210" y="100" fill="#22c55e" className="text-xs font-bold pointer-events-none">North West</text>

                        {/* Interactive North East Region */}
                        <path d="M 350 50 L 650 100 L 550 220 L 300 180 Z" fill="#eab308" fillOpacity="0.25" stroke="#eab308" strokeWidth="2" className="cursor-pointer hover:fill-opacity-40 transition-all" onClick={() => setSelectedStateFilter('All')} />
                        <text x="460" y="130" fill="#eab308" className="text-xs font-bold pointer-events-none">North East</text>

                        {/* Interactive North Central Region */}
                        <path d="M 100 180 L 300 180 L 550 220 L 400 320 L 200 280 Z" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" className="cursor-pointer hover:fill-opacity-40 transition-all" onClick={() => setSelectedStateFilter('FCT Abuja')} />
                        <text x="310" y="240" fill="#fff" className="text-xs font-bold pointer-events-none">North Central (FCT)</text>

                        {/* Interactive South West Region */}
                        <path d="M 80 280 L 200 280 L 250 380 L 100 380 Z" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="2" className="cursor-pointer hover:fill-opacity-40 transition-all" onClick={() => setSelectedStateFilter('Lagos')} />
                        <text x="120" y="330" fill="#ef4444" className="text-xs font-bold pointer-events-none">South West (Lagos/Oyo)</text>

                        {/* Interactive South South Region */}
                        <path d="M 200 280 L 400 320 L 450 420 L 250 380 Z" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2" className="cursor-pointer hover:fill-opacity-40 transition-all" onClick={() => setSelectedStateFilter('Rivers')} />
                        <text x="300" y="370" fill="#22c55e" className="text-xs font-bold pointer-events-none">South South</text>
                      </svg>
                      <div className="absolute bottom-4 left-4 text-xs font-bold text-slate-400">
                        Click regions to inspect local vaccine cold-chain health
                      </div>
                    </div>
                  </div>

                  {/* Operational Alerts feed */}
                  <div className={`rounded-2xl border p-6 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-extrabold text-base">Alarms Dashboard</h3>
                      <button onClick={() => setCurrentModule('alerts')} className="text-xs text-red-500 font-bold hover:underline">Alarms Suite →</button>
                    </div>
                    <div className="space-y-4">
                      {alerts.map(a => (
                        <div key={a.id} className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-red-400">{a.metric}</span>
                            <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-400 font-bold rounded-full">{a.severity}</span>
                          </div>
                          <p className="text-xs font-medium">{a.message}</p>
                          <span className="text-[10px] text-slate-500 block">{a.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </>
            )}

            {/* MODULE 2: LIVE GIS HEAT MAP OF NIGERIA */}
            {currentModule === 'gis' && (
              <div className={`rounded-3xl border p-8 transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black">Interactive Spatial Asset Heat Map</h2>
                    <p className="text-slate-400 text-xs mt-1">Geographic cluster coordinates mapping device health for critical cold rooms across major regions.</p>
                  </div>
                  <div className="flex gap-2">
                    {['All', 'Kano', 'Lagos', 'Rivers', 'Oyo'].map(state => (
                      <button 
                        key={state}
                        onClick={() => setSelectedStateFilter(state)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${selectedStateFilter === state ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3 h-[500px] bg-slate-950 rounded-2xl relative flex items-center justify-center border border-slate-800 overflow-hidden">
                    <div className="absolute top-4 left-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800 z-10 space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full bg-green-500 block"></span>
                        <span className="font-bold">Compliant Node (Temp &lt; 8°C)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-500 block"></span>
                        <span className="font-bold">Warning Level</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full bg-red-500 block"></span>
                        <span className="font-bold">Critical Out of Range</span>
                      </div>
                    </div>

                    {/* Highly detailed visual mockup of Nigeria state distribution */}
                    <svg viewBox="0 0 800 500" className="w-full h-full p-4">
                      {/* Grid representation */}
                      <g stroke="#334155" strokeWidth="0.5" strokeDasharray="3">
                        <line x1="100" y1="0" x2="100" y2="500" />
                        <line x1="300" y1="0" x2="300" y2="500" />
                        <line x1="500" y1="0" x2="500" y2="500" />
                        <line x1="700" y1="0" x2="700" y2="500" />
                      </g>

                      {/* Map Nodes representing real-time telemetry markers */}
                      {filteredAssets.map((asset, i) => {
                        const coords = [
                          { x: 320, y: 220 }, // ABJ
                          { x: 380, y: 120 }, // KAN
                          { x: 180, y: 390 }, // LAG
                          { x: 190, y: 320 }, // OYO
                          { x: 330, y: 410 }, // RIV
                        ][i % 5];
                        
                        const nodeColor = asset.temp > 8 || asset.temp < 2 && asset.type !== 'Blood Bank Freezer' ? '#ef4444' : asset.temp > 6 ? '#f59e0b' : '#10b981';

                        return (
                          <g key={asset.id} className="cursor-pointer group">
                            <circle cx={coords.x} cy={coords.y} r="18" fill={nodeColor} fillOpacity="0.2" className="animate-ping" />
                            <circle cx={coords.x} cy={coords.y} r="10" fill={nodeColor} stroke="#ffffff" strokeWidth="2" />
                            <text x={coords.x + 15} y={coords.y + 4} fill="#ffffff" className="text-[10px] font-extrabold select-none pointer-events-none shadow">{asset.id}</text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-extrabold text-sm uppercase text-slate-400">Local Area Status</h4>
                    <div className="space-y-3">
                      {filteredAssets.map(asset => (
                        <div key={asset.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold">{asset.id}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${asset.temp > 8 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                              {asset.temp}°C
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-medium truncate">{asset.facility}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 3: LIVE TEMPERATURE & HUMIDITY MONITORING */}
            {currentModule === 'telemetry' && (
              <div className={`rounded-3xl border p-6 transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Real-Time Core Telemetry Engine</h2>
                    <p className="text-xs text-slate-500">Continuous stream of vaccine and laboratory device health logs (flickers in real-time).</p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Filter by Asset ID or Facility..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-4 py-2 text-sm rounded-xl border border-slate-800 bg-slate-900/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-64 text-white"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                        <th className="p-4">Asset Code</th>
                        <th className="p-4">Equipment Category</th>
                        <th className="p-4">Location & LGA Facility</th>
                        <th className="p-4">Power Status</th>
                        <th className="p-4">Door State</th>
                        <th className="p-4">ISO Uncertainty</th>
                        <th className="p-4">Ambient Humidity</th>
                        <th className="p-4">Internal Temp</th>
                        <th className="p-4 text-right">IoT Health State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredAssets.map(device => {
                        const isExcursion = device.temp > 8.0 && device.type !== 'Blood Bank Freezer';
                        return (
                          <tr key={device.id} className="hover:bg-slate-900/20 transition-all">
                            <td className="p-4 font-mono font-bold text-blue-400">{device.id}</td>
                            <td className="p-4 font-semibold">{device.type}</td>
                            <td className="p-4">
                              <p className="font-bold">{device.facility}</p>
                              <span className="text-[10px] text-slate-500">{device.state} // {device.lga}</span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${device.power === 'Solar' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                ⚡ {device.power}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${device.door === 'OPEN' ? 'bg-red-500/10 text-red-400 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                                {device.door}
                              </span>
                            </td>
                            <td className="p-4 font-mono text-slate-400">{device.uncertainty}</td>
                            <td className="p-4 font-mono text-slate-300">{device.humidity}% RH</td>
                            <td className="p-4">
                              <div className={`text-base font-black px-2.5 py-1 rounded-lg inline-block font-mono ${isExcursion ? 'bg-red-500/10 text-red-500 border border-red-500/30' : 'bg-green-500/10 text-green-500'}`}>
                                {device.temp}°C
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${isExcursion ? 'bg-red-500 text-white' : 'bg-green-500/10 text-green-400'}`}>
                                {isExcursion ? 'ALARM ACTIVE' : 'OPTIMAL'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODULE 4: LIVE ALERT MANAGEMENT */}
            {currentModule === 'alerts' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Live Alarms Ledger */}
                <div className={`lg:col-span-2 rounded-3xl border p-6 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold">Incident Log Matrix</h2>
                      <p className="text-xs text-slate-500">Real-time alerts triggered by automated cloud rules engines.</p>
                    </div>
                    <button 
                      onClick={() => triggerLiveAlert('KAN-0045', 'Power Outage', 'Critical', 'Emergency: Main Generator failed at Kano Cold Room')}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-all"
                    >
                      🧪 Force Mock Alert
                    </button>
                  </div>

                  <div className="space-y-4">
                    {alerts.map(alert => (
                      <div key={alert.id} className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-xs font-extrabold text-red-400">{alert.metric}</span>
                            <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 rounded font-mono text-slate-400">{alert.assetId}</span>
                          </div>
                          <p className="text-sm font-semibold">{alert.message}</p>
                          <span className="text-xs text-slate-500 block">{alert.time}</span>
                        </div>
                        <button 
                          onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                          className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 font-bold rounded"
                        >
                          Resolve SLA
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notification Rules Configuration */}
                <div className={`rounded-3xl border p-6 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="font-bold text-base mb-2">Automated Dispatch Rules</h3>
                  <p className="text-xs text-slate-500 mb-6">Dispatch instant push diagnostics alerts to localized field technicians.</p>
                  
                  <div className="space-y-4">
                    {Object.keys(alertSettings).map(channel => (
                      <div key={channel} className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                        <div>
                          <p className="text-sm font-bold uppercase">{channel} Gateway</p>
                          <span className="text-[10px] text-slate-500">Send Critical diagnostics alerts</span>
                        </div>
                        <button 
                          onClick={() => setAlertSettings(prev => ({ ...prev, [channel]: !prev[channel] }))}
                          className={`w-12 h-6 rounded-full p-1 transition-all ${alertSettings[channel] ? 'bg-blue-600' : 'bg-slate-800'}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-all ${alertSettings[channel] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* MODULE 5: PREVENTIVE MAINTENANCE WORKFLOW */}
            {currentModule === 'maintenance' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Active Work Order Ledger */}
                <div className={`lg:col-span-2 rounded-3xl border p-6 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h2 className="text-xl font-bold mb-6">Dispatched Preventive Maintenance Orders</h2>
                  
                  <div className="space-y-4">
                    {maintenance.map(wo => (
                      <div key={wo.id} className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex justify-between items-center flex-wrap gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-extrabold text-blue-400">{wo.id}</span>
                            <span className="text-slate-600">//</span>
                            <span className="text-xs font-mono text-slate-400">{wo.asset}</span>
                          </div>
                          <h4 className="font-bold text-sm">{wo.activity}</h4>
                          <p className="text-xs text-slate-400">Assigned Expert: {wo.engineer} // SLA: {wo.due}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${wo.priority === 'Critical' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                            {wo.priority}
                          </span>
                          <span className="px-2 py-0.5 bg-blue-500/15 text-blue-400 rounded text-xs font-bold">
                            {wo.status}
                          </span>
                          <button 
                            onClick={() => {
                              setMaintenance(prev => prev.map(m => m.id === wo.id ? { ...m, status: 'Completed' } : m));
                            }}
                            className="px-2.5 py-1 text-xs bg-green-600 hover:bg-green-500 font-bold rounded text-white"
                          >
                            Mark Completed
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dispatch Ticket Creation Console */}
                <div className={`rounded-3xl border p-6 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="font-bold text-base mb-2">Create Corrective Dispatch</h3>
                  <p className="text-xs text-slate-500 mb-6">Initiate official preventative tasks linked to specific device tags.</p>

                  <form onSubmit={handleCreateWorkOrder} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">Link Device Asset</label>
                      <select 
                        value={newWo.asset} 
                        onChange={(e) => setNewWo(prev => ({ ...prev, asset: e.target.value }))}
                        className="w-full text-xs font-semibold bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-300"
                      >
                        {assets.map(a => <option key={a.id} value={a.id}>{a.id} - {a.facility}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Activity Work Scope</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. NIST Sensor Calibration, Battery overhaul" 
                        value={newWo.activity} 
                        onChange={(e) => setNewWo(prev => ({ ...prev, activity: e.target.value }))}
                        className="w-full text-xs font-semibold bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-300 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Assigned Biomedical Engineer</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Engr. John Doe" 
                        value={newWo.engineer} 
                        onChange={(e) => setNewWo(prev => ({ ...prev, engineer: e.target.value }))}
                        className="w-full text-xs font-semibold bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-300 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-1">Priority</label>
                        <select 
                          value={newWo.priority} 
                          onChange={(e) => setNewWo(prev => ({ ...prev, priority: e.target.value }))}
                          className="w-full text-xs font-semibold bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-300"
                        >
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                          <option>Critical</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1">SLA Deadline</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 15-Jun-2026" 
                          value={newWo.due} 
                          onChange={(e) => setNewWo(prev => ({ ...prev, due: e.target.value }))}
                          className="w-full text-xs font-semibold bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-300 outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-extrabold text-sm text-white transition-all shadow-lg">
                      Dispatch Work Ticket
                    </button>
                  </form>
                </div>

              </div>
            )}

            {/* MODULE 6: CALIBRATION & TRACEABILITY MODULE */}
            {currentModule === 'calibration' && (
              <div className={`rounded-3xl border p-6 transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold">ISO/IEC 17025 Metrology Ledger</h2>
                    <p className="text-xs text-slate-500">Traceability audit logging uncertainty values across certified equipment nodes.</p>
                  </div>
                  <button onClick={() => setCurrentModule('field')} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold rounded-lg text-white">
                    Submit Calibration Cert
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                        <th className="p-4">Equipment Tag</th>
                        <th className="p-4">Primary Facility</th>
                        <th className="p-4">Calibration Compliance</th>
                        <th className="p-4">Measurement Uncertainty</th>
                        <th className="p-4">NIST Traceability ID</th>
                        <th className="p-4">QR Secure Code Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {assets.map(asset => (
                        <tr key={asset.id} className="hover:bg-slate-900/20 transition-all">
                          <td className="p-4 font-mono font-bold text-blue-400">{asset.id}</td>
                          <td className="p-4 font-semibold">{asset.facility}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${asset.calibration === 'Valid' ? 'bg-green-500/10 text-green-400' : asset.calibration === 'Due Soon' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                              {asset.calibration}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-slate-300">{asset.uncertainty}</td>
                          <td className="p-4 font-mono text-xs text-slate-500">NIST-2026-TR-88219-{asset.id}</td>
                          <td className="p-4 text-xs font-mono text-slate-400 flex items-center gap-2">
                            <span className="text-lg">📱</span> QR Secure Encrypted ID
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODULE 7: ESG INTEGRATION FRAMEWORK */}
            {currentModule === 'esg' && (
              <div className="space-y-6">
                <div className={`rounded-3xl border p-6 transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h2 className="text-xl font-bold mb-2">Platform ESG Integration Metrics</h2>
                  <p className="text-xs text-slate-500 max-w-2xl">Visualizing direct social and ecological impacts driven through modern, cold-chain public health optimization systems.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Environmental */}
                  <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
                    <h3 className="font-bold text-emerald-400 text-lg">Environmental Stewardship</h3>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Solar Power Mix (Active Sites)</span>
                        <span className="font-bold">48.2%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: '48.2%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Carbon Offsetting Delta</span>
                        <span className="font-bold">128 tCO₂e Saved</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Vaccine Scrap Waste Avoidance Cost</span>
                        <span className="font-bold text-emerald-400">₦48.5M saved</span>
                      </div>
                    </div>
                  </div>

                  {/* Social */}
                  <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
                    <h3 className="font-bold text-blue-400 text-lg">Social Health Index</h3>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Immunization Deliveries Protected</span>
                        <span className="font-bold">98.2% Safe Yield</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: '98.2%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Rural Communities Reached</span>
                        <span className="font-bold">24.5M People</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Maternal/Child Health Target Metrics</span>
                        <span className="font-bold text-blue-400">Class-A Standard</span>
                      </div>
                    </div>
                  </div>

                  {/* Governance */}
                  <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
                    <h3 className="font-bold text-purple-400 text-lg">Governance & Audit</h3>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Calibration Compliance Rate</span>
                        <span className="font-bold">92% Compliance</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Secure Blockchain Event Logging</span>
                        <span className="font-bold">100% Immutable</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Regulatory Audit Status</span>
                        <span className="font-bold text-purple-400">Class-A Standard</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 8: EXECUTIVE ANALYTICS DASHBOARD */}
            {currentModule === 'executive' && (
              <div className="space-y-6">
                <div className={`rounded-3xl border p-6 transition-colors ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h2 className="text-xl font-bold mb-2">AI-Driven Predictive Diagnostics</h2>
                  <p className="text-xs text-slate-500">Forecasting hardware component failure rates using historical thermal decay metrics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {assets.map(asset => {
                    const decayRisk = (100 - asset.reliability).toFixed(1);
                    return (
                      <div key={asset.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-mono font-bold text-blue-400">{asset.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${asset.reliability > 90 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {asset.reliability}% Reliability
                          </span>
                        </div>
                        <p className="text-sm font-semibold truncate">{asset.facility}</p>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1 text-slate-400">
                            <span>Compressor Failure Risk</span>
                            <span className="font-bold">{decayRisk}%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full" style={{ width: `${decayRisk}%` }}></div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                          <span>AI Recommendation: {asset.reliability < 80 ? '⚠️ Trigger Preventive Service' : '✓ Standard SLA parameters'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MODULE 9 & 10: MOBILE FIELD ENGINEER MODULE & USER ROLES */}
            {currentModule === 'field' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold">Mobile Field Engineer Terminal</h2>
                      <p className="text-xs text-slate-400">Simulated smartphone diagnostic workflow tool.</p>
                    </div>
                    
                    {/* Offline mode toggle */}
                    <button 
                      onClick={() => setMobileOfflineMode(!mobileOfflineMode)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mobileOfflineMode ? 'bg-red-600 text-white' : 'bg-green-600/10 text-green-400 border border-green-500/20'}`}
                    >
                      {mobileOfflineMode ? '📴 Offline Mode Active' : '📶 Online Connected'}
                    </button>
                  </div>

                  {/* QR code lookup simulation */}
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="block text-xs font-bold mb-2">Simulated Secure QR Scanning Lens</label>
                      <div className="h-44 bg-slate-900/40 border border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center text-center p-4">
                        <span className="text-4xl mb-2">📷</span>
                        <p className="text-xs text-slate-400">Align QR Code to complete ISO Cert validation upload</p>
                        <select 
                          onChange={(e) => setScannedAssetTag(e.target.value)}
                          className="mt-3 text-xs bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-blue-400"
                        >
                          <option value="">Choose simulated Scan Asset</option>
                          {assets.map(a => <option key={a.id} value={a.id}>{a.id} - {a.facility}</option>)}
                        </select>
                      </div>
                    </div>

                    {scannedAssetTag && (
                      <div className="p-4 bg-slate-950 border border-blue-500/20 rounded-xl space-y-3">
                        <h4 className="font-bold text-sm text-blue-400">Asset Tag Verified: {scannedAssetTag}</h4>
                        
                        <div>
                          <label className="block text-xs font-bold mb-1 text-slate-400">Upload Measurement ISO/IEC 17025 PDF</label>
                          <input 
                            type="file" 
                            onChange={(e) => setUploadedCert(e.target.files[0] ? e.target.files[0].name : 'certificate.pdf')}
                            className="text-xs block w-full text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                          />
                        </div>

                        {uploadedCert && (
                          <p className="text-xs text-green-400">✓ Upload Ready: {uploadedCert}</p>
                        )}

                        <button 
                          onClick={() => {
                            setAssets(prev => prev.map(a => a.id === scannedAssetTag ? { ...a, calibration: 'Valid' } : a));
                            setScannedAssetTag('');
                            setUploadedCert(null);
                          }}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-500 font-bold text-xs rounded-lg text-white"
                        >
                          Push Calibration Update
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

    </div>
  );
}