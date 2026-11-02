import Link from "next/link";
import { Home, CalendarDays, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl loop-float" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl loop-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center">
        <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-tr from-[#00796B] to-emerald-400 text-white shadow-lg loop-float">
          <Compass className="h-8 w-8" />
        </div>
        <p className="text-7xl sm:text-9xl font-black tracking-tight bg-linear-to-r from-[#00796B] via-emerald-400 to-amber-300 bg-clip-text text-transparent loop-gradient">
          404
        </p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          This page wandered off
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          The link may be broken or the page may have been removed. Let&apos;s get you back to something useful.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-primary w-full sm:w-auto">
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <Link href="/events" className="btn-outline w-full sm:w-auto">
            <CalendarDays className="h-4 w-4" />
            Browse upcoming events
          </Link>
        </div>
      </div>
    </div>
  );
}
