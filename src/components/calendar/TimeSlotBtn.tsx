import React, { useState, useEffect, useRef } from "react";
import { format, startOfWeek, parseISO, set } from "date-fns";
import { updateHourStateInLocalStorage } from "@/lib/utils/localStorageUtils";
import { TimeSlotState } from "@/types/TimeSlotState";

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

interface TimeSlotBtnProps {
  day: string;
  hour: number;
  state: TimeSlotState;
  displayedHour?: { hour: number; ampm: string };
  onStateChange: (day: string, hour: number, newState: TimeSlotState) => void;
  isDragging?: boolean;
  className?: string;
}

const TimeSlotBtn: React.FC<TimeSlotBtnProps> = ({
  hour,
  day,
  displayedHour,
  state: initialState,
  onStateChange,
  className = "",
  isDragging,
}) => {
  const [state, setState] = useState(
    initialState || TimeSlotState.AvailableNever
  );
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

    // If the state is not 1, 2, or 3, prevent further state changes
    if (
      state !== TimeSlotState.AvailableNever &&
      state !== TimeSlotState.AvailableOnce &&
      state !== TimeSlotState.AvailableAlways
    )
      return;

    // Update state for valid state values (1, 2, or 3)
    if (state === TimeSlotState.AvailableNever) {
      setState(TimeSlotState.AvailableOnce);
      onStateChange(day, hour, TimeSlotState.AvailableOnce);
    } else if (state === TimeSlotState.AvailableOnce) {
      setState(TimeSlotState.AvailableAlways);
      onStateChange(day, hour, TimeSlotState.AvailableAlways);
    } else if (state === TimeSlotState.AvailableAlways) {
      setState(TimeSlotState.AvailableNever);
      onStateChange(day, hour, TimeSlotState.AvailableNever);
    }

    updateHourStateInLocalStorage(weekKey, day, hour.toString(), state);
  };

  const getButtonColor = () => {
    switch (state) {
      case TimeSlotState.AvailableNever: // not available
        return "border-2 border-solid bg-black border-darkGrey border-opacity-80 bg-opacity-30 rounded text-offWhite hover:scale-90";
      case TimeSlotState.AvailableOnce: // available this week
        return "bg-lightPurple border-solid border-darkGrey border-opacity-20 border-2 text-black hover:scale-90";
      case TimeSlotState.AvailableAlways: // always available
        return "bg-green border-solid border-darkGrey border-opacity-20 border-2 text-black hover:scale-90";
      case TimeSlotState.TeamNotAvailable: // not available and not active (for team calendar)
        return "border-2 border-solid bg-black border-darkGrey border-opacity-80 bg-opacity-30 rounded text-offWhite hover:scale-90 pointer-events-none cursor-not-allowed";
      case TimeSlotState.TeamAllAvailable: // All team members available
        return "bg-green border-solid border-darkGrey border-opacity-20 border-2 text-black hover:scale-90";
      case TimeSlotState.TeamPartAvailable: // part of the team available
        return "bg-green bg-opacity-10 border-solid border-green border-opacity-60 border-2 text-black hover:scale-90";
      case TimeSlotState.InvitationSent: // game session invitation sent
        return "bg-darkPurple border-solid border-darkGrey border-2 rounded text-offWhite hover:scale-90";
      case TimeSlotState.InvitationReceived: // game session invitation received
        return "bg-lightPurple border-solid border-darkGrey border-2 rounded text-offWhite hover:scale-90";
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

export default TimeSlotBtn;
