import axios from 'axios';
import fs from 'fs';
import path from 'path';

const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const URL = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}`;

async function fetchAndStoreData() {
  try {
    const response = await axios.get(URL);
    const data = response.data;

    // Define the path where the JSON file will be saved
    const filePath = path.join(process.cwd(), 'data', 'gamesData.json');

    // Ensure the data directory exists
    fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true });

    // Write data to a JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    
    console.log('Data fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchAndStoreData();
