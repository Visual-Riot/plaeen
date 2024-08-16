import React, { useState, useRef, useEffect } from 'react';

interface RelevanceFilterProps {
  selectedOption: string;
  handleRelevanceChange: (option: string) => void;
  className?: string;
}

const RelevanceFilter: React.FC<RelevanceFilterProps> = ({ selectedOption, handleRelevanceChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const options = ["None", "A-Z", "Z-A", "By Rating", "By Release Date"];

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
            {selectedOption === "None" ? "Relevance" : selectedOption}
          </span>
          <svg
            className={`ml-2 h-5 w-5 transform ${isOpen ? "rotate-180" : "rotate-0"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M10 14l-5-5h10l-5 5z"
              fill="#fff"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full rounded-md shadow-lg bg-violet z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map(option => (
              <button
                key={option}
                className={`${
                  selectedOption === option ? 'bg-purple-700' : ''
                } block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-700`}
                onClick={() => {
                  handleRelevanceChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelevanceFilter;
