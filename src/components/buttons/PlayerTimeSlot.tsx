"use client";
import React, { useState } from "react";

interface ButtonProps {
  hour: number;
}

const PlayerTimeSlot: React.FC<ButtonProps> = ({ hour }) => {
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
  };

  const getButtonColor = () => {
    switch (state) {
      case "available":
        return "bg-green opacity-40";
      case "single":
        return "bg-cyanAccent opacity-80";
      case "recurring":
        return "bg-pinkAccent opacity-80";
      default:
        return "bg-green opacity-40";
    }
  };

  const defaultClasses =
    "w-6 h-6 hover:scale-90 ease-in-out duration-200 text-black rounded mx-1";

  return (
    <button
      className={`${defaultClasses} ${getButtonColor()}`}
      onClick={handleClick}
    ></button>
  );
};

export default PlayerTimeSlot;
