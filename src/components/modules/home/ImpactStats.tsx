"use client";

import React, { useEffect, useRef, useState } from "react";
import { CalendarCheck, CalendarClock, Users, Layers } from "lucide-react";
import { api } from "@/lib/api";

interface Stats {
  totalEvents: number;
  upcomingEvents: number;
  volunteersJoined: number;
  causes: number;
}

// Counts up from 0 once the number has been fetched
const Counter: React.FC<{ value: number }> = ({ value }) => {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setShown(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{shown.toLocaleString("en-US")}</>;
};

export const ImpactStats: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ignore = false;
    api<{ data: Stats }>("/events/stats/summary")
      .then((res) => !ignore && setStats(res.data))
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, []);

  // Start the count-up only when the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = [
    { icon: CalendarCheck, label: "Events hosted", value: stats?.totalEvents ?? 0 },
    { icon: CalendarClock, label: "Upcoming events", value: stats?.upcomingEvents ?? 0 },
    { icon: Users, label: "Volunteers joined", value: stats?.volunteersJoined ?? 0 },
    { icon: Layers, label: "Cause areas", value: stats?.causes ?? 0 },
  ];

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#00796B] via-[#00695c] to-slate-950 dark:from-[#004d40] dark:via-[#071d18] dark:to-[#030712] p-8 sm:p-12 text-white shadow-2xl">
        <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-emerald-300/20 blur-3xl animate-live-glow-1 pointer-events-none" />

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center lg:text-left">
              <Icon className="w-6 h-6 text-emerald-300 mx-auto lg:mx-0 loop-pulse" />
              <div className="mt-3 text-4xl sm:text-5xl font-black tracking-tight tabular-nums">
                {visible ? <Counter value={value} /> : 0}
              </div>
              <div className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-100/80">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
