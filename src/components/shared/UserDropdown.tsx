"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Calendar, CheckCircle2, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const UserDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const userAvatar =
    user.photoURL ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile avatar button with hover tooltip */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center rounded-full border-2 border-emerald-500/80 p-0.5 focus:outline-hidden hover:scale-105 transition"
          aria-label="User Profile Menu"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
            <Image
              src={userAvatar}
              alt={user.name || "User Avatar"}
              fill
              className="object-cover"
            />
          </div>
        </button>

        {/* Display name tooltip on hover */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 hidden group-hover:block px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-md whitespace-nowrap shadow-lg z-50 pointer-events-none">
          {user.name}
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#070d1e]/95 backdrop-blur-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-1">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {user.name}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {user.email}
            </p>
          </div>

          <div className="space-y-0.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Link
              href="/events/create"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[#00796B] dark:hover:text-emerald-400 transition"
            >
              <PlusCircle className="w-4 h-4 text-emerald-500" />
              <span>Create Event</span>
            </Link>

            <Link
              href="/manage-events"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[#00796B] dark:hover:text-emerald-400 transition"
            >
              <Calendar className="w-4 h-4 text-teal-500" />
              <span>Manage Events</span>
            </Link>

            <Link
              href="/joined-events"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[#00796B] dark:hover:text-emerald-400 transition"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <span>Joined Events</span>
            </Link>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800/80 mt-1.5 pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
