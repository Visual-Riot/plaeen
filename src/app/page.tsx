"use client";

import DownArrow from "@/components/icons/DownArrow";
import FAQsSection from "@/components/layout/FAQsSection";
import Footer from "@/components/layout/Footer";
import HomePageSignUp from "@/components/layout/HomePageSignUp";
import LandingPage from "@/components/layout/LandingPage";
import USPsSection from "@/components/layout/USPsSection";

export default function Home() {
  return (
    <main>
      <LandingPage />
      <DownArrow />
      <USPsSection />
      <FAQsSection />
      <HomePageSignUp />
      <Footer />
    </main>
  );
}
