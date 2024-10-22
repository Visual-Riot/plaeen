/*
This component is the calendar container that contains the calendar grid and the logic for handling the state of the hour slots.

It contains:
  - the calendar grid that displays the availability of a user for a week.
  - the logic for handling the state of the hour slots.
  - the logic for handling the select all functionality.
  - the logic for displaying the mobile and desktop versions of the calendar.
*/

import React, { useState, useEffect } from "react";
import { updateHourStateInLocalStorage } from "@/lib/utils/localStorageUtils";
import { startOfWeek, format } from "date-fns";
import CalendarGrid from "./CalendarGrid";
import { TimeSlotState } from "@/types/TimeSlotState";

interface CalendarContainerProps {
  dayHours: { [key: string]: { [key: number]: string } };
  setDayHours: React.Dispatch<
    React.SetStateAction<{ [key: string]: { [key: number]: string } }>
  >;
  currentDate: Date;
  isActive?: boolean;
}

const CalendarContainer: React.FC<CalendarContainerProps> = ({
  dayHours,
  setDayHours,
  currentDate,
  isActive = true,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  const getDaysOfWeek = (date: Date) => {
    const days = [];
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getUTCDay(); // 0 is Sunday, 1 is Monday, etc.

    // Adjust the start date to Monday
    startOfWeek.setDate(
      startOfWeek.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    );

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      days.push(currentDay.toISOString().split("T")[0]); // Format: yyyy-MM-dd
    }

    return days;
  };

  const daysOfWeek = getDaysOfWeek(currentDate);
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekKey = format(start, "yyy-MM-dd");

  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i + 1);

  // Handle screen resize to display mobile or desktop version of the calendar
  useEffect(() => {
    const handleResize: () => void = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to handle the change of the state of a specific hour slot
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

  // SELECT ALL -----------------------------------------------------------------------
  const getNextState = (currentState: string) => {
    switch (currentState) {
      case TimeSlotState.AvailableNever:
        return TimeSlotState.AvailableOnce;
      case TimeSlotState.AvailableOnce:
        return TimeSlotState.AvailableAlways;
      case TimeSlotState.AvailableAlways:
        return TimeSlotState.AvailableNever;
      default:
        return TimeSlotState.AvailableNever;
    }
  };

  // ----- Handle select all
  const selectAllSlotsForDays = (
    day: string,
    currentStates: { [hour: number]: string }
  ) => {
    const firstHourState =
      currentStates[hoursOfDay[0]] || TimeSlotState.AvailableNever;
    const nextState = getNextState(firstHourState);

    setDayHours((prevDayHours) => {
      const updatedDayHours = { ...prevDayHours };
      if (!updatedDayHours[day]) {
        updatedDayHours[day] = {};
      }
      hoursOfDay.forEach((hour) => {
        updatedDayHours[day][hour] = nextState;

        updateHourStateInLocalStorage(weekKey, day, hour.toString(), nextState);
      });
      return updatedDayHours;
    });
  };

  const selectAllSlotsForHours = (
    hour: number,
    currentStates: { [day: string]: string }
  ) => {
    const firstDayState =
      currentStates[daysOfWeek[0]] || TimeSlotState.AvailableNever;
    const nextState = getNextState(firstDayState);

    setDayHours((prevDayHours) => {
      const updatedDayHours = { ...prevDayHours };
      daysOfWeek.forEach((day) => {
        if (!updatedDayHours[day]) {
          updatedDayHours[day] = {};
        }
        updatedDayHours[day][hour] = nextState;

        updateHourStateInLocalStorage(weekKey, day, hour.toString(), nextState);
      });
      return updatedDayHours;
    });
  };

  // RENDER VISUALS -----------------------------------------------------------------------
  return (
    <div className="player-calendar-wrapper">
      {/* Mobile version of the calendar */}

      {isMobile ? (
        <CalendarGrid
          className="flex lg:hidden"
          dayHours={dayHours}
          onHoursStateChange={handleHourStateChange}
          currentDate={currentDate}
          isActive={isActive}
          isMobile={true}
        />
      ) : (
        // Desktop version of the calendar
        <CalendarGrid
          className="hidden lg:flex"
          dayHours={dayHours}
          onHoursStateChange={handleHourStateChange}
          onSelectAllSlotsForHours={selectAllSlotsForHours}
          onSelectAllSlotsForDays={selectAllSlotsForDays}
          currentDate={currentDate}
          isActive={isActive}
        />
      )}
    </div>
  );
};

export default CalendarContainer;
