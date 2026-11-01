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

export default function ManageEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/events`);
        const result = await response.json();

        if (!ignore) {
          if (result.success) {
            setEvents(result.data || []);
          } else {
            setError(result.message || "Failed to retrieve events.");
          }
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Fetch error:", err);
          setError("Network error occurred while fetching events.");
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this event?",
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiUrl}/events/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        setEvents((prev) => prev.filter((event) => event._id !== id));
      } else {
        alert(result.message || "Could not delete the event.");
      }
    } catch (err) {
      console.error("Delete request failure:", err);
      alert("Failed to delete event. Please check server connectivity.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 transition-colors">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-slate-200 dark:border-slate-800 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Manage My Events
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Track, edit, and organize events you created.
          </p>
        </div>
        <Link
          href="/events/create"
          className="mt-4 sm:mt-0 inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#007a5e] hover:bg-[#00624b] shadow-sm transition"
        >
          + Host New Drive
        </Link>
      </header>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#007a5e] dark:border-teal-400" />
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 text-center font-medium">
          {error}
        </div>
      ) : events.length === 0 ? (
        <section className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            No drives found under management.
          </p>
          <Link
            href="/events/create"
            className="mt-4 inline-block text-sm font-semibold text-[#007a5e] dark:text-teal-400 hover:underline"
          >
            Create your first drive →
          </Link>
        </section>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                <th className="py-4 px-6">Event</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              {events.map((event) => (
                <tr
                  key={event._id}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                >
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={
                          event.bannerImage ||
                          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
                        }
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                        {event.title}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#007a5e] dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      {event.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                    {event.location}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                    <Link
                      href={`/events/${event._id}`}
                      className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(event._id)}
                      disabled={deletingId === event._id}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900/60 transition disabled:opacity-50"
                    >
                      {deletingId === event._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
