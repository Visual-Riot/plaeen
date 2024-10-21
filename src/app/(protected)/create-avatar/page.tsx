"use client"; // Ensure client-side execution

import { useRef, useState, useEffect } from "react";
import { TiPlus } from "react-icons/ti";
import Navbar from "@/components/layout/Navbar";
import GreenButton from "@/components/buttons/GreenButton";
import { useSession } from "next-auth/react"; // For session data
import { useRouter } from "next/navigation"; // For navigation

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true); // Track username validity
  const [isUsernameChecking, setIsUsernameChecking] = useState<boolean>(false); // Track username checking
  const [fileError, setFileError] = useState<string | null>(null); // State for error message
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession(); // Get the user session
  const router = useRouter(); // Initialize the Next.js router

  useEffect(() => {
    if (session?.user?.id) {
      // Fetch existing user data (name and image) from the database if available
      fetchUserDetails(session.user.id as string);
    }
  }, [session]);  

  const fetchUserDetails = async (userId: string) => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.name) {
          setUsername(data.name);
        }
        if (data.image) {
          setSelectedImage(data.image);
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileError("File size exceeds 2MB.");
        return;
      } else {
        setFileError(null); // Clear previous errors
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const checkUsernameUniqueness = async (newUsername: string) => {
    setIsUsernameChecking(true); // Start checking
    try {
      const response = await fetch(`/api/user/check-username?username=${newUsername}`);
      const { isAvailable } = await response.json();
      setIsUsernameValid(isAvailable);
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
    } finally {
      setIsUsernameChecking(false); // Finish checking
    }
  };

  const handleUsernameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    
    if (newUsername.length > 0) {
      await checkUsernameUniqueness(newUsername); // Check uniqueness when the username changes
    } else {
      setIsUsernameValid(true); // Reset validity for empty input
    }
  };

  const handleContinue = async () => {
    if (!session || !session.user) {
      console.error("No user session found");
      return;
    }

    const userId = session.user.id; // Get the logged-in user's ID

    const avatarData = {
      name: username,
      image: selectedImage,
      userId,
    };

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(avatarData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update avatar:", errorData.error);
      } else {
        router.push("/game-calendar"); // Redirect to game-calendar after success
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleSkip = () => {
    router.push("/game-calendar"); // Redirect to game-calendar on skip
  };

  return (
    <>
      <Navbar />
      <div className="bg-black w-full h-full bg-[url('/img/bg-img_01.webp')] bg-cover bg-center">
        <div className="bg-[black]/85 w-full h-screen flex flex-col items-center justify-center mt-[-70px]">
          <div className="bg-[#6606E3]/5 w-full flex flex-col items-center justify-center h-full">
            <div className="p-16 bg-lightPurple/15 min-w-[320px] md:min-w-[520px] rounded-lg backdrop-blur-[14px] backdrop-brightness-[1.4] mt-[60px]">
              <div>
                <h2 className="text-white font-semibold text-3xl mt-0.5">
                  Create your character
                </h2>
                <p className="font-light text-white text-sm mt-8">
                  Add your username
                </p>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={handleUsernameChange}
                  className={`border-2 mt-4 w-full p-5 rounded-lg placeholder-gray-700 text-gray-900 ${
                    isUsernameValid ? "border-green bg-green" : "border-red-500"
                  }`}
                />
                {!isUsernameValid && (
                  <p className="text-red-500 mt-2 text-sm">
                    Username is already taken. Please try another.
                  </p>
                )}
              </div>
              <div className="flex mt-8 items-center">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected Avatar"
                    className="w-[77px] h-[77px] rounded-full object-cover"
                  />
                ) : (
                  <div
                    onClick={handleFileInputClick}
                    className="border border-taupe bg-taupe opacity-35 rounded-full w-[77px] h-[77px] flex items-center justify-center text-white text-2xl cursor-pointer"
                  >
                    <TiPlus />
                  </div>
                )}
                <button
                  onClick={handleFileInputClick}
                  className="text-green underline ml-5"
                  title="Please upload an image in JPG or PNG format with a size of 2MB or less."
                >
                  Upload avatar
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg, image/png"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              {fileError && (
                <div className="text-white mt-2 text-sm">{fileError}</div>
              )}
              <div onClick={handleContinue}>
                <GreenButton
                  onClick={handleContinue}
                  disabled={!isUsernameValid || isUsernameChecking}
                  className={`mt-8 p-[1.25rem!important] text-black w-full ${
                    isUsernameValid && !isUsernameChecking ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {isUsernameChecking ? "Checking..." : "Continue"}
                </GreenButton>
              </div>
              <div onClick={handleSkip}>
                <div className="text-white underline text-sm flex justify-center mt-8 hover:text-gray-300 cursor-pointer">
                  Skip for now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
