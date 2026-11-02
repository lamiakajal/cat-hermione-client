"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Edit3, CheckCircle2, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { RemoteImage } from "@/components/ui/RemoteImage";

const MENU = [
  { href: "/events/create", label: "Create Event", icon: PlusCircle },
  { href: "/manage-events", label: "Manage Events", icon: Edit3 },
  { href: "/joined-events", label: "Joined Events", icon: CheckCircle2 },
  { href: "/profile", label: "My Profile", icon: UserIcon },
];

export const UserDropdown: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!user) return null;

  const displayName = user.name || user.email;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <div className="group relative">
        <button
          type="button"
          onClick={() => setIsOpen((p) => !p)}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label={`${displayName}, open account menu`}
          className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-[#00796B] text-white font-bold text-sm ring-2 ring-emerald-300/60 hover:ring-emerald-400 transition"
        >
          {user.photoURL ? (
            <RemoteImage src={user.photoURL} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            initial
          )}
        </button>

        {/* Display name on hover, as the brief asks */}
        {!isOpen && (
          <span
            role="tooltip"
            className="pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap rounded-lg bg-slate-900 dark:bg-slate-100 px-3 py-1.5 text-xs font-semibold text-white dark:text-slate-900 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition z-50 shadow-lg"
          >
            {displayName}
          </span>
        )}
      </div>

      {isOpen && (
        <div role="menu" className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-3 z-50">
          <div className="px-3 py-2">
            <p className="font-bold text-slate-900 dark:text-white truncate">{displayName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
          </div>
          <div className="my-2 border-t border-slate-100 dark:border-slate-800" />
          {MENU.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <Icon className="w-4.5 h-4.5 text-[#00796B] dark:text-emerald-400" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
