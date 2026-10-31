import React from "react";
import { INITIAL_EVENTS } from "@/data/mockEvents";
import { EventItem } from "@/types/event";
import { HeroBanner } from "@/components/modules/home/HeroBanner";
import { FeaturePillars } from "@/components/modules/home/FeaturePillars";
import { RecentEvents } from "@/components/modules/home/RecentEvents";
import { CommunityGallery } from "@/components/modules/home/CommunityGallery";

export default function Home() {
  const recentEvents = INITIAL_EVENTS.slice(0, 6) as EventItem[];

  return (
    <main className="space-y-20 pb-20">
      <HeroBanner />
      <FeaturePillars />
      <RecentEvents events={recentEvents} />
      <CommunityGallery />
    </main>
  );
}
