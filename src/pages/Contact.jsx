import React from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";

export default function Contact() {
  const contactDetails = [
    {
      icon: <Mail size={22} />,
      label: "Email",
      value: "support@healthlogix.example",
      note: "For general support, partnerships, and marketplace questions.",
    },
    {
      icon: <Phone size={22} />,
      label: "Phone",
      value: "+234 800 555 0199",
      note: "Monday to Friday, 8:00 AM - 6:00 PM WAT.",
    },
    {
      icon: <MapPin size={22} />,
      label: "Office",
      value: "HealthLogix HQ, Victoria Island, Lagos, Nigeria",
      note: "Visits are available by appointment for institutional partners.",
    },
    {
      icon: <Clock size={22} />,
      label: "Response Time",
      value: "Within 1 business day",
      note: "Urgent logistics alerts are prioritized through institutional support channels.",
    },
  ];

  return (
    <section className="bg-slate-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div>
            <span className="inline-flex bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold mb-6">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 leading-tight">
              We are here to support your healthcare logistics needs.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Reach out to HealthLogix for help with procurement, hospital onboarding, cold-chain tracking, or institutional account support. Our team will route your request to the right specialist.
            </p>
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h2 className="font-bold text-slate-950 mb-3">Send us a message</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                For fastest service, include your organization name, location, contact person, and any tracking or order reference number related to your request.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {contactDetails.map((detail) => (
              <Card key={detail.label} className="bg-white border border-slate-100 shadow-sm">
                <CardContent className="p-7">
                  <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-5">
                    {detail.icon}
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">{detail.label}</h2>
                  <p className="text-lg font-bold text-slate-950 mb-3">{detail.value}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{detail.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
