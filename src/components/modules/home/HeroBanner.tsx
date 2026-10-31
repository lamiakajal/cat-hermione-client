"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, PlusCircle } from "lucide-react";

// Targeted typewriter phrases for dynamic civic mission
const TYPEWRITER_PHRASES = [
  "One Cause at a Time.",
  "One Life at a Time.",
  "One Heart at a Time.",
  "One Drive at a Time.",
];

export const HeroBanner: React.FC = () => {
  // Safe typewriter loop avoiding synchronous setState inside useEffect
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPEWRITER_PHRASES[phraseIndex];
    const updateDelay = isDeleting
      ? 50
      : displayText === currentWord
        ? 2000
        : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
        }
      }
    }, updateDelay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section
      className="relative bg-cover bg-center py-14 sm:py-24 lg:py-28 overflow-hidden rounded-b-3xl shadow-xl transition-all"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.98)), url('https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80')`,
      }}
    >
      {/* Hardware-accelerated CSS animations for 60fps performance */}
      <style jsx global>{`
        @keyframes gentleFloat {
          0%,
          100% {
            transform: translate3d(0, 0px, 0);
          }
          50% {
            transform: translate3d(0, -6px, 0);
          }
        }
        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.08);
          }
        }
        @keyframes blinkCursor {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-float-stagger {
          animation: gentleFloat 4.6s ease-in-out infinite;
          will-change: transform;
        }
        .type-cursor {
          animation: blinkCursor 0.85s step-start infinite;
        }
      `}</style>

      {/* Subtle Ambient Radial Glow for depth */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-120 h-72 sm:h-120 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"
        style={{ animation: "pulseGlow 6s ease-in-out infinite" }}
      />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 text-center text-white relative z-10 space-y-5 sm:space-y-6">
        {/* Civic Tag Pill with mobile-safe padding */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 text-[10px] sm:text-xs font-bold tracking-wide uppercase shadow-sm">
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-400 animate-pulse shrink-0" />
          <span>Civic Action & Social Welfare Hub</span>
        </div>

        {/* Dynamic Heading with canonical Tailwind v4 height classes */}
        <div className="min-h-26.25 sm:min-h-32.5 lg:min-h-36.25 flex flex-col justify-center items-center">
          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
            <span>Empowering Communities,</span>
            <br />
            <span className="bg-linear-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent inline-flex items-center mt-1">
              {displayText}
              <span className="type-cursor text-teal-400 font-normal ml-0.5 select-none">
                |
              </span>
            </span>
          </h1>
        </div>

        {/* Subtitle description */}
        <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed px-1 sm:px-2">
          Create, discover, and join verifiable community drives across
          Bangladesh—from winter clothes distribution in Mirpur to emergency
          medical and afforestation campaigns.
        </p>

        {/* Action Buttons: Full width fluid stack on mobile, inline-row on tablet & desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full max-w-xs sm:max-w-none mx-auto">
          <Link
            href="/events"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 group"
          >
            <span>Explore Upcoming Drives</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/create-event"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl border-2 border-slate-500/40 hover:border-emerald-400 font-bold text-xs sm:text-sm text-slate-200 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 hover:bg-emerald-500/10 hover:-translate-y-0.5 active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400 group-hover:rotate-90 transition-transform duration-300" />
            <span>Host a Community Drive</span>
          </Link>
        </div>

        {/* 4 Stat Cards: Responsive 2-column grid on mobile, 4-column on desktop */}
        <div className="pt-6 sm:pt-10 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div
            className="animate-float-stagger p-3.5 sm:p-5 rounded-2xl border border-white/10 hover:border-emerald-400/50 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 text-center cursor-default group"
            style={{ animationDelay: "0s" }}
          >
            <div className="text-xl sm:text-3xl font-black text-emerald-400 group-hover:scale-105 transition-transform">
              14,200+
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-300 mt-1">
              Verified Volunteers
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="animate-float-stagger p-3.5 sm:p-5 rounded-2xl border border-white/10 hover:border-teal-400/50 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 text-center cursor-default group"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="text-xl sm:text-3xl font-black text-teal-400 group-hover:scale-105 transition-transform">
              385+
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-300 mt-1">
              Completed Drives
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="animate-float-stagger p-3.5 sm:p-5 rounded-2xl border border-white/10 hover:border-amber-400/50 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 text-center cursor-default group"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="text-xl sm:text-3xl font-black text-amber-400 group-hover:scale-105 transition-transform">
              28 Districts
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-300 mt-1">
              Nationwide Reach
            </div>
          </div>

          {/* Card 4 */}
          <div
            className="animate-float-stagger p-3.5 sm:p-5 rounded-2xl border border-white/10 hover:border-emerald-400/50 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 text-center cursor-default group"
            style={{ animationDelay: "1.8s" }}
          >
            <div className="text-xl sm:text-3xl font-black text-emerald-300 group-hover:scale-105 transition-transform">
              100% Free
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-300 mt-1">
              Direct Social Action
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
