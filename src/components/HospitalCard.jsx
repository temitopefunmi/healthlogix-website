import React from "react";
import { BedDouble, Activity, Pill, Beaker } from "lucide-react";

const HospitalCard = ({ hospital }) => {
  if (!hospital) return null;
  const { name, beds, icu, lab, drugs, type, img } = hospital;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center p-3 gap-5 hover:shadow-lg transition-all group">
      
      {/* 1. Thumbnail */}
      <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
        <img 
          src={img || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=60&w=300"} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* 2. Details */}
      <div className="flex-grow space-y-2">
        <div>
          <h3 className="text-emerald-700 font-black text-lg leading-tight">{name}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {hospital.lga}, {hospital.state}
          </p>
        </div>

        {/* Resource Icons Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
            <BedDouble size={14} className="text-emerald-500" />
            <span>Beds: <span className="text-slate-900">{beds} available</span></span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
            <Activity size={14} className="text-emerald-600" />
            <span>ICU: <span className="text-slate-900">{icu} available</span></span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
            <Pill size={14} className="text-emerald-500" />
            <span>
              Pharmacy:{" "}
              <span className="text-emerald-700 font-black tracking-tighter">
                {drugs && drugs.length > 0 ? "AVAILABLE" : "N/A"}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
            <Beaker size={14} className="text-emerald-500" />
                <span>
                Lab:{" "}
                <span className="text-emerald-700 font-black tracking-tighter">
                  {lab ? "AVAILABLE" : "N/A"}
                </span>
              </span>
          </div>
        </div>
      </div>

      {/* 3. Price & Action */}
      <div className="flex flex-col items-end gap-2 border-l border-slate-100 pl-6 pr-2">
        <div className="text-lg font-black text-emerald-700 tracking-tighter">
          ₦10,000
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-bold text-xs shadow-md transition-all whitespace-nowrap active:scale-95">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default HospitalCard;