"use client";

import { useState, useEffect, useRef } from "react";
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
import CalendarWrapper from "@/components/calendar/CalendarWrapper";
import GameCard from "@/components/game/GameCard";
import AddPlayerModal from "@/components/modals/AddPlayerModal";
import { RxTimer } from "react-icons/rx";

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

interface User {
  id: string;
  name?: string;
  image: string;
}

interface SelectedPlayer {
  user: {
    id: string;
    name: string;
    image: string;
  };
  status: string;
}

export default function TeamSchedulePage() {
  const { id: teamId } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);
  const [selectedGame, setSelectedGame] = useState<GameSession | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [teamName, setTeamName] = useState<string | null>(null);
  const [teamGames, setTeamGames] = useState<GameSession[]>([]);
  const [filteredGames, setFilteredGames] = useState<GameSession[]>([]);
  const [isEditingTeamName, setIsEditingTeamName] = useState(false);
  const [newTeamName, setNewTeamName] = useState<string | null>(null);
  const [mostRecentGame, setMostRecentGame] = useState<GameSession | null>(null);
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]); // Track users
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch team details, games, and users
  useEffect(() => {
    const fetchTeamDetailsAndGames = async () => {
      try {
        const [teamResponse, gamesResponse, usersResponse] = await Promise.all([
          fetch(`/api/teams/${teamId}`),
          fetch(`/api/teams/${teamId}/games`),
          fetch(`/api/user`),
        ]);
  
        // Team details response
        if (teamResponse.ok) {
          const teamData = await teamResponse.json();
          console.log("Fetched team details: ", teamData); // Debugging log
          setTeamName(teamData.teamName);
        } else {
          console.error('Failed to fetch team details');
        }
  
        // Team games response
        if (gamesResponse.ok) {
          const gameData = await gamesResponse.json();
          console.log("Fetched team games: ", gameData); // Debugging log
          const uniqueGames = gameData.filter(
            (game: GameSession, index: number, self: GameSession[]) =>
              index === self.findIndex((g) => g.gameName === game.gameName)
          );
          setTeamGames(uniqueGames);
          setFilteredGames(uniqueGames);
          if (uniqueGames.length > 0) {
            setMostRecentGame(uniqueGames[uniqueGames.length - 1]);
          }
        } else {
          console.error('Failed to fetch team games');
        }
  
        // Users response
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          console.log("Fetched users: ", usersData); // Debugging log
          setUsers(usersData);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching team, games, or users:', error);
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
  
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [teamId]);
  

  const handleGameSelect = (game: GameSession) => {
    setSelectedGame(game);
    setMostRecentGame(game); // Update the most recent game to display its cover art
    setIsDropdownOpen(false);
  };

  const handleAddSessionClick = () => {
    router.push(`/session/${teamId}`);
  };

  const handleCreateNewSession = async () => {
    if (selectedGame) {
      const gameExists = teamGames.some(game => game.gameId === selectedGame.gameId);

      if (!gameExists) {
        setTeamGames(prevGames => [...prevGames, selectedGame]);
      }

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
    setNewTeamName(teamName);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = teamGames.filter((game) =>
      game.gameName.toLowerCase().includes(searchTerm)
    );
    setFilteredGames(filtered);
  };

  const handleOpenAddPlayerModal = () => {
    setIsAddPlayerModalOpen(true);
  };

  const handleCloseAddPlayerModal = () => {
    setIsAddPlayerModalOpen(false);
  };

  const handleAddPlayers = (players: SelectedPlayer[]) => {
    setSelectedPlayers([...selectedPlayers, ...players]);
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
        <div className="my-12 flex gap-6 flex-wrap justify-center">
          {/* Selected Players */}
          {selectedPlayers.map((player) => (
            <div key={player.user.id} className="flex flex-col items-center justify-center">
              {/* Avatar container with relative positioning */}
              <div className="relative">
                {/* User's image */}
                <img
                  src={player.user.image}
                  alt={player.user.name}
                  className="w-[100px] h-[100px] rounded-full object-cover border-2 border-lightGrey"
                />
                {/* Timer icon positioned on the bottom-right of the avatar if pending */}
                {player.status === "pending" && (
                  <span className="absolute bottom-0 right-0 p-1 rounded-full bg-yellow">
                    <RxTimer className="h-4 w-4 text-white" />
                  </span>
                )}
              </div>
              {/* Player's name */}
              <span className="text-sm font-extralight mt-5">{player.user.name}</span>
            </div>
          ))}

          {/* AddPlayer Button at the end */}
          <span
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={handleOpenAddPlayerModal}
          >
            {/* Original AddPlayer component */}
            <AddPlayer onClick={() => {}} className="rounded mb-5" />
            <p className="font-extralight text-sm">Add Player</p>
          </span>
        </div>

        {isAddPlayerModalOpen && (
          <AddPlayerModal
            onClose={handleCloseAddPlayerModal}
            onAddPlayers={handleAddPlayers}
            users={users}
          />
        )}

        {/* Game filter dropdown */}
        <div className="w-[90%] mx-auto mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:flex-1 relative" ref={dropdownRef}>
            <div
              className="w-full bg-transparent text-white p-4 rounded-md border-2 border-neonPurple cursor-pointer flex justify-between items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{selectedGame?.gameName || "Select a game..."}</span>
              <WhiteArrow className={`transform text-sm ${isDropdownOpen ? "rotate-180" : ""}`} noAnimation color="text-white" />
            </div>
            {isDropdownOpen && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-2 max-h-60 overflow-y-auto">
                <input
                  type="text"
                  className="w-full p-2 border-b border-gray-300"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <ul className="max-h-48 overflow-y-auto">
                  {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
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

        {mostRecentGame && mostRecentGame.backgroundImage && (
          <div
            className="relative w-[90%] mx-auto my-20 h-[350px] rounded-md overflow-hidden"
            style={{
              backgroundImage: `url(${mostRecentGame.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute flex flex-col justify-center items-center w-full h-full text-white z-9">
              <h2 className="text-5xl text-center font-sofia font-semibold text-neonGreen">
                {mostRecentGame.gameName}
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
