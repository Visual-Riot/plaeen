import React from "react";

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void; // Function to call on button click
  className?: string; // Optional prop to allow custom styling
  color?: string;
  hoverColor?: string;
};

// Button component
const TertiaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  color = "mediumGrey",
  hoverColor = "lightPurple",
}) => {
  return (
    <button
      className={`btn text-${color} hover:text-${hoverColor} py-1 px-2 inline-flex items-center justify-center ease-in-out duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TertiaryButton;
