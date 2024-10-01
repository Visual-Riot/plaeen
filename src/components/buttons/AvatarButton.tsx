"use client";

import React from "react";

interface AvatarButtonProps {
  onClick: () => void;
  imageSrc?: string;
  altText?: string;
  children?: React.ReactNode;
}

const AvatarButton: React.FC<AvatarButtonProps> = ({ onClick, imageSrc, altText, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-darkPurple w-[103px] h-[103px] rounded-e-3xl rounded-t-3xl hover:bg-violet transition-all duration-200 hover:text-green group flex items-center justify-center"
    >
      {imageSrc ? (
        <img src={imageSrc} alt={altText} className="w-full h-full rounded-e-3xl rounded-t-3xl" />
      ) : (
        children
      )}
    </button>
  );
};

export default AvatarButton;
