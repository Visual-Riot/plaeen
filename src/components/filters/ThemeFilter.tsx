import React, { useState, useRef, useEffect } from 'react';
import WhiteArrow from '../icons/WhiteArrow';

interface ThemeFilterProps {
  className?: string;
}

const ThemeFilter: React.FC<ThemeFilterProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]); // To track selected themes
  const ref = useRef<HTMLDivElement>(null);

  const themes = ["Multiplayer", "Singleplayer", "First-Person", "Third-Person", "VR"];

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
    setSelectedThemes(prevSelected => 
      prevSelected.includes(theme)
        ? prevSelected.filter(t => t !== theme) // Uncheck
        : [...prevSelected, theme]              // Check
    );
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
          <span className="leading-none text-sm">
            {selectedThemes.length > 0 ? selectedThemes.join(', ') : 'Theme'}
          </span>
          <WhiteArrow
            className={`mr-2 h-3 w-3 transform ${isOpen ? "rotate-180" : "rotate-0"}`}
            noAnimation={true} // Disable animation
            color="text-white" // Set color to white
          />
        </button>
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full rounded-md shadow-lg bg-violet z-10">
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
                  onChange={() => handleThemeToggle(theme)} // Prevents checkbox click bubbling issues
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
