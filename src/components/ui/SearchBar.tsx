import React from 'react';
import clsx from 'clsx';
import { FaTimes } from 'react-icons/fa'; // Import an icon for the cross button

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Optional className prop to allow additional styles
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', value, onChange, className }) => {
  return (
    <div className={clsx('flex justify-center relative w-4/5 mx-auto', className)}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-white placeholder-white placeholder-opacity-70 py-2 pl-10 pr-14 rounded h-[65px] text-xl w-full"
        style={{
          backgroundColor: 'rgba(88, 17, 192, 0.2)',
          border: '1px solid #5811C0',
        }}
      />
      {value && (
        <button
          onClick={() => onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 focus:outline-none"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
