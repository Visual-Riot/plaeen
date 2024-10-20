"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use Next.js router
import Navbar from "@/components/layout/Navbar";
import WishlistGameCard from "@/components/game/WishlistGameCard";
import TeamSelectionModal from "@/components/modals/teamSelectionModal"; // Ensure this exists
import { MdEdit, MdDelete, MdCheck } from "react-icons/md"; // For edit and delete icons
import GreenButton from "@/components/buttons/GreenButton"; // Ensure this exists

interface FavouritedGame {
  id: number;
  gameId: number;
  gameName: string;
  backgroundImage: string;
  genres: string;
  platforms: string;
  rating: null;
}

interface Team {
  id: string;
  teamName: string;
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
  const [isEditMode, setIsEditMode] = useState(false); // For edit mode
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For delete confirmation

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
    setIsModalOpen(true); // Open modal for team selection
  };

  const handleTeamSelect = async (teamId: string) => {
    if (!selectedGame) return;

    const gameDetails = {
      gameId: selectedGame.gameId,
      gameName: selectedGame.gameName,
      backgroundImage: selectedGame.backgroundImage || '', // Provide default value if missing
      genres: selectedGame.genres || [], // Ensure it's an array
      platforms: selectedGame.platforms || [], // Ensure it's an array
      rating: selectedGame.rating || null, // Set null if rating is missing
    };

    try {
      const response = await fetch(`/api/teams/${teamId}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameDetails),
      });

      if (response.ok) {
        // Redirect to the team schedule page
        router.push(`/team-schedule/${teamId}?gameId=${selectedGame.gameId}`);
      } else {
        const errorResponse = await response.json();
        console.error('Failed to add the game to the team schedule:', errorResponse.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error adding the game to the team schedule:', error);
    }
  };

  const handleRemoveGameClick = (game: FavouritedGame) => {
    setSelectedGame(game);
    setIsDeleteModalOpen(true); // Open delete confirmation modal
  };

  const confirmRemoveGame = async () => {
    if (!selectedGame) return;
  
    try {
      const response = await fetch(`/api/favourites/${selectedGame.gameId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id, // Pass the userId in the body
        }),
      });
  
      if (response.ok) {
        setFavouritedGames((prevGames) =>
          prevGames.filter((game) => game.gameId !== selectedGame.gameId)
        );
        setIsDeleteModalOpen(false); // Close modal after deletion
      } else {
        console.error("Failed to remove the game from the wishlist.");
      }
    } catch (error) {
      console.error("Error removing the game:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-black w-full h-full bg-[url('/img/bg-img_01.webp')] bg-cover bg-center relative">
        {isEditMode && (
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
        )}
        <div className="bg-[black]/85 w-full h-screen flex flex-col items-center justify-center mt-[-70px] z-20 relative">
          <div className="bg-[#6606E3]/5 w-full flex flex-col items-center justify-center h-full">
            <div>
              <div className="flex xxs:flex-col xxs:justify-center xxs:items-center md:items-baseline md:flex-row items-baseline w-full px-12 pb-5">
                <h1 className="text-white text-[32px] font-sofia">
                  Wishlist
                </h1>
                {favouritedGames.length > 0 && (
                  <span
                    className="text-sm font-extralight flex justify-center items-center text-white hover:text-lightPurple hover:cursor-pointer"
                    onClick={() => setIsEditMode(!isEditMode)}
                  >
                    {isEditMode ? (
                      <>
                        &nbsp;&nbsp;&nbsp;&nbsp;<MdCheck />&nbsp;Finished editing?
                      </>
                    ) : (
                      <>
                        &nbsp;&nbsp;&nbsp;&nbsp;<MdEdit />&nbsp;Edit wishlist
                      </>
                    )}
                  </span>
                )}
              </div>

              <div className="w-full">
                {favouritedGames.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[40]">
                    {/* Center content vertically and horizontally */}
                    <p className="text-white text-center mb-6">No games in your wishlist yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-8 mt-8 relative">
                    {favouritedGames.map((game) => (
                      <div key={game.id} className="relative">
                        {/* Game card with cover art and overlay in edit mode */}
                        <div className="relative group">
                          <div className="bg-darkPurple w-48 h-48 rounded-t-3xl rounded-e-3xl overflow-hidden">
                            <img
                              src={game.backgroundImage}
                              alt={game.gameName}
                              className="w-full h-full object-cover rounded-t-3xl rounded-e-3xl hover:border-neonGreen hover:border-2"
                            />
                            {isEditMode && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-3xl rounded-e-3xl">
                                <button
                                  className="text-white hover:text-red"
                                  onClick={() => handleRemoveGameClick(game)}
                                >
                                  <MdDelete size={30} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Game name and session button */}
                        <div className="py-4 rounded-b-3xl">
                          <h3 className="text-white text-center font-extralight">{game.gameName}</h3>
                          <GreenButton
                            className="mt-4 w-full"
                            onClick={() => handleCreateSessionClick(game)}
                          >
                            Create Session
                          </GreenButton>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedGame && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20">
          <div className="bg-darkPurple p-8 rounded-lg text-center">
            <p className="text-white mb-4">
              Are you sure you want to remove <span className="font-bold">{selectedGame.gameName}</span> from your wishlist?
            </p>
            <div className="flex justify-center gap-4">
              <GreenButton onClick={confirmRemoveGame} className="w-[100px]">
                Confirm
              </GreenButton>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-white underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
