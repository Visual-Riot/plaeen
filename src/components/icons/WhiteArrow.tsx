import React from 'react';
import { TbTriangleInvertedFilled } from "react-icons/tb";

interface WhiteArrowProps {
  className?: string;
  noAnimation?: boolean;
  color?: string;
}

const WhiteArrow: React.FC<WhiteArrowProps> = ({ className, noAnimation = false, color = "text-neonGreen" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <TbTriangleInvertedFilled className={`${color} w-full h-full ${noAnimation ? '' : 'animate-bounce'}`} />
    </div>
  );
};

export default WhiteArrow;
