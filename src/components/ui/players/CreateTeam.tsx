import React from 'react';

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void;       // Function to call on button click
  className?: string;        // Optional prop to allow custom styling
}

// Create team button component
const CreateTeam: React.FC<ButtonProps> = ({children, onClick, className = ''}) => {
  return (
    <button
      className={`btn bg-violet text-white rounded-tl-xl rounded-br-xl rounded-tr-xl inline-flex items-center ${className}`}
      onClick={onClick}
    >
      <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 5v14m7-7H5"></path>
      </svg>
      {children}
    </button>
  );
};

export default CreateTeam;