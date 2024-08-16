"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import GreenButton from "@/components/buttons/GreenButton";
import OutlineButton from "@/components/buttons/OutlineButton";
import { useRouter } from 'next/navigation';
import { FaSteamSymbol } from "react-icons/fa";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');

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

  const showMore = () => {
    // Your showMore functionality here
  }

  const router = useRouter();

  return (
    <div className="text-taupe font-light font-sofia">
      <Navbar avatar={selectedImage} />
      <div className="container mx-auto mt-16 rounded-xl py-16"  
           style={{ backgroundColor: 'rgba(184, 180, 189, 0.15)' }}>

        {/* New Session Header */}
        <div className="flex justify-between items-center pb-16">
          <h1 className="font-abolition text-neonGreen text-7xl ms-16">CREATE NEW SESSION</h1>
          <OutlineButton onClick={() => router.back()} className="uppercase me-32">
            Go Back
          </OutlineButton>
        </div>

        {/* Recommended Game */}
        <div className="bg-black p-16">
          <p className="text-neonGreen uppercase">Our Recommendation</p>
          <h2 className="text-7xl text-white font-abolition my-5">Dead By Daylight</h2>
          <div className="flex w-[46%] justify-between">
            <GreenButton onClick={() => {}} className="w-[200px] h-[60px]">Let's play!</GreenButton>
            <OutlineButton onClick={() => {}} className="flex justify-center items-center w-[200px] h-[60px]">
              <FaSteamSymbol />
              <span>&nbsp; Check on Steam</span>
            </OutlineButton>
          </div>
        </div>

        {/* Filtered Games */}
        <div>
          <div>
            <div>Search bar</div>
            <div>Filters</div>
          </div>
          
          <div>
            {/* Map through game cards */}
          </div>
        </div>

        <div>
          <GreenButton onClick={showMore} className="font-robotoMono uppercase z-10">
            Load More
          </GreenButton>
        </div>
      </div>
    </div>
  )
}
