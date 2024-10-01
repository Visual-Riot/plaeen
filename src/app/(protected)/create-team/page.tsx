"use client";

import { useState, useEffect } from "react";
import { ImPlus } from "react-icons/im";
import Navbar from "@/components/layout/Navbar";
import GreenButton from "@/components/buttons/GreenButton";
import AvatarButton from "@/components/buttons/AvatarButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // User avatar for Navbar
  const [selectedTeamAvatar, setSelectedTeamAvatar] = useState<string | null>(null); // Team avatar
  const [username, setUsername] = useState<string>('');
  const [isAddTeamVisible, setIsAddTeamVisible] = useState(false);
  const [isChooseAvatarVisible, setIsChooseAvatarVisible] = useState(false);
  const [teamName, setTeamName] = useState<string>('');
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const savedImage = localStorage.getItem("userAvatar");
    const savedUsername = localStorage.getItem("username");
    if (savedImage) {
      setSelectedImage(savedImage);
    }
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleAddTeamClick = () => {
    setIsAddTeamVisible(true);
  };

  const handleSaveTeam = () => {
    if (teamName.trim() && selectedTeamAvatar) {
      // Get existing teams from local storage, or create an empty array if none exist
      const existingTeams = JSON.parse(localStorage.getItem("teams") || "[]");

      // Create new team object
      const newTeam = {
        name: teamName.trim(),
        avatar: selectedTeamAvatar,
      };

      // Add new team to existing teams array
      existingTeams.push(newTeam);

      // Save updated teams array to local storage
      localStorage.setItem("teams", JSON.stringify(existingTeams));

      // Show success message
      setShowSavedMessage(true);

      // Wait for 2 seconds, then redirect to homepage
      setTimeout(() => {
        setShowSavedMessage(false);
        router.push("/teams"); // Redirect to all teams page
      }, 2000);
    }
  };

  const handleChooseAvatarClick = () => {
    setIsAddTeamVisible(false);
    setIsChooseAvatarVisible(true);
  };

  const handleAvatarSelection = (avatar: string) => {
    setSelectedTeamAvatar(avatar);
    setIsChooseAvatarVisible(false);
    setIsAddTeamVisible(true);
  };

  return (
    <>
      <Navbar avatar={selectedImage} />
      <div className="bg-black w-full h-full bg-[url('/img/bg-img_01.webp')] bg-cover bg-center">
        <div className="bg-[black]/85 w-full h-screen flex flex-col items-center justify-center mt-[-70px]">
          <div className="bg-[#6606E3]/5 w-full flex flex-col items-center justify-center h-full">

            {/* Create your first team */}
            {!isAddTeamVisible && !isChooseAvatarVisible && (
              <div className="flex flex-col justify-center items-center">
                <h1 className="uppercase text-white text-[32px] font-sofia">Create your first team</h1>
                <button
                  onClick={handleAddTeamClick}
                  className="bg-darkPurple w-48 h-48 rounded-e-3xl rounded-t-3xl my-20 hover:border-green hover:border-2 hover:text-green group"
                >
                  <span className="flex justify-center items-center w-full h-full text-white hover:text-green">
                    <ImPlus className="w-[21px] h-[21px]" />
                  </span>
                  <p className="text-green font-extralight text-left text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Create your first team
                  </p>
                </button>
                <GreenButton onClick={handleAddTeamClick} className="text-[16px] font-sofia font-bold w-[224px] h-[64px]">
                  Add new team
                </GreenButton>
              </div>
            )}

            {/* Add team view */}
            {isAddTeamVisible && !isChooseAvatarVisible && (
              <div
                className="opacity-100 translate-y-0 transition-all duration-500 ease-in-out transform p-16 bg-lightPurple/15 min-w-[320px] md:min-w-[520px] rounded-lg backdrop-blur-[14px] backdrop-brightness-[1.4] mt-[60px] flex flex-col items-center"
              >
                <div className="w-full">
                  <h2 className="text-[26px] text-white mb-2">Add team</h2>
                  <p className="text-lightGrey font-extralight text-[16px]">Add a new team to schedule sessions together</p>
                </div>
                <button
                  onClick={handleChooseAvatarClick}
                  className="w-[103px] h-[103px] mx-auto my-6"
                >
                  {selectedTeamAvatar ? (
                    <img src={selectedTeamAvatar} alt="Selected Team Avatar" className="w-full h-full rounded-e-3xl rounded-t-3xl" />
                  ) : (
                    <AvatarButton onClick={handleChooseAvatarClick}>
                      <ImPlus className="w-[21px] h-[21px] text-white group-hover:text-green" />
                    </AvatarButton>
                  )}
                </button>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Team Name"
                  className="border border-lightPurple bg-lightPurple rounded-lg px-4 py-2 mb-4 w-[389px] h-[63px] opacity-50 text-white placeholder-white"
                />
                <div className="flex flex-col items-center space-y-4">
                  <GreenButton
                    onClick={handleSaveTeam}
                    className={`w-[224px] h-[64px] text-[16px] font-bold my-3 ${
                      !teamName.trim() || !selectedTeamAvatar ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!teamName.trim() || !selectedTeamAvatar} // Disable if no team name or avatar is selected
                  >
                    Save Team
                  </GreenButton>
                  {showSavedMessage && (
                    <p className="text-green text-sm mt-4 font-extralight">Team details saved successfully!</p>
                  )}
                  <button
                    onClick={() => setIsAddTeamVisible(false)}
                    className="text-lightPurple underline text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Choose team avatar */}
            {isChooseAvatarVisible && (
              <div className="opacity-100 translate-y-0 transition-all duration-500 ease-in-out transform p-16 bg-lightPurple/15 min-w-[320px] md:min-w-[520px] rounded-lg backdrop-blur-[14px] backdrop-brightness-[1.4] mt-[60px]">
                <div
                  className="flex items-center justify-center text-white hover:text-lightPurple cursor-pointer mb-6"
                  onClick={() => {
                    setIsChooseAvatarVisible(false);
                    setIsAddTeamVisible(true);
                  }}
                >
                  <IoMdArrowRoundBack className="w-6 h-6" />
                  <h2 className="ml-2">Go back</h2>
                </div>
                <p className="text-sm text-lightGrey font-extralight mb-4">Choose a team avatar</p>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(9)].map((_, index) => (
                    <AvatarButton
                      key={index}
                      onClick={() => handleAvatarSelection(`/img/avatar_${index + 1}.png`)}
                      imageSrc={`/img/avatar_${index + 1}.png`}
                      altText={`Avatar ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
