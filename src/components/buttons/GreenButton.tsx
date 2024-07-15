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
      // className={`btn bg-neonGreen rounded-lg text-black py-2 px-4 xs:w-[115px] sm:w-[203px] h-[64px] xs:ml-0 sm:ml-4 ${className}`}
      className={`btn bg-neonGreen rounded-lg font-semiBold text-black py-3 px-6  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GreenButton;
