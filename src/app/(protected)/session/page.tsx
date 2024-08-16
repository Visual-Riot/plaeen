"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import GreenButton from "@/components/buttons/GreenButton";
import OutlineButton from "@/components/buttons/OutlineButton";
import { useRouter } from 'next/navigation';
import { FaSteamSymbol } from "react-icons/fa";
import SearchBar from "@/components/ui/SearchBar";
import RelevanceFilter from '@/components/filters/RelevanceFilter';
import GenreFilter from '@/components/filters/GenreFilter';
import ThemeFilter from '@/components/filters/ThemeFilter';
import PlatformFilter from '@/components/filters/PlatformFilter';
import GameCard from "@/components/game/GardCard";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRelevance, setSelectedRelevance] = useState<string>('None'); // Set default to 'None'
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  useEffect(() => {
    const savedImage = localStorage.getItem("userAvatar");
    const savedUsername = localStorage.getItem("username");
    if (savedImage) {
      setSelectedImage(savedImage);
    }
    if (savedUsername) {
      setUsername(savedUsername);
    }

    // Reset selectedRelevance to 'None' when the component mounts
    setSelectedRelevance('None');
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
          <OutlineButton onClick={() => router.back()} className="uppercase me-32 xs:w-[200px] md:w-fit bg-transparent">
            Go Back
          </OutlineButton>
        </div>

        {/* Recommended Game */}
        <div className="bg-black p-16 h-96 flex flex-col justify-center">
          <p className="text-neonGreen uppercase">Our Recommendation</p>
          <h2 className="text-7xl text-white font-abolition my-5">Dead By Daylight</h2>
          <div className="flex xs:flex-col md:flex-row">
            <GreenButton onClick={() => {}} className="w-[200px] h-[60px] xs:mb-3 md:mb-0 opacity-[1!important] hover:bg-violet hover:text-white">Let's play!</GreenButton>
            <OutlineButton onClick={() => {}} className="flex ms-3 justify-center items-center w-[200px] h-[60px] bg-transparent">
              <FaSteamSymbol />
              <span>&nbsp; Check on Steam</span>
            </OutlineButton>
          </div>
        </div>

        {/* Filters */}
        <div>
          <div>
            <div>
              <SearchBar
                value={searchTerm}
                onChange={handleSearchChange}
                className="mt-16 mb-8 font-extralight"
              />
            </div>
            <div className="flex flex-row w-4/5 mx-auto gap-10">
              <RelevanceFilter
                selectedOption={selectedRelevance}
                handleRelevanceChange={setSelectedRelevance}
                className="filter-box"
              />
              <GenreFilter
                selectedGenres={selectedGenres}
                handleGenreChange={setSelectedGenres}
                className="filter-box"
              />
              <PlatformFilter
                selectedPlatforms={selectedPlatforms}
                handlePlatformChange={setSelectedPlatforms}
                className="filter-box"
              />
              <ThemeFilter
                className="filter-box"
              />
            </div>
          </div>
          
          <div className="w-4/5 mx-auto my-16">
            {/* Map through game cards */}
            <GameCard
              coverImage="https://example.com/game-cover.jpg"
              name="Example Game"
              releaseDate="2023-09-15"
              genre="Action, RPG"
              platform="PC, PS5, Xbox"
              rating="9.5/10"
              onCreateSession={() => console.log('Create Session Clicked')}
              onFavourite={() => console.log('Favourite Clicked')}
              gameInfoUrl="https://example.com/game-info"
            />
          </div>
        </div>

        <div>
          <GreenButton onClick={showMore} className="font-robotoMono uppercase z-10">
            Load More
          </GreenButton>
        </div>
      </div>
    </div>
  );
}
