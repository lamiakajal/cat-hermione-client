import React from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/data/mockEvents";
import { GalleryItem } from "@/types/event";

interface ExtendedGalleryItem extends Partial<GalleryItem> {
  url?: string;
  stat?: string;
  title: string;
  location?: string;
  imageUrl?: string;
}

export const CommunityGallery: React.FC = () => {
  const items = GALLERY_ITEMS as ExtendedGalleryItem[];

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Soft dynamic background lighting */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-teal-500/5 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-live-glow-2" />

      {/* Header with standard size */}
      <div className="text-center max-w-3xl mx-auto space-y-2 mb-10 relative z-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#00897B] dark:text-[#34d399] inline-block transition-transform duration-300 hover:scale-105">
          REAL STORIES, REAL RELIEF
        </span>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0f172a] dark:text-[#f8fafc]">
          Moments from Ground Zero
        </h2>
        <p className="text-sm text-[#475569] dark:text-[#94a3b8]">
          Snapshots of courage, warmth, and volunteer dedication from recent
          humanitarian drives.
        </p>
      </div>

      {/* Responsive Photo Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        {items.map((item, index) => {
          const imageSource =
            item.url ||
            item.imageUrl ||
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";

          return (
            <div
              key={index}
              className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden shadow-md border border-[#e2e8f0] dark:border-[#1e293b] hover:-translate-y-1.5 transition-all duration-500 ease-out"
            >
              <Image
                src={imageSource}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-115 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

              <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-1 transform group-hover:-translate-y-0.5 transition-transform duration-300">
                {item.location && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00897B]/90 backdrop-blur-sm shadow-sm">
                    {item.location}
                  </span>
                )}
                <h4 className="font-bold text-base leading-snug drop-shadow-sm">
                  {item.title}
                </h4>
                {item.stat && (
                  <div className="text-xs text-emerald-300 font-semibold drop-shadow-xs">
                    {item.stat}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CommunityGallery;
