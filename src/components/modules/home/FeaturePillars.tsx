import React from "react";
import { ShieldCheck, MapPin, Users, CheckCircle } from "lucide-react";

export const FeaturePillars: React.FC = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Live ambient dynamic lighting loop */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-teal-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-live-glow-1" />

      {/* Section Header with standard size */}
      <div className="text-center max-w-3xl mx-auto space-y-2 mb-10 relative z-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#00897B] dark:text-[#34d399] inline-block transition-transform duration-300 hover:scale-105">
          WHY UNITYPULSE
        </span>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0f172a] dark:text-[#f8fafc]">
          Architecture for Transparent Social Good
        </h2>
        <p className="text-sm text-[#475569] dark:text-[#94a3b8]">
          Engineered to bridge compassionate individuals with verified on-ground
          social organizers across the country.
        </p>
      </div>

      {/* Feature Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        <div className="group p-6 rounded-3xl border border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#070d1e] shadow-sm hover:shadow-xl hover:border-[#00897B] dark:hover:border-emerald-400 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#e6f7f2] dark:bg-[rgba(6,78,59,0.4)] text-[#00897B] dark:text-[#34d399] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a] dark:text-[#f8fafc] group-hover:text-[#00897B] dark:group-hover:text-[#34d399] transition-colors duration-200">
              Verified Organizers
            </h3>
            <p className="text-xs text-[#475569] dark:text-[#94a3b8] leading-relaxed">
              Every civic initiative and winter drive is authenticated to
              guarantee real physical impact without intermediary overhead.
            </p>
          </div>
        </div>

        <div className="group p-6 rounded-3xl border border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#070d1e] shadow-sm hover:shadow-xl hover:border-[#00897B] dark:hover:border-emerald-400 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#e6f7f2] dark:bg-[rgba(6,78,59,0.4)] text-[#00897B] dark:text-[#34d399] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a] dark:text-[#f8fafc] group-hover:text-[#00897B] dark:group-hover:text-[#34d399] transition-colors duration-200">
              Local Grassroots Reach
            </h3>
            <p className="text-xs text-[#475569] dark:text-[#94a3b8] leading-relaxed">
              Filter campaigns happening in your specific thana, road, or union
              council for rapid weekend volunteer mobilization.
            </p>
          </div>
        </div>

        <div className="group p-6 rounded-3xl border border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#070d1e] shadow-sm hover:shadow-xl hover:border-amber-500 dark:hover:border-amber-400 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#fef3c7] dark:bg-[rgba(120,53,15,0.3)] text-[#d97706] dark:text-[#fbbf24] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a] dark:text-[#f8fafc] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200">
              Live RSVP Headcount
            </h3>
            <p className="text-xs text-[#475569] dark:text-[#94a3b8] leading-relaxed">
              Organizers track exact volunteer turnouts, gear requirements, and
              logistical supplies in real-time.
            </p>
          </div>
        </div>

        <div className="group p-6 rounded-3xl border border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#070d1e] shadow-sm hover:shadow-xl hover:border-[#00897B] dark:hover:border-emerald-400 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#e6f7f2] dark:bg-[rgba(6,78,59,0.4)] text-[#00897B] dark:text-[#34d399] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a] dark:text-[#f8fafc] group-hover:text-[#00897B] dark:group-hover:text-[#34d399] transition-colors duration-200">
              One-Click Protected RSVP
            </h3>
            <p className="text-xs text-[#475569] dark:text-[#94a3b8] leading-relaxed">
              Secure JWT-verified participation tracking lets you maintain a
              verifiable record of your community service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturePillars;
