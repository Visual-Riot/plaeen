"use client";
import PlayerTimeSlot from "../buttons/PlayerTimeSlot";
import React, { useState, useCallback } from "react";
import { startOfWeek, format, addDays } from "date-fns";
import { Tooltip } from "@nextui-org/react";
import { updateHourStateInLocalStorage } from "@/lib/utils/localStorageUtils";

interface PlayerCalendarDesktopProps {
  dayHours: { [key: string]: { [key: number]: string } };
  onHoursStateChange: (
    day: string,
    hour: number,
    newState: "1" | "2" | "3" | "4" | "5" | "6" | "7",
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
  currentDate: Date;
  className?: string;
  isActive?: boolean;
}

const PlayerCalendarDesktop: React.FC<PlayerCalendarDesktopProps> = ({
  dayHours,
  onHoursStateChange,
  onSelectAllSlotsForDays,
  onSelectAllSlotsForHours,
  currentDate,
  className = "",
  isActive = true,
}) => {
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekKey = format(start, "yyy-MM-dd");

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(start, i);
    return {
      dayName: format(date, "EEEE"),
      shortDayName: format(date, "EEE"),
      dayDate: format(date, "EEEE dd"),
      dayKey: format(date, "yyyy-MM-dd"),
    };
  });

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i + 1);

  const [isDragging, setIsDragging] = useState(false);
  const [touchedSlots, setTouchedSlots] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const { clientX, clientY } = e;
        const elementAtPoint = document.elementFromPoint(
          clientX,
          clientY
        ) as HTMLElement;

        if (
          elementAtPoint &&
          elementAtPoint.classList.contains("player-time-slot")
        ) {
          const day = elementAtPoint.getAttribute("data-day") as string;
          const hour = parseInt(
            elementAtPoint.getAttribute("data-hour") as string
          );

          if (day && hour) {
            const slotKey = `${day}-${hour}`;

            if (!touchedSlots[slotKey]) {
              setTouchedSlots((prev) => ({ ...prev, [slotKey]: true }));

              const currentState = dayHours[day]?.[hour] || "1";
              // const newState =
              //   currentState === "1" ? "2" : currentState === "2" ? "3" : currentState === "1" : return;

              const newState: "1" | "2" | "3" | "4" | "5" | "6" | "7" = (() => {
                if (currentState === "1") {
                  return "2";
                } else if (currentState === "2") {
                  return "3";
                } else if (currentState === "3") {
                  return "1";
                } else {
                  return currentState as
                    | "1"
                    | "2"
                    | "3"
                    | "4"
                    | "5"
                    | "6"
                    | "7"; // Default state if none of the conditions match
                }
              })();
              onHoursStateChange(day, hour, newState);

              updateHourStateInLocalStorage(
                weekKey,
                day,
                hour.toString(),
                newState
              );
            }
          }
        }
      }
    },
    [isDragging, touchedSlots, dayHours, onHoursStateChange, weekKey]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setTouchedSlots({});
  }, []);

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`my-5 w-full flex ${className}`}
      onMouseDown={handleMouseDown}
    >
      {/* Days Names Column */}
      <div className="flex flex-col">
        <div className="h-[30px]"></div>

        {daysOfWeek.map(({ dayKey, dayDate }) => (
          <div key={dayKey} className="h-10 flex items-center relative">
            <Tooltip
              closeDelay={50}
              placement="left"
              content="Select all"
              key={"default"}
              color="default"
              className="bg-black rounded text-nowrap text-sm text-offWhite transition-opacity duration-500 ease-in-out py-1 px-2"
            >
              <button
                className="hidden md:inline text-lightPurple font-robotoMono font-regular uppercase text-nowrap"
                onClick={() =>
                  onSelectAllSlotsForDays(
                    dayKey,
                    dayHours[dayKey] || {},
                    hoursOfDay
                  )
                }
              >
                <div className="flex items-center gap-x-3">
                  <span className="text-base">{dayDate.split(" ")[0]}</span>
                  <span className="text-sm opacity-50">
                    {`${dayDate.split(" ")[1]}`}
                  </span>
                </div>
              </button>
            </Tooltip>
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
                  {/* Display Hours */}
                  <button
                    className="text-lightPurple font-robotoMono font-regular uppercase text-center w-full h-10 pb-2"
                    onClick={() => {
                      // Get the current states for all days for the selected hour
                      const currentStates = daysOfWeek.reduce(
                        (states, { dayKey }) => ({
                          ...states,
                          [dayKey]: dayHours[dayKey]?.[hour] || "1",
                        }),
                        {}
                      );

                      // Call the function to select all slots for this hour
                      onSelectAllSlotsForHours(
                        hour,
                        currentStates,
                        daysOfWeek.map(({ dayKey }) => dayKey)
                      );
                    }}
                  >
                    <Tooltip
                      closeDelay={50}
                      content="Select all"
                      key={"default"}
                      color="default"
                      className="bg-black rounded text-nowrap text-sm text-offWhite transition-opacity duration-500 ease-in-out py-1 px-2"
                    >
                      {hour}
                    </Tooltip>
                  </button>
                </div>
                <div className="flex flex-col">
                  {daysOfWeek.map(({ dayKey }) => (
                    <div key={`${dayKey}-${hour}`} className="h-10 flex">
                      <PlayerTimeSlot
                        day={dayKey}
                        hour={hour}
                        state={
                          (dayHours[dayKey]?.[hour] as
                            | "1"
                            | "2"
                            | "3"
                            | "4"
                            | "5"
                            | "6"
                            | "7") || (isActive ? "1" : "0")
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
