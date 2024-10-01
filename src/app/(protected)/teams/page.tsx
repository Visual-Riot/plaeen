"use client";

import { useState, useEffect, useRef } from "react";
import { ImPlus } from "react-icons/im";
import { MdEdit, MdDelete, MdCheck } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoMdArrowRoundBack } from "react-icons/io";
import Navbar from "@/components/layout/Navbar";
import GreenButton from "@/components/buttons/GreenButton";
import AvatarButton from "@/components/buttons/AvatarButton";
import { useRouter } from "next/navigation";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // User avatar for Navbar
  const [username, setUsername] = useState<string>('');
  const [teams, setTeams] = useState<{ name: string; avatar: string }[]>([]); // List of teams
  const [isEditing, setIsEditing] = useState<boolean>(false); // Edit mode state
  const [editIndex, setEditIndex] = useState<number | null>(null); // Index of the team being edited
  const [editedTeamName, setEditedTeamName] = useState<string>(''); // Edited team name
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false); // Delete confirmation modal visibility
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null); // Index of the team to delete
  const [isChooseAvatarVisible, setIsChooseAvatarVisible] = useState<boolean>(false); // Choose avatar modal visibility
  const [teamIndexToEditAvatar, setTeamIndexToEditAvatar] = useState<number | null>(null); // Index of the team to change avatar
  const carouselRef = useRef<HTMLDivElement | null>(null); // Ref for carousel container

  const router = useRouter();

  useEffect(() => {
    // Load user avatar and username
    const savedImage = localStorage.getItem("userAvatar");
    const savedUsername = localStorage.getItem("username");
    if (savedImage) {
      setSelectedImage(savedImage);
    }
    if (savedUsername) {
      setUsername(savedUsername);
    }

    // Load teams from local storage
    const savedTeams = localStorage.getItem("teams");
    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    }
  }, []);

  const handleAddTeamClick = () => {
    // Redirect to the create-team page
    router.push("/create-team");
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 200; // Scroll 200 pixels at a time
      if (direction === "left") {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (direction === "right") {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setEditIndex(null); // Reset editing index when toggling edit mode
  };

  const handleDeleteTeam = (index: number) => {
    setDeleteIndex(index);
    setIsDeleteModalVisible(true);
  };

  const confirmDeleteTeam = () => {
    if (deleteIndex !== null) {
      const updatedTeams = teams.filter((_, i) => i !== deleteIndex);
      setTeams(updatedTeams);
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
      setIsDeleteModalVisible(false);
    }
  };

  const handleEditTeam = (index: number) => {
    setEditIndex(index);
    setEditedTeamName(teams[index].name);
  };

  const saveEditedTeam = (index: number) => {
    const updatedTeams = [...teams];
    updatedTeams[index] = { ...updatedTeams[index], name: editedTeamName };
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setEditIndex(null);
  };

  const handleAvatarChange = (index: number) => {
    setTeamIndexToEditAvatar(index);
    setIsChooseAvatarVisible(true);
  };

  const handleAvatarSelection = (newAvatar: string) => {
    if (teamIndexToEditAvatar !== null) {
      const updatedTeams = [...teams];
      updatedTeams[teamIndexToEditAvatar] = { ...updatedTeams[teamIndexToEditAvatar], avatar: newAvatar };
      setTeams(updatedTeams);
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
      setIsChooseAvatarVisible(false);
      setTeamIndexToEditAvatar(null);
    }
  };

  return (
    <>
      <Navbar avatar={selectedImage} />
      <div className="bg-black w-full h-full bg-[url('/img/bg-img_01.webp')] bg-cover bg-center">
        <div className="bg-[black]/85 w-full h-screen flex flex-col items-center justify-center mt-[-70px]">
          <div className="bg-[#6606E3]/5 w-full flex flex-col items-center justify-center h-full">

            {/* Display Teams */}
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex xxs:flex-col xxs:justify-center xxs:items-center md:items-baseline md:flex-row items-baseline text-white mb-10">
                <h1 className="text-white text-[32px] font-sofia xxs:mb-4 md:mb-0">Who are you playing with?</h1>
                <span
                  className="text-sm font-extralight flex justify-center items-center hover:text-lightPurple hover:cursor-pointer"
                  onClick={toggleEditMode}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {isEditing ? (
                    <>
                      <MdCheck />&nbsp;Finished editing?
                    </>
                  ) : (
                    <>
                      <MdEdit />&nbsp;Edit teams
                    </>
                  )}
                </span>
              </div>

              {teams.length === 0 ? (
                <p className="text-white text-sm text-center mb-10">Please create your first team to start</p>
              ) : (
                <div className="relative w-[80%] flex items-center">
                  {/* Left Carousel Button */}
                  {teams.length > 1 && (
                    <button
                      onClick={() => scrollCarousel("left")}
                      className="absolute left-0 z-10 bg-black/50 p-3 rounded-full text-white"
                    >
                      <IoIosArrowBack size={24} />
                    </button>
                  )}

                  {/* Carousel Container */}
                  <div
                    ref={carouselRef}
                    className="flex gap-8 overflow-x-hidden scrollbar-hide snap-x snap-mandatory px-10 my-20 w-full"
                  >
                    {teams.map((team, index) => (
                      <div
                        key={index}
                        className="snap-center flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 relative"
                      >
                        <button className="bg-darkPurple w-48 h-48 rounded-e-3xl rounded-t-3xl hover:border-green hover:border-2 transition-all relative group">
                          <img
                            src={team.avatar}
                            alt={team.avatar}
                            className="w-full h-full object-cover rounded-e-3xl rounded-t-3xl"
                          />
                          {isEditing && (
                            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 rounded-e-3xl rounded-t-3xl">
                              <button
                                className="text-white hover:text-lightGrey"
                                onClick={() => handleEditTeam(index)}
                              >
                                <MdEdit size={24} />
                              </button>
                              <button
                                className="text-white hover:text-red"
                                onClick={() => handleDeleteTeam(index)}
                              >
                                <MdDelete size={24} />
                              </button>
                            </div>
                          )}
                        </button>
                        {editIndex === index ? (
                          <div className="flex flex-col items-center mt-2">
                            <input
                              type="text"
                              value={editedTeamName}
                              onChange={(e) => setEditedTeamName(e.target.value)}
                              className="bg-transparent border-2 border-white w-[192px] px-2 py-1 rounded text-white text-sm mt-4"
                            />
                            <button
                              onClick={() => handleAvatarChange(index)}
                              className="text-sm text-white hover:text-lightPurple underline mt-4 mb-6"
                            >
                              Change Avatar
                            </button>
                            <GreenButton onClick={() => saveEditedTeam(index)} className="w-[100px] text-xs">
                              Save
                            </GreenButton>
                          </div>
                        ) : (
                          <p className="text-white font-extralight text-sm mt-2 text-center">
                            {team.name}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Right Carousel Button */}
                  {teams.length > 1 && (
                    <button
                      onClick={() => scrollCarousel("right")}
                      className="absolute right-0 z-10 bg-black/50 p-3 rounded-full text-white"
                    >
                      <IoIosArrowForward size={24} />
                    </button>
                  )}
                </div>
              )}

              {/* Add new team button */}
              <GreenButton onClick={handleAddTeamClick} className="text-[16px] font-sofia font-bold w-[224px] h-[64px]">
                Add new team
              </GreenButton>
            </div>

          </div>
        </div>
      </div>

      {/* Choose Team Avatar Modal */}
      {isChooseAvatarVisible && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20">
          <div className="opacity-100 translate-y-0 transition-all duration-500 ease-in-out transform p-16 bg-lightPurple/15 min-w-[320px] md:min-w-[520px] rounded-lg backdrop-blur-[14px] backdrop-brightness-[1.4]">
            <div
              className="flex items-center justify-center text-white hover:text-lightPurple cursor-pointer mb-6"
              onClick={() => setIsChooseAvatarVisible(false)}
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
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalVisible && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20">
          <div className="bg-darkPurple p-8 rounded-lg text-center">
            <p className="text-white mb-4">Are you sure you want to delete this team?</p>
            <div className="flex justify-center gap-4">
              <GreenButton onClick={confirmDeleteTeam} className="w-[100px]">
                Confirm
              </GreenButton>
              <button
                onClick={() => setIsDeleteModalVisible(false)}
                className="text-white underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
