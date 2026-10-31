import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, PlusCircle } from "lucide-react";

export const HeroBanner: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center py-20 sm:py-28 overflow-hidden rounded-b-3xl shadow-xl"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80')`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Civic Action & Social Welfare Hub</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
          Empowering Communities,{" "}
          <span className="bg-linear-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
            One Cause at a Time.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Create, discover, and join verifiable community drives across
          Bangladesh—from winter clothes distribution in Mirpur to emergency
          medical and afforestation campaigns.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/events"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Explore Upcoming Drives</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/events/create"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl border-2 border-slate-400/40 hover:border-emerald-400 font-bold text-sm text-slate-200 hover:text-white transition flex items-center justify-center gap-2 hover:bg-emerald-500/10"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Host a Community Drive</span>
          </Link>
        </div>

        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              14,200+
            </div>
            <div className="text-xs font-semibold text-slate-300 mt-1">
              Verified Volunteers
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-black text-teal-400">
              385+
            </div>
            <div className="text-xs font-semibold text-slate-300 mt-1">
              Completed Drives
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              28 Districts
            </div>
            <div className="text-xs font-semibold text-slate-300 mt-1">
              Nationwide Coverage
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              100% Free
            </div>
            <div className="text-xs font-semibold text-slate-300 mt-1">
              Direct Social Action
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
