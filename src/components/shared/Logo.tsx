"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Heart } from "lucide-react";

// Safe subscriber to prevent hydration mismatch
const emptySubscribe = () => () => {};
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
};

export const Logo: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Link href="/" className="flex items-center gap-2.5 group select-none">
      {/* Brand Icon Container */}
      <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
        <Heart className="w-5 h-5 text-white fill-white" />
      </div>

      {/* Brand Typography with Guaranteed Dynamic Contrast */}
      <div className="flex flex-col">
        <span
          className="text-xl font-black tracking-tight leading-none"
          style={{ color: isDark ? "#ffffff" : "#0f172a" }}
        >
          Unity
          <span style={{ color: isDark ? "#34d399" : "#00897B" }}>Pulse</span>
        </span>
        <span
          className="text-[9px] font-bold tracking-widest uppercase mt-1"
          style={{ color: isDark ? "#34d399" : "#00796B" }}
        >
          Community Impact Network
        </span>
      </div>
    </Link>
  );
};

export default Logo;
