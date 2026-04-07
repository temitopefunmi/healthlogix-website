import React from "react";

function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prev => ({ ...prev, [name]: checked }));
  };

  const options = [
    { id: "beds", label: "Available Beds", name: "beds" },
    { id: "icu", label: "ICU Available", name: "icu" },
    { id: "lab", label: "Laboratory Available", name: "lab" },
    { id: "pharmacy", label: "Pharmacy Available", name: "pharmacy" },
    { id: "private", label: "Private Hospitals", name: "private" },
  ];

  return (
    <aside className="col-span-12 lg:col-span-2 sticky top-28">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest px-1">
          Filters
        </h2>

        {options.map((opt) => (
          <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name={opt.name}
              checked={filters[opt.name] || false}
              onChange={handleChange}
              className="w-5 h-5 rounded border-slate-300 text-[#1e5ebc] focus:ring-[#1e5ebc] cursor-pointer transition-all"
            />
            <span className="text-sm font-semibold text-slate-600 group-hover:text-[#1e5ebc] transition-colors">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </aside>
  );
}

export default Filters;