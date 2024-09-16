import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  color?: string;
  hoverColor?: string;
};

const TertiaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  color = "mediumGrey",
  hoverColor = "lightPurple",
}) => {
  return (
    <button
      className={`btn text-${color} hover:text-${hoverColor} hover:fill-${hoverColor} py-1 px-2 inline-flex items-center justify-center ease-in-out duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TertiaryButton;
