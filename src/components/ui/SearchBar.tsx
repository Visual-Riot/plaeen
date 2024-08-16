import React from 'react';
import clsx from 'clsx';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Optional className prop to allow additional styles
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', value, onChange, className }) => {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          'w-4/5 text-white placeholder-white placeholder-opacity-70 py-2 px-10 rounded h-[65px] text-xl',
          className
        )}
        style={{
          backgroundColor: 'rgba(88, 17, 192, 0.2)',
          border: '1px solid #5811C0',
        }}
      />
    </div>
  );
};

export default SearchBar;
