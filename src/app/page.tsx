"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  PlusCircle,
  ShieldCheck,
  CheckCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { INITIAL_EVENTS, GALLERY_ITEMS } from "@/data/mockEvents";

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribedMessage, setSubscribedMessage] = useState(false);

  // Take the recent 6 civic drives
  const recentEvents = INITIAL_EVENTS.slice(0, 6);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
      setSubscribedMessage(true);
      setNewsletterEmail("");
      setTimeout(() => setSubscribedMessage(false), 4000);
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO BANNER SECTION */}
      <section
        className="relative bg-cover bg-center py-20 sm:py-28 overflow-hidden rounded-b-3xl shadow-xl"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Civic Action & Social Welfare Hub</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            Empowering Communities,{" "}
            <span className="bg-linear-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              One Cause at a Time.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Create, discover, and join verifiable community drives across
            Bangladesh—from winter clothes distribution in Mirpur to emergency
            medical and afforestation campaigns.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/events"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Explore Upcoming Drives</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/events/create"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl border-2 border-slate-400/40 hover:border-emerald-400 font-bold text-sm text-slate-200 hover:text-white transition flex items-center justify-center gap-2 hover:bg-emerald-500/10"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Host a Community Drive</span>
            </Link>
          </div>

          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                14,200+
              </div>
              <div className="text-xs font-semibold text-slate-300 mt-1">
                Verified Volunteers
              </div>
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-teal-400">
                385+
              </div>
              <div className="text-xs font-semibold text-slate-300 mt-1">
                Completed Drives
              </div>
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                28 Districts
              </div>
              <div className="text-xs font-semibold text-slate-300 mt-1">
                Nationwide Coverage
              </div>
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                100% Free
              </div>
              <div className="text-xs font-semibold text-slate-300 mt-1">
                Direct Social Action
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Why UnityPulse
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Architecture for Transparent Social Good
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Engineered to bridge compassionate individuals with verified
            on-ground social organizers across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Verified Organizers
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Every civic initiative and winter drive is authenticated to
                guarantee real physical impact without intermediary overhead.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Local Grassroots Reach
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Filter campaigns happening in your specific thana, road, or
                union council for rapid weekend volunteer mobilization.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Live RSVP Headcount
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Organizers track exact volunteer turnouts, gear requirements,
                and logistical supplies in real-time.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                One-Click Protected RSVP
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Secure JWT-verified participation tracking lets you maintain a
                verifiable record of your community service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RECENT UPCOMING EVENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Community Calendar
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              Recent Upcoming Drives
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Active campaigns scheduled for the coming weeks across Bangladesh.
            </p>
          </div>
          <Link
            href="/events"
            className="self-start sm:self-auto text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1.5 transition"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-400 backdrop-blur-md shadow-sm z-10">
                    {event.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                    {event.title}
                  </h3>

                  <div className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed pt-1">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-3 flex items-center justify-between gap-3">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{event.attendeesCount} enrolled</span>
                </div>

                <Link
                  href={`/events/${event.id}`}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>View Event</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MOMENTS FROM GROUND ZERO (GALLERY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Real Stories, Real Relief
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Moments from Ground Zero
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Snapshots of courage, warmth, and volunteer dedication from recent
            humanitarian drives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={index}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800"
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/80">
                  {item.location}
                </span>
                <h4 className="font-bold text-base mt-1.5">{item.title}</h4>
                <div className="text-xs text-emerald-300 font-semibold">
                  {item.stat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NEWSLETTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-linear-to-br from-emerald-600 via-teal-700 to-slate-900 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-200">
              Stay Mobilized
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Get Notified When Winter Relief & Health Drives Launch in Your
              Area
            </h3>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              No spam. Just urgent volunteer calls, disaster response alerts,
              and monthly transparent impact reports delivered to your inbox.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="pt-4 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-emerald-50 font-bold text-sm shadow-xl transition transform hover:-translate-y-0.5 shrink-0 flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4 text-emerald-700" />
              </button>
            </form>

            {subscribedMessage && (
              <p className="text-xs text-emerald-300 font-semibold pt-1">
                Thank you! Your email has been registered for volunteer updates.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
