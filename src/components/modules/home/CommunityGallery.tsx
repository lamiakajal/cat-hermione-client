import React from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/data/mockEvents";
import { GalleryItem } from "@/types/event";

export const CommunityGallery: React.FC = () => {
  const items = GALLERY_ITEMS as GalleryItem[];

  return (
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
        {items.map((item, index) => (
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
  );
};

export default CommunityGallery;
