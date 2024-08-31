import React from "react";

interface HelpIconProps {
  className?: string;
}

const HelpIcon: React.FC<HelpIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    id="fi_10997321"
    className={className}
    color="currentColor"
  >
    <g id="Layer_19" data-name="Layer 19" fill="currentColor">
      <path d="M24,18a6,6,0,0,0-6,5.61l-.31-.32a1,1,0,0,0-1.42,1.42l2,2a1,1,0,0,0,1.42,0l2-2a1,1,0,0,0-1.42-1.42l-.24.25a4,4,0,0,1,7.46-1.45A3.85,3.85,0,0,1,28,24a4,4,0,0,1-4,4,3.85,3.85,0,0,1-1.91-.49,1,1,0,1,0-1,1.76A6,6,0,1,0,24,18Z"></path>
      <path d="M28,4H26V3a1,1,0,0,0-2,0V4H20V3a1,1,0,0,0-2,0V4H14V3a1,1,0,0,0-2,0V4H8V3A1,1,0,0,0,6,3V4H4A2,2,0,0,0,2,6V28a2,2,0,0,0,2,2H16.52a1,1,0,0,0,0-2H4V12H28v4.52a1,1,0,0,0,2,0V6A2,2,0,0,0,28,4ZM4,10V6H6A1,1,0,0,0,8,6h4a1,1,0,0,0,2,0h4a1,1,0,0,0,2,0h4a1,1,0,0,0,2,0h2v4Z"></path>
    </g>
  </svg>
);

export default HelpIcon;
