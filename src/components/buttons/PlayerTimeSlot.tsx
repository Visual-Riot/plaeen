"use client";
import React, { useState, useEffect } from "react";

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
  state: initialState,
  className = "",
}) => {
  const [state, setState] = useState(initialState);

  const handleClick = () => {
    switch (state) {
      case "available":
        setState("single");
        break;
      case "single":
        setState("recurring");
        break;
      case "recurring":
        setState("available");
        break;
      default:
        break;
    }
  };

  const getButtonColor = () => {
    switch (state) {
      case "available":
        return "bg-green bg-opacity-60 lg:bg-opacity-80 text-black";
      case "single":
        return "bg-accentOne bg-opacity-80  border-3 border-offWhite text-offWhite";
      case "recurring":
        return "bg-accentTwo bg-opacity-80 text-black";
      default:
        return "bg-green bg-opacity-60 lg:bg-opacity-80 text-darkPurple";
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
