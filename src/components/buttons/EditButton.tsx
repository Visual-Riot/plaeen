import React from 'react';

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void;       // Function to call on button click
  className?: string;        // Optional prop to allow custom styling
}

// Button component
const EditButton: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <button
      className={`btn bg-lightGrey rounded-full text-black py-1 px-1 inline-flex items-center ${className}`}
      onClick={onClick}
    >
      <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536-3.75 3.75H11.5V8.982l3.732-3.75zm1.768-.768a2 2 0 112.828 2.828L18.06 9.768l-3.536-3.536 2.476-2.468zM12 12.25v3.25h3.25L19.5 12M5.5 20.5h13"/>
      </svg>
      {children}
    </button>
  );
};

export default EditButton;