import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  color?: string;
  hoverColor?: string;
};

const OutlineButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  color = "lightGrey",
  hoverColor = "lightPurple",
}) => {
  const borderColor = `border-${color}`;
  const hoverBorderColor = `hover:border-${hoverColor}`;
  const textColor = `text-${color}`;
  const hoverTextColor = `hover:text-${hoverColor}`;

  return (
    <button
      className={`btn bg-transparent ${borderColor} ${hoverBorderColor} ${textColor} ${hoverTextColor} border-2 rounded-lg h-12 pb-1 px-3 ease-in-out duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
