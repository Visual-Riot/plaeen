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
        <div className={`relative text-left p-10 shadow-lg rounded-lg w-[260px] h-100 bg-aubergine ${className}`}>
            <img src={icon} alt="Icon" className="mb-4 w-12 h-auto left-0" />
            <h3 className="text-[20px] my-6 text-white font-medium font-sofia">{headline}</h3>
            <p className="text-lightGrey font-sofia font-light">{text}</p>
        </div>
    );
};

export default USPs;