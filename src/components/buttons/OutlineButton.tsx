import React from "react";

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void; // Function to call on button click
  className?: string; // Optional prop to allow custom styling
  color?: string; // Optional prop to allow custom color
  hoverColor?: string; // Optional prop to allow custom hover color
};

// Button component
const OutlineButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  color = "lightGrey",
  hoverColor = "lightPurple",
}) => {
  return (
    <button
      className={`btn bg-transparent border-${color} hover:border-${hoverColor} text-${color} hover:text-${hoverColor} border-2 rounded-lg h-12 pb-1 px-3 ease-in-out duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
