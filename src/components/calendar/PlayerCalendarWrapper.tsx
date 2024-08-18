import React, { useState, useEffect, useRef } from "react";
import PlayerCalendarDesktop from "./PlayerCalendarDesktop";
import PlayerCalendarMobile from "./PlayerCalendarMobile";
import { format, startOfWeek } from "date-fns";

interface PlayerCalendarWrapperProps {
  dayHours: { [key: string]: { [key: number]: string } };
  setDayHours: React.Dispatch<
    React.SetStateAction<{ [key: string]: { [key: number]: string } }>
  >;
  currentDate: Date;
}

const PlayerCalendarWrapper: React.FC<PlayerCalendarWrapperProps> = ({
  dayHours,
  setDayHours,
  currentDate,
}) => {
  const selectedDay = "Monday";
  const [isMobile, setIsMobile] = useState(false);

  // Get the current week key
  const getCurrentWeekKey = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    return format(start, "dd.MM.yyyy");
  };

  const weekKey = getCurrentWeekKey(currentDate);

  // handle local storage to get and set days and hours states
  useEffect(() => {
    const storedState = localStorage.getItem(`dayHours-${weekKey}`);
    if (storedState) {
      try {
        setDayHours(JSON.parse(storedState));
      } catch (error) {
        console.error("Error parsing stored state", error);
        localStorage.removeItem(`dayHours-${weekKey}`);
      }
    } else {
      setDayHours({});
    }
  }, [weekKey, setDayHours]);

  useEffect(() => {
    localStorage.setItem(`dayHours-${weekKey}`, JSON.stringify(dayHours));
  }, [dayHours, weekKey]);

  // Handle screen resize to display mobile or desktop version of the calendar
  useEffect(() => {
    const handleResize = () => {
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
      case "available":
        return "single";
      case "single":
        return "recurring";
      case "recurring":
        return "available";
      default:
        return "single";
    }
  };

  // ----- Handle select all slots for days
  const selectAllSlotsForDays = (
    day: string,
    currentStates: { [hour: number]: string },
    hoursOfDay: number[]
  ) => {
    const firstHourState = currentStates[hoursOfDay[0]];
    const nextState = getNextState(firstHourState);

    setDayHours((prevDayHours) => {
      const updatedDayHours = { ...prevDayHours };

      if (!updatedDayHours[day]) {
        updatedDayHours[day] = {};
      }

      hoursOfDay.forEach((hour) => {
        updatedDayHours[day][hour] = nextState;
      });

      return updatedDayHours;
    });
  };

  // ------ Handle select all slots for hours

  const selectAllSlotsForHours = (
    hour: number,
    currentStates: { [day: string]: string },
    daysOfWeek: string[]
  ) => {
    const firstDayState = currentStates[daysOfWeek[0]];
    const nextState = getNextState(firstDayState);

    setDayHours((prevDayHours) => {
      const updatedDayHours = { ...prevDayHours };

      daysOfWeek.forEach((day) => {
        if (!updatedDayHours[day]) {
          updatedDayHours[day] = {};
        }
        updatedDayHours[day][hour] = nextState;
      });

      return updatedDayHours;
    });
  };

  // RENDER VISUALS -----------------------------------------------------------------------
  return (
    <div>
      {isMobile ? (
        <PlayerCalendarMobile
          className="flex lg:hidden"
          dayHours={dayHours}
          onHoursStateChange={handleHourStateChange}
          selectedDay={selectedDay}
          currentDate={currentDate}
        />
      ) : (
        <PlayerCalendarDesktop
          className="hidden lg:flex"
          dayHours={dayHours}
          onHoursStateChange={handleHourStateChange}
          onSelectAllSlotsForHours={selectAllSlotsForHours}
          onSelectAllSlotsForDays={selectAllSlotsForDays}
          currentDate={currentDate}
        />
      )}
    </div>
  );
};

export default PlayerCalendarWrapper;
