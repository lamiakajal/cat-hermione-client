import React from "react";
import { GALLERY_ITEMS } from "@/data/gallery";
import { RemoteImage } from "@/components/ui/RemoteImage";

export const CommunityGallery: React.FC = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-teal-500/5 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-live-glow-2" />

      <div className="text-center max-w-3xl mx-auto space-y-2 mb-10 relative z-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#00897B] dark:text-[#34d399]">
          Real stories, real relief
        </span>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Moments from the Ground
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Snapshots of courage, warmth and volunteer dedication from recent
          community drives.
        </p>
      </div>

      {/* Fixed height keeps every tile identical regardless of the photo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 relative z-10">
        {GALLERY_ITEMS.map((item) => (
          <figure
            key={item.title}
            className="group relative h-52 sm:h-64 lg:h-72 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800"
          >
            <RemoteImage
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            <figcaption className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white space-y-1">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00897B]/90">
                {item.location}
              </span>
              <h4 className="font-bold text-sm sm:text-base leading-snug">
                {item.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-emerald-300 font-semibold">
                {item.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default CommunityGallery;
