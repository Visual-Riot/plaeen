import React, { useState, useEffect, useRef } from "react";
import { format, startOfWeek, parseISO } from "date-fns";
import { updateHourStateInLocalStorage } from "@/lib/utils/localStorageUtils";

/*
STATES EXPLANATION

0 - not available and not active (for team calendar)

----STATES FOR PLAYER CALENDAR----
1 - not available
2 - available this week
3 - always available

----STATES FOR TEAM CALENDAR----
4 - All team members available
5 - Part of the team available
6 - game session invitation sent
7 - game session invitation received
*/

interface PlayerTimeSlotProps {
  day: string;
  hour: number;
  state: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
  displayedHour?: { hour: number; ampm: string };
  onStateChange: (day: string, hour: number, newState: "1" | "2" | "3") => void;
  isDragging?: boolean;
  className?: string;
}

const PlayerTimeSlot: React.FC<PlayerTimeSlotProps> = ({
  hour,
  day,
  displayedHour,
  state: initialState,
  onStateChange,
  className = "",
  isDragging,
}) => {
  const [state, setState] = useState(initialState);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const weekKey = format(
    startOfWeek(parseISO(day), { weekStartsOn: 1 }),
    "yyy-MM-dd"
  );

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  // handle click on the button
  const handleClick = (e: React.MouseEvent) => {
    console.log(state);
    if (isDragging) return;
    const newState = state === "1" ? "2" : state === "2" ? "3" : "1"; // 1 - not available | 2 - available this week | 3 -always available
    setState(newState);
    onStateChange(day, hour, newState);

    updateHourStateInLocalStorage(weekKey, day, hour.toString(), newState);
  };

  const getButtonColor = () => {
    switch (state) {
      case "0": // not available and not active (for team calendar)
        return "border-2 border-solid bg-black border-darkGrey border-opacity-80 bg-opacity-30 rounded text-offWhite hover:scale-90 pointer-events-none cursor-not-allowed";
      case "1": // not available
        return "border-2 border-solid bg-black border-darkGrey border-opacity-80 bg-opacity-30 rounded text-offWhite hover:scale-90";
      case "2": // available this week
        return "bg-lightPurple border-solid border-darkGrey border-opacity-20 border-2 text-black hover:scale-90";
      case "3": // always available
        return "bg-green border-solid border-darkGrey border-opacity-20 border-2 text-black hover:scale-90";
      case "4": // All team members available
        return "bg-green border-solid border-darkGrey border-opacity-20 border-2 text-black hover:scale-90";
      case "5": // part of the team available
        return "bg-green bg-opacity-10 border-solid border-green border-opacity-60 border-2 text-black hover:scale-90";
      case "6": // game session invitation sent
        return "bg-black bg-opacity-40 border-solid border-darkGrey border-opacity-20 border-2 cursor-not-allowed text-offWhite hover:scale-90";
      case "7": // game session invitation received
        return "bg-black bg-opacity-40 border-solid border-darkGrey border-opacity-20 border-2 cursor-not-allowed text-offWhite hover:scale-90";
      default:
        return "border-2 border-solid bg-black border-darkGrey border-opacity-80 bg-opacity-30 rounded text-offWhite hover:scale-90";
    }
  };

  const defaultClasses =
    "grow lg:grow-0 w-12 h-12 lg:w-5 lg:h-5 font-semibold transition-all ease-in-out duration-300 rounded";

  return (
    <button
      className={`${defaultClasses} ${className} ${getButtonColor()} player-time-slot`}
      onClick={handleClick}
      title={`${day}-${hour}`}
      ref={buttonRef}
      data-day={day}
      data-hour={hour}
    >
      {displayedHour ? (
        <p className="pointer-events-none">
          <span className="font-bold text-base pointer-events-none">
            {displayedHour.hour}
          </span>{" "}
          <span className="opacity-60 text-xs pointer-events-none">
            {displayedHour.ampm}
          </span>
        </p>
      ) : (
        displayedHour
      )}
    </button>
  );
};

export default PlayerTimeSlot;
