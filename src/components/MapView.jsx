// MapView.jsx
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import Nigeria GeoJSON
import nigeriaGeo from "../data/nigeria.json"; // <- make sure you saved the GeoJSON here

// 🎨 Custom Marker
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -10],
});

// 🚀 MapFocus for smooth flying
function MapFocus({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5, easeLinearity: 0.25 });
    }
  }, [center, zoom, map]);
  return null;
}

function MapView({ hospitals, center = [9.082, 8.6753], zoom = 6 }) {
  // Nigeria polygon style
  const nigeriaStyle = {
    fillcolor: "#1e5ebc",
    fillOpacity: 0.05,      // semi-transparent
    color: "#1e5ebc",      // border color
    weight: 0.5,             // border width
  };

  return (
    <div className="h-full w-full relative">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false}
        className="h-full w-full"
        zoomControl={false}
      >
        {/* Faded world map */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          opacity={0.8}
        />

        {/* Smooth fly */}
        <MapFocus center={center} zoom={zoom} />

        {/* Highlight Nigeria */}
        <GeoJSON data={nigeriaGeo} style={nigeriaStyle} />

        {/* Hospital markers */}
        {hospitals.map((h, i) => (
          h.lat && (
            <Marker key={i} position={[h.lat, h.lng]} icon={customIcon}>
              <Popup className="custom-popup">
                <div className="p-2">
                  <h4 className="font-black text-[#1e5ebc] text-sm mb-1">{h.name}</h4>
                  <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase">
                    <span>🛏️ {h.beds} Beds</span>
                    <span>🏥 ICU: {h.icu}</span>
                  </div>
                  <button className="mt-3 w-full bg-[#1e5ebc] text-white py-1 rounded text-[9px] font-black uppercase">
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;