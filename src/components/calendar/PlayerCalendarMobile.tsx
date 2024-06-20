import PlayerTimeSlot from "../buttons/PlayerTimeSlot";
import DayButton from "../buttons/DayButton";
import React, { useState, useEffect } from "react";

interface Props {
  className?: string;
  dayHours: { [key: string]: { [key: number]: string } };
  onHoursStateChange: (
    day: string,
    hour: number,
    newState: "available" | "single" | "recurring"
  ) => void;
}

const PlayerCalendarMobile: React.FC<Props> = ({
  className,
  dayHours,
  onHoursStateChange,
}) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i + 1);

  const [selectedDay, setSelectedDay] = useState<string | null>("Monday");

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    console.log(dayHours[day]);
  };

  return (
    <div className={`my-10 ${className}`}>
      <div className="w-full">
        {/* Days Names Column */}
        <div className="grid grid-cols-7 gap-1 md:gap-1 px-2 mt-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="flex justify-center">
              <DayButton
                key={day}
                state={selectedDay === day ? "selected" : "unselected"}
                onClick={() => {
                  handleDayChange(day);
                }}
              >
                {day.slice(0, 3)}
              </DayButton>
            </div>
          ))}
        </div>

        {/* Render time slots for the selected day */}
        <div className="grid grid-cols-6 gap-2 md:gap-4 px-2 mt-4">
          {hoursOfDay.map((hour) => (
            <div key={hour} className="flex justify-center">
              <PlayerTimeSlot
                day={selectedDay || ""}
                hour={hour}
                state={
                  (dayHours[selectedDay || ""]?.[hour] as
                    | "available"
                    | "single"
                    | "recurring") || "available"
                }
                displayedHour={hour}
                onStateChange={onHoursStateChange}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerCalendarMobile;
