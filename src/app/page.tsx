import React from "react";
import { INITIAL_EVENTS } from "@/data/mockEvents";
import { EventItem } from "@/types/event";
import { HeroBanner } from "@/components/modules/home/HeroBanner";
import { FeaturePillars } from "@/components/modules/home/FeaturePillars";
import { RecentEvents } from "@/components/modules/home/RecentEvents";
import { CommunityGallery } from "@/components/modules/home/CommunityGallery";
import { Newsletter } from "@/components/modules/home/Newsletter";

export default function Home() {
  // Extract recent civic drives for the home landing view
  const recentEvents = INITIAL_EVENTS.slice(0, 6) as EventItem[];

  return (
    <div className="space-y-20 pb-20">
      <HeroBanner />
      <FeaturePillars />
      <RecentEvents events={recentEvents} />
      <CommunityGallery />
      <Newsletter />
    </div>
  );
}
