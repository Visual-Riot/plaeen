"use client";

import DownArrow from "@/components/icons/DownArrow";
import LandingPage from "@/components/layout/LandingPage";
import USPsSection from "@/components/layout/USPsSection";

export default function Home() {
  return (
    <main>
      <LandingPage />
      <DownArrow />
      <USPsSection />
    </main>
  );
}
