import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#070d1e] border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              {/* Brand icon container using Tailwind v4 canonical linear class */}
              <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-[#00796B] to-emerald-400 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <Heart className="w-5 h-5 text-white fill-white transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-200 group-hover:text-[#00796B] dark:group-hover:text-emerald-400">
                UnityPulse
              </span>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A localized civic action network mobilizing Bangladeshi youth for
              ecological protection, winter relief, free clinics, and grassroots
              empowerment.
            </p>

            {/* Social Links with Smooth Hover Lift and Shadow Animations */}
            <div className="flex items-center gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-[#00796B] dark:hover:text-emerald-400 hover:border-[#00796B]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                aria-label="X (formerly Twitter)"
              >
                <svg
                  className="w-4 h-4 fill-current transition-transform duration-300 hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-[#00796B] dark:hover:text-emerald-400 hover:border-[#00796B]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 fill-current transition-transform duration-300 hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-[#00796B] dark:hover:text-emerald-400 hover:border-[#00796B]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                aria-label="GitHub"
              >
                <svg
                  className="w-4 h-4 fill-current transition-transform duration-300 hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Portals with Animated Link Shift */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
              QUICK PORTALS
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="inline-block text-slate-600 dark:text-slate-400 hover:text-[#00796B] dark:hover:text-emerald-400 hover:translate-x-1 transition-all duration-200"
                >
                  Home Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="inline-block text-slate-600 dark:text-slate-400 hover:text-[#00796B] dark:hover:text-emerald-400 hover:translate-x-1 transition-all duration-200"
                >
                  Upcoming Civic Drives
                </Link>
              </li>
              <li>
                <Link
                  href="/create-event"
                  className="inline-block text-slate-600 dark:text-slate-400 hover:text-[#00796B] dark:hover:text-emerald-400 hover:translate-x-1 transition-all duration-200"
                >
                  Host a Community Drive
                </Link>
              </li>
              <li>
                <Link
                  href="/manage-events"
                  className="inline-block text-slate-600 dark:text-slate-400 hover:text-[#00796B] dark:hover:text-emerald-400 hover:translate-x-1 transition-all duration-200"
                >
                  Manage My Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Focus Pillars with Glowing Pulsing Dots */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
              FOCUS PILLARS
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="group flex items-start gap-2.5 text-slate-600 dark:text-slate-400 transition-colors duration-200 hover:text-slate-900 dark:hover:text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0 transition-transform duration-300 group-hover:scale-125" />
                <span>Winter Clothes & Warmth Aid</span>
              </li>
              <li className="group flex items-start gap-2.5 text-slate-600 dark:text-slate-400 transition-colors duration-200 hover:text-slate-900 dark:hover:text-white">
                <span className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 shrink-0 transition-transform duration-300 group-hover:scale-125" />
                <span>Buriganga & River Cleanups</span>
              </li>
              <li className="group flex items-start gap-2.5 text-slate-600 dark:text-slate-400 transition-colors duration-200 hover:text-slate-900 dark:hover:text-white">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 transition-transform duration-300 group-hover:scale-125" />
                <span>Tree Plantation Across Divisions</span>
              </li>
              <li className="group flex items-start gap-2.5 text-slate-600 dark:text-slate-400 transition-colors duration-200 hover:text-slate-900 dark:hover:text-white">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0 transition-transform duration-300 group-hover:scale-125" />
                <span>Free Slum Pediatric Checkups</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Disaster Helpline Card with Interactive Hover Lift */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
              DISASTER HELPLINE
            </h4>
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2 hover:border-[#00796B]/50 dark:hover:border-emerald-500/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="text-xs font-extrabold uppercase tracking-wide text-[#00796B] dark:text-emerald-400 block">
                DHAKA COORDINATION DESK
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                +880 1712-000000 / 999 Ready
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Banani 11, Dhaka 1213, Bangladesh
              </p>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-500 leading-relaxed">
              Encrypted via JWT Token Authorization • MongoDB Cloud Verified
              Data Integrity
            </p>
          </div>
        </div>

        {/* Bottom Bar with Responsive Links */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © 2026 UnityPulse Bangladesh. Built for community service and social
            development.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="#"
              className="hover:text-[#00796B] dark:hover:text-white hover:underline transition"
            >
              Privacy Guidelines
            </Link>
            <Link
              href="#"
              className="hover:text-[#00796B] dark:hover:text-white hover:underline transition"
            >
              Volunteer Code of Conduct
            </Link>
            <Link
              href="#"
              className="hover:text-[#00796B] dark:hover:text-white hover:underline transition"
            >
              Vercel Deployment SLA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
