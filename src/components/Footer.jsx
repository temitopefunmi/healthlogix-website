import React from "react";
import { Facebook, Globe2, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import BrandLogo from "./BrandLogo";

function Footer({ setActiveTab }) {
  const linkGroups = [
    {
      title: "Company",
      links: [
        { label: "About Us", tab: "about" },
        { label: "Our Team", tab: "about" },
        { label: "Careers", tab: "contact" },
        { label: "News & Updates", tab: "home" },
        { label: "Contact Us", tab: "contact" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Cold Chain Monitoring", tab: "cold-chain" },
        { label: "Calibration & Traceability", tab: "tracking" },
        { label: "Preventive Maintenance", tab: "cold-chain" },
        { label: "ESG & Sustainability", tab: "home" },
        { label: "Digital Healthcare", tab: "hospitals" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Documentation", tab: "home" },
        { label: "Help Center", tab: "contact" },
        { label: "FAQs", tab: "contact" },
        { label: "Training", tab: "contact" },
        { label: "System Status", tab: "tracking" },
      ],
    },
  ];

  return (
    <footer className="bg-[#020b18] text-slate-300 px-6 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.35fr_2fr_1.25fr] gap-10 pb-10">
          <div>
            <button className="mb-6 text-left" onClick={() => setActiveTab("home")} aria-label="Go to homepage">
              <BrandLogo variant="dark" />
            </button>
            <p className="text-slate-400 leading-relaxed max-w-sm mb-6">
              Advancing healthcare quality, calibration traceability, digital monitoring, ESG intelligence and sustainable healthcare infrastructure across Africa.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook, Youtube].map((Icon, index) => (
                <span key={index} className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                  <Icon size={16} />
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 lg:border-x lg:border-white/10 lg:px-10">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-white font-bold mb-5">{group.title}</h3>
                <ul className="space-y-3 text-sm">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <button onClick={() => setActiveTab(link.tab)} className="hover:text-emerald-400 transition-colors text-left">
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-white font-bold mb-5">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <p className="flex gap-3 leading-relaxed"><MapPin className="text-emerald-400 shrink-0" size={18} />17 Owah Street, Jabi, Abuja, FCT, Nigeria.</p>
              <p className="flex gap-3"><Phone className="text-emerald-400 shrink-0" size={18} />+234 906 000 0958</p>
              <p className="flex gap-3"><Mail className="text-emerald-400 shrink-0" size={18} />info@healthlogixassurance.com</p>
              <p className="flex gap-3"><Globe2 className="text-emerald-400 shrink-0" size={18} />www.healthlogixassurance.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate-400">
          <p>© 2024 Health Logix Assurance Limited. All Rights Reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-emerald-400">Privacy Policy</button>
            <span>|</span>
            <button className="hover:text-emerald-400">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
