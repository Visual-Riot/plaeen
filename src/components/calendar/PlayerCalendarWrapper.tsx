// Removed unused import
import React, { useState, useEffect } from "react";
import PlayerCalendarDesktop from "./PlayerCalendarDesktop";
import PlayerCalendarMobile from "./PlayerCalendarMobile";

interface PlayerCalendarWrapperProps {
  dayHours: { [key: string]: { [key: number]: string } };
  setDayHours: React.Dispatch<
    React.SetStateAction<{ [key: string]: { [key: number]: string } }>
  >;
}

const PlayerCalendarWrapper: React.FC<PlayerCalendarWrapperProps> = ({
  dayHours,
  setDayHours,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  useEffect(() => {
    setIsMobile(window.innerWidth <= 1024);
  }, []);

  useEffect(() => {
    const storedState = localStorage.getItem("dayHours");
    if (storedState) {
      setDayHours(JSON.parse(storedState));
    }
  }, [isMobile]);

  useEffect(() => {
    localStorage.setItem("dayHours", JSON.stringify(dayHours));
  }, [dayHours]);

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
          selectedDay={selectedDay}
        />
      ) : (
        <PlayerCalendarDesktop
          className="hidden lg:flex"
          dayHours={dayHours}
          onHoursStateChange={handleHourStateChange}
        />
      )}
    </div>
  );
};

export default PlayerCalendarWrapper;
