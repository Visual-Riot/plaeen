import React from "react";

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void; // Function to call on button click
  className?: string; // Optional prop to allow custom styling
};

// Button component
const PurpleButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`btn bg-lightPurple bg-opacity-70 hover:bg-opacity-90 hover:scale-95 rounded-lg text-black py-2 px-4 transition-all duration-300 ease-in-out ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PurpleButton;
