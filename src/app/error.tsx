"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home, TriangleAlert } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 loop-pulse">
        <TriangleAlert className="h-7 w-7" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Something went wrong</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        We hit an unexpected problem loading this page. Please try again.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button onClick={reset} className="btn-primary w-full sm:w-auto">
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
        <Link href="/" className="btn-outline w-full sm:w-auto">
          <Home className="h-4 w-4" />
          Go home
        </Link>
      </div>
    </div>
  );
}
