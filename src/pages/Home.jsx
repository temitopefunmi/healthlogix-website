import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Gauge,
  Hospital,
  Leaf,
  MapPin,
  Microscope,
  Play,
  ShieldCheck,
  Snowflake,
  Sun,
  Wrench,
  Zap,
} from "lucide-react";
import { Button } from "../components/ui/Button";

const services = [
  {
    icon: <Snowflake size={34} />,
    title: "Cold Chain Monitoring",
    description: "Real-time temperature, humidity, power and cold-room monitoring across healthcare facilities, laboratories and vaccine storage systems.",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: <BadgeCheck size={34} />,
    title: "Calibration & Traceability",
    description: "ISO/IEC 17025-aligned calibration, equipment verification, uncertainty analysis and QR-code traceability for regulated assets.",
    color: "from-emerald-500 to-green-700",
  },
  {
    icon: <Leaf size={34} />,
    title: "ESG & Sustainability",
    description: "ESG dashboards, energy analytics, carbon learning, asset monitoring and sustainability intelligence for healthcare systems.",
    color: "from-amber-500 to-yellow-700",
  },
];

const stats = [
  { icon: <MapPin size={28} />, value: "774", label: "LGAs Coverage", color: "text-blue-400" },
  { icon: <Hospital size={28} />, value: "36+", label: "States + FCT", color: "text-blue-400" },
  { icon: <Zap size={28} />, value: "24/7", label: "Live Monitoring", color: "text-blue-400" },
  { icon: <ShieldCheck size={28} />, value: "ISO", label: "Compliance Driven", color: "text-amber-400" },
];

const trustPoints = [
  {
    title: "Nationwide Monitoring Infrastructure",
    description: "Designed for improving healthcare systems across all 36 states, FCT and 774 LGAs.",
  },
  {
    title: "ISO Compliance & Traceability",
    description: "Supporting calibration compliance, audit readiness and healthcare quality systems.",
  },
  {
    title: "ESG-Driven Healthcare Intelligence",
    description: "Combining healthcare assurance, sustainability analytics and digital infrastructure.",
  },
];

const impactMetrics = [
  { icon: <CircleDollarSign size={30} />, title: "Vaccine Waste Prevented", value: "₦48.5M", detail: "Estimated Value", tone: "text-emerald-300" },
  { icon: <Sun size={30} />, title: "Solar Sites Monitored", value: "6,234", detail: "Across Nigeria", tone: "text-emerald-200" },
  { icon: <BarChart3 size={30} />, title: "Calibration Compliance", value: "95.8%", detail: "National Average", tone: "text-cyan-200" },
  { icon: <Building2 size={30} />, title: "Healthcare Facilities", value: "8,492", detail: "Monitored Facilities", tone: "text-blue-200" },
];

export default function Home({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-[#020b18] text-white overflow-hidden">
      <HeroSection setActiveTab={setActiveTab} />
      <ServicesSection />
      <TrustSection />
      <CallToAction setActiveTab={setActiveTab} />
    </div>
  );
}

function NetworkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(35,111,186,0.35),transparent_30%),radial-gradient(circle_at_50%_16%,rgba(36,155,118,0.14),transparent_24%),linear-gradient(135deg,#030b18_0%,#06203b_48%,#031025_100%)]" />
      <div className="absolute right-[-8%] top-[18%] w-[48rem] h-[48rem] rounded-full border border-blue-400/10 shadow-[0_0_90px_rgba(59,130,246,0.18)]" />
      <div className="absolute right-[-3%] top-[28%] w-[34rem] h-[34rem] rounded-full border border-blue-300/10" />
      <div className="absolute left-[44%] top-8 h-80 w-80 opacity-30">
        <div className="absolute left-8 top-7 h-1.5 w-1.5 rounded-full bg-blue-300" />
        <div className="absolute left-28 top-24 h-1.5 w-1.5 rounded-full bg-blue-300" />
        <div className="absolute left-44 top-6 h-1.5 w-1.5 rounded-full bg-cyan-300" />
        <div className="absolute left-64 top-32 h-1.5 w-1.5 rounded-full bg-blue-300" />
        <div className="absolute left-24 top-48 h-1.5 w-1.5 rounded-full bg-blue-300" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320" fill="none">
          <path d="M40 36 112 96 176 32 264 136 120 196 40 36Z" stroke="rgba(125, 211, 252, 0.22)" />
          <path d="M112 96 120 196 176 32" stroke="rgba(125, 211, 252, 0.16)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
    </div>
  );
}

function HeroSection({ setActiveTab }) {
  return (
    <section className="relative min-h-[720px] pt-24 pb-16 px-6 flex items-center">
      <NetworkBackground />
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Transforming <span className="block bg-gradient-to-r from-cyan-500 via-emerald-400 to-lime-500 bg-clip-text text-transparent">Healthcare Assurance</span>
            Across Africa
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8">
            We deliver end-to-end solutions in cold chain monitoring, calibration traceability, ESG intelligence, preventive maintenance and digital healthcare infrastructure for a safer, healthier tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button onClick={() => setActiveTab("cold-chain")} className="bg-emerald-500 hover:bg-emerald-400 px-8 py-4 rounded-lg text-base flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/30">
              Explore Our Solutions <ArrowRight size={18} />
            </Button>
            <Button variant="outline" onClick={() => setActiveTab("tracking")} className="border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-lg text-base flex items-center justify-center gap-3">
              <Play size={18} /> Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-emerald-400 shadow-xl shadow-blue-950/30">
                  {stat.icon}
                </div>
                <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="relative px-6 py-16 border-y border-white/5 bg-[#031225]/95">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-emerald-400 text-sm font-black tracking-wide uppercase mb-3">Our Core Services</p>
          <h2 className="text-3xl md:text-4xl font-black">Solutions That Power Healthcare Excellence</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl border border-blue-200/15 bg-[#06162b]/80 p-8 shadow-2xl shadow-slate-950/20 hover:border-emerald-400/40 transition-colors">
              <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-7 shadow-lg`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-7">{service.description}</p>
              <button className="text-emerald-400 font-bold text-sm flex items-center gap-3 hover:text-emerald-300">
                Learn More <ArrowRight size={17} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="relative px-6 py-20 bg-[#020b18]">
      <NetworkBackground />
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[0.85fr_1fr] gap-12 items-center">
        <div>
          <p className="text-emerald-400 text-sm font-black tracking-wide uppercase mb-4">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-black leading-tight mb-8">
            Why Healthcare Organizations Trust <span className="text-emerald-400">Health Logix</span>
          </h2>
          <div className="space-y-7">
            {trustPoints.map((point) => (
              <div key={point.title} className="flex gap-5">
                <div className="h-12 w-12 rounded-full border-2 border-emerald-400/70 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 size={25} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{point.title}</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {impactMetrics.map((metric) => (
            <div key={metric.title} className="rounded-xl border border-blue-200/15 bg-[#07172c]/85 p-7 shadow-2xl shadow-slate-950/20">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-emerald-400">{metric.icon}</span>
                <h3 className="font-semibold text-lg">{metric.title}</h3>
              </div>
              <div className={`text-5xl font-black mb-3 ${metric.tone}`}>{metric.value}</div>
              <p className="text-slate-300">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction({ setActiveTab }) {
  return (
    <section className="px-6 pb-20 bg-[#020b18]">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-cyan-700 to-blue-800 shadow-2xl shadow-blue-950/40">
        <div className="grid lg:grid-cols-[260px_1fr]">
          <div className="hidden lg:block relative min-h-44 bg-emerald-400/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.35),transparent_18%),linear-gradient(135deg,rgba(2,44,34,0.15),rgba(2,6,23,0.55))]" />
            <Microscope className="absolute left-16 top-12 text-white/50" size={112} />
          </div>
          <div className="p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-8 justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-4">Ready to Modernize Healthcare Monitoring?</h2>
              <p className="text-emerald-50/90 max-w-2xl leading-relaxed">
                Deploy available healthcare assurance systems, cold-chain monitoring infrastructure, calibration traceability and ESG intelligence solutions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Button onClick={() => setActiveTab("contact")} className="bg-[#020b18] hover:bg-slate-950 px-7 py-4 rounded-lg">Schedule Consultation</Button>
              <Button variant="secondary" onClick={() => setActiveTab("login")} className="px-7 py-4 rounded-lg text-slate-950 hover:bg-white">Request Live Demo</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
