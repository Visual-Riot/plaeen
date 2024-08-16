import axios from 'axios';

interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  // Add more fields as needed
}

export const fetchGames = async (): Promise<Game[]> => {
  const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

  try {
    const response = await axios.get(URL);
    const games: Game[] = response.data.results;
    return games;
  } catch (error) {
    console.error('Error fetching data from RAWG API:', error);
    return [];
  }
};
