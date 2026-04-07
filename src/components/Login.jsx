import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

export default function LoginSection({ setRole }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setRole(email.includes("vendor") ? "Vendor" : "Hospital");
      setLoading(false);
    }, 800);
  };

  return (
    <section className="py-24 px-6 max-w-lg mx-auto">
      <Card className="p-10 shadow-2xl border-none">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
            <LogIn className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Institutional Access</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Email</label>
            <input 
              required 
              type="email" 
              placeholder="procurement@hospital.com" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Password</label>
            <input required type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
          </div>
          <Button disabled={loading} className="w-full py-4 text-lg font-bold">
            {loading ? "Verifying..." : "Access Dashboard"}
          </Button>
        </form>
      </Card>
    </section>
  );
}