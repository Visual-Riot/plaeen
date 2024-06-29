import React from 'react';
import { BiSolidDownArrow } from "react-icons/bi";

const DownArrow: React.FC = () => {
  return (
    <div className="flex justify-center my-10">
      <BiSolidDownArrow className='text-neonGreen w-6 h-6 animate-bounce' />
    </div>
  );
};

export default DownArrow;
