import React, { useState, useEffect } from "react";
import nigeriaData from "../data/nigeriaData";
import HospitalCard from "../components/HospitalCard";
import MapView from "../components/MapView";

export default function Hospitals() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [filters, setFilters] = useState({ beds: false, icu: false, lab: false, drugs: false });
  const [hospitals, setHospitals] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [hospitalTypes, setHospitalTypes] = useState([]);

  // Flatten nigeriaData into a hospital array
  const allHospitals = Object.keys(nigeriaData).flatMap(state =>
    Object.keys(nigeriaData[state]).flatMap(lga =>
      nigeriaData[state][lga].map(h => ({ ...h, state, lga }))
    )
  );

  // Build hospital types for dropdown
  useEffect(() => {
    const types = Array.from(new Set(allHospitals.map(h => h.type)));
    setHospitalTypes(types);
  }, []);

  // Update LGA list whenever state changes
  useEffect(() => {
    if (selectedState && nigeriaData[selectedState]) {
      setLgas(Object.keys(nigeriaData[selectedState]));
    } else {
      setLgas([]);
    }
    setSelectedLga(""); // reset LGA on state change
  }, [selectedState]);

  // Apply filters
  useEffect(() => {
    let filtered = allHospitals.filter(h => {
      if (selectedState && h.state !== selectedState) return false;
      if (selectedLga && h.lga !== selectedLga) return false;
      if (selectedType && h.type !== selectedType) return false;
      if (filters.beds && h.beds <= 0) return false;
      if (filters.icu && h.icu <= 0) return false;
      if (filters.lab && !h.lab) return false;
      if (filters.drugs && !h.drugs?.length) return false;
      return true;
    });
    setHospitals(filtered);
  }, [selectedState, selectedLga, selectedType, filters]);

  return (
    <div className="relative min-h-screen">
      {/* FADED WORLD MAP BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <MapView hospitals={hospitals} center={[10, -1.5]} zoom={5.95} opacity={0.35} />
      </div>

      {/* MAIN PAGE CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 p-6 lg:p-10 max-w-[1550px] mx-auto">

        {/* LEFT: Filters */}
        <aside className="w-full lg:w-1/5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg">
            <h2 className="text-emerald-800 font-black text-[10px] uppercase tracking-widest mb-4">Filters</h2>

            {/* Resource Filters */}
            <div className="space-y-3 mb-4">
              {[
                { key: 'beds', label: 'Beds Available' },
                { key: 'icu', label: 'ICU Available' },
                { key: 'lab', label: 'Laboratory Available' },
                { key: 'pharmacy', label: 'Pharmacy Available' }
              ].map(f => (
                <label key={f.key} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded accent-emerald-600"
                    onChange={() => setFilters(prev => ({ ...prev, [f.key]: !prev[f.key] }))}
                    checked={filters[f.key]}
                  />
                  <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-600">
                    {f.label}
                  </span>
                </label>
              ))}
            </div>

            {/* State Filter */}
            <div className="mb-4">
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">State</label>
              <select
                className="w-full text-sm border border-slate-200 rounded-lg p-2"
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
              >
                <option value="">All States</option>
                {Object.keys(nigeriaData).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* LGA Filter */}
            <div className="mb-4">
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">LGA</label>
              <select
                className="w-full text-sm border border-slate-200 rounded-lg p-2"
                value={selectedLga}
                onChange={e => setSelectedLga(e.target.value)}
                disabled={!lgas.length}
              >
                <option value="">All LGAs</option>
                {lgas.map(lga => <option key={lga} value={lga}>{lga}</option>)}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Hospital Type</label>
              <select
                className="w-full text-sm border border-slate-200 rounded-lg p-2"
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                {hospitalTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>
        </aside>

        {/* Hospital List */}
        <section className="w-full lg:w-2/5 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-emerald-800 font-bold text-lg">Hospital Registry</h2>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">
              {hospitals.length} Facilities
            </span>
          </div>
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {hospitals.map((h, i) => <HospitalCard key={i} hospital={h} />)}
          </div>
        </section>

      </div>
    </div>
  );
}