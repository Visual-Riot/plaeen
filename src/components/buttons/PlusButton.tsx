import React from 'react';

// Define the prop types for the button
interface PlusButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string; // Add className prop
}

const PlusButton: React.FC<PlusButtonProps> = ({ isOpen, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-pink-purple rounded-lg flex items-center justify-center w-10 h-10 ${className}`}
    >
      <span className="text-aubergine text-2xl font-medium flex items-center justify-center leading-none mb-1">
        {isOpen ? '−' : '+'}
      </span>
    </button>
  );
};

export default PlusButton;
