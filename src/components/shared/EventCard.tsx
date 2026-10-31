"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { EventItem } from "@/types/event";

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between group">
      <div>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-400 backdrop-blur-md shadow-sm z-10">
            {event.category}
          </div>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{event.date}</span>
          </div>

          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
            {event.title}
          </h3>

          <div className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed pt-1">
            {event.description}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-3 flex items-center justify-between gap-3">
        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-emerald-500" />
          <span>{event.attendeesCount} enrolled</span>
        </div>

        <Link
          href={`/events/${event.id}`}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
        >
          <span>View Event</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
