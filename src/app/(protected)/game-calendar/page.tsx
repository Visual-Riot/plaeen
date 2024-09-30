"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";

import GameCalendar from "@/components/calendar/GameCalendar";

export default function Page() {
  return (
    <>
      <Navbar />
      <div
        className={`relative min-h-screen bg-calendar-bg bg-cover bg-center flex justify-center items-center`}
      >
        {/* black overlay on background pic */}
        <div className="absolute inset-0 bg-black opacity-85"></div>
        {/* frosted glass */}
        <div className="w-full lg:w-4/5 min-h-screen lg:min-h-4 bg-lightPurple bg-opacity-10 backdrop-filter backdrop-blur brightness-125 rounded-lg py-4 md:py-12 px-2 md:p-14">
          <GameCalendar teamId="team-001" gameId="game-001" />

          {/* closing tags for main containers */}
        </div>
      </div>
    </>
  );
}
