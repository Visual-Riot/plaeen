import React, { useState, useRef, useEffect } from 'react';
import WhiteArrow from '../icons/WhiteArrow';

interface PlayerModeFilterProps {
  selectedPlayerModes: string[];
  handlePlayerModeChange: (playerModes: string[]) => void;
  className?: string;
}

const PlayerModeFilter: React.FC<PlayerModeFilterProps> = ({ selectedPlayerModes, handlePlayerModeChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const playerModes = [
    "combat",
    "full-controller-support",
    "multiplayer",
    "partial-controller-support",
    "singleplayer",
    "steam-achievements",
    "steam-cloud",
    "tactic",
    "top-down",
    "VR"
  ];
  

  // Utility function to format player modes for display
  const formatPlayerModeName = (playerMode: string) => {
    return playerMode
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePlayerModeToggle = (playerMode: string) => {
    if (selectedPlayerModes.includes(playerMode)) {
      handlePlayerModeChange(selectedPlayerModes.filter(t => t !== playerMode));
    } else {
      handlePlayerModeChange([...selectedPlayerModes, playerMode]);
    }
  };

  return (
    <div
      ref={ref}
      className={`relative inline-block text-left w-full ${className}`}
      style={{
        backgroundColor: 'rgba(88, 17, 192, 0.1)',
        border: '1px solid #5811C0',
        borderRadius: '8px',
        height: '65px',
      }}
    >
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-full rounded-md px-4 bg-transparent text-xl font-extraLight font-sofia text-white hover:bg-violet focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            height: '65px',
            paddingTop: '0',
            paddingBottom: '0',
          }}
        >
          <span className="leading-none text-sm">Player Mode</span>
          <div className="flex items-center">
            <span
              className="mr-2 flex items-center justify-center rounded-full bg-lightPurple text-white"
              style={{
                width: '30px',
                height: '30px',
                fontSize: '0.875rem',
              }}
            >
              {selectedPlayerModes.length}
            </span>
            <WhiteArrow
              className={`mr-2 h-3 w-3 transform ${isOpen ? "rotate-180" : "rotate-0"}`}
              noAnimation={true} // Disable animation
              color="text-white" // Set color to white
            />
          </div>
        </button>
      </div>
      {isOpen && (
        <div
            className="absolute mt-2 w-full rounded-md shadow-lg bg-violet z-10"
            style={{
                maxHeight: '450px', // Set the maximum height
                minWidth: '230px',
                overflowY: 'auto'   // Add vertical scroll if the content exceeds 200px
            }}
        >
        <style jsx>{`
            div::-webkit-scrollbar {
                width: 8px; /* Set scrollbar width */
            }
            div::-webkit-scrollbar-track {
                background: #2e004f; /* Dark purple track */
            }
            div::-webkit-scrollbar-thumb {
                background-color: #5811C0; /* Lighter purple for the thumb */
                border-radius: 10px; /* Make the scrollbar thumb rounded */
            }
            div::-webkit-scrollbar-thumb:hover {
                background-color: #7e30e8; /* Lighter color on hover for thumb */
            }
        `}</style>
          <div className="py-1">
            {playerModes.map((playerMode) => (
              <div
                key={playerMode}
                className="px-4 py-2 text-white flex items-center cursor-pointer hover:bg-violet-dark"
                onClick={() => handlePlayerModeToggle(playerMode)}
              >
                <input
                  type="checkbox"
                  checked={selectedPlayerModes.includes(playerMode)}
                  onChange={() => handlePlayerModeToggle(playerMode)}
                  className="mr-2"
                />
                {formatPlayerModeName(playerMode)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerModeFilter;
