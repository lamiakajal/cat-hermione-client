"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface EventDetail {
  _id: string;
  title: string;
  category: string;
  eventDate: string;
  location: string;
  description: string;
  bannerImage: string;
  organizerName: string;
  organizerEmail: string;
  attendeesCount?: number;
}

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEventDetail = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiUrl}/events/${id}`);
        const data = await res.json();

        if (data.success) {
          setEvent(data.data);
        } else {
          setError(data.message || "Failed to load event details");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600 dark:border-teal-400"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500 dark:text-red-400 font-medium mb-4">
          {error || "Event not found"}
        </p>
        <button
          onClick={() => router.push("/events")}
          className="px-5 py-2.5 bg-[#007a5e] hover:bg-[#00624b] text-white rounded-xl font-medium transition"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <Link
        href="/events"
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-[#007a5e] dark:text-slate-400 dark:hover:text-teal-400 transition mb-6"
      >
        ← Back to All Drives
      </Link>

      <div className="pb-8 border-b border-slate-200 dark:border-slate-800 mb-8">
        <div className="flex items-center gap-3">
          <span className="bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {event.category}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {new Date(event.eventDate).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3">
          {event.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Detailed information and volunteer registration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <Image
              src={
                event.bannerImage ||
                "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
              }
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              About this Drive
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-base">
              {event.description}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Event Details
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Location
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 mt-1 block">
                  {event.location}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Organizer
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 mt-1 block">
                  {event.organizerName}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Contact Email
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 mt-1 block">
                  {event.organizerEmail}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert("Volunteer registration successful!")}
              className="w-full py-3 px-4 rounded-xl text-center bg-[#007a5e] hover:bg-[#00624b] text-white font-semibold shadow-sm transition"
            >
              Join as Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
