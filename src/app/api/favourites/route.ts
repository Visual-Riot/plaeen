import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all favourited games for the current user (POST method)
export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Query the favourited games for the given userId
    const favouritedGames = await prisma.favouritedGame.findMany({
      where: { userId },
    });

    return NextResponse.json(favouritedGames, { status: 200 });
  } catch (error) {
    console.error('Error fetching favourited games:', error);
    return NextResponse.json({ error: 'Failed to fetch favourited games' }, { status: 500 });
  }
}
