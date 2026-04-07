import React, { useState, useEffect } from "react";
import { Truck, MapPin, Clock, ShieldCheck, Activity } from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";

export default function LogisticsTracking() {
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
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-8 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">LIVE SHIPMENT</span>
                <h3 className="text-2xl font-bold mt-2 text-slate-800">{trackingData.id}</h3>
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
                    <div className={`text-xs font-semibold ${step.done ? 'text-slate-800' : 'text-slate-400'}`}>{step.stage}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}