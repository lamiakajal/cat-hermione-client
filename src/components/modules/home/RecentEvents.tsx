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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Community Calendar
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Recent Upcoming Drives
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Active campaigns scheduled for the coming weeks across Bangladesh.
          </p>
        </div>
        <Link
          href="/events"
          className="self-start sm:self-auto text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1.5 transition"
        >
          <span>View All Events</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default RecentEvents;
