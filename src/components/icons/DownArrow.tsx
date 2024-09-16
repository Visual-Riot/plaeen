import React from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";

const DownArrow: React.FC<{ scrollTo: () => void }> = ({ scrollTo }) => {
  return (
    <div className="flex justify-center my-10 mt-[-200px] sm:mt-[-200px] lg:mt-[-200px]">
      <button onClick={scrollTo}>
        <TbTriangleInvertedFilled className="text-neonGreen w-6 h-6 animate-bounce" />
      </button>
    </div>
  );
};

export default DownArrow;
