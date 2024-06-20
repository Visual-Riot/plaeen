"use client";
import React, { useState, useEffect } from "react";
import PlayerCalendarDesktop from "./PlayerCalendarDesktop";
import PlayerCalendarMobile from "./PlayerCalendarMobile";

export default function PlayerCalendarWrapper() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const [selectedDay, setSelectedDay] = useState<string | null>("Monday");

  // HANDLE RESIZE
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <PlayerCalendarMobile className="flex lg:hidden" />
      ) : (
        <PlayerCalendarDesktop className="hidden lg:flex" />
      )}
    </div>
  );
}
