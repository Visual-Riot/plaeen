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
import { FaPlus } from "react-icons/fa";
import Footer from "@/components/layout/Footer";
import PurpleButton from "@/components/buttons/PurpleButton";
import gamesData from "../../../lib/data/rawgGames.json"; // Import the list of games

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);
  const [selectedGame, setSelectedGame] = useState<string>(""); // State to store the selected game
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Control dropdown visibility

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

        <div>
          {/* Game Filter Dropdown */}
          <div className="relative w-3/4 md:w-1/2 mx-auto mb-8">
            <div
              className="w-full bg-white text-darkGrey p-4 rounded-md cursor-pointer flex justify-between items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{selectedGame || "Select a game..."}</span>
            </div>
            {isDropdownOpen && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-2 max-h-48 overflow-y-auto">
                {gamesData.map((game) => (
                  <li
                    key={game.id}
                    onClick={() => handleGameSelect(game.name)}
                    className="p-4 hover:bg-gray-200 cursor-pointer"
                  >
                    {game.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Create new session */}
          <div className="text-center">
            <PurpleButton onClick={handleCreateNewSession} className="flex justify-center">
              <span className="flex justify-center items-center font-semibold text-sm h-8">
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
