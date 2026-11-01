"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

interface EventItem {
  _id: string;
  title: string;
  category: string;
  eventDate: string;
  location: string;
  description: string;
  bannerImage: string;
  organizerName?: string;
  organizerEmail?: string;
}

export default function ManageEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Update state
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

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

  const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to permanently delete "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007a5e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a",
      color: "#f8fafc",
      customClass: {
        popup: "rounded-2xl border border-slate-800",
      },
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiUrl}/events/${id}`, {
        method: "DELETE",
      });
      const resData = await res.json();

      if (resData.success) {
        setEvents((prev) => prev.filter((event) => event._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The event has been successfully deleted.",
          icon: "success",
          confirmButtonColor: "#007a5e",
          background: "#0f172a",
          color: "#f8fafc",
          customClass: {
            popup: "rounded-2xl border border-slate-800",
          },
        });
      } else {
        toast.error(resData.message || "Could not delete the event.");
      }
    } catch (err) {
      console.error("Delete request failure:", err);
      toast.error("Failed to delete event. Please check server connectivity.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    setIsUpdating(true);
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiUrl}/events/${editingEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEvent),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Event updated successfully!");
        setEvents((prev) =>
          prev.map((ev) =>
            ev._id === editingEvent._id ? data.data || editingEvent : ev,
          ),
        );
        setEditingEvent(null);
      } else {
        toast.error(data.message || "Failed to update event.");
      }
    } catch (err) {
      console.error("Update request failure:", err);
      toast.error("Network error occurred while updating event.");
    } finally {
      setIsUpdating(false);
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
                      type="button"
                      onClick={() => setEditingEvent(event)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-50 text-[#007a5e] hover:bg-teal-100 dark:bg-teal-950/50 dark:text-teal-300 dark:hover:bg-teal-900/60 transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(event._id, event.title)}
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

      {/* Update Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Update Event Information
              </h2>
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-[#007a5e] focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#007a5e] focus:outline-none text-sm"
                  >
                    <option value="Donation">Donation</option>
                    <option value="Cleanup">Cleanup</option>
                    <option value="Plantation">Plantation</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Relief">Relief</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={
                      editingEvent.eventDate
                        ? new Date(editingEvent.eventDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        eventDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-[#007a5e] focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.location}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-[#007a5e] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  required
                  value={editingEvent.bannerImage}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      bannerImage: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-[#007a5e] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingEvent.description}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-[#007a5e] focus:outline-none text-sm"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 text-xs font-semibold rounded-xl text-white bg-[#007a5e] hover:bg-[#00624b] transition disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
