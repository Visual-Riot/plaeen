import React from "react";

// Define the prop types for the button
type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  color?: string;
  hoverColor?: string;
};

// Button component
const TertiaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  color = "mediumGrey",
  hoverColor = "lightPurple",
}) => {
  const textColor = `text-${color}`;
  const hoverTextColor = `hover:text-${hoverColor}`;
  return (
    <button
      className={`btn ${textColor} ${hoverTextColor} py-1 px-2 inline-flex items-center justify-center ease-in-out duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TertiaryButton;
