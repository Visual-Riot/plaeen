import React from 'react';

// Assuming Icon can be a component or a string URL
type USPsProps = {
    icon: string;
    headline: string;
    text: string;
    className?: string;
};

const USPs: React.FC<USPsProps> = ({ icon, headline, text, className = '' }) => {
    return (
        <div className={`relative text-left p-10 m-5 shadow-lg rounded-lg w-full lg:w-1/4 min-h-[300px] ${className}`}>
            <img src={icon} alt="Icon" className="mb-4 w-12 h-auto left-0" />
            <h3 className="text-[22px] my-6 text-white font-medium font-sofia">{headline}</h3>
            <p className="text-[16px] text-[#BFCCD8] font-sofia font-extralight leading-7">{text}</p>
        </div>
    );
};

export default USPs;
