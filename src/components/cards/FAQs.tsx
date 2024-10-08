import React, { useState } from "react";
import PlusButton from "../buttons/PlusButton";

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
    <div
      className="bg-usp2 bg-opacity-80 shadow-lg rounded-lg p-4 my-2 backdrop-blur-sm border-none cursor-pointer"
      onClick={toggleOpen}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-light font-sofia ms-3 text-white">
          {question}
        </h3>
        <PlusButton
          isOpen={isOpen}
          onClick={(e) => {
            e.stopPropagation(); // Prevent click on button from triggering the parent div's click
            toggleOpen();
          }}
          className="text-white text-2xl"
        />
      </div>
      {isOpen && (
        <p className="mt-4 mb-3 text-lightGrey ms-3 font-extralight font-sofia">
          {answer}
        </p>
      )}
    </div>
  );
};

export default FaqCard;
