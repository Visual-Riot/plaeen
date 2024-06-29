"use client";

import DownArrow from "@/components/icons/DownArrow";
import FAQsSection from "@/components/layout/FAQsSection";
import LandingPage from "@/components/layout/LandingPage";
import USPsSection from "@/components/layout/USPsSection";

export default function Home() {
  return (
    <main>
      <LandingPage />
      <DownArrow />
      <USPsSection />
      <FAQsSection />
    </main>
  );
}
