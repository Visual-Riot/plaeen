/*
This is the calendar grid that displays the availability of a user / team for a week.

It contains:
  - the calendar grid that displays the availability of a user for a week.
  - the logic for handling the state of the hour slots.
*/

"use client";
import TimeSlotBtn from "./TimeSlotBtn";
import DayButton from "../buttons/DayButton"; // for mobile
import React, { useState, useCallback, useEffect } from "react";
import { startOfWeek, format, addDays } from "date-fns";
import { Tooltip } from "@nextui-org/react";
import { updateHourStateInLocalStorage } from "@/lib/utils/localStorageUtils";
import { TimeSlotState } from "@/types/TimeSlotState";

interface CalendarGridProps {
  dayHours: { [key: string]: { [key: number]: string } };
  currentDate: Date;
  onHoursStateChange: (
    day: string,
    hour: number,
    newState: TimeSlotState,
    selectedDay?: string
  ) => void;
  onSelectAllSlotsForDays?: (
    day: string,
    currentStates: { [hour: number]: string },
    hoursOfDay: number[]
  ) => void;
  onSelectAllSlotsForHours?: (
    hour: number,
    currentStates: { [day: string]: string },
    daysOfWeek: string[]
  ) => void;
  className?: string;
  isActive?: boolean;
  isMobile?: boolean;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  dayHours,
  currentDate,
  onHoursStateChange,
  onSelectAllSlotsForDays,
  onSelectAllSlotsForHours,
  className = "",
  isActive = true,
  isMobile = false,
}) => {
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekKey = format(start, "yyy-MM-dd");

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(start, i);
    return {
      dayName: format(date, "EEEE"),
      shortDayName: format(date, "EEE"),
      dayDate: format(date, "dd"),
      dayDesktopDate: format(date, "EEEE dd"),
      dayKey: format(date, "yyyy-MM-dd"),
    };
  });

  const formatHour = (hour: number) => ({
    formattedHour: hour % 12 || 12,
    ampm: hour >= 12 ? "PM" : "AM",
  });

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i + 1);

  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [touchedSlots, setTouchedSlots] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Flash animation when changing the selected day
  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    setAnimationTrigger(true);
    setTimeout(() => {
      setAnimationTrigger(false);
    }, 300);
  };

  //   HANDLERS

  //  Select slots on move/drag
  const processSlotSelection = (elementAtPoint: HTMLElement) => {
    if (
      elementAtPoint &&
      elementAtPoint.classList.contains("player-time-slot")
    ) {
      const day = elementAtPoint.getAttribute("data-day") as string;
      const hour = parseInt(elementAtPoint.getAttribute("data-hour") as string);

      if (day && hour) {
        const slotKey = `${day}-${hour}`;
        if (!touchedSlots[slotKey]) {
          setTouchedSlots((prev) => ({ ...prev, [slotKey]: true }));

          const currentState =
            dayHours[day]?.[hour] || TimeSlotState.AvailableNever;

          if (
            currentState === TimeSlotState.TeamAllAvailable ||
            TimeSlotState.TeamPartAvailable ||
            TimeSlotState.TeamNotAvailable ||
            TimeSlotState.InvitationReceived ||
            TimeSlotState.InvitationSent
          )
            return;
          const newState =
            currentState === TimeSlotState.AvailableNever
              ? TimeSlotState.AvailableOnce
              : currentState === TimeSlotState.AvailableOnce
              ? TimeSlotState.AvailableAlways
              : TimeSlotState.AvailableNever;
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
  };

  //   TOUCH EVENTS : FOR DRAGGING & SELECTING ON GESTURE -- MOBILE
  const handleTouchStart = () => setIsDragging(true);

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    const elementAtPoint = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    ) as HTMLElement;
    processSlotSelection(elementAtPoint);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchedSlots({});
  };

  // HANDLE MOUSE EVENTS : FOR DRAGGING & SELECTING ON GESTURE -- DESKTOP
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const elementAtPoint = document.elementFromPoint(
          e.clientX,
          e.clientY
        ) as HTMLElement;
        processSlotSelection(elementAtPoint);
      }
    },
    [isDragging, touchedSlots, dayHours, onHoursStateChange, weekKey]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setTouchedSlots({});
  }, []);

  // Add event listeners for mouse and touch events and remove them on unmount

  useEffect(() => {
    const addListeners = () => {
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const removeListeners = () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    addListeners();
    return removeListeners;
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  //   RENDER SLOTS --- on MOBILE
  const renderMobileTimeSlots = () => {
    return hoursOfDay.map((hour) => {
      const { formattedHour, ampm } = formatHour(hour);

      const dayKey = daysOfWeek.find(
        (day) => day.dayName === selectedDay
      )?.dayKey;

      const slotState = dayKey
        ? dayHours[dayKey]?.[hour] || TimeSlotState.AvailableNever
        : TimeSlotState.AvailableNever;

      return (
        <div
          key={hour}
          className={`flex justify-center ${
            animationTrigger ? "animate-flash" : ""
          }`}
        >
          <TimeSlotBtn
            day={dayKey as string}
            hour={hour}
            state={slotState as TimeSlotState}
            displayedHour={{ hour: formattedHour, ampm }}
            onStateChange={onHoursStateChange}
            isDragging={isDragging}
          />
        </div>
      );
    });
  };

  const renderDesktopHours = () => {
    return hoursOfDay.map((hour) => (
      <div key={hour} className="text-center justify-center items-center">
        <div className="h-10 flex items-center relative">
          {/* Display Hours */}
          <button
            className="text-lightPurple font-robotoMono font-regular uppercase text-center w-full h-10 pb-2"
            onClick={() => {
              // Get the current states for all days for the selected hour
              const currentStates = daysOfWeek.reduce(
                (states, { dayKey }) => ({
                  ...states,
                  [dayKey]:
                    dayHours[dayKey]?.[hour] || TimeSlotState.AvailableNever,
                }),
                {}
              );

              // Call the function to select all slots for this hour
              if (onSelectAllSlotsForHours) {
                // Call the function to select all slots for this hour
                onSelectAllSlotsForHours(
                  hour,
                  currentStates,
                  daysOfWeek.map(({ dayKey }) => dayKey)
                );
              } else {
                console.error("onSelectAllSlotsForHours is not defined");
              }
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
              <TimeSlotBtn
                day={dayKey}
                hour={hour}
                state={
                  (dayHours[dayKey]?.[hour] as TimeSlotState) ||
                  (isActive
                    ? TimeSlotState.AvailableNever
                    : TimeSlotState.TeamNotAvailable)
                }
                onStateChange={onHoursStateChange}
              />
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const renderDesktopDays = () => {
    return daysOfWeek.map(({ dayKey, dayDate, dayName }) => (
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
            onClick={() => {
              if (onSelectAllSlotsForDays) {
                onSelectAllSlotsForDays(
                  dayKey,
                  dayHours[dayKey] || {},
                  hoursOfDay
                );
              } else {
                console.error("onSelectAllSlotsForDays is not defined");
              }
            }}
          >
            <div className="flex items-center gap-x-3">
              <span className="text-base">{dayName}</span>
              <span className="text-sm opacity-50">{`${dayDate}`}</span>
            </div>
          </button>
        </Tooltip>
      </div>
    ));
  };

  return (
    <>
      {isMobile ? (
        <div className={`mt-2 mb-10 ${className}`}>
          <div className="w-full">
            {/* Days Names Column */}
            <div className="grid grid-cols-7 gap-1 md:gap-1 px-2 mt-4">
              {daysOfWeek.map(({ shortDayName, dayName, dayDate }) => (
                <div key={dayName} className="flex justify-center">
                  <DayButton
                    state={selectedDay === dayName ? "selected" : "unselected"}
                    onClick={() => {
                      handleDayChange(dayName);
                    }}
                    className="h-[5rem]"
                  >
                    <div className="flex flex-col items-center">
                      <p className="text-sm">{shortDayName}</p>
                      <p className="text-xl font-bold">{dayDate}</p>
                    </div>
                  </DayButton>
                </div>
              ))}
            </div>

            {/* Render time slots for the selected day */}
            <div className="grid grid-cols-6 gap-2 md:gap-4 px-2 mt-4 touch-none test">
              {renderMobileTimeSlots()}
            </div>
            {/* end of render time slots */}
          </div>
        </div>
      ) : (
        <div
          className={`my-5 w-full flex ${className}`}
          onMouseDown={handleMouseDown}
        >
          {/* Days Names Column */}
          <div className="flex flex-col">
            <div className="h-[30px]"></div>

            {renderDesktopDays()}
          </div>

          {/* Hours columns */}
          <div className="flex flex-col w-full">
            <div className="flex flex-row">
              <div className="w-5 md:w-10 h-10"></div>
              <div className="flex flex-row justify-between w-full">
                {renderDesktopHours()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarGrid;
