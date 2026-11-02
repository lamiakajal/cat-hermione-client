"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Search, CalendarX, RefreshCw, Plus } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/events";
import { EventItem, EventsResponse } from "@/types/event";
import { EventCard, EventCardSkeleton } from "@/components/shared/EventCard";
import { PageHeader } from "@/components/ui/PageHeader";

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  // Wait for a pause in typing before hitting the API
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams({ category, sort });
      if (debounced) qs.set("search", debounced);
      const res = await api<EventsResponse>(`/events?${qs}`);
      setEvents(res.data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not load events.");
    } finally {
      setLoading(false);
    }
  }, [debounced, category, sort]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = debounced || category !== "All";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <PageHeader
        eyebrow="Upcoming events"
        title="Find an event to join"
        description="Every event here is still ahead of us. Pick one close to you and sign up in a click."
        action={
          <Link href="/events/create" className="btn-primary self-start sm:self-auto">
            <Plus className="w-4 h-4" />
            Create event
          </Link>
        }
      />

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px_200px] gap-3 mb-8">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by event title"
            aria-label="Search events"
            className="field-input pl-10"
          />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by event type" className="field-input">
          <option value="All">All event types</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as "asc" | "desc")} aria-label="Sort by date" className="field-input">
          <option value="asc">Soonest first</option>
          <option value="desc">Latest first</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 rounded-3xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/20">
          <p className="font-semibold text-rose-700 dark:text-rose-300">{error}</p>
          <button onClick={load} className="btn-outline mt-5">
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <CalendarX className="w-10 h-10 mx-auto text-slate-400" />
          <p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">
            {filtered ? "No events match your search." : "No upcoming events right now."}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {filtered ? "Try a different keyword or event type." : "Why not host the first one?"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
