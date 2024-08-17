import React, { useState } from 'react';
import { FaHeart, FaExternalLinkAlt, FaSteam, FaPlaystation, FaXbox, FaApple, FaWindows, FaLinux, FaAndroid, FaGlobe } from 'react-icons/fa';
import { BsNintendoSwitch } from "react-icons/bs";
import { SiPlaystationvita, SiWiiu } from "react-icons/si";
import { FiHeart } from 'react-icons/fi';
import { format } from 'date-fns';

interface GameCardProps {
  coverImage: string;
  name: string;
  releaseDate: string;
  genre: string;
  platform: string;
  rating: string;
  onCreateSession: () => void;
  onFavourite: () => void;
  gameInfoUrl: string;
}

const GameCard: React.FC<GameCardProps> = ({
  coverImage,
  name,
  releaseDate,
  genre,
  platform,
  rating,
  onCreateSession,
  onFavourite,
  gameInfoUrl
}) => {
  const [isFavourited, setIsFavourited] = useState(false);

  const handleFavouriteClick = () => {
    setIsFavourited(!isFavourited);
    onFavourite();
  };

  // Format the release date
  const formattedDate = format(new Date(releaseDate), 'dd MMMM yyyy');

  // Platform icons map
  const platformIcons = {
    Steam: <FaSteam size={20} className="text-white" />,
    PlayStation: <FaPlaystation size={20} className="text-white" />,
    Xbox: <FaXbox size={20} className="text-white" />,
    macOS: <FaApple size={20} className="text-white" />,
    iOS: <FaApple size={20} className="text-white" />,
    PC: <FaWindows size={20} className="text-white" />,
    Linux: <FaLinux size={20} className="text-white" />,
    Android: <FaAndroid size={20} className="text-white" />,
    Web: <FaGlobe size={20} className="text-white" />,
    "Nintendo Switch": <BsNintendoSwitch size={20} className="text-white" />,
    "Nintendo 3DS": <BsNintendoSwitch size={20} className="text-white" />,
    "PS Vita": <SiPlaystationvita size={20} className="text-white" />,
    "Wii U": <SiWiiu size={20} className="text-white" />,
  };

  // Normalize platform name to handle different PlayStation and Xbox models
  const normalizePlatformName = (platform: string) => {
    if (/PlayStation/i.test(platform)) {
      return "PlayStation";
    }
    if (/Xbox/i.test(platform)) {
      return "Xbox";
    }
    if (/macOs/i.test(platform) || /iOs/i.test(platform)) {
      return "macOS";
    }
    if (/nintendo switch/i.test(platform) || /nintendo 3ds/i.test(platform)) {
      return "Nintendo Switch";
    }
    return platform;
  };

  // Split the platform string into an array and normalize the names
  const platforms = platform.split(', ').map(plat => normalizePlatformName(plat.trim()));

  // Track displayed icons to avoid duplicates
  const displayedIcons = new Set<string>();

  return (
    <div className="max-w-[20rem] mx-auto rounded overflow-hidden bg-transparent text-white">
        <img 
          className="w-full h-48 rounded-t-xl object-cover" 
          src={coverImage} 
          alt={`${name} cover`} 
        />
        <div className="px-2 py-4">
            <div className="font-semiBold text-neonGreen text-xl mb-2">{name}</div>
            
            <div className="flex justify-between text-gray-400 text-base border-b border-b-taupe py-2">
                <span>Release Date:</span>
                <span>{formattedDate}</span>
            </div>
            
            <div className="flex justify-between text-gray-400 text-base border-b border-b-taupe py-2">
                <span>Genre:</span>
                <span>{genre}</span>
            </div>
            
            <div className="flex justify-between text-gray-400 text-base border-b border-b-taupe py-2">
                <span>Platform:</span>
                <div className="flex gap-2">
                {platforms.map((plat) => {
                  const iconKey = plat as keyof typeof platformIcons;
                  if (!displayedIcons.has(iconKey)) {
                    displayedIcons.add(iconKey);
                    return (
                      <span key={plat} className="inline-flex items-center">
                        {platformIcons[iconKey] || plat} {/* Default to text if no icon */}
                      </span>
                    );
                  }
                  return null; // Do not render if icon is already displayed
                })}
                </div>
            </div>
            
            <div className="flex justify-between text-gray-400 text-base py-2">
                <span>Rating:</span>
                <span>{rating}</span>
            </div>
        </div>
      <div className="px-2 pt-4 pb-6 flex justify-between items-center gap-2">
        <button
          className="bg-violet text-white font-medium font-roboto py-2 px-4 uppercase rounded"
          onClick={onCreateSession}
          style={{ width: '70%' }}
        >
          Create Session
        </button>
        <button
          className="flex justify-center items-center bg-pink-purple p-3 h-[40px] rounded"
          onClick={handleFavouriteClick}
          style={{ width: '15%' }}
        >
          {isFavourited ? (
            <FaHeart size={24} />
          ) : (
            <FiHeart size={24} />
          )}
        </button>
        <a
          href={gameInfoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center text-blue-500 hover:text-blue-700 bg-pink-purple p-3 h-[40px] rounded"
          style={{ width: '15%' }}
        >
          <FaExternalLinkAlt size={24} />
        </a>
      </div>
    </div>
  );
};

export default GameCard;
