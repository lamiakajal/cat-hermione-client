import React from "react";
import { UserPlus, Search, HandHeart, ListChecks } from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    title: "Create your account",
    text: "Sign up with email or GitHub in under a minute. No paperwork, no fees.",
  },
  {
    icon: Search,
    title: "Find or host an event",
    text: "Browse drives near you, or publish your own with a date, place and cover photo.",
  },
  {
    icon: HandHeart,
    title: "Join and show up",
    text: "Tap Join Event on any upcoming drive and your spot is saved instantly.",
  },
  {
    icon: ListChecks,
    title: "Track your impact",
    text: "Every event you join or organise is listed in one place, sorted by date.",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#00897B] dark:text-[#34d399]">
          How it works
        </span>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
          From sign-up to service in four steps
        </h2>
      </div>

      <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {/* Connector line, desktop only */}
        <div className="hidden lg:block absolute top-11 left-[12%] right-[12%] h-px bg-linear-to-r from-transparent via-[#00897B]/40 to-transparent" />

        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <li
            key={title}
            className="relative h-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d1e] p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative w-12 h-12 rounded-2xl loop-float bg-[#e6f7f2] dark:bg-emerald-950/60 text-[#00796B] dark:text-emerald-400 flex items-center justify-center">
              <Icon className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#00796B] text-white text-xs font-black flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-5 font-bold text-lg text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default HowItWorks;
