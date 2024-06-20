import React, { useState } from "react";

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void; // Function to call on button click
  className?: string; // Optional prop to allow custom styling
  state: "selected" | "unselected";
};

// Button component
const DayButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  const [state, setState] = useState<"selected" | "unselected">("unselected");

  const handleClick = () => {
    setState((prevState) => {
      switch (prevState) {
        case "selected":
          return "unselected";
        case "unselected":
          return "selected";
        default:
          return "unselected";
      }
    });
  };

  const getButtonColor = () => {
    switch (state) {
      case "selected":
        return "bg-lightPurple bg-opacity-50 text-black";
      case "unselected":
        return "bg-darkPurple bg-opacity-50 text-white ";
      default:
        return "bg-darkPurple bg-opacity-40 text-white ";
    }
  };

  const defaultClasses =
    "grow btn rounded-md w-11 h-11 ease-in-out duration-300";

  return (
    <button
      className={`${defaultClasses} ${getButtonColor()}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default DayButton;
