import React, { useState, useEffect } from 'react';
import { FaHeart, FaExternalLinkAlt, FaSteam, FaPlaystation, FaXbox, FaApple, FaWindows, FaLinux, FaAndroid, FaGlobe } from 'react-icons/fa';
import { BsNintendoSwitch } from "react-icons/bs";
import { SiPlaystationvita, SiWiiu } from "react-icons/si";
import { FiHeart } from 'react-icons/fi';
import { format, isValid } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";

interface GameCardProps {
  id: number;
  coverImage: string;
  name: string;
  releaseDate: string;
  genre: string;
  platform: string;
  rating: string;
  teamId: string;
  onCreateSession: () => void;
  isfavourited: boolean;
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
  isfavourited,
  onFavourite,
  gameInfoUrl
}) => {
  const [isFavourited, setIsFavourited] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the game is already favourited
    const favouritedGames = JSON.parse(localStorage.getItem('favouritedGames') || '[]');
    const isAlreadyfavourited = favouritedGames.some((game: { name: string }) => game.name === name);
    setIsFavourited(isAlreadyfavourited);
  }, [name]);
  
  const { id } = useParams(); // Capture teamId from the URL

  const handleFavouriteClick = () => {
    let favouritedGames = JSON.parse(localStorage.getItem('favouritedGames') || '[]');
    
    if (isFavourited) {
      // Remove the game from favourites
      favouritedGames = favouritedGames.filter((game: { name: string }) => game.name !== name);
      localStorage.setItem('favouritedGames', JSON.stringify(favouritedGames));
    } else {
      // Add the game to favourites
      const favouriteGameDetails = {
        name,
        releaseDate: formattedDate,
        genre,
        platform,
        rating,
        coverImage,
      };
      favouritedGames.push(favouriteGameDetails);
      localStorage.setItem('favouritedGames', JSON.stringify(favouritedGames));
    }
  
    // Store the user details (for example, username) in local storage
    const username = localStorage.getItem('plaeenUsername');
    if (username) {
      localStorage.setItem('favouriteUser', username);
    }
  
    setIsFavourited(!isFavourited);
    onFavourite();
  };
  
  const formattedDate = isValid(new Date(releaseDate))
  ? format(new Date(releaseDate), 'dd MMMM yyyy')
  : 'Unknown release date'; // Fallback for invalid or missing dates

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

  const handleCreateSessionClick = () => {
    const gameDetails = {
      name,
      releaseDate: formattedDate,
      genre,
      platform,
      rating,
      coverImage,
    };
  
    // Store the game details in local storage
    localStorage.setItem('selectedGame', JSON.stringify(gameDetails));
  
    // Store the user details (for example, username) in local storage
    const username = localStorage.getItem('plaeenUsername');
    if (username) {
      localStorage.setItem('sessionUser', username);
    }
  
    // Call the parent component's onCreateSession if needed
    onCreateSession();
  
    // Redirect to the team-schedule page
    router.push(`/team-schedule/${id}`);
  };
  

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
                <span className='text-right'>{formattedDate}</span>
            </div>
            
            <div className="flex justify-between text-gray-400 text-base border-b border-b-taupe py-2">
                <span>Genre:</span>
                <span className='text-right'>{genre}</span>
            </div>
            
            <div className="flex justify-between text-gray-400 text-base border-b border-b-taupe py-2">
                <span>Platform:</span>
                <div className="flex flex-wrap gap-2 ms-4 justify-end">
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
      <div className="px-2 pt-4 pb-6 flex justify-between items-center gap-2 xxs:flex-col xl:flex-row">
        <button
          className="bg-violet text-white font-medium font-roboto py-2 px-4 uppercase rounded xxs:w-[100%] xl:w-[70%]"
          onClick={handleCreateSessionClick}
        >
          Create Session
        </button>
        <div className='flex xxs:justify-between xxs:w-full xxs:gap-3 xxs:mt-1 xl:justify-normal xl:w-[30%] xl:gap-2 xl:mt-0'>
        <button onClick={onFavourite} className="p-2 rounded-full">
          {isfavourited ? (
            <FaHeart size={24} color="red" /> // Filled heart if favourited
          ) : (
            <FiHeart size={24} /> // Empty heart if not favourited
          )}
        </button>
          <a
            href={gameInfoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center text-blue-500 hover:text-blue-700 bg-pink-purple xxs:p-3 lg:p-2 h-[40px] rounded xxs:w-[100%] lg:w-[50%]"
          >
            <FaExternalLinkAlt size={24} />
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default GameCard;
