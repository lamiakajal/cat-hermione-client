import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Circle Icon Badge with Heart */}
      <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-sm transition transform group-hover:scale-105">
        <Heart className="w-5 h-5 fill-white text-white" />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-none">
          UnityPulse
        </span>
        <span className="text-[9px] font-bold tracking-widest text-emerald-600 uppercase mt-0.5">
          Community Impact Network
        </span>
      </div>
    </Link>
  );
};

export default Logo;
