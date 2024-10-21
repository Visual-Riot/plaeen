import { FaHeart, FaExternalLinkAlt, FaPlus } from "react-icons/fa"; // Import FaPlus for the new icon

interface WishlistGameCardProps {
  gameId: number;
  gameName: string;
  backgroundImage: string;
  isFavourited: boolean;
  onFavourite: () => void;
  onCreateSession: () => void;
  gameInfoUrl: string;
}

export default function WishlistGameCard({
  gameId,
  gameName,
  backgroundImage,
  isFavourited,
  onFavourite,
  onCreateSession,
  gameInfoUrl,
}: WishlistGameCardProps) {
  return (
    <div className="wishlist-card flex flex-col items-center text-white">
      {/* Game Cover Art with hover border effect */}
      <div
        className="w-48 h-48 bg-cover bg-center rounded-e-3xl rounded-t-3xl hover:border-green hover:border-2 transition-all"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      
      {/* Game Name */}
      <p className="mt-4 text-sm text-center font-extralight">{gameName}</p>

      {/* Icons Section */}
      <div className="flex justify-center mt-2 w-[192px]">
        {/* Create session */}
        <button
          className="bg-usp1 text-white font-medium font-roboto py-2 px-4 uppercase rounded xxs:w-[100%]"
          onClick={onCreateSession}
        >
          Create Session
        </button>
      </div>
    </div>
  );
}
