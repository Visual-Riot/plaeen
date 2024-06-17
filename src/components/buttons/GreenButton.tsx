import React from "react";

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void; // Function to call on button click
  className?: string; // Optional prop to allow custom styling
};

// Button component
const GreenButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`btn bg-green rounded-lg text-black text-base font-semibold py-3 px-5 opacity-50 hover:opacity-80 ease-in-out duration-500 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GreenButton;
