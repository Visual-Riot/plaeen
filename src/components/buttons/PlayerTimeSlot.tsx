import React, { useState, useEffect } from "react";

interface ButtonProps {
  day: string;
  hour: number;
  className?: string;
  state: "available" | "single" | "recurring";
  displayedHour?: { hour: number; ampm: string };
  onStateChange: (
    day: string,
    hour: number,
    newState: "available" | "single" | "recurring"
  ) => void;
}

const PlayerTimeSlot: React.FC<ButtonProps> = ({
  hour,
  day,
  displayedHour,
  state: initialState,
  onStateChange,
  className = "",
}) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  // handle click on the button
  const handleClick = () => {
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
    "grow w-12 h-12 lg:w-4 lg:h-4 xl:h-5 xl:w-5 font-semibold hover:scale-90 transition-all ease-in-out duration-300 rounded";

  return (
    <button
      className={`${defaultClasses} ${className} ${getButtonColor()}`}
      onClick={handleClick}
    >
      {displayedHour ? (
        <p>
          <span className="font-bold text-base">{displayedHour.hour}</span>{" "}
          <span className="opacity-60 text-xs">{displayedHour.ampm}</span>
        </p>
      ) : (
        displayedHour
      )}
    </button>
  );
};

export default PlayerTimeSlot;
