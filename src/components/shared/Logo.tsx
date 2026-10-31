import React from "react";

export const Logo: React.FC = () => (
  <div className="flex items-center gap-2 select-none">
    <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
    <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
      Unity<span className="text-emerald-600">Pulse</span>
    </span>
  </div>
);

export default Logo;
