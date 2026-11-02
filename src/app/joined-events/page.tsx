"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { HandHeart, RefreshCw, LogOut } from "lucide-react";
import { themedSwal } from "@/lib/swal";
import { isPast } from "@/lib/events";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { EventItem, EventsResponse } from "@/types/event";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { PageHeader } from "@/components/ui/PageHeader";
import { EventCard, EventCardSkeleton } from "@/components/shared/EventCard";

function JoinedEventsContent() {
  const { token } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // The server already returns these sorted by event date
      const res = await api<EventsResponse>("/events/manage/joined-events", { token });
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

  const handleLeave = async (event: EventItem) => {
    const result = await themedSwal().fire({
      title: "Leave this event?",
      text: `Your spot in "${event.title}" will be released.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, leave",
      cancelButtonText: "Stay",
    });
    if (!result.isConfirmed) return;

    try {
      await api(`/events/${event._id}/join`, { method: "DELETE", token });
      setEvents((prev) => prev.filter((e) => e._id !== event._id));
      toast.success("You have left this event.");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not leave this event.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <PageHeader
        eyebrow="Joined events"
        title="Events you signed up for"
        description="Listed by event date, so the next one you need to show up for comes first."
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[0, 1, 2].map((i) => (
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
          <HandHeart className="w-10 h-10 mx-auto text-slate-400" />
          <p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">You have not joined any events yet.</p>
          <Link href="/events" className="btn-primary mt-5">
            Browse upcoming events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event) => (
            <div key={event._id} className="flex flex-col gap-3">
              <EventCard event={event} />
              {!isPast(event.eventDate) && (
                <button onClick={() => handleLeave(event)} className="btn-outline w-full py-2.5">
                  <LogOut className="w-4 h-4" />
                  Leave event
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <ProtectedRoute>
      <JoinedEventsContent />
    </ProtectedRoute>
  );
}
