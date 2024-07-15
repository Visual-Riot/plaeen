import React from "react";

interface HoverInstructionProps {
  text: string;
  isVisible: boolean;
  offsetX: number;
  offsetY: number;
}

const HoverInstruction: React.FC<HoverInstructionProps> = ({
  text,
  isVisible,
  offsetX,
  offsetY,
}) => {
  const styles: React.CSSProperties = {
    left: `${offsetX}px`,
    top: `${offsetY}px`,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? "visible" : "hidden",
    pointerEvents: "none",
  };

  return (
    <div
      style={styles}
      className="absolute py-1 px-2 z-50 bg-black rounded text-nowrap text-sm text-offWhite transition-opacity duration-500 ease-in-out"
    >
      {text}
    </div>
  );
};

export default HoverInstruction;
