import React from 'react';

// Define the prop types for the button
type ButtonProps = {
  onClick: () => void;       // Function to call on button click
  className?: string;        // Optional prop to allow custom styling
}

// Add player button component
const PlayerIcon: React.FC<ButtonProps> = ({onClick, className = ''}) => {
  return (
    <button
      className={`btn bg-grey text-darkGrey rounded-full flex justify-center items-center ${className}`}
      onClick={onClick}
      style={{ width: '100px', height: '100px' }}  // Increase the button size
    >
      <svg
        className="w-7 h-7" // Make the plus icon larger
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="8" // Increase the thickness of the plus sign
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 5v14m7-7H5"></path>
      </svg>
    </button>
  );
};

export default PlayerIcon;
