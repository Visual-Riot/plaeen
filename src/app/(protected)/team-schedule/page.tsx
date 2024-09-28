"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import GreenButton from "@/components/buttons/GreenButton";
import AddPlayer from "@/components/players/AddPlayer";
import OutlineButton from "@/components/buttons/OutlineButton";
import { useRouter } from "next/navigation";
import { FaSteamSymbol, FaBell, FaTimes } from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import Footer from "@/components/layout/Footer";
import { FaPlus } from "react-icons/fa";
import PurpleButton from "@/components/buttons/PurpleButton";
import WhiteArrow from "@/components/icons/WhiteArrow"; // Import WhiteArrow component
import gamesData from "../../../lib/data/rawgGames.json"; // Import the list of games

interface Game {
  id: number;
  name: string;
  released: string;
  background_image?: string;
  genres?: { name: string }[];
  platforms?: { platform: { name: string } }[];
  rating?: number;
  tags?: { id: number; name: string; slug: string }[];
}

const gamesDataTyped: Game[] = gamesData as Game[];

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);
  const [selectedGame, setSelectedGame] = useState<string>(""); // State to store the selected game
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Control dropdown visibility
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for the search term

  const router = useRouter();

  const handleGameSelect = (game: string) => {
    setSelectedGame(game);
    setIsDropdownOpen(false);
  };

  const handleCreateNewSession = () => {
    if (selectedGame) {
      // Navigate to session page (replace `/session` with actual session page URL)
      router.push(`/session?game=${encodeURIComponent(selectedGame)}`);
    }
  };

  // Filter games based on search term
  const filteredGames = gamesDataTyped.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-taupe font-light font-sofia max-w-[90%] mx-auto">
      <Navbar avatar={selectedImage} />
      <div
        className="container mx-auto mt-16 rounded-xl py-16"
        style={{ backgroundColor: "rgba(184, 180, 189, 0.15)" }}
      >
        <div className="flex justify-between items-center pb-10 xxs:flex-col-reverse md:flex-row">
          <h1 className="font-abolition text-neonGreen text-7xl xxs:ms-0 xxs:text-center md:ms-16 md:text-left">
            TEAM NAME
          </h1>
          <div className="flex flex-col md:flex-row">
            <OutlineButton
              onClick={() => router.back()}
              className="xxs:me-0 xxs:mb-10 md:me-8 md:mb-0 xs:w-[200px] md:w-fit bg-transparent"
            >
              <span className="flex justify-center items-center">
                <FaPlus />
                &nbsp;Add session
              </span>
            </OutlineButton>
            <OutlineButton
              onClick={() => router.back()}
              className="xxs:me-0 xxs:mb-10 md:me-24 md:mb-0 xs:w-[200px] md:w-fit bg-transparent"
            >
              <span className="flex justify-center items-center">
                <MdEdit />
                &nbsp;Edit
              </span>
            </OutlineButton>
          </div>
        </div>

        {/* Notification Banner */}
        {isNotificationVisible && (
          <div className="flex items-center justify-center w-full px-4 py-3 relative my-4 bg-purple-800">
            <div className="w-[90%] flex justify-between">
              <div className="flex items-center">
                <BiSolidBellRing className="mr-6 text-xl text-green" />
                <p className="text-md font-extralight">
                  You have 1 schedule change to approve
                </p>
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

        <div className="w-[90%] flex mx-auto justify-between">
          {/* Game Filter Dropdown */}
          <div className="w-3/4">
            <div
              className="w-full bg-transparent text-darkGrey p-4 rounded-md border-2 border-purple-600 cursor-pointer flex justify-between items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-white">{selectedGame || "Select a game..."}</span>
              <WhiteArrow
                className={`transform ${isDropdownOpen ? "rotate-180" : ""} transition-transform duration-200`}
                noAnimation={true}
                color="text-white"
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute z-10 w-full bg-darkPurple border border-darkPurple rounded-md mt-2 max-h-60 overflow-y-auto">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 bg-darkPurple"
                />
                <ul className="max-h-48 overflow-y-auto">
                  {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                      <li
                        key={game.id}
                        onClick={() => handleGameSelect(game.name)}
                        className="p-4 hover:bg-gray-200 cursor-pointer"
                      >
                        {game.name}
                      </li>
                    ))
                  ) : (
                    <li className="p-4 text-center text-gray-500">
                      No games found
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Create new session button */}
          <div className="">
            <PurpleButton
              onClick={handleCreateNewSession}
              className="w-full md:w-auto flex justify-center h-full"
            >
              <span className="flex justify-center items-center font-semibold text-sm h-full">
                <FaPlus />
                &nbsp;&nbsp;Create new session
              </span>
            </PurpleButton>
          </div>
        </div>

        <div>
          {/* Other content goes here */}
        </div>
      </div>
      {/* <Footer useBackgroundImage={false} className="bg-[#000000!important]" /> */}
    </div>
  );
}
