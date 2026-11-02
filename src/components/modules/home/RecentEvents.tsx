"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarX } from "lucide-react";
import { api } from "@/lib/api";
import { EventItem, EventsResponse } from "@/types/event";
import { EventCard, EventCardSkeleton } from "@/components/shared/EventCard";

export const RecentEvents: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let ignore = false;

    // The API sorts upcoming events by date, so limit=6 gives the next six
    api<EventsResponse>("/events?limit=6")
      .then((res) => !ignore && setEvents(res.data))
      .catch(() => !ignore && setFailed(true))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-500/5 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none animate-live-glow-1" />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 relative z-10">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#00897B] dark:text-[#34d399]">
            Community calendar
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
            Recent Upcoming Events
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Campaigns scheduled for the coming weeks across Bangladesh.
          </p>
        </div>
        <Link
          href="/events"
          className="group self-start sm:self-auto text-sm font-bold flex items-center gap-1.5 text-[#00897B] dark:text-[#34d399] hover:underline"
        >
          View all events
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : failed || events.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <CalendarX className="w-10 h-10 mx-auto text-slate-400" />
            <p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">
              {failed ? "Events could not be loaded right now." : "No upcoming events yet."}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {failed ? "Please refresh in a moment." : "Be the first to host one."}
            </p>
            {!failed && (
              <Link href="/events/create" className="btn-primary mt-5">
                Create an event
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentEvents;
