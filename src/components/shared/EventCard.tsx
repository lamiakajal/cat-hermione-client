import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, ArrowUpRight } from "lucide-react";
import { EventItem } from "@/types/event";

// Safe interface matching exact EventItem id string type
interface EventItemSafe extends Partial<Omit<EventItem, "id">> {
  id: string;
  title: string;
  image?: string;
  imageUrl?: string;
  thumbnail?: string;
  date?: string;
  location?: string;
  description?: string;
  category?: string;
  attendeesCount?: number;
}

interface EventCardProps {
  event: EventItem | EventItemSafe;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const safeEvent = event as EventItemSafe;
  const imageSource =
    safeEvent.image ||
    safeEvent.imageUrl ||
    safeEvent.thumbnail ||
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="group rounded-3xl overflow-hidden border border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#070d1e] shadow-sm hover:shadow-xl hover:border-[#00897B]/40 dark:hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between">
      <div>
        {/* Cover Image Container with Zoom Effect */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
          <Image
            src={imageSource}
            alt={safeEvent.title || "Community Drive"}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          {safeEvent.category && (
            <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#00897B] text-white shadow-md backdrop-blur-sm">
              {safeEvent.category}
            </span>
          )}
        </div>

        {/* Event Content Details */}
        <div className="p-5 sm:p-6 space-y-3">
          {safeEvent.date && (
            <div className="flex items-center gap-2 text-xs font-bold text-[#00897B] dark:text-[#34d399]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{safeEvent.date}</span>
            </div>
          )}

          <h3 className="font-bold text-base sm:text-lg text-[#0f172a] dark:text-[#f8fafc] group-hover:text-[#00897B] dark:group-hover:text-[#34d399] transition-colors duration-200 line-clamp-1">
            {safeEvent.title}
          </h3>

          {safeEvent.location && (
            <div className="flex items-center gap-1.5 text-xs text-[#475569] dark:text-[#94a3b8]">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{safeEvent.location}</span>
            </div>
          )}

          {safeEvent.description && (
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94a3b8] line-clamp-2 leading-relaxed">
              {safeEvent.description}
            </p>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 sm:px-6 py-4 border-t border-[#f1f5f9] dark:border-[#1e293b] bg-slate-50/60 dark:bg-[#030712]/50 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] dark:text-[#94a3b8]">
          <Users className="w-3.5 h-3.5 text-[#00897B] dark:text-[#34d399]" />
          <span>{safeEvent.attendeesCount ?? 0} joined</span>
        </div>

        <Link
          href={`/events/${safeEvent.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#00897B] dark:text-[#34d399] group/link hover:underline"
        >
          <span>View Drive</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
