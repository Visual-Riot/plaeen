"use client";
import PlayerTimeSlot from "../buttons/PlayerTimeSlot";
import React, { useState } from "react";
import HoverInstruction from "./HoverInstruction";

interface Props {
  dayHours: { [key: string]: { [key: number]: string } };

  onHoursStateChange: (
    day: string,
    hour: number,
    newState: "available" | "single" | "recurring",
    selectedDay?: string
  ) => void;
  onSelectAllSlotsForDays: (
    day: string,
    currentStates: { [hour: number]: string },
    hoursOfDay: number[]
  ) => void;
  onSelectAllSlotsForHours: (
    hour: number,
    currentStates: { [day: string]: string },
    daysOfWeek: string[]
  ) => void;
  className?: string;
}

const PlayerCalendarDesktop: React.FC<Props> = ({
  dayHours,
  onHoursStateChange,
  onSelectAllSlotsForDays,
  onSelectAllSlotsForHours,
  className = "",
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

  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    setHoverPosition({
      x: clientX - rect.left + 16,
      y: clientY - rect.top + 10,
    });
  };

  const handleHover = (element: string | null) => {
    setHoveredElement(element);
  };

  return (
    <div className={`my-5 w-full flex ${className}`}>
      {/* Days Names Column */}
      <div className="flex flex-col">
        <div className="h-10"></div>
        {daysOfWeek.map((day, index) => (
          <div key={day} className="h-10 flex items-center relative">
            <button
              className="hidden md:inline text-lightPurple font-robotoMono font-regular uppercase"
              onClick={() =>
                onSelectAllSlotsForDays(day, dayHours[day] || {}, hoursOfDay)
              }
              onMouseMove={handleMouseMove}
              onMouseEnter={() => handleHover(`day-${day}`)}
              onMouseLeave={() => handleHover(null)}
            >
              {day}
            </button>
            <HoverInstruction
              text={`Select all`}
              isVisible={hoveredElement === `day-${day}`}
              offsetX={hoverPosition.x}
              offsetY={hoverPosition.y}
            />
          </div>
        ))}
      </div>

      {/* Hours columns */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row">
          <div className="w-5 md:w-10 h-10"></div>
          <div className="flex flex-row justify-between w-full">
            {hoursOfDay.map((hour) => (
              <div
                key={hour}
                className="text-center justify-center items-center"
              >
                <div className="h-10 flex items-center relative">
                  <button
                    className="text-lightPurple font-robotoMono font-regular uppercase text-center w-full h-10 pb-2"
                    onClick={() =>
                      onSelectAllSlotsForHours(
                        hour,
                        daysOfWeek.reduce(
                          (states, day) => ({
                            ...states,
                            [day]: dayHours[day]?.[hour] || "available",
                          }),
                          {}
                        ),
                        daysOfWeek
                      )
                    }
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => handleHover(`hour-${hour}`)}
                    onMouseLeave={() => handleHover(null)}
                  >
                    {hour}
                  </button>
                  <HoverInstruction
                    text={`Select all`}
                    isVisible={hoveredElement === `hour-${hour}`}
                    offsetX={hoverPosition.x}
                    offsetY={hoverPosition.y}
                  />
                </div>
                <div className="flex flex-col">
                  {daysOfWeek.map((day) => (
                    <div
                      key={`${day}-${hour}`}
                      className="h-10 flex flex-shrink"
                    >
                      <PlayerTimeSlot
                        day={day}
                        hour={hour}
                        state={
                          (dayHours[day]?.[hour] as
                            | "available"
                            | "single"
                            | "recurring") || "available"
                        }
                        onStateChange={onHoursStateChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCalendarDesktop;
