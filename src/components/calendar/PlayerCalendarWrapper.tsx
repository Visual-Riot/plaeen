"use client";
import React, { useState, useEffect } from "react";
import PlayerCalendarDesktop from "./PlayerCalendarDesktop";
import PlayerCalendarMobile from "./PlayerCalendarMobile";

export default function PlayerCalendarWrapper() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const [dayHours, setDayHours] = useState<{
    [key: string]: { [key: number]: string };
  }>({});

  useEffect(() => {
    const storedState = localStorage.getItem("dayHours");
    if (storedState) {
      setDayHours(JSON.parse(storedState));
    }
  }, [isMobile]);

  useEffect(() => {
    localStorage.setItem("dayHours", JSON.stringify(dayHours));
  }, [dayHours]);

  // HANDLE SCREEN RESIZE
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHourStateChange = (
    day: string,
    hour: number,
    newState: string
  ) => {
    setDayHours((prevDayHours) => ({
      ...prevDayHours,
      [day]: {
        ...prevDayHours[day],
        [hour]: newState,
      },
    }));
  };

  return (
    <div>
      {isMobile ? (
        <PlayerCalendarMobile
          className="flex lg:hidden"
          dayHours={dayHours}
          onHoursStateChange={handleHourStateChange}
        />
      ) : (
        <PlayerCalendarDesktop
          className="hidden lg:flex"
          dayHours={dayHours}
          onHourStateChange={handleHourStateChange}
        />
      )}
    </div>
  );
}
