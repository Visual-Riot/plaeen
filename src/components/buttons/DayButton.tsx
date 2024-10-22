import React, { useState } from "react";

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void; // Function to call on button click
  className?: string; // Optional prop to allow custom styling
  state?: "selected" | "unselected";
};

// Button component
const DayButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  state,
}) => {
  const getButtonColor = () => {
    switch (state) {
      case "selected":
        return "bg-lightPurple bg-opacity-70 text-black";
      case "unselected":
        return "bg-lightPurple bg-opacity-30 text-lightPurple ";
      default:
        return "bg-lightPurple bg-opacity-30 text-black ";
    }
  };

  const defaultClasses =
    "grow btn rounded-sm w-11 h-12 ease-in-out duration-300";

  return (
    <button
      className={`${defaultClasses} ${getButtonColor()} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DayButton;
