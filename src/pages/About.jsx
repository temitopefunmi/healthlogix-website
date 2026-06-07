import React from "react";
import { Activity, ShieldCheck, Truck, Users } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";

export default function About() {
  const values = [
    {
      icon: <ShieldCheck size={24} />,
      title: "Verified Quality",
      description: "We help healthcare teams source from trusted suppliers with documentation and compliance built into every workflow.",
    },
    {
      icon: <Truck size={24} />,
      title: "Reliable Logistics",
      description: "Our platform supports traceable delivery, cold-chain visibility, and status updates from dispatch to final receipt.",
    },
    {
      icon: <Users size={24} />,
      title: "Connected Care Network",
      description: "HealthLogix brings hospitals, vendors, and logistics partners into one coordinated healthcare infrastructure exchange.",
    },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold mb-6">
            <Activity size={16} /> About HealthLogix
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 leading-tight">
            Building dependable digital infrastructure for healthcare logistics.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            HealthLogix is a healthcare logistics and procurement platform designed to make medical supply chains more transparent, efficient, and accountable. We connect healthcare institutions with verified marketplace partners, inventory intelligence, and logistics visibility so essential products can move safely where they are needed most.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value) => (
            <Card key={value.title} className="border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-950 mb-3">{value.title}</h2>
                <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our mission</h2>
            <p className="text-slate-300 leading-relaxed">
              To simplify healthcare procurement and delivery through trusted data, verified partners, and logistics tools that protect product integrity from order to outcome.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="text-3xl font-black text-emerald-400">24/7</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 mt-2">Tracking Visibility</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="text-3xl font-black text-emerald-400">100%</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 mt-2">Compliance Focused</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
