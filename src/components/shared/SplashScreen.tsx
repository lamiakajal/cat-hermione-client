"use client";

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const SEEN_KEY = "unitypulse_splash_seen";

// Welcome loader: spinning ring, percentage and a progress bar, then a fade out
export const SplashScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Freeze the page behind the loader so it cannot be scrolled (this is what
  // made the loader look like it was floating on phones)
  useEffect(() => {
    if (!visible) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const prevOverscroll = html.style.overscrollBehavior;
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    window.scrollTo(0, 0);
    return () => {
      html.style.overflow = prevOverflow;
      html.style.overscrollBehavior = prevOverscroll;
    };
  }, [visible]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // storage can be blocked, just show the splash
    }

    const started = Date.now();
    const minTime = seen ? 250 : 1400;
    let loaded = document.readyState === "complete";
    let done = false;

    // Climbs towards 90% while the page loads, then jumps to 100%
    const timer = window.setInterval(() => {
      setProgress((p) => {
        const target = loaded && Date.now() - started >= minTime ? 100 : 90;
        const next = p + Math.max(1, (target - p) * 0.12);
        return Math.min(target, Math.round(next));
      });
    }, 50);

    const check = window.setInterval(() => {
      if (done || !loaded || Date.now() - started < minTime) return;
      done = true;
      window.clearInterval(timer);
      window.clearInterval(check);
      setProgress(100);
      window.setTimeout(() => setFading(true), 250);
      window.setTimeout(() => setVisible(false), 750);
    }, 80);

    const onLoad = () => {
      loaded = true;
    };
    if (!loaded) window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.clearInterval(timer);
      window.clearInterval(check);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading UnityPulse"
      style={{ height: "100dvh", touchAction: "none" }}
      className={`fixed inset-x-0 top-0 z-100 flex items-center justify-center bg-white dark:bg-[#070d1e] transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6 px-6">
        <div className="relative h-28 w-28">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#d1fae5"
              strokeWidth="6"
            />
            <g className="loop-spin">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#00897b"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="70 207"
              />
            </g>
          </svg>
          <div className="absolute inset-4 rounded-full bg-linear-to-tr from-[#00796B] to-emerald-400 flex items-center justify-center text-white shadow-lg">
            <Heart className="h-9 w-9 fill-white" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Unity
            <span className="text-[#00897B] dark:text-emerald-400">Pulse</span>
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Loading {progress}%
          </p>
        </div>

        <div className="h-2 w-64 max-w-full overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950">
          <div
            className="h-full rounded-full bg-linear-to-r from-[#00796B] via-emerald-400 to-amber-300 transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
