import React, { useState, useRef, useEffect } from 'react';
import WhiteArrow from '../icons/WhiteArrow';

interface ThemeFilterProps {
  selectedThemes: string[];
  handleThemeChange: (themes: string[]) => void;
  className?: string;
}

const ThemeFilter: React.FC<ThemeFilterProps> = ({ selectedThemes, handleThemeChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const themes = ["Animal", "City", "Friends", "Geometry", "Night", "Plants", "Secrets", "Wave", "Zombies"];

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

  const handleThemeToggle = (theme: string) => {
    if (selectedThemes.includes(theme)) {
      handleThemeChange(selectedThemes.filter(t => t !== theme));
    } else {
      handleThemeChange([...selectedThemes, theme]);
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
          <span className="leading-none text-sm">Theme</span>
          <div className="flex items-center">
            <span
              className="mr-2 flex items-center justify-center rounded-full bg-lightPurple text-white"
              style={{
                width: '30px',
                height: '30px',
                fontSize: '0.875rem',
              }}
            >
              {selectedThemes.length}
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
            {themes.map((theme) => (
              <div
                key={theme}
                className="px-4 py-2 text-white flex items-center cursor-pointer hover:bg-violet-dark"
                onClick={() => handleThemeToggle(theme)}
              >
                <input
                  type="checkbox"
                  checked={selectedThemes.includes(theme)}
                  onChange={() => handleThemeToggle(theme)}
                  className="mr-2"
                />
                {theme}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeFilter;
