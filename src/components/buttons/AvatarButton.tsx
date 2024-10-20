"use client";

import React from "react";

interface AvatarButtonProps {
  onClick: () => void;
  imageSrc?: string;
  altText?: string;
  children?: React.ReactNode;
  className?: string;
}

const AvatarButton: React.FC<AvatarButtonProps> = ({ onClick, imageSrc, altText, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-darkPurple w-[103px] h-[103px] rounded-e-3xl rounded-t-3xl hover:bg-violet transition-all duration-200 hover:text-green group flex items-center justify-center ${className}`}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={altText} className="w-full h-full rounded-e-3xl rounded-t-3xl object-cover" />
      ) : (
        children
      )}
    </button>
  );
};

export default AvatarButton;
