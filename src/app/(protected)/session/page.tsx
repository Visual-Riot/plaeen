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
import PlatformFilter from '@/components/filters/PlatformFilter';
import ThemeFilter from '@/components/filters/ThemeFilter';
import GameCard from "@/components/game/GardCard";
import Footer from "@/components/layout/Footer";
import axios from "axios";

interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
  rating: number;
}

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term state
  const [selectedRelevance, setSelectedRelevance] = useState<string>('Relevance'); // Relevance filter state
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]); // Genre filter state
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]); // Platform filter state
  const [allGames, setAllGames] = useState<Game[]>([]); // State for storing all fetched games
  const [filteredGames, setFilteredGames] = useState<Game[]>([]); // State for filtered games
  const [page, setPage] = useState<number>(1); // State for pagination
  const [hasMoreGames, setHasMoreGames] = useState<boolean>(true); // To check if more games are available

  useEffect(() => {
    const savedImage = localStorage.getItem("userAvatar");
    const savedUsername = localStorage.getItem("username");
    if (savedImage) {
      setSelectedImage(savedImage);
    }
    if (savedUsername) {
      setUsername(savedUsername);
    }

    // Fetch all games initially
    fetchAllGames();
  }, []);

  useEffect(() => {
    // Apply filters and search term to the games
    const filtered = allGames.filter((game) => {
      // Normalize platform names for the game
      const normalizedPlatforms = game.platforms.map(p => normalizePlatformName(p.platform.name));

      // Search by name
      const matchesSearchTerm = game.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by genre
      const matchesGenre = selectedGenres.length === 0 || game.genres.some(genre => selectedGenres.includes(genre.name));

      // Filter by platform
      const matchesPlatform = selectedPlatforms.length === 0 || normalizedPlatforms.some(platform => selectedPlatforms.includes(platform));

      return matchesSearchTerm && matchesGenre && matchesPlatform;
    });

    // Apply sorting based on the relevance filter
    const sortedGames = applySorting(filtered, selectedRelevance);

    setFilteredGames(sortedGames);
  }, [searchTerm, selectedGenres, selectedPlatforms, selectedRelevance, allGames]);

  const fetchAllGames = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
    const URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`; // Fetch a large number of games initially

    try {
      const response = await axios.get(URL);
      const games = response.data.results;

      console.log("Fetched Games:", games); // Debugging: Check if games are fetched correctly

      setAllGames(games); // Store all fetched games
    } catch (error) {
      console.error("Error fetching all games:", error);
    }
  };

  const loadMoreGames = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    // Append the next set of games to the displayed list
    const nextSetOfGames = filteredGames.slice(0, nextPage * 20);

    // Check if there are more games to load
    if (nextSetOfGames.length >= filteredGames.length) {
      setHasMoreGames(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (genres: string[]) => {
    setSelectedGenres(genres);
  };

  const handlePlatformChange = (platforms: string[]) => {
    console.log("Selected Platforms:", platforms); // Debugging: Check selected platforms
    setSelectedPlatforms(platforms);
  };

  const applySorting = (games: Game[], sortOption: string) => {
    switch (sortOption) {
      case 'Name A-Z':
        return games.sort((a, b) => a.name.localeCompare(b.name));
      case 'Name Z-A':
        return games.sort((a, b) => b.name.localeCompare(a.name));
      case 'Rating High to Low':
        return games.sort((a, b) => b.rating - a.rating);
      case 'Release Date Newest':
        return games.sort((a, b) => new Date(b.released).getTime() - new Date(a.released).getTime());
      case 'Release Date Oldest':
        return games.sort((a, b) => new Date(a.released).getTime() - new Date(b.released).getTime());
      default:
        return games; // Default is no sorting
    }
  };

  // Helper function to normalize platform names
  const normalizePlatformName = (platformName: string) => {
    if (platformName.toLowerCase().includes("playstation")) return "PlayStation";
    if (platformName.toLowerCase().includes("xbox")) return "Xbox";
    // Add more normalizations as needed
    return platformName;
  };

  const router = useRouter();

  return (
    <div className="text-taupe font-light font-sofia">
      <Navbar avatar={selectedImage} />
      <div
        className="container mx-auto mt-16 rounded-xl py-16"
        style={{ backgroundColor: "rgba(184, 180, 189, 0.15)" }}
      >
        <div className="flex justify-between items-center pb-16">
          <h1 className="font-abolition text-neonGreen text-7xl ms-16">CREATE NEW SESSION</h1>
          <OutlineButton
            onClick={() => router.back()}
            className="uppercase me-32 xs:w-[200px] md:w-fit bg-transparent"
          >
            Go Back
          </OutlineButton>
        </div>

        {/* Recommended Game */}
        <div className="relative bg-black p-16 h-[30rem] flex flex-col justify-center bg-[url('/img/dead-by-daylight.jpg')] bg-cover">
          <div className="absolute inset-0 opacity-15 z-0" style={{ backgroundColor: 'rgba(102, 6, 227)' }}></div>
          <div className="relative z-10">
            <p className="text-neonGreen uppercase">Our Recommendation</p>
            <h2 className="text-7xl text-white font-abolition my-5">Dead By Daylight</h2>
            <div className="flex xs:flex-col md:flex-row">
              <GreenButton onClick={() => {}} className="w-[200px] h-[60px] xs:mb-3 md:mb-0 opacity-[1!important] hover:bg-violet hover:text-white">
                Let's play!
              </GreenButton>
              <OutlineButton
                onClick={() => {}}
                className="flex ms-3 justify-center items-center w-[200px] h-[60px] bg-transparent"
              >
                <FaSteamSymbol />
                <span>&nbsp; Check on Steam</span>
              </OutlineButton>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div>
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            className="mt-16 mb-8 font-extralight"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-row w-4/5 mx-auto gap-10">
          <RelevanceFilter
            selectedOption={selectedRelevance}
            handleRelevanceChange={setSelectedRelevance}
            className="filter-box"
          />
          <GenreFilter
            selectedGenres={selectedGenres}
            handleGenreChange={handleGenreChange}
            className="filter-box"
          />
          <PlatformFilter
            selectedPlatforms={selectedPlatforms}
            handlePlatformChange={handlePlatformChange}
            className="filter-box"
          />
          <ThemeFilter className="filter-box" />
        </div>

        {/* Display Filtered or Initially Displayed Games */}
        <div className="w-4/5 mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-32 gap-y-12">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <GameCard
                key={game.id}
                coverImage={game.background_image}
                name={game.name}
                releaseDate={game.released}
                genre={game.genres.map((genre) => genre.name).join(", ")}
                platform={game.platforms.map((p) => p.platform.name).join(", ")}
                rating={`${game.rating}/5`}
                onCreateSession={() => console.log('Create Session Clicked')}
                onFavourite={() => console.log('Favourite Clicked')}
                gameInfoUrl={`https://rawg.io/games/${game.id}`}
              />
            ))
          ) : (
            <p className="text-center text-white">No games found.</p>
          )}
        </div>

        <div className="flex justify-center">
          {hasMoreGames && (
            <GreenButton onClick={loadMoreGames} className="font-robotoMono uppercase z-10 w-[230px] mt-16">
              Load More
            </GreenButton>
          )}
        </div>
      </div>
      <Footer useBackgroundImage={false} className="bg-[#000000!important]" />
    </div>
  );
}
