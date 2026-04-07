import React from "react";
import { Globe, TrendingUp, Activity, ShieldCheck, Layers, BarChart3, Briefcase } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export default function Dashboard() {
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}><CardContent>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-slate-50 rounded-xl">{stat.icon}</div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.trend}</span>
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-slate-800">{stat.label}</div>
          </CardContent></Card>
        ))}
      </div>
      {/* ... Activity Feed and Revenue Composition logic from original App.jsx ... */}
    </section>
  );
}