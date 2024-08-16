import React, { useState } from 'react';

interface GenreFilterProps {
  selectedGenres: string[];
  handleGenreChange: (genres: string[]) => void;
  className?: string;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenres, handleGenreChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const genres = ["Action", "Adventure", "RPG", "Simulation", "Strategy"];

  const handleCheckboxChange = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      handleGenreChange(selectedGenres.filter(g => g !== genre));
    } else {
      handleGenreChange([...selectedGenres, genre]);
    }
  };

  return (
    <div
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
          className="inline-flex justify-between items-center w-full rounded-md px-4 bg-transparent text-xl font-extraLight font-sofia text-white hover:bg-[#5811C0] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            height: '65px',
            paddingTop: '0',
            paddingBottom: '0',
          }}
        >
          <span className="leading-none text-sm">Genre</span>
          <div className='flex'>
            <span
                className="ml-2 flex items-center justify-center rounded-full bg-lightPurple text-white"
                style={{
                  width: '24px',
                  height: '24px',
                  fontSize: '0.875rem',
                }}
              >
                {selectedGenres.length}
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
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full rounded-md shadow-lg bg-[#5811C0] z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {genres.map(genre => (
              <div key={genre} className="px-4 py-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleCheckboxChange(genre)}
                  />
                  <span className="ml-2 text-white">{genre}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreFilter;
