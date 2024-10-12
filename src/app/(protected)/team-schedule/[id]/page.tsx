"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import AddPlayer from "@/components/players/AddPlayer";
import OutlineButton from "@/components/buttons/OutlineButton";
import { useRouter } from "next/navigation";
import { BiSolidBellRing } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { FaPlus, FaTimes } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import Footer from "@/components/layout/Footer";
import PurpleButton from "@/components/buttons/PurpleButton";
import WhiteArrow from "@/components/icons/WhiteArrow";
import GameCalendar from "@/components/calendar/GameCalendar";
import CalendarWrapper from "@/components/calendar/CalendarWrapper";
import GameCard from "@/components/game/GameCard";

interface GameSession {
  id: number;
  gameName: string;
  gameId: number;
  released: string;
  backgroundImage?: string;
  genres?: { name: string }[];
  platforms?: { platform: { name: string } }[];
  rating?: number;
  tags?: { id: number; name: string; slug: string }[];
}

export default function Page() {
  const { id: teamId } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);
  const [selectedGame, setSelectedGame] = useState<GameSession | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [teamName, setTeamName] = useState<string | null>(null);
  const [teamGames, setTeamGames] = useState<GameSession[]>([]);
  const [isEditingTeamName, setIsEditingTeamName] = useState(false); // State to toggle edit mode
  const [newTeamName, setNewTeamName] = useState<string | null>(null); // State for new team name

  const router = useRouter();

  useEffect(() => {
    const fetchTeamDetailsAndGames = async () => {
      try {
        const [teamResponse, gamesResponse] = await Promise.all([
          fetch(`/api/teams/${teamId}`),
          fetch(`/api/teams/${teamId}/games`)
        ]);

        if (teamResponse.ok) {
          const teamData = await teamResponse.json();
          setTeamName(teamData.teamName);
        } else {
          console.error('Failed to fetch team details');
        }

        if (gamesResponse.ok) {
          const gameData = await gamesResponse.json();
          setTeamGames(gameData);
        } else {
          console.error('Failed to fetch team games');
        }
      } catch (error) {
        console.error('Error fetching team or games:', error);
      }
    };

    fetchTeamDetailsAndGames();

    const savedImage = localStorage.getItem("userAvatar");
    const savedUsername = localStorage.getItem("username");
    if (savedImage) {
      setSelectedImage(savedImage);
    }
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, [teamId]);

  const handleGameSelect = (game: GameSession) => {
    setSelectedGame(game);
    setIsDropdownOpen(false);
  };

  const handleAddSessionClick = () => {
    router.push(`/session/${teamId}`);
  };

  const handleCreateNewSession = async () => {
    if (selectedGame) {
      try {
        const response = await fetch(`/api/teams/${teamId}/games`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gameId: selectedGame.gameId,
            gameName: selectedGame.gameName,
          }),
        });

        if (response.ok) {
          router.push(`/session?game=${encodeURIComponent(selectedGame.gameName)}`);
        } else {
          console.error('Failed to create a new session');
        }
      } catch (error) {
        console.error('Error creating a new session:', error);
      }
    }
  };

  const handleEditTeamName = () => {
    setIsEditingTeamName(true);
    setNewTeamName(teamName); // Initialize with the current team name
  };

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTeamName(e.target.value);
  };

  const handleSaveTeamName = async () => {
    if (newTeamName) {
      try {
        const response = await fetch(`/api/teams/${teamId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            teamName: newTeamName,
          }),
        });

        if (response.ok) {
          setTeamName(newTeamName);
          setIsEditingTeamName(false);
        } else {
          console.error('Failed to update team name');
        }
      } catch (error) {
        console.error('Error updating team name:', error);
      }
    }
  };

  return (
    <div className="text-taupe font-light font-sofia max-w-[90%] mx-auto">
      <Navbar avatar={selectedImage || null} />
      <div className="container mx-auto mt-16 rounded-xl py-16" style={{ backgroundColor: "rgba(184, 180, 189, 0.15)" }}>
        <div className="flex justify-between items-center pb-10 xxs:flex-col-reverse md:flex-row">
          {isEditingTeamName ? (
            <input
              type="text"
              value={newTeamName || ""}
              onChange={handleTeamNameChange}
              className="font-abolition text-neonGreen border-b border-neonGreen text-7xl xxs:ms-0 xxs:text-center md:ms-16 md:text-left bg-transparent"
              placeholder="Enter new team name"
            />
          ) : (
            <h1 className="font-abolition text-neonGreen text-7xl xxs:ms-0 xxs:text-center md:ms-16 md:text-left">
              {teamName || 'TEAM NAME'}
            </h1>
          )}
          <div className="flex flex-col md:flex-row">
            <OutlineButton onClick={handleAddSessionClick} className="xxs:me-0 xxs:mb-10 md:me-8 md:mb-0 xs:w-[200px] md:w-fit bg-transparent">
              <span className="flex justify-center items-center">
                <FaPlus />
                &nbsp;Add session
              </span>
            </OutlineButton>
            {isEditingTeamName ? (
              <OutlineButton onClick={handleSaveTeamName} className="xxs:me-0 xxs:mb-10 md:me-24 md:mb-0 xs:w-[200px] md:w-fit bg-transparent">
                <span className="flex justify-center items-center">
                  Save
                </span>
              </OutlineButton>
            ) : (
              <OutlineButton onClick={handleEditTeamName} className="xxs:me-0 xxs:mb-10 md:me-24 md:mb-0 xs:w-[200px] md:w-fit bg-transparent">
                <span className="flex justify-center items-center">
                  <MdEdit />
                  &nbsp;Edit
                </span>
              </OutlineButton>
            )}
          </div>
        </div>

        {isNotificationVisible && (
          <div className="flex items-center justify-center w-full px-4 py-3 relative my-4 bg-purple-800">
            <div className="w-[90%] flex justify-between">
              <div className="flex items-center">
                <BiSolidBellRing className="mr-6 text-xl text-green" />
                <p className="text-md font-extralight">You have 1 schedule change to approve</p>
              </div>
              <button
                onClick={() => setIsNotificationVisible(false)}
                className="focus:outline-none"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {/* Add Players and Player View */}
        <div className="my-12">
          <span className="flex flex-col justify-center items-center">
            <AddPlayer onClick={() => {}} className="rounded" />
            <p className="font-extralight text-sm mt-2">Add player</p>
          </span>
        </div>

        {/* Game filter dropdown */}
        <div className="w-[90%] mx-auto mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:flex-1 relative">
            <div
              className="w-full bg-transparent text-white p-4 rounded-md border-2 border-neonPurple cursor-pointer flex justify-between items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{selectedGame?.gameName || "Select a game..."}</span>
              <WhiteArrow className={`transform text-sm ${isDropdownOpen ? "rotate-180" : ""}`} noAnimation color="text-white" />
            </div>
            {isDropdownOpen && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-2 max-h-60 overflow-y-auto">
                <ul className="max-h-48 overflow-y-auto">
                  {teamGames.length > 0 ? (
                    teamGames.map((game) => (
                      <li key={game.id} onClick={() => handleGameSelect(game)} className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
                        {game.gameName}
                      </li>
                    ))
                  ) : (
                    <li className="p-4 text-center text-gray-500">No games found</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="w-full md:w-auto md:flex-shrink-0 md:ml-4 text-center">
            <PurpleButton onClick={handleCreateNewSession} className="w-full md:w-auto flex justify-center h-[58px]">
              <span className="flex justify-center items-center font-semibold text-sm h-full">
                <FaPlus />
                &nbsp;&nbsp;Create new session
              </span>
            </PurpleButton>
          </div>
        </div>

        {selectedGame && selectedGame.backgroundImage && (
          <div
            className="relative w-[90%] mx-auto my-20 h-[350px] rounded-md overflow-hidden"
            style={{
              backgroundImage: `url(${selectedGame.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute flex flex-col justify-center items-center w-full h-full text-white z-9">
              <h2 className="text-5xl text-center font-sofia font-semibold text-neonGreen">
                {selectedGame.gameName}
              </h2>
              <p className="mt-4 text-sm font-extralight">
                Your next session is in 5 days!
              </p>
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-4 z-10">
              <button className="text-darkGrey bg-lightGrey p-2 rounded-full hover:bg-gray-700 hover:text-lightGrey">
                <MdEdit className="w-4 h-4" />
              </button>
              <button className="text-white bg-red p-2 rounded-full hover:bg-gray-700">
                <GoTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="w-4/5 mx-auto pt-20">
          {/* <CalendarWrapper dayHours={2} /> */}
        </div>
      </div>
      <Footer useBackgroundImage={false} className="bg-[#000000!important]" />
    </div>
  );
}
