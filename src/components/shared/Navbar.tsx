"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Heart, Moon, Sun, Menu, X, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { UserDropdown } from "@/components/shared/UserDropdown";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#gallery", label: "Gallery" },
];

const PRIVATE_LINKS = [
  { href: "/events/create", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/joined-events", label: "Joined Events" },
  { href: "/profile", label: "My Profile" },
];

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const closeMenu = () => setMobileOpen(false);

  // Track which home section is on screen so its menu link lights up
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    if (pathname !== "/") return;
    const els = ["how-it-works", "gallery"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        let best = "";
        let bestRatio = 0;
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            best = id;
            bestRatio = r;
          }
        });
        setActiveSection(best);
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: [0, 0.1, 0.3, 0.6, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  const section = pathname === "/" ? activeSection : "";
  const isActive = (href: string) => {
    if (href.startsWith("/#")) return section === href.slice(2);
    if (href === "/") return pathname === "/" && section === "";
    return pathname === href;
  };

  const handleLogout = () => {
    closeMenu();
    logout();
    toast.success("You have been logged out.");
    router.push("/");
  };

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-xl transition-all duration-200 ${
      isActive(path)
        ? "bg-[#e6f7f2] dark:bg-emerald-950/60 text-[#00897B] dark:text-emerald-400 font-bold"
        : "text-slate-600 dark:text-slate-300 hover:text-[#00897B] dark:hover:text-emerald-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
    }`;

  const themeButton = (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:text-[#00897B] dark:hover:text-emerald-400 transition"
      aria-label="Toggle theme"
    >
      <Sun className="w-4 h-4 hidden dark:block text-amber-400" />
      <Moon className="w-4 h-4 block dark:hidden" />
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#070d1e]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-linear-to-tr from-[#00796B] to-emerald-400 flex items-center justify-center shadow-sm loop-pulse">
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

          <nav className="hidden lg:flex items-center gap-2 text-sm font-semibold" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`${linkClass(l.href)} ${l.href.startsWith("/#") ? "hidden xl:inline-block" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {themeButton}
            {user ? (
              <>
                <UserDropdown />
                <button onClick={handleLogout} className="btn-outline btn-sm py-2.5">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/register" className="px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-[#00796B] dark:hover:text-white transition">
                  Sign Up
                </Link>
                <Link href="/login" className="btn-primary">
                  Login
                </Link>
              </>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            {themeButton}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d1e] px-4 pt-4 pb-6 space-y-4 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex flex-col gap-1 text-base font-bold">
            {[...NAV_LINKS, ...(user ? PRIVATE_LINKS : [])].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className={`p-3 rounded-xl transition ${
                  isActive(l.href)
                    ? "bg-[#e6f7f2] dark:bg-emerald-950/60 text-[#00897B] dark:text-emerald-400"
                    : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
            {user ? (
              <>
                <p className="px-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                  Signed in as {user.name || user.email}
                </p>
                <button onClick={handleLogout} className="btn-outline w-full py-3">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={closeMenu} className="btn-primary w-full py-3">
                  Login
                </Link>
                <Link href="/register" onClick={closeMenu} className="btn-outline w-full py-3">
                  Create an account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
