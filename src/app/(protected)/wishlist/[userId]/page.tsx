"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use Next.js router
import Navbar from "@/components/layout/Navbar";
import WishlistGameCard from "@/components/game/WishlistGameCard";
import TeamSelectionModal from "@/components/modals/teamSelectionModal";

interface FavouritedGame {
  id: number;
  gameId: number;
  gameName: string;
  backgroundImage: string;
}

interface Team {
  id: string;
  name: string;
}

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter(); // Initialize Next.js router
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [favouritedGames, setFavouritedGames] = useState<FavouritedGame[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<FavouritedGame | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchFavouritedGames(session.user.id);
      fetchUserTeams(session.user.id); // Fetch user teams
    }
  }, [session]);

  const fetchFavouritedGames = async (userId: string) => {
    try {
      const response = await fetch("/api/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setFavouritedGames(data);
      } else {
        console.error("Failed to fetch favourited games");
      }
    } catch (error) {
      console.error("Error fetching favourited games:", error);
    }
  };

  const fetchUserTeams = async (userId: string) => {
    try {
      const response = await fetch(`/api/teams?userId=${userId}`);
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleFavouriteClick = async (gameId: number) => {
    // Logic to handle adding/removing favourites
  };

  const handleCreateSessionClick = (game: FavouritedGame) => {
    setSelectedGame(game);
    setIsModalOpen(true); // Open modal
  };

  const handleTeamSelect = (teamId: string) => {
  if (!selectedGame) return;

  // Redirect to the correct team schedule page using dynamic teamId in the URL
  router.push(`/team-schedule/${teamId}?gameId=${selectedGame.gameId}`);
};


  return (
    <>
      <Navbar avatar={selectedImage || null} />
      <div className="bg-black w-full h-full bg-[url('/img/bg-img_01.webp')] bg-cover bg-center">
        <div className="bg-[black]/85 w-full h-screen flex flex-col items-center justify-center mt-[-70px]">
          <div className="bg-[#6606E3]/5 w-full flex flex-col items-center justify-center h-full">
            <div>
              <h1 className="text-white text-[32px] font-sofia xxs:mb-4 md:mb-0 text-center pb-10">Wishlist</h1>

              {/* Wishlist games container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-32 gap-y-12 mt-8">
                {favouritedGames.length === 0 ? (
                  <p className="text-white">No games in your wishlist yet.</p>
                ) : (
                  favouritedGames.map((game) => (
                    <WishlistGameCard
                      key={game.id}
                      gameId={game.gameId}
                      gameName={game.gameName}
                      backgroundImage={game.backgroundImage}
                      isFavourited={true}
                      onFavourite={() => handleFavouriteClick(game.gameId)}
                      onCreateSession={() => handleCreateSessionClick(game)}
                      gameInfoUrl={`https://rawg.io/games/${game.gameId}`}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Selection Modal */}
      {isModalOpen && (
        <TeamSelectionModal 
          teams={teams}
          onSelectTeam={handleTeamSelect}
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
