import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowUpRight } from "lucide-react";
import { EventItem } from "@/types/event";
import { formatDate } from "@/lib/events";
import { RemoteImage } from "@/components/ui/RemoteImage";

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <article className="group h-full flex flex-col rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d1e] shadow-sm hover:shadow-xl hover:border-[#00897B]/40 dark:hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all duration-300 ease-out">
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0">
        <RemoteImage
          src={event.bannerImage}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <span className="d-badge d-badge-primary absolute top-4 left-4 border-0 text-[10px] font-black uppercase tracking-wider bg-[#00897B] text-white shadow-md">
          {event.category}
        </span>
      </div>

      <div className="flex flex-col grow p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00897B] dark:text-[#34d399]">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={event.eventDate}>{formatDate(event.eventDate)}</time>
        </div>

        <h3 className="mt-2 font-bold text-lg text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#00897B] dark:group-hover:text-[#34d399] transition-colors">
          {event.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <span className="truncate">{event.location}</span>
        </div>

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed grow">
          {event.description}
        </p>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <Users className="w-3.5 h-3.5 text-[#00897B] dark:text-[#34d399]" />
            {event.attendeesCount ?? 0} joined
          </span>
          <Link href={`/events/${event._id}`} className="btn-primary btn-sm">
            View Event
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export const EventCardSkeleton: React.FC = () => (
  <div className="h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d1e]" aria-hidden="true">
    <div className="h-48 sm:h-52 d-skeleton" />
    <div className="p-5 sm:p-6 space-y-3">
      <div className="h-3 w-24 rounded d-skeleton" />
      <div className="h-5 w-3/4 rounded d-skeleton" />
      <div className="h-3 w-1/2 rounded d-skeleton" />
      <div className="h-10 w-full rounded d-skeleton" />
      <div className="h-9 w-full rounded-xl d-skeleton" />
    </div>
  </div>
);

export default EventCard;
