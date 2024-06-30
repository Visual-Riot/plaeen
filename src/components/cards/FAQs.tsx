import React, { useState } from 'react';
import PlusButton from '../buttons/PlusButton';

interface FaqCardProps {
  question: string;
  answer: string;
}

const FaqCard: React.FC<FaqCardProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-usp2 bg-opacity-80 shadow-lg rounded-lg p-4 my-2 backdrop-blur-sm border-none xxs:w-[90%] mx-auto">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-light font-sofia ms-3 text-white">{question}</h3>
        <PlusButton isOpen={isOpen} onClick={toggleOpen} className="text-white text-2xl" />
      </div>
      {isOpen && <p className="mt-4 text-lightGrey ms-3 font-extralight font-sofia">{answer}</p>}
    </div>
  );
};

export default FaqCard;
