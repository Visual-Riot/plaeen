"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import GreenButton from "@/components/buttons/GreenButton";
import OutlineButton from "@/components/buttons/OutlineButton";
import { useRouter } from 'next/navigation';

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
      <div className="container mx-auto mt-16 rounded-xl p-16"  
           style={{ backgroundColor: 'rgba(184, 180, 189, 0.15)' }}>

        {/* New Session Header */}
        <div className="flex justify-between items-center pb-16">
          <h1 className="font-abolition text-neonGreen text-7xl ms-16">CREATE NEW SESSION</h1>
          <OutlineButton onClick={() => router.back()} className="uppercase me-32">
            Go Back
          </OutlineButton>
        </div>

        {/* Recommended Game */}
        <div>
          {/* Content here */}
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
