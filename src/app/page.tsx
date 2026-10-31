import React from "react";
import { HeroBanner } from "@/components/modules/home/HeroBanner";
import { FeaturePillars } from "@/components/modules/home/FeaturePillars";

export default function Home() {
  return (
    <main className="space-y-20 pb-20">
      <HeroBanner />
      <FeaturePillars />
    </main>
  );
}
