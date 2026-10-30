"use client";

import Link from "next/link";
import { Users, Heart, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">TogetherCare</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering local communities to organize humanitarian aid,
              environmental cleanups, and social welfare drives.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  href="/create-event"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Host an Event
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contact Desk
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" /> Mirpur 10,
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />{" "}
                support@togethercare.org
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" /> +880 1700-000000
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Connect With Us
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 TogetherCare. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with{" "}
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for
            community impact.
          </p>
        </div>
      </div>
    </footer>
  );
}
