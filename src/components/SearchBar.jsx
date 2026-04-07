import React from "react";

export default function SearchBar({
  states = [],
  lgas = [],
  onStateChange = () => {},
  onLgaChange = () => {},
  onTypeChange = () => {},
}) {
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full">
      {/* State Dropdown */}
      <select
        className="flex-1 p-3 border border-slate-300 rounded-lg text-sm font-semibold text-slate-600 outline-none focus:border-[#1e5ebc]"
        onChange={(e) => onStateChange(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Select State</option>
        {states.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* LGA Dropdown */}
      <select
        className="flex-1 p-3 border border-slate-300 rounded-lg text-sm font-semibold text-slate-600 outline-none focus:border-[#1e5ebc] disabled:bg-slate-50"
        onChange={(e) => onLgaChange(e.target.value)}
        disabled={!lgas.length}
        defaultValue=""
      >
        <option value="" disabled>Select LGA</option>
        {lgas.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>

      {/* Hospital Type Dropdown */}
      <select
        className="flex-1 p-3 border border-slate-300 rounded-lg text-sm font-semibold text-slate-600 outline-none"
        onChange={(e) => onTypeChange(e.target.value)}
        defaultValue="All Types"
      >
        <option value="All Types">All Types</option>
        <option value="Federal">Federal</option>
        <option value="Teaching">Teaching</option>
        <option value="State">State</option>
      </select>
    </div>
  );
}