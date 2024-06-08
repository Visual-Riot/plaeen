import React, { ReactNode } from 'react';

type DivProps = {
  children?: ReactNode;
  className?: string;
  bgImageUrl?: string; // Optional background image URL prop
}

// Highlighted game div component
const DivComponent: React.FC<DivProps> = ({ children, className, bgImageUrl }) => {
    const divStyle = bgImageUrl ? { backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {};
    return (
      <div
        className={`w-full flex flex-col items-center justify-start ${className}`}
        style={divStyle}
      >
        {children}
      </div>
    );
};
  
export default DivComponent;  