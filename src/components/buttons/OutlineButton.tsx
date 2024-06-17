import React from "react";

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void; // Function to call on button click
  className?: string; // Optional prop to allow custom styling
};

// Button component
const OutlineButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`btn bg-transparent border border-lightGrey border-2 rounded-lg text-lightGrey py-2 px-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
