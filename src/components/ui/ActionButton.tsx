import React from 'react';

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void;       // Function to call on button click
  className?: string;        // Optional prop to allow custom styling
  type?: "button" | "submit" | "reset"; // Optional type prop
}

// Button component
const ActionButton: React.FC<ButtonProps> = ({children, onClick, className = '', type = 'button'}) => {
  return (
    <button
      type={type}
      className={`btn bg-neonGreen rounded-lg text-black py-2 px-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ActionButton;