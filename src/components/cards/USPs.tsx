import Image from "next/image";
import React from "react";

// Assuming Icon can be a component or a string URL
type USPsProps = {
  icon: string;
  headline: string;
  text: string;
  className?: string;
};

const USPs: React.FC<USPsProps> = ({
  icon,
  headline,
  text,
  className = "",
}) => {
  return (
    <div
      className={`relative text-left p-7 lg:p-10 2xl:p-16 shadow-lg rounded-lg min-h-[100px] lg:min-h-[300px] ${className}`}
    >
      <Image
        src={icon}
        alt="Icon"
        className="mb-4 left-0"
        width={70}
        height={70}
      />
      <h3 className="text-[22px] my-6 text-white font-medium font-sofia">
        {headline}
      </h3>
      <p className="text-[16px] text-lightGrey font-sofia font-extralight leading-7">
        {text}
      </p>
    </div>
  );
};

export default USPs;
