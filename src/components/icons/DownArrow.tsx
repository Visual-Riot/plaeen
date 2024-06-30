import React from 'react';
import { BiSolidDownArrow } from "react-icons/bi";

const DownArrow: React.FC = () => {
  return (
    <div className="flex justify-center my-10 xxs:mt-[-240px] sm:mt-[-225px] lg:mt-[-200px]">
      <BiSolidDownArrow className='text-neonGreen w-6 h-6 animate-bounce' />
    </div>
  );
};

export default DownArrow;
