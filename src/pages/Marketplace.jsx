import React from "react";
import { Store, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export default function Marketplace() {
  const items = [
    { category: 'Reagents & Consumables', vendor: 'GlobalBio Ltd', price: '₦450,000', stock: 'Verified' },
    { category: 'Calibration Services', vendor: 'StandardMetrics', price: '₦120,000', stock: 'Licensed' },
    { category: 'Cold-Chain Logistics', vendor: 'FrozenRoute', price: 'Varies', stock: 'Certified' },
    { category: 'Imaging Spares', vendor: 'MedRad Systems', price: '₦2,100,000', stock: 'Verified' },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-950 mb-2">Verified Marketplace</h2>
          <p className="text-slate-500">Only ISO-certified partners and pre-vetted stock.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Card key={i} className="hover:border-emerald-200 transition-colors shadow-sm">
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Store size={20} /></div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase">{item.stock}</span>
                </div>
                <h3 className="font-bold text-lg text-slate-800">{item.category}</h3>
                <p className="text-sm text-slate-500 mb-4">By {item.vendor}</p>
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="font-bold text-emerald-700">{item.price}</span>
                  <Button variant="outline" className="py-1 px-3 text-xs">View Listings</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}