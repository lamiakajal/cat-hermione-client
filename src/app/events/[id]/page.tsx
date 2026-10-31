"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { INITIAL_EVENTS } from "@/data/mockEvents";
import { EventItem } from "@/types/event";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Find targeted event by ID from route parameters
  const event = (INITIAL_EVENTS as EventItem[]).find(
    (e) => String(e.id) === String(params?.id),
  );

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Event Not Found
        </h2>
        <p className="text-slate-500 text-sm">
          The civic drive you are looking for does not exist or has concluded.
        </p>
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Events</span>
        </Link>
      </div>
    );
  }

  // Handle volunteer RSVP action
  const handleJoinDrive = () => {
    setHasJoined(!hasJoined);
  };

  // Copy shareable link to clipboard
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const progressPercentage = Math.min(
    100,
    Math.round(
      ((event.attendeesCount + (hasJoined ? 1 : 0)) / event.targetAttendees) *
        100,
    ),
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Navigation & Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>{copied ? "Link Copied!" : "Share Event"}</span>
        </button>
      </div>

      {/* Main Event Showcase Banner */}
      <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1024px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-400 backdrop-blur-md shadow-sm">
            {event.category}
          </span>
        </div>
      </div>

      {/* Details & Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Information */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-500" />
                <span>{event.date}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>{event.time}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              About This Initiative
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Organizer Information Box */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Verified Organizer Desk
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden relative border border-slate-200 dark:border-slate-700">
                <Image
                  src={event.organizerAvatar}
                  alt={event.organizer}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-base">
                  <span>{event.organizer}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{event.organizerEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Volunteer Capacity & RSVP Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6 sticky top-24">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Participation Status
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {event.attendeesCount + (hasJoined ? 1 : 0)}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Goal: {event.targetAttendees} Volunteers
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2 text-right">
                {progressPercentage}% of capacity fulfilled
              </p>
            </div>

            {/* RSVP Button */}
            <button
              onClick={handleJoinDrive}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-lg transition flex items-center justify-center gap-2 ${
                hasJoined
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white"
              }`}
            >
              {hasJoined ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You are Enrolled!</span>
                </>
              ) : (
                <>
                  <Users className="w-4 h-4" />
                  <span>Join This Volunteer Drive</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-slate-400 leading-relaxed">
              Joining guarantees your designated participation badge and updates
              directly from the organizer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
