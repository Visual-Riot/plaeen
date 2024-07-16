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
  const [selectedState, setSelectedState] = useState<string>("available");

  // window.innerWidth can only be referenced after component mounts
  useEffect(() => {
    setIsMobile(window.innerWidth <= 1024);
  }, []);

  // handle local storage to get and set days and hours states
  useEffect(() => {
    const storedState = localStorage.getItem("dayHours");
    if (storedState) {
      setDayHours(JSON.parse(storedState));
    }
  }, [isMobile]);

  useEffect(() => {
    localStorage.setItem("dayHours", JSON.stringify(dayHours));
  }, [dayHours]);

  // Handle screen resize to display mobile or desktop version of the calendar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
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
        />
      ) : (
        <PlayerCalendarDesktop
          className="hidden lg:flex"
          dayHours={dayHours}
          onHoursStateChange={handleHourStateChange}
          onSelectAllSlotsForHours={selectAllSlotsForHours}
          onSelectAllSlotsForDays={selectAllSlotsForDays}
        />
      )}
    </div>
  );
};

export default PlayerCalendarWrapper;
