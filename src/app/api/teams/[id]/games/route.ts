import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET: Fetch all game sessions for a team
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const gameSessions = await prisma.gameSession.findMany({
      where: {
        teamId: parseInt(id),
      },
    });

    return NextResponse.json(gameSessions, { status: 200 });
  } catch (error) {
    console.error('Error fetching game sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch game sessions' }, { status: 500 });
  }
}

// POST: Add a game to a team's schedule
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // team ID from the URL params
  const body = await request.json(); // parse the request body for game details
  const { gameId, gameName, backgroundImage, genres, platforms, rating } = body;

  if (!gameId || !gameName) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Check if the game is already associated with the team
    const existingGame = await prisma.gameSession.findFirst({
      where: {
        teamId: parseInt(id),
        gameId,
      },
    });

    if (existingGame) {
      return NextResponse.json({ error: 'Game already exists for this team' }, { status: 409 });
    }

    // Add the new game to the team's schedule
    const newGameSession = await prisma.gameSession.create({
      data: {
        gameId,
        gameName,
        backgroundImage,
        genres,
        platforms,
        rating,
        teamId: parseInt(id),
      },
    });

    return NextResponse.json(newGameSession, { status: 201 });
  } catch (error) {
    console.error('Error adding game to team schedule:', error);
    return NextResponse.json({ error: 'Failed to add game' }, { status: 500 });
  }
}
