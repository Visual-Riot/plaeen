import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameId, gameName, backgroundImage, genres, platforms, rating, teamId } = body;

    // Ensure that all required fields are present
    if (!gameId || !gameName || !teamId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Parse the teamId if it's a string or array
    const parsedTeamId = Array.isArray(teamId) ? parseInt(teamId[0], 10) : parseInt(teamId, 10);

    // Log the data for debugging purposes
    console.log('Received data:', { gameId, gameName, backgroundImage, genres, platforms, rating, teamId: parsedTeamId });

    // Create a new game session
    const newSession = await prisma.gameSession.create({
      data: {
        gameId: parseInt(gameId, 10), // Ensure gameId is an integer
        gameName,
        backgroundImage: backgroundImage || '',
        genres: genres || [], // Make sure genres is an array of strings
        platforms: platforms || [], // Make sure platforms is an array of strings
        rating: rating || 0,
        teamId: parsedTeamId, // Ensure teamId is an integer
      },
    });

    return NextResponse.json(newSession, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
