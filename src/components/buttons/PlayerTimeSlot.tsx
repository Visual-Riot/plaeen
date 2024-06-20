"use client";
import React, { useState } from "react";

interface ButtonProps {
  day: string;
  hour: number;
  className?: string;
  state: "available" | "single" | "recurring";
  displayedHour?: number;
}

const PlayerTimeSlot: React.FC<ButtonProps> = ({
  hour,
  day,
  displayedHour,
}) => {
  const [state, setState] = useState<"available" | "single" | "recurring">(
    "available"
  );

  const handleClick = () => {
    setState((prevState) => {
      switch (prevState) {
        case "available":
          return "single";
        case "single":
          return "recurring";
        case "recurring":
          return "available";
        default:
          return "available";
      }
    });

    console.log(`Hour ${hour} on ${day} is now ${state}`);
  };

  const getButtonColor = () => {
    switch (state) {
      case "available":
        return "bg-green bg-opacity-80 text-darkPurple";
      case "single":
        return "bg-accentOne border-3 border-offWhite bg-opacity-80 text-darkPurple";
      case "recurring":
        return "bg-accentTwo bg-opacity-80 text-lightPurple";
      default:
        return "bg-green bg-opacity-80 text-darkPurple";
    }
  };

  const defaultClasses =
    "grow w-12 h-12 lg:w-4 lg:h-4 xl:h-5 xl:w-5 font-semibold hover:scale-90 ease-in-out duration-200 rounded";

  return (
    <button
      className={`${defaultClasses} ${getButtonColor()}`}
      onClick={handleClick}
    >
      {displayedHour}
    </button>
  );
};

export default PlayerTimeSlot;
