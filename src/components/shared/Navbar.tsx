"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Moon, Sun, Menu, X, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Helper function to check if current route is active
  const isActive = (path: string) => pathname === path;

  // Close mobile navigation menu on route click
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#070d1e]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2 sm:gap-2.5 shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-linear-to-tr from-[#00796B] to-emerald-400 flex items-center justify-center shadow-sm">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                UnityPulse
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#00897B] dark:text-emerald-400 mt-0.5">
                Community Impact
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Active State */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-semibold">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive("/")
                  ? "bg-[#e6f7f2] dark:bg-emerald-950/60 text-[#00897B] dark:text-emerald-400 font-bold shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#00897B] dark:hover:text-emerald-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
              }`}
            >
              Home
            </Link>

            <Link
              href="/events"
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive("/events")
                  ? "bg-[#e6f7f2] dark:bg-emerald-950/60 text-[#00897B] dark:text-emerald-400 font-bold shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#00897B] dark:hover:text-emerald-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
              }`}
            >
              Upcoming Events
            </Link>
          </nav>

          {/* Desktop Action Buttons & Theme Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:text-[#00897B] dark:hover:text-emerald-400 transition"
              aria-label="Toggle Theme"
            >
              <Sun className="w-4 h-4 hidden dark:block text-amber-400" />
              <Moon className="w-4 h-4 block dark:hidden text-slate-700" />
            </button>

            <Link
              href="/register"
              className="px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-[#00796B] dark:hover:text-white transition"
            >
              Sign Up
            </Link>

            <Link
              href="/login"
              className="px-5 py-2 rounded-xl bg-[#00796B] hover:bg-[#00695c] dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-sm font-bold shadow-xs hover:shadow-md transition active:scale-95"
            >
              Log In
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              <Sun className="w-4 h-4 hidden dark:block text-amber-400" />
              <Moon className="w-4 h-4 block dark:hidden text-slate-700" />
            </button>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 hover:text-[#00796B] dark:hover:text-emerald-400 transition active:scale-90"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer with Active States */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#070d1e]/98 backdrop-blur-xl px-4 pt-4 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1.5 text-base font-bold">
            <Link
              href="/"
              onClick={closeMenu}
              className={`p-3 rounded-xl transition ${
                isActive("/")
                  ? "bg-[#e6f7f2] dark:bg-emerald-950/60 text-[#00897B] dark:text-emerald-400 shadow-xs"
                  : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[#00897B] dark:hover:text-emerald-400"
              }`}
            >
              Home
            </Link>

            <Link
              href="/events"
              onClick={closeMenu}
              className={`p-3 rounded-xl transition ${
                isActive("/events")
                  ? "bg-[#e6f7f2] dark:bg-emerald-950/60 text-[#00897B] dark:text-emerald-400 shadow-xs"
                  : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[#00897B] dark:hover:text-emerald-400"
              }`}
            >
              Upcoming Events
            </Link>
          </nav>

          {/* Mobile Auth Buttons Stack */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={closeMenu}
              className="w-full py-3 rounded-xl bg-[#00796B] dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-sm text-center shadow-md flex items-center justify-center gap-2 active:scale-98 transition"
            >
              <span>Log In</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/register"
              onClick={closeMenu}
              className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 font-bold text-sm text-center hover:bg-slate-100 dark:hover:bg-slate-800/80 active:scale-98 transition"
            >
              Create an Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
