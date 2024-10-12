import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle POST (add to favourites) and DELETE (remove from favourites)
export async function POST(req: Request, { params }: { params: { gameId: string } }) {
  try {
    const gameId = parseInt(params.gameId, 10); // Get the gameId from the params
    const body = await req.json();
    const { userId, gameName, backgroundImage, genres, platforms, rating } = body;

    // Check if required fields are provided
    if (!userId || !gameName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if the game is already in favourites
    const existingFavourite = await prisma.favouritedGame.findFirst({
      where: { userId, gameId },
    });

    if (existingFavourite) {
      return NextResponse.json({ error: 'Game already in favourites' }, { status: 400 });
    }

    // Add game to favourites
    const favouritedGame = await prisma.favouritedGame.create({
      data: {
        userId,
        gameId,
        gameName,
        backgroundImage,
        genres,
        platforms,
        rating,
      },
    });

    return NextResponse.json(favouritedGame, { status: 201 });
  } catch (error) {
    console.error('Error adding game to favourites:', error);
    return NextResponse.json({ error: 'Failed to add game to favourites' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { gameId: string } }) {
  try {
    const gameId = parseInt(params.gameId, 10); // Get the gameId from the params
    const body = await req.json();
    const { userId } = body;

    // Check if required fields are provided
    if (!userId || !gameId) {
      return NextResponse.json({ error: 'Missing userId or gameId' }, { status: 400 });
    }

    // Remove game from favourites
    await prisma.favouritedGame.deleteMany({
      where: { userId, gameId },
    });

    return NextResponse.json({ message: 'Game removed from favourites' }, { status: 200 });
  } catch (error) {
    console.error('Error removing game from favourites:', error);
    return NextResponse.json({ error: 'Failed to remove game from favourites' }, { status: 500 });
  }
}
