// Shown by Next.js whenever a page takes a moment to load
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-100 dark:border-emerald-950" />
          <div className="absolute inset-0 rounded-full border-4 border-[#00796B] dark:border-emerald-400 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading...</p>
      </div>
    </div>
  );
}
