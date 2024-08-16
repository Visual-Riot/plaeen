import React, { useState } from 'react';
import { FaHeart, FaExternalLinkAlt, FaSteam, FaPlaystation, FaXbox, FaApple } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { format } from 'date-fns';

interface GameCardProps {
  coverImage: string;
  name: string;
  releaseDate: string;
  genre: string;
  platform: string; // Change to string
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
    PC: <FaApple size={20} className="text-white" />, // Replace with a more appropriate icon if needed
  };

  // Split the platform string into an array
  const platforms = platform.split(', ').map(plat => plat.trim());

  return (
    <div className="max-w-sm rounded overflow-hidden bg-transparent text-white">
        <img className="w-full h-48 object-cover" src={coverImage} alt={`${name} cover`} />
        <div className="px-6 py-4">
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
                {platforms.map((plat) => (
                    <span key={plat} className="inline-flex items-center">
                    {platformIcons[plat as keyof typeof platformIcons] || plat} {/* Default to text if no icon */}
                    </span>
                ))}
                </div>
            </div>
            
            <div className="flex justify-between text-gray-400 text-base py-2">
                <span>Rating:</span>
                <span>{rating}</span>
            </div>
        </div>
      <div className="px-6 pt-4 pb-6 flex justify-between items-center gap-2">
        <button
          className="bg-violet text-white font-medium font-roboto py-2 px-4 uppercase rounded"
          onClick={onCreateSession}
          style={{ width: '70%' }}
        >
          Create Session
        </button>
        <button
          className="flex justify-center items-center bg-pink-purple py-2 px-4 rounded"
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
          className="flex justify-center items-center text-blue-500 hover:text-blue-700 bg-pink-purple py-2 px-4 rounded"
          style={{ width: '15%' }}
        >
          <FaExternalLinkAlt size={24} />
        </a>
      </div>
    </div>
  );
};

export default GameCard;
