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
  const [teams, setTeams] = useState<{ id: number; teamName: string; image: string }[]>([]); // List of teams
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
    // Fetch teams from the API
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/teams');
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
        } else {
          console.error('Failed to fetch teams');
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();

    // Load user avatar and username
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
    // Redirect to the create-team page
    router.push("/create-team");
  };

  // Trigger editing mode for the selected team
  const triggerEditTeam = (index: number) => {
    setEditIndex(index);
    setEditedTeamName(teams[index].teamName); // Pre-fill the team name input
  };

  const handleEditTeam = async (index: number) => {
    const updatedTeam = teams[index];
    try {
      const response = await fetch(`/api/teams/${updatedTeam.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName: editedTeamName || updatedTeam.teamName, // Use the updated team name
          image: updatedTeam.image,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedTeams = [...teams];
        updatedTeams[index] = data; // Update the team data in the state
        setTeams(updatedTeams);
        setEditIndex(null); // Reset edit index after saving
      } else {
        console.error('Failed to update team');
      }
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  const handleDeleteTeam = (index: number) => {
    setDeleteIndex(index);
    setIsDeleteModalVisible(true);
  };

  const confirmDeleteTeam = async () => {
    if (deleteIndex !== null) {
      const teamToDelete = teams[deleteIndex];
      try {
        const response = await fetch(`/api/teams/${teamToDelete.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const updatedTeams = teams.filter((_, i) => i !== deleteIndex);
          setTeams(updatedTeams);
          setIsDeleteModalVisible(false);
        } else {
          console.error('Failed to delete team');
        }
      } catch (error) {
        console.error('Error deleting team:', error);
      }
    }
  };

  // Trigger the avatar change modal
  const handleAvatarChange = (index: number) => {
    setTeamIndexToEditAvatar(index);
    setIsChooseAvatarVisible(true); // Show the avatar selection modal
  };

  // Select the new avatar for the team
  const handleAvatarSelection = async (newAvatar: string) => {
    if (teamIndexToEditAvatar !== null) {
      const updatedTeam = teams[teamIndexToEditAvatar];
      try {
        const response = await fetch(`/api/teams/${updatedTeam.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            teamName: updatedTeam.teamName, // Keep the current team name
            image: newAvatar, // Update the image with the new avatar
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const updatedTeams = [...teams];
          updatedTeams[teamIndexToEditAvatar] = data; // Update the team data in state
          setTeams(updatedTeams);
          setIsChooseAvatarVisible(false); // Hide the avatar selection modal
          setTeamIndexToEditAvatar(null); // Reset the team index for avatar change
        } else {
          console.error('Failed to update avatar');
        }
      } catch (error) {
        console.error('Error updating avatar:', error);
      }
    }
  };

  // Navigate to the team schedule page when clicking on the avatar
  const handleNavigateToSchedule = (teamId: number) => {
    router.push(`/team-schedule/${teamId}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-black w-full h-full bg-[url('/img/bg-img_01.webp')] bg-cover bg-center">
        <div className="bg-[black]/85 w-full h-screen flex flex-col items-center justify-center mt-[-70px]">
          <div className="bg-[#6606E3]/5 w-full flex flex-col items-center justify-center h-full">
            {/* Display Teams */}
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex xxs:flex-col xxs:justify-center xxs:items-center md:items-baseline md:flex-row items-baseline text-white my-16 mb-4">
                <h1 className="text-white text-[32px] font-sofia xxs:mb-4 md:mb-0">Who are you playing with?</h1>
                <span
                  className="text-sm font-extralight flex justify-center items-center hover:text-lightPurple hover:cursor-pointer"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      &nbsp;&nbsp;&nbsp;&nbsp;<MdCheck />&nbsp;Finished editing?
                    </>
                  ) : (
                    <>
                      &nbsp;&nbsp;&nbsp;&nbsp;<MdEdit />&nbsp;Edit teams
                    </>
                  )}
                </span>
              </div>

              {teams.length === 0 ? (
                <p className="text-white text-sm text-center mb-5">Please create your first team to start</p>
              ) : (
                <div className="relative w-[80%] flex items-center">
                  {/* Teams Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-10 my-20 w-full">
                    {teams.map((team, index) => (
                      <div key={team.id} className="flex flex-col items-center relative">
                        {/* Navigate to the team schedule page when clicking on the avatar */}
                        <button
                          onClick={() => handleNavigateToSchedule(team.id)}
                          className="bg-darkPurple w-48 h-48 rounded-e-3xl rounded-t-3xl hover:border-green hover:border-2 transition-all relative group"
                        >
                          <img
                            src={team.image}
                            alt={team.teamName}
                            className="w-full h-full object-cover rounded-e-3xl rounded-t-3xl"
                          />
                          {isEditing && (
                            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 rounded-e-3xl rounded-t-3xl">
                              <button
                                className="text-white hover:text-lightGrey"
                                onClick={() => triggerEditTeam(index)} // Trigger edit
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
                              onChange={(e) => setEditedTeamName(e.target.value)} // Update team name
                              className="bg-transparent border-2 border-white w-[192px] px-2 py-1 rounded text-white text-sm mt-4"
                            />
                            <button
                              onClick={() => handleAvatarChange(index)}
                              className="text-sm text-white hover:text-lightPurple underline mt-4 mb-6"
                            >
                              Change Avatar
                            </button>
                            <GreenButton onClick={() => handleEditTeam(index)} className="w-[100px] text-xs">
                              Save
                            </GreenButton>
                          </div>
                        ) : (
                          <p className="text-white font-extralight text-sm mt-2 text-center">
                            {team.teamName}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
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

      {/* Choose Avatar Modal */}
      {isChooseAvatarVisible && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20">
          <div className="opacity-100 translate-y-0 transition-all duration-500 ease-in-out transform p-16 bg-lightPurple/15 min-w-[320px] md:min-w-[520px] rounded-lg backdrop-blur-[14px] backdrop-brightness-[1.4]">
            <div
              className="flex items-center justify-center text-white hover:text-lightPurple cursor-pointer mb-6"
              onClick={() => setIsChooseAvatarVisible(false)} // Hide modal when clicking "Go back"
            >
              <IoMdArrowRoundBack className="w-6 h-6" />
              <h2 className="ml-2">Go back</h2>
            </div>
            <p className="text-sm text-lightGrey font-extralight mb-4">Choose a team avatar</p>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(9)].map((_, index) => (
                <AvatarButton
                  key={index}
                  onClick={() => handleAvatarSelection(`/img/avatar_${index + 1}.jpeg`)} // Update avatar
                  imageSrc={`/img/avatar_${index + 1}.jpeg`}
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
