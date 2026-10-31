import React from "react";
import { ShieldCheck, MapPin, Users, CheckCircle } from "lucide-react";

export const FeaturePillars: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Why UnityPulse
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Architecture for Transparent Social Good
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Engineered to bridge compassionate individuals with verified on-ground
          social organizers across the country.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Verified Organizers
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every civic initiative and winter drive is authenticated to
              guarantee real physical impact without intermediary overhead.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Local Grassroots Reach
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Filter campaigns happening in your specific thana, road, or union
              council for rapid weekend volunteer mobilization.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Live RSVP Headcount
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Organizers track exact volunteer turnouts, gear requirements, and
              logistical supplies in real-time.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              One-Click Protected RSVP
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
