import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EventItem } from "@/types/event";
import { EventCard } from "@/components/shared/EventCard";

interface RecentEventsProps {
  events: EventItem[];
}

export const RecentEvents: React.FC<RecentEventsProps> = ({ events }) => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-500/5 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none animate-live-glow-1" />

      {/* Header with standard size */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 relative z-10">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#00897B] dark:text-[#34d399] inline-block transition-transform duration-300 hover:scale-105">
            COMMUNITY CALENDAR
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0f172a] dark:text-[#f8fafc] mt-1">
            Recent Upcoming Drives
          </h2>
          <p className="text-sm text-[#475569] dark:text-[#94a3b8] mt-1">
            Active campaigns scheduled for the coming weeks across Bangladesh.
          </p>
        </div>
        <Link
          href="/events"
          className="group self-start sm:self-auto text-sm font-bold flex items-center gap-1.5 transition text-[#00897B] dark:text-[#34d399] hover:underline"
        >
          <span>View All Events</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Responsive Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default RecentEvents;
