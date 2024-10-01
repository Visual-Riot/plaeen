"use client";

import React, { useRef } from "react";

import DownArrow from "@/components/icons/DownArrow";
import FAQsSection from "@/components/layout/FAQsSection";
import Footer from "@/components/layout/Footer";
import HomePageSignUp from "@/components/layout/HomePageSignUp";
import LandingPage from "@/components/layout/LandingPage";
import USPsSection from "@/components/layout/USPsSection";

export default function Home() {
  const uspsRef = useRef<HTMLDivElement>(null);

  const scrollToUSPs = () => {
    if (uspsRef.current) {
      uspsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main className="flex flex-col items-center justify-center w-full gap-8">
      <LandingPage />
      <DownArrow scrollTo={scrollToUSPs} />
      <div ref={uspsRef}>
        <USPsSection />
      </div>
      <FAQsSection />
      <HomePageSignUp />
      <Footer useBackgroundImage={true} />
    </main>
  );
}
