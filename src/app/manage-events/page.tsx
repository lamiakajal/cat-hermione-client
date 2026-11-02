"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus, X, CalendarPlus, Users, MapPin, Calendar, RefreshCw } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { formatDate, isPast, toLocalInput } from "@/lib/events";
import { EventItem, EventsResponse } from "@/types/event";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { PageHeader } from "@/components/ui/PageHeader";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { EventForm, EventFormValues } from "@/components/events/EventForm";
import { themedSwal } from "@/lib/swal";

function ManageEventsContent() {
  const { token } = useAuth();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api<EventsResponse>("/events/manage/my-events", { token });
      setEvents(res.data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not load your events.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  // Close the edit dialog with Escape
  useEffect(() => {
    if (!editing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setEditing(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing]);

  const handleDelete = async (event: EventItem) => {
    const confirm = await themedSwal().fire({
      title: "Delete this event?",
      text: `"${event.title}" and its sign-ups will be removed for good.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      confirmButtonColor: "#e11d48",
    });
    if (!confirm.isConfirmed) return;

    setDeletingId(event._id);
    try {
      await api(`/events/${event._id}`, { method: "DELETE", token });
      setEvents((prev) => prev.filter((e) => e._id !== event._id));
      toast.success("Event deleted.");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not delete the event.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = async (values: EventFormValues) => {
    if (!editing) return;
    try {
      const res = await api<{ data: EventItem }>(`/events/${editing._id}`, {
        method: "PUT",
        token,
        body: { ...values, eventDate: new Date(values.eventDate).toISOString() },
      });
      setEvents((prev) => prev.map((e) => (e._id === editing._id ? res.data : e)));
      setEditing(null);
      setServerErrors(undefined);
      toast.success("Event updated.");
    } catch (err) {
      if (err instanceof ApiError) {
        setServerErrors(err.errors);
        toast.error(err.message);
      } else {
        toast.error("Could not update the event.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <PageHeader
        eyebrow="Manage events"
        title="Events you organise"
        description="Edit the details, or delete an event you no longer plan to run."
        action={
          <Link href="/events/create" className="btn-primary self-start sm:self-auto">
            <Plus className="w-4 h-4" />
            Create event
          </Link>
        }
      />

      {loading ? (
        <div className="space-y-4" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-32 rounded-3xl d-skeleton" />
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
          <CalendarPlus className="w-10 h-10 mx-auto text-slate-400" />
          <p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">You have not created any events yet.</p>
          <Link href="/events/create" className="btn-primary mt-5">
            Create your first event
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => {
            const ended = isPast(event.eventDate);
            return (
              <li
                key={event._id}
                className="flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d1e] shadow-sm"
              >
                <div className="relative w-full sm:w-44 h-40 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <RemoteImage src={event.bannerImage} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>

                <div className="grow min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#e6f7f2] text-[#00796B] dark:bg-emerald-950/60 dark:text-emerald-400">
                      {event.category}
                    </span>
                    {ended && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        Ended
                      </span>
                    )}
                  </div>
                  <Link href={`/events/${event._id}`} className="block mt-2 font-bold text-lg text-slate-900 dark:text-white truncate hover:text-[#00796B] dark:hover:text-emerald-400">
                    {event.title}
                  </Link>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(event.eventDate)}</span>
                    <span className="inline-flex items-center gap-1.5 min-w-0"><MapPin className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{event.location}</span></span>
                    <span className="inline-flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{event.attendeesCount} joined</span>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 sm:justify-center shrink-0">
                  <button
                    onClick={() => {
                      setServerErrors(undefined);
                      setEditing(event);
                    }}
                    className="btn-outline btn-sm flex-1 sm:flex-none"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(event)}
                    disabled={deletingId === event._id}
                    className="btn-danger btn-sm flex-1 sm:flex-none"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {deletingId === event._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {editing && (
        <div
          className="fixed inset-0 z-100 flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-slate-950/60 backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && setEditing(null)}
        >
          <div role="dialog" aria-modal="true" aria-label="Update event" className="w-full max-w-2xl my-6 rounded-3xl bg-white dark:bg-[#0b1224] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Update event</h2>
              <button onClick={() => setEditing(null)} aria-label="Close" className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <EventForm
              initial={{
                title: editing.title,
                category: editing.category,
                eventDate: toLocalInput(new Date(editing.eventDate)),
                location: editing.location,
                bannerImage: editing.bannerImage,
                organizerName: editing.organizerName,
                contactEmail: editing.contactEmail || editing.organizerEmail,
                description: editing.description,
              }}
              submitLabel="Save changes"
              busyLabel="Saving..."
              onSubmit={handleUpdate}
              onCancel={() => setEditing(null)}
              serverErrors={serverErrors}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <ProtectedRoute>
      <ManageEventsContent />
    </ProtectedRoute>
  );
}
