import React from 'react';

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode; // Accept any valid React node
  onClick: () => void;       // Function to call on button click
  className?: string;        // Optional prop to allow custom styling
}

// Player icon button component
const PlayerIcon: React.FC<ButtonProps> = ({children, onClick, className = ''}) => {
  return (
    <button
      className={`btn relative overflow-hidden bg-transparent rounded-full ${className}`}
      onClick={onClick}
      style={{ padding: 0 }}  // Remove padding to ensure the image can fill the button
    >
      <div className="absolute inset-0">
        {children}  {/* Assuming children might be an <img /> element */}
      </div>
    </button>
  );
};

export default PlayerIcon;