import React from "react";
import { HeroBanner } from "@/components/modules/home/HeroBanner";
import { FeaturePillars } from "@/components/modules/home/FeaturePillars";
import { RecentEvents } from "@/components/modules/home/RecentEvents";
import { ImpactStats } from "@/components/modules/home/ImpactStats";
import { HowItWorks } from "@/components/modules/home/HowItWorks";
import { CommunityGallery } from "@/components/modules/home/CommunityGallery";
import { Newsletter } from "@/components/modules/home/Newsletter";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <div className="space-y-2 sm:space-y-4 pb-12">
      <HeroBanner />
      <Reveal id="features">
        <FeaturePillars />
      </Reveal>
      <Reveal id="events">
        <RecentEvents />
      </Reveal>
      <Reveal id="impact">
        <ImpactStats />
      </Reveal>
      <Reveal id="how-it-works">
        <HowItWorks />
      </Reveal>
      <Reveal id="gallery">
        <CommunityGallery />
      </Reveal>
      <Reveal id="newsletter">
        <Newsletter />
      </Reveal>
    </div>
  );
}
