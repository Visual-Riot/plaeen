"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import useSession to access current user session
import Navbar from "@/components/layout/Navbar";
import GreenButton from "@/components/buttons/GreenButton";
import OutlineButton from "@/components/buttons/OutlineButton";
import { useRouter, useParams } from "next/navigation";
import { FaSteamSymbol } from "react-icons/fa";
import SearchBar from "@/components/ui/SearchBar";
import RelevanceFilter from "@/components/filters/RelevanceFilter";
import GenreFilter from "@/components/filters/GenreFilter";
import PlatformFilter from "@/components/filters/PlatformFilter";
import ThemeFilter from "@/components/filters/ThemeFilter";
import PlayerModeFilter from "@/components/filters/PlayerModeFilter";
import GameCard from "@/components/game/GameCard";
import Footer from "@/components/layout/Footer";
import gamesData from "../../../api/games/rawgGames.json";

interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
  rating: number;
  tags: { id: number; name: string; slug: string }[];
}

const gamesDataTyped: Game[] = gamesData as Game[];

export default function Page() {
  const { data: session } = useSession(); // Get the current session
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [selectedRelevance, setSelectedRelevance] = useState<string>('Relevance');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedPlayerModes, setSelectedPlayerModes] = useState<string[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [displayedGames, setDisplayedGames] = useState<Game[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMoreGames, setHasMoreGames] = useState<boolean>(true);
  const [favouritedGames, setFavouritedGames] = useState<number[]>([]);
  const { id: teamId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) {
      fetchFavouritedGames(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    fetchAllGames();
  }, []);

  useEffect(() => {
    let filtered = allGames.filter((game) => {
      const normalizedPlatforms = game.platforms.map(p => normalizePlatformName(p.platform.name));
      const matchesSearchTerm = game.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenres.length === 0 || game.genres.some(genre => selectedGenres.includes(genre.name));
      const matchesPlatform = selectedPlatforms.length === 0 || normalizedPlatforms.some(platform => selectedPlatforms.includes(platform));
      const matchesTheme = selectedThemes.length === 0 || selectedThemes.some(theme =>
        game.tags.some(tag => tag.name.toLowerCase() === theme.toLowerCase() || tag.slug.toLowerCase() === theme.toLowerCase())
      );
      const matchesPlayerMode = selectedPlayerModes.length === 0 || selectedPlayerModes.some(playerMode =>
        game.tags.some(tag => tag.name.toLowerCase() === playerMode.toLowerCase() || tag.slug.toLowerCase() === playerMode.toLowerCase())
      );

      return matchesSearchTerm && matchesGenre && matchesPlatform && matchesTheme && matchesPlayerMode;
    });

    filtered = applySorting(filtered, selectedRelevance);
    setFilteredGames(filtered);
    setDisplayedGames(filtered.slice(0, 18)); 
    setPage(1); 
    setHasMoreGames(filtered.length > 18); 
  }, [searchTerm, selectedGenres, selectedPlatforms, selectedThemes, selectedPlayerModes, selectedRelevance, allGames]);

  const fetchFavouritedGames = async (userId: string) => {
    try {
      const response = await fetch('/api/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // Pass userId from session
      });

      if (response.ok) {
        const data = await response.json();
        const favouriteIds = data.map((game: { gameId: number }) => game.gameId);
        setFavouritedGames(favouriteIds);
      } else {
        console.error('Failed to fetch favourited games');
      }
    } catch (error) {
      console.error('Error fetching favourited games:', error);
    }
  };

  const handleFavouriteClick = async (game: Game) => {
    if (!session?.user?.id) {
      console.error('User must be logged in to favourite games');
      return;
    }
  
    try {
      const isFavourited = favouritedGames.includes(game.id);
  
      if (isFavourited) {
        // Remove the game from favourites using the DELETE method
        const response = await fetch(`/api/favourites/${game.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: session.user.id }), // Send userId in the body
        });
  
        if (response.ok) {
          setFavouritedGames(favouritedGames.filter((id) => id !== game.id));
        } else {
          console.error('Failed to remove game from favourites');
        }
      } else {
        // Add the game to favourites using the POST method
        const response = await fetch(`/api/favourites/${game.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session.user.id,  // Send userId in the body
            gameName: game.name,      // Pass the actual game name
            backgroundImage: game.background_image,  // Pass the actual background image URL
            genres: game.genres.map((genre) => genre.name),  // Pass the actual genres array
            platforms: game.platforms.map((p) => p.platform.name),  // Pass the actual platforms array
            rating: game.rating,  // Pass the actual rating
          }),
        });
  
        if (response.ok) {
          setFavouritedGames([...favouritedGames, game.id]);
        } else {
          console.error('Failed to add game to favourites');
        }
      }
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };
  

  const fetchAllGames = () => {
    try {
      setAllGames(gamesDataTyped);
    } catch (error) {
      console.error("Error fetching all games:", error);
    }
  };

  const loadMoreGames = () => {
    const nextPage = page + 1;
    const nextSetOfGames = filteredGames.slice(0, nextPage * 18);
    setDisplayedGames(nextSetOfGames);
    setPage(nextPage);

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
    setSelectedPlatforms(platforms);
  };

  const handleThemeChange = (themes: string[]) => {
    setSelectedThemes(themes);
  };

  const handlePlayerModeChange = (playerModes: string[]) => {
    setSelectedPlayerModes(playerModes);
  };

  const applySorting = (games: Game[], sortOption: string): Game[] => {
    switch (sortOption) {
      case 'A-Z':
        return games.sort((a, b) => a.name.localeCompare(b.name));
      case 'Z-A':
        return games.sort((a, b) => b.name.localeCompare(a.name));
      case 'By Rating':
        return games.sort((a, b) => b.rating - a.rating);
      case 'By Release Date':
        return games.sort((a, b) => new Date(b.released).getTime() - new Date(a.released).getTime());
      default:
        return games;
    }
  };

  const normalizePlatformName = (platformName: string) => {
    if (platformName.toLowerCase().includes("playstation")) return "PlayStation";
    if (platformName.toLowerCase().includes("xbox")) return "Xbox";
    if (platformName.toLowerCase().includes("nintendo")) return "Nintendo";
    return platformName;
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRelevance('Relevance');
    setSelectedGenres([]);
    setSelectedPlatforms([]);
    setSelectedThemes([]);
    setSelectedPlayerModes([]);
  };

  const handleCreateSession = async (game: Game) => {
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: game.id,
          gameName: game.name,
        }),
      });

      if (response.ok) {
        router.push(`/session/${game.id}`);
      } else {
        console.error('Failed to create a new session');
      }
    } catch (error) {
      console.error('Error creating a new session:', error);
    }
  };

  return (
    <div className="text-taupe font-light font-sofia max-w-[90%] mx-auto">
      <Navbar avatar={selectedImage || null} />
      <div
        className="container mx-auto mt-16 rounded-xl py-16"
        style={{ backgroundColor: "rgba(184, 180, 189, 0.15)" }}
      >
        <div className="flex justify-between items-center pb-16 xxs:flex-col-reverse md:flex-row">
          <h1 className="font-abolition text-neonGreen text-7xl xxs:ms-0 xxs:text-center md:ms-16 md:text-left">CREATE NEW SESSION</h1>
          <OutlineButton
            onClick={() => router.back()}
            className="uppercase xxs:me-0 xxs:mb-10 md:me-32 md:mb-0 xs:w-[200px] md:w-fit bg-transparent"
          >
            Go Back
          </OutlineButton>
        </div>

        {/* Recommended Game */}
        <div className="relative bg-black p-16 h-[30rem] flex flex-col justify-center bg-[url('/img/dead-by-daylight.jpg')] bg-cover xxs:bg-left md:bg-center">
          <div className="absolute inset-0 opacity-15 z-0" style={{ backgroundColor: 'rgba(102, 6, 227)' }}></div>
          <div className="relative z-10">
            <p className="text-neonGreen uppercase xxs:text-center md:text-left">Our Recommendation</p>
            <h2 className="text-7xl text-white font-abolition my-5 xxs:text-center md:text-left">Dead By Daylight</h2>
            <div className="flex xxs:flex-col md:flex-row">
              <GreenButton onClick={() => handleCreateSession(gamesDataTyped[0])} className="xxs:w-auto md:w-[200px] h-[60px] xs:mb-3 md:mb-0 opacity-[1!important] hover:bg-violet hover:text-white">
                {"Let's play!"}
              </GreenButton>
              <OutlineButton
                onClick={() => {}}
                className="flex xxs:ms-0 md:ms-3 xxs:mt-3 md:mt-0 justify-center items-center xxs:w-auto md:w-[200px] h-[60px] bg-transparent"
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
        <div className="flex xxs:flex-col lg:flex-row w-4/5 mx-auto gap-7">
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
          <PlayerModeFilter
            selectedPlayerModes={selectedPlayerModes}
            handlePlayerModeChange={handlePlayerModeChange}
            className="filter-box"
          />
          <ThemeFilter
            selectedThemes={selectedThemes}
            handleThemeChange={handleThemeChange}
            className="filter-box"
          />
        </div>

        {/* Reset filters */}
        <div className="text-center">
          <button onClick={resetFilters} className="h-12 mt-3">
            Reset Filters
          </button>
        </div>

        {/* Display Available Games Count */}
        <div className="text-center my-4">
          <p className="font-extralight">
            {filteredGames.length.toLocaleString()} game{filteredGames.length !== 1 ? 's' : ''} available
          </p>
          {filteredGames.length === 0 && (
            <p className="font-extralight text-gray-500 mt-2">
              Try widening your search.
            </p>
          )}
        </div>

        {/* Display Filtered or Initially Displayed Games */}
        <div className="w-4/5 mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-32 gap-y-12">
          {displayedGames.map((game) => (
            <GameCard
              id={game.id}
              key={game.id}
              coverImage={game.background_image}
              name={game.name}
              releaseDate={game.released}
              teamId={teamId as string}
              genre={game.genres.map((genre) => genre.name).join(", ")}
              platform={game.platforms.map((p) => p.platform.name).join(", ")}
              rating={`${game.rating}/5`}
              onCreateSession={async () => {
                try {
                  const parsedTeamId = Array.isArray(teamId) ? parseInt(teamId[0], 10) : parseInt(teamId, 10);
            
                  const response = await fetch('/api/sessions', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      gameId: game.id,
                      gameName: game.name,
                      backgroundImage: game.background_image,
                      genres: game.genres.map((genre) => genre.name),
                      platforms: game.platforms.map((p) => p.platform.name),
                      rating: game.rating,
                      teamId: parsedTeamId,
                    }),
                  });
            
                  if (!response.ok) {
                    throw new Error('Failed to create session');
                  }
            
                  const data = await response.json();
                  console.log('Session created successfully:', data);
                } catch (error) {
                  console.error('Error creating session:', error);
                }
              }}
              isfavourited={favouritedGames.includes(game.id)}
              onFavourite={() => handleFavouriteClick(game)}
              gameInfoUrl={`https://rawg.io/games/${game.id}`}
            />
          ))}
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
