"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface EventItem {
  _id: string;
  title: string;
  category: string;
  eventDate: string;
  location: string;
  description: string;
  bannerImage: string;
  organizerName: string;
  organizerEmail: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/events`);
        const result = await response.json();

        if (result.success) {
          setEvents(result.data);
        } else {
          setError(result.message || "Failed to load events");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-slate-200 dark:border-slate-800 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Upcoming Civic Drives
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Explore active grassroots community initiatives.
          </p>
        </div>
        <Link
          href="/events/create"
          className="mt-4 sm:mt-0 inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#007a5e] hover:bg-[#00624b] shadow-sm transition"
        >
          Create Drive
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#007a5e] dark:border-teal-400"></div>
        </div>
      ) : error ? (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 text-center">
          {error}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            No community drives active right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-52 w-full bg-slate-100 dark:bg-slate-800">
                <Image
                  src={
                    event.bannerImage ||
                    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
                  }
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 right-3 bg-[#007a5e]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {event.category}
                </span>
              </div>

              <div className="p-6 flex flex-col grow">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
                  {event.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 grow">
                  {event.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Location:
                    </span>
                    <span className="truncate max-w-45">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Date:
                    </span>
                    <span>
                      {new Date(event.eventDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/events/${event._id}`}
                    className="block w-full text-center py-2.5 px-4 rounded-xl bg-[#007a5e] hover:bg-[#00624b] text-white text-sm font-semibold transition shadow-sm"
                  >
                    View Drive
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
