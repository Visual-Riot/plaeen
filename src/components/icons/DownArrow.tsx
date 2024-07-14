import React from 'react';
import { TbTriangleInvertedFilled } from "react-icons/tb";

const DownArrow: React.FC = () => {
  return (
    <div className="flex justify-center my-10 xxs:mt-[-240px] sm:mt-[-225px] lg:mt-[-200px]">
      <TbTriangleInvertedFilled className='text-neonGreen w-6 h-6 animate-bounce' />
    </div>
  );
};

export default DownArrow;
