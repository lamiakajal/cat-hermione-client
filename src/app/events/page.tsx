"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, CalendarDays, Sparkles } from "lucide-react";
import { INITIAL_EVENTS } from "@/data/mockEvents";
import { EventItem, EventCategory } from "@/types/event";
import { EventCard } from "@/components/shared/EventCard";

const CATEGORIES: ("All" | EventCategory)[] = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Healthcare",
  "Education",
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | EventCategory
  >("All");
  const [sortBy, setSortBy] = useState<"date" | "attendees">("date");

  // Filter and sort events dynamically based on search and category
  const filteredEvents = useMemo(() => {
    return (INITIAL_EVENTS as EventItem[])
      .filter((event) => {
        const matchesCategory =
          selectedCategory === "All" || event.category === selectedCategory;
        const matchesSearch =
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "attendees") {
          return b.attendeesCount - a.attendeesCount;
        }
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active Social Drives</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Explore Civic Initiatives
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Discover verified humanitarian, ecological, and educational volunteer
          drives across Bangladesh.
        </p>
      </div>

      {/* Search, Filter and Sorting Toolbar */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search input field */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, location, keyword..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <CalendarDays className="w-4 h-4 text-emerald-500" />
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "date" | "attendees")
                }
                className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="date">Upcoming Date</option>
                <option value="attendees">Most Attendees</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Results Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-3">
          <p className="text-base font-bold text-slate-700 dark:text-slate-300">
            No drives found matching your criteria.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Try adjusting your search terms or selecting a different category
            filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
