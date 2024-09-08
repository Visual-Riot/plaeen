import React, { useState, useEffect, useRef } from "react";

interface PlayerTimeSlotProps {
  day: string;
  hour: number;
  state: "available" | "single" | "recurring";
  displayedHour?: { hour: number; ampm: string };
  onStateChange: (
    day: string,
    hour: number,
    newState: "available" | "single" | "recurring"
  ) => void;
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

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  // handle click on the button
  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) return;

    const newState =
      state === "available"
        ? "single"
        : state === "single"
        ? "recurring"
        : "available";
    setState(newState);
    onStateChange(day, hour, newState);
  };

  const getButtonColor = () => {
    switch (state) {
      case "available":
        return "border-2 border-solid bg-black border-green border-opacity-20 bg-opacity-15 text-offWhite";
      case "single":
        return "bg-accentThree border-solid border-accentThree border-2 text-black";
      case "recurring":
        return "bg-accentOne border-solid border-accentOne border-2 text-black";
      default:
        return "border-2 border-solid bg-mediumGrey border-green border-opacity-20 bg-opacity-10  lg:bg-opacity-80 text-offWhite";
    }
  };

  const defaultClasses =
    "grow lg:grow-0 w-12 h-12 lg:w-5 lg:h-5 font-semibold hover:scale-90 transition-all ease-in-out duration-300 rounded";

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
