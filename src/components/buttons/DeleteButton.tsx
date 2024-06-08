import React from 'react';

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void;       // Function to call on button click
  className?: string;        // Optional prop to allow custom styling
}

// Button component
const DeleteButton: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <button
      className={`btn bg-red rounded-full text-white py-1 px-1 inline-flex items-center ${className}`}
      onClick={onClick}
    >
      <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M19 7v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7h14zm-2 0H7" />
      </svg>
      {children}
    </button>
  );
};

export default DeleteButton;
