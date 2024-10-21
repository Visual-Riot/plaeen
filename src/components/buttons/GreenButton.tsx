import React from "react";

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void; // Function to call on button click
  className?: string; // Optional prop to allow custom styling
  disabled?: boolean; // optional prop to disable green button
};

// Button component
const GreenButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`btn bg-neonGreen rounded-lg font-semiBold text-black py-3 px-6 opacity-70 hover:opacity-100 hover:scale-[98%] transition-all duration-300 ease-in-out  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GreenButton;
