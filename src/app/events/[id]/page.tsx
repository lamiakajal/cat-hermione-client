"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Calendar, MapPin, Users, UserRound, CheckCircle2, Mail } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { formatDateTime, isPast } from "@/lib/events";
import { EventItem } from "@/types/event";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { themedSwal } from "@/lib/swal";

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Wait for auth so the token is sent and hasJoined is accurate on reload
  useEffect(() => {
    if (authLoading || !id) return;
    let ignore = false;

    api<{ data: EventItem }>(`/events/${id}`, { token })
      .then((res) => !ignore && setEvent(res.data))
      .catch((err) => !ignore && setError(err instanceof ApiError ? err.message : "Could not load this event."))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [id, token, authLoading]);

  const handleJoin = async () => {
    if (!user) {
      toast.error("Please log in to join this event.");
      router.push(`/login?next=${encodeURIComponent(`/events/${id}`)}`);
      return;
    }

    setJoining(true);
    try {
      const res = await api<{ data: { attendeesCount: number } }>(`/events/${id}/join`, {
        method: "POST",
        token,
      });
      setEvent((prev) =>
        prev ? { ...prev, hasJoined: true, attendeesCount: res.data.attendeesCount } : prev,
      );
      await themedSwal().fire({
        title: "You're in!",
        text: "Your spot is saved. Find this event under Joined Events anytime.",
        icon: "success",
      });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not join this event.");
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    const result = await themedSwal().fire({
      title: "Leave this event?",
      text: "Your spot will be released. You can join again later if there is room.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, leave",
      cancelButtonText: "Stay",
    });
    if (!result.isConfirmed) return;

    setLeaving(true);
    try {
      const res = await api<{ data: { attendeesCount: number } }>(`/events/${id}/join`, {
        method: "DELETE",
        token,
      });
      setEvent((prev) =>
        prev ? { ...prev, hasJoined: false, attendeesCount: res.data.attendeesCount } : prev,
      );
      toast.success("You have left this event.");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not leave this event.");
    } finally {
      setLeaving(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10" aria-busy="true">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-10 w-3/4 rounded-lg d-skeleton" />
          <div className="h-80 rounded-3xl d-skeleton" />
          <div className="h-32 rounded-2xl d-skeleton" />
        </div>
        <div className="h-72 rounded-3xl d-skeleton" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Event not found</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {error || "This event may have been removed by its organiser."}
        </p>
        <Link href="/events" className="btn-primary mt-6">
          Back to events
        </Link>
      </div>
    );
  }

  const past = isPast(event.eventDate);
  const isOwner = user?.email === event.organizerEmail;

  let joinButton: React.ReactNode;
  if (event.hasJoined) {
    joinButton = (
      <div className="space-y-3">
        <div className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 py-3.5 text-sm font-bold">
          <CheckCircle2 className="w-4 h-4" />
          You have joined this event
        </div>
        {!past && (
          <button onClick={handleLeave} disabled={leaving} className="btn-outline w-full py-3">
            {leaving ? "Leaving..." : "Leave Event"}
          </button>
        )}
      </div>
    );
  } else if (past) {
    joinButton = (
      <div className="w-full text-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 py-3.5 text-sm font-bold">
        This event has ended
      </div>
    );
  } else {
    joinButton = (
      <button onClick={handleJoin} disabled={joining} className="btn-primary w-full py-3.5 text-base">
        {joining ? "Joining..." : "Join Event"}
      </button>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#00796B] dark:text-slate-400 dark:hover:text-emerald-400 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to events
      </Link>

      <div className="pb-8 border-b border-slate-200 dark:border-slate-800 mb-8">
        <span className="inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800">
          {event.category}
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          {event.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <RemoteImage
              src={event.bannerImage}
              alt={event.title}
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#00796B] flex items-center justify-center text-white text-xl font-black shrink-0">
                {event.organizerPhoto ? (
                  <RemoteImage src={event.organizerPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  event.organizerName.charAt(0).toUpperCase()
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Organiser</p>
                <p className="font-bold text-lg text-slate-900 dark:text-white truncate">{event.organizerName}</p>
                <a
                  href={`mailto:${event.contactEmail || event.organizerEmail}`}
                  className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00796B] dark:text-emerald-400 hover:underline break-all"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {event.contactEmail || event.organizerEmail}
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">About this event</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-6 self-start rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-6 space-y-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Event details</h3>

          <dl className="space-y-4 text-sm">
            <div className="flex gap-3">
              <Calendar className="w-5 h-5 shrink-0 text-[#00796B] dark:text-emerald-400" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">When</dt>
                <dd className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">{formatDateTime(event.eventDate)}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 shrink-0 text-[#00796B] dark:text-emerald-400" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Where</dt>
                <dd className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">{event.location}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Users className="w-5 h-5 shrink-0 text-[#00796B] dark:text-emerald-400" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Volunteers</dt>
                <dd className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">{event.attendeesCount} joined</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <UserRound className="w-5 h-5 shrink-0 text-[#00796B] dark:text-emerald-400" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Organised by</dt>
                <dd className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">{event.organizerName}</dd>
              </div>
            </div>
          </dl>

          <div className="pt-2">{joinButton}</div>

          {isOwner && (
            <Link href="/manage-events" className="block text-center text-sm font-semibold text-[#00796B] dark:text-emerald-400 hover:underline">
              You organise this event. Manage it
            </Link>
          )}
          {!user && !past && (
            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              You need to be logged in to join.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
